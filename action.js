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

  // 메뉴 클릭 시 닫기
  gnb.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));

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
  initImageSlots();
  initReveal();
}

// components.js 가 먼저 끝난 경우(캐시·defer 등)에도 안전하게 실행
if (window.componentsReady) {
  init();
} else {
  document.addEventListener('components:ready', init);
}
