/* ==========================================================================
   action.js — 페이지 인터랙션
   01. 모바일 내비게이션 (햄버거 드로어)
   02. 이미지 슬롯 — 파일이 없으면 안내 문구 표시
   03. 스크롤 등장 애니메이션
   ========================================================================== */

/* --------------------------------------------------------------------------
   00. 헤더 — 히어로 위에서는 투명, 벗어나면 크림 배경
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.getElementById('header');
  const hero = document.getElementById('hero');
  if (!header) return;

  // 히어로가 없는 페이지(서브페이지)에서는 항상 배경을 채웁니다
  if (!hero) {
    header.classList.add('is-solid');
    return;
  }

  // 히어로가 헤더 아래 영역과 겹쳐 있는 동안에만 투명하게 둡니다
  const observer = new IntersectionObserver(
    ([entry]) => header.classList.toggle('is-solid', !entry.isIntersecting),
    { rootMargin: `-${header.offsetHeight}px 0px 0px 0px`, threshold: 0 }
  );
  observer.observe(hero);
}

/* --------------------------------------------------------------------------
   01. 모바일 내비게이션
   -------------------------------------------------------------------------- */
function initNav() {
  const toggle = document.getElementById('navToggle');
  const gnb = document.getElementById('gnb');
  const dim = document.getElementById('navDim');
  const header = document.getElementById('header');
  if (!toggle || !gnb || !dim) return;

  const open = () => {
    gnb.classList.add('is-open');
    dim.hidden = false;
    requestAnimationFrame(() => dim.classList.add('is-open'));
    document.body.classList.add('is-nav-open');
    // 크림색 드로어 위에서 밝은 아이콘이 묻히지 않도록 헤더를 불투명으로
    header?.classList.add('is-solid');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', '메뉴 닫기');
  };

  const close = () => {
    gnb.classList.remove('is-open');
    dim.classList.remove('is-open');
    document.body.classList.remove('is-nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', '메뉴 열기');
    setTimeout(() => { dim.hidden = true; }, 300); // CSS transition 시간과 동일

    // 아직 히어로 안이라면 다시 투명 헤더로 되돌립니다
    const hero = document.getElementById('hero');
    if (header && hero && hero.getBoundingClientRect().bottom > header.offsetHeight) {
      header.classList.remove('is-solid');
    }
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => (isOpen() ? close() : open()));
  dim.addEventListener('click', close);

  // 메뉴 또는 드로어 안 구매하기 클릭 시 닫기
  gnb.querySelectorAll('a, [data-order-open]').forEach((el) => el.addEventListener('click', close));

  // ESC 로 닫기
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) close();
  });

  // 데스크톱으로 넓어지면 상태 초기화
  window.matchMedia('(min-width: 769px)').addEventListener('change', (e) => {
    if (e.matches && isOpen()) close();
  });
}

/* --------------------------------------------------------------------------
   01-1. 주문서 모달
   -------------------------------------------------------------------------- */
function initOrderModal() {
  const modal = document.getElementById('orderModal');
  const form = document.getElementById('orderForm');
  const done = document.getElementById('orderDone');
  if (!modal || !form || !done) return;

  const dialog = modal.querySelector('.modal__dialog');
  const totalEl = modal.querySelector('[data-total]');
  const qtyInput = form.querySelector('#qty');
  const money = (n) => `₩ ${n.toLocaleString('ko-KR')}`;

  let lastFocused = null;

  /* ── 합계 ─────────────────────────────────────────── */
  const selectedModel = () => form.querySelector('input[name="model"]:checked');

  const updateTotal = () => {
    const model = selectedModel();
    const qty = Math.min(9, Math.max(1, Number(qtyInput.value) || 1));
    qtyInput.value = qty;
    totalEl.textContent = money(Number(model.dataset.price) * qty);
  };

  form.addEventListener('change', (e) => {
    if (e.target.name === 'model' || e.target.name === 'qty') updateTotal();
    if (e.target.matches('[required]')) clearError(e.target);
  });
  qtyInput.addEventListener('input', updateTotal);

  form.querySelectorAll('[data-qty]').forEach((btn) => {
    btn.addEventListener('click', () => {
      qtyInput.value = Number(qtyInput.value) + Number(btn.dataset.qty);
      updateTotal();
    });
  });

  /* ── 유효성 검사 ──────────────────────────────────── */
  const messages = {
    name: '이름을 입력해 주세요.',
    phone: '연락처를 010-1234-5678 형식으로 입력해 주세요.',
    email: '올바른 이메일 주소를 입력해 주세요.',
  };

  const errorSlot = (input) => input.closest('.field')?.querySelector('[data-error]');

  function clearError(input) {
    input.classList.remove('is-invalid');
    const slot = errorSlot(input);
    if (slot) slot.textContent = '';
  }

  function showError(input) {
    input.classList.add('is-invalid');
    const slot = errorSlot(input);
    if (slot) slot.textContent = messages[input.name] || '필수 항목입니다.';
  }

  /* ── 열기 / 닫기 ──────────────────────────────────── */
  const FOCUSABLE = 'button, [href], input, textarea, select';

  function open() {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.classList.add('is-modal-open');
    requestAnimationFrame(() => modal.classList.add('is-open'));
    dialog.querySelector(FOCUSABLE)?.focus();
  }

  function close() {
    modal.classList.remove('is-open');
    document.body.classList.remove('is-modal-open');
    setTimeout(() => {
      modal.hidden = true;
      // 다음에 열 때 다시 입력 화면부터 시작
      form.hidden = false;
      done.hidden = true;
    }, 300); // CSS transition 시간과 동일
    lastFocused?.focus();
  }

  document.querySelectorAll('[data-order-open]').forEach((btn) =>
    btn.addEventListener('click', open)
  );
  modal.querySelectorAll('[data-order-close]').forEach((btn) =>
    btn.addEventListener('click', close)
  );

  document.addEventListener('keydown', (e) => {
    if (modal.hidden) return;

    if (e.key === 'Escape') close();

    // 포커스가 모달 밖으로 나가지 않도록 가둡니다
    if (e.key === 'Tab') {
      const items = [...dialog.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent);
      if (!items.length) return;
      const [first, last] = [items[0], items[items.length - 1]];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* ── 제출 ─────────────────────────────────────────── */
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const required = [...form.querySelectorAll('input[required]')].filter((el) => el.type !== 'radio');
    let firstInvalid = null;

    required.forEach((input) => {
      const valid = input.type === 'checkbox' ? input.checked : input.checkValidity();
      if (valid) {
        clearError(input);
      } else {
        if (input.type !== 'checkbox') showError(input);
        firstInvalid = firstInvalid || input;
      }
    });

    const agree = form.querySelector('input[name="agree"]');
    const agreeError = form.querySelector('[data-error-agree]');
    agreeError.textContent = agree.checked ? '' : '개인정보 수집·이용에 동의해 주세요.';

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // 실제 서비스에서는 이 지점에서 서버로 전송합니다 (fetch 등)
    const model = selectedModel();
    const name = form.querySelector('#name').value.trim();
    const summary = `${name} 님, ${model.nextElementSibling.querySelector('.pick__name').textContent} ` +
      `${qtyInput.value}대 (${form.querySelector('input[name="color"]:checked').value}) 신청이 접수되었습니다. ` +
      `입력하신 연락처로 1영업일 이내에 연락드리겠습니다.`;

    modal.querySelector('[data-done-summary]').textContent = summary;
    form.hidden = true;
    done.hidden = false;
    done.querySelector('button').focus();
  });

  updateTotal();
}

/* --------------------------------------------------------------------------
   02. 이미지 슬롯
   images/ 에 파일이 아직 없으면 .is-empty 를 붙여 안내 문구를 노출합니다.
   실제 이미지를 넣으면 별도 수정 없이 자동으로 사진이 표시됩니다.
   -------------------------------------------------------------------------- */
function initImageSlots() {
  document.querySelectorAll('.img-slot').forEach((slot) => {
    const img = slot.querySelector('img');
    if (!img) return;

    const markEmpty = () => slot.classList.add('is-empty');
    const markFilled = () => slot.classList.remove('is-empty');

    if (img.complete) {
      img.naturalWidth === 0 ? markEmpty() : markFilled();
    } else {
      img.addEventListener('load', markFilled);
      img.addEventListener('error', markEmpty);
    }
  });
}

/* --------------------------------------------------------------------------
   03. 스크롤 등장 애니메이션
   -------------------------------------------------------------------------- */
function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  // 모션 최소화 설정이면 즉시 노출
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        // 같은 화면에 들어온 요소끼리 살짝 시차를 둡니다
        entry.target.style.transitionDelay = `${Math.min(i, 5) * 80}ms`;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  targets.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   초기화 — 공통 컴포넌트(헤더/푸터)가 삽입된 뒤 실행
   -------------------------------------------------------------------------- */
function init() {
  initHeader();
  initNav();
  initOrderModal();
  initImageSlots();
  initReveal();
}

// components.js 가 먼저 끝난 경우(캐시·defer 등)에도 안전하게 실행
if (window.componentsReady) {
  init();
} else {
  document.addEventListener('components:ready', init);
}
