/* ==========================================================================
   components.js — 공통 요소(헤더 / 푸터)
   페이지가 늘어나도 이 파일만 수정하면 모든 페이지에 반영됩니다.
   사용법: 각 페이지에 <div id="site-header"></div>, <div id="site-footer"></div>
          를 두고 이 파일을 불러오면 자동으로 삽입됩니다.
   ========================================================================== */

/* --------------------------------------------------------------------------
   사이트 공통 데이터 — 메뉴, 연락처, 링크는 여기서 수정하세요
   -------------------------------------------------------------------------- */
const SITE = {
  brand: 'HIERO',
  tagline: '클래식의 가치를 담아, 당신의 일상을 특별하게.',
  cta: { label: '구매하기' },

  /* 주문서에 노출되는 제품 목록 — 가격 수정은 여기서 */
  products: [
    { id: 'A', name: 'HIERO CLASSIC A', tagline: '클래식의 기준', price: 1690000 },
    { id: 'B', name: 'HIERO CLASSIC B', tagline: '도심을 위한 선택', price: 1890000 },
    { id: 'C', name: 'HIERO CLASSIC C', tagline: '자유로운 모험', price: 2090000 },
    { id: 'D', name: 'HIERO CLASSIC D', tagline: '프리미엄 퍼포먼스', price: 2390000 },
  ],

  colors: ['매트 블랙', '아이보리', '다크 그린'],

  nav: [
    { label: '신상품', href: '#hero' },
    { label: '제품 혜택', href: '#features' },
    { label: '제품 소개', href: '#products' },
    { label: '문의하기', href: '#footer' },
  ],

  footerColumns: [
    {
      title: '고객센터',
      items: [
        { text: '02-1234-5678' },
        { text: '평일 09:00 - 18:00' },
        { text: '(주말 및 공휴일 휴무)' },
      ],
    },
    {
      title: '서비스',
      items: [
        { text: '배송 안내', href: '#' },
        { text: '교환/반품 안내', href: '#' },
        { text: '자주 묻는 질문', href: '#' },
      ],
    },
    {
      title: '회사 정보',
      items: [
        { text: '회사 소개', href: '#' },
        { text: '이용 약관', href: '#' },
        { text: '개인정보처리방침', href: '#' },
      ],
    },
  ],

  sns: [
    { name: 'Instagram', href: '#', icon: 'instagram' },
    { name: 'YouTube', href: '#', icon: 'youtube' },
    { name: 'Kakao', href: '#', icon: 'chat' },
  ],

  copyright: '© 2026 HIERO. All rights reserved.',
};

/* --------------------------------------------------------------------------
   SNS 아이콘 (inline SVG — 별도 이미지 불필요)
   -------------------------------------------------------------------------- */
const SNS_ICONS = {
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none"/>`,
  youtube: `<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" stroke="none"/>`,
  chat: `<path d="M12 4.5c-4.7 0-8.5 2.9-8.5 6.5 0 2.2 1.4 4.1 3.6 5.3l-.9 3.2 3.6-2a11 11 0 0 0 2.2.2c4.7 0 8.5-2.9 8.5-6.7S16.7 4.5 12 4.5z"/>`,
};

/* --------------------------------------------------------------------------
   헤더 마크업
   -------------------------------------------------------------------------- */
function renderHeader() {
  const navItems = SITE.nav
    .map(
      (item) =>
        `<li class="gnb__item"><a class="gnb__link" href="${item.href}">${item.label}</a></li>`
    )
    .join('');

  return `
  <header class="header" id="header">
    <div class="header__inner container">

      <a class="logo" href="#hero" aria-label="${SITE.brand} 홈">${SITE.brand}</a>

      <nav class="gnb" id="gnb" aria-label="주요 메뉴">
        <ul class="gnb__list">${navItems}</ul>
        <div class="gnb__cta">
          <button class="btn btn--primary" type="button" data-order-open>${SITE.cta.label}</button>
        </div>
      </nav>

      <div class="header__actions">
        <button class="btn btn--primary btn--sm" type="button" data-order-open>${SITE.cta.label}</button>

        <button class="nav-toggle" id="navToggle" type="button"
                aria-label="메뉴 열기" aria-expanded="false" aria-controls="gnb">
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
          <span class="nav-toggle__bar"></span>
        </button>
      </div>

    </div>
  </header>
  <div class="nav-dim" id="navDim" hidden></div>`;
}

/* --------------------------------------------------------------------------
   푸터 마크업
   -------------------------------------------------------------------------- */
function renderFooter() {
  const columns = SITE.footerColumns
    .map((col) => {
      const items = col.items
        .map((item) =>
          item.href
            ? `<li><a href="${item.href}">${item.text}</a></li>`
            : `<li><span>${item.text}</span></li>`
        )
        .join('');
      return `
        <div class="footer__col">
          <h3 class="footer__col-title">${col.title}</h3>
          <ul class="footer__list">${items}</ul>
        </div>`;
    })
    .join('');

  const sns = SITE.sns
    .map(
      (s) => `
      <a class="sns__link" href="${s.href}" aria-label="${s.name}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          ${SNS_ICONS[s.icon] || ''}
        </svg>
      </a>`
    )
    .join('');

  return `
  <footer class="footer" id="footer">
    <div class="container">

      <div class="footer__grid">
        <div class="footer__brand">
          <p class="logo logo--light">${SITE.brand}</p>
          <p class="footer__tagline">${SITE.tagline}</p>
          <div class="sns">${sns}</div>
        </div>
        ${columns}
      </div>

      <div class="footer__bottom">
        <p class="footer__copy">${SITE.copyright}</p>
      </div>

    </div>
  </footer>`;
}

/* --------------------------------------------------------------------------
   주문서 모달 마크업
   -------------------------------------------------------------------------- */
const won = (n) => `₩ ${n.toLocaleString('ko-KR')}`;

function renderOrderModal() {
  const models = SITE.products
    .map(
      (p, i) => `
      <label class="pick">
        <input type="radio" name="model" value="${p.id}" data-price="${p.price}" ${i === 0 ? 'checked' : ''} required>
        <span class="pick__body">
          <span class="pick__name">${p.name}</span>
          <span class="pick__tagline">${p.tagline}</span>
          <span class="pick__price">${won(p.price)}</span>
        </span>
      </label>`
    )
    .join('');

  const colors = SITE.colors
    .map(
      (c, i) => `
      <label class="chip">
        <input type="radio" name="color" value="${c}" ${i === 0 ? 'checked' : ''} required>
        <span>${c}</span>
      </label>`
    )
    .join('');

  return `
  <div class="modal" id="orderModal" hidden>
    <div class="modal__backdrop" data-order-close></div>

    <div class="modal__dialog" role="dialog" aria-modal="true" aria-labelledby="orderTitle">

      <button class="modal__close" type="button" data-order-close aria-label="주문서 닫기">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      </button>

      <header class="modal__head">
        <p class="modal__eyebrow">HIERO CLASSIC</p>
        <h2 class="modal__title" id="orderTitle">주문서</h2>
        <p class="modal__desc">
          아래 내용을 남겨주시면 담당자가 1영업일 이내에 연락드립니다.<br>
          결제는 상담 후 진행되며, 이 단계에서는 비용이 청구되지 않습니다.
        </p>
      </header>

      <form class="order" id="orderForm" novalidate>

        <!-- 01. 제품 선택 -->
        <fieldset class="order__group">
          <legend class="order__legend"><span class="order__step">01</span> 제품 선택</legend>
          <div class="order__picks">${models}</div>
        </fieldset>

        <!-- 02. 옵션 -->
        <fieldset class="order__group">
          <legend class="order__legend"><span class="order__step">02</span> 옵션</legend>

          <div class="field">
            <span class="field__label">색상</span>
            <div class="chips">${colors}</div>
          </div>

          <div class="field field--inline">
            <label class="field__label" for="qty">수량</label>
            <div class="stepper">
              <button class="stepper__btn" type="button" data-qty="-1" aria-label="수량 줄이기">−</button>
              <input class="stepper__input" id="qty" name="qty" type="number" value="1" min="1" max="9" inputmode="numeric">
              <button class="stepper__btn" type="button" data-qty="1" aria-label="수량 늘리기">+</button>
            </div>
          </div>
        </fieldset>

        <!-- 03. 주문자 정보 -->
        <fieldset class="order__group">
          <legend class="order__legend"><span class="order__step">03</span> 주문자 정보</legend>

          <div class="order__row">
            <div class="field">
              <label class="field__label" for="name">이름 <em>*</em></label>
              <input class="input" id="name" name="name" type="text" autocomplete="name" required>
              <p class="field__error" data-error></p>
            </div>
            <div class="field">
              <label class="field__label" for="phone">연락처 <em>*</em></label>
              <input class="input" id="phone" name="phone" type="tel" placeholder="010-1234-5678"
                     autocomplete="tel" pattern="[0-9\\-]{9,13}" required>
              <p class="field__error" data-error></p>
            </div>
          </div>

          <div class="field">
            <label class="field__label" for="email">이메일 <em>*</em></label>
            <input class="input" id="email" name="email" type="email" autocomplete="email" required>
            <p class="field__error" data-error></p>
          </div>

          <div class="field">
            <label class="field__label" for="address">배송지</label>
            <input class="input" id="address" name="address" type="text"
                   placeholder="상담 시 확인할 수 있습니다" autocomplete="street-address">
          </div>

          <div class="field">
            <label class="field__label" for="memo">요청 사항</label>
            <textarea class="input input--area" id="memo" name="memo" rows="3"
                      placeholder="시승 희망일, 색상 문의 등 자유롭게 남겨주세요"></textarea>
          </div>
        </fieldset>

        <!-- 합계 -->
        <div class="order__total">
          <span class="order__total-label">예상 결제 금액</span>
          <strong class="order__total-value" data-total>${won(SITE.products[0].price)}</strong>
        </div>

        <label class="agree">
          <input type="checkbox" name="agree" required>
          <span>개인정보 수집·이용에 동의합니다. 수집 항목은 이름·연락처·이메일이며, 상담 완료 후 3개월간 보관합니다.</span>
        </label>
        <p class="field__error" data-error-agree></p>

        <button class="btn btn--primary btn--block" type="submit">주문 상담 신청</button>
      </form>

      <!-- 제출 완료 화면 -->
      <div class="order-done" id="orderDone" hidden>
        <span class="order-done__mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="24" cy="24" r="21"/>
            <path d="M15 24.5l6.5 6.5L34 18"/>
          </svg>
        </span>
        <h3 class="order-done__title">신청이 접수되었습니다</h3>
        <p class="order-done__desc" data-done-summary></p>
        <button class="btn btn--primary" type="button" data-order-close>확인</button>
      </div>

    </div>
  </div>`;
}

/* --------------------------------------------------------------------------
   삽입 실행
   -------------------------------------------------------------------------- */
function mountComponents() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) headerSlot.outerHTML = renderHeader();
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  document.body.insertAdjacentHTML('beforeend', renderOrderModal());

  // 헤더/푸터가 DOM에 올라온 뒤 인터랙션을 초기화하도록 알림
  window.componentsReady = true;
  document.dispatchEvent(new CustomEvent('components:ready'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountComponents);
} else {
  mountComponents();
}
