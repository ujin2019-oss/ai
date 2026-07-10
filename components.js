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
  cta: { label: '구매하기', href: '#offer' },

  nav: [
    { label: '신상품', href: '#hero' },
    { label: '핵심 혜택', href: '#features' },
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
          <a class="btn btn--primary" href="${SITE.cta.href}">${SITE.cta.label}</a>
        </div>
      </nav>

      <div class="header__actions">
        <a class="btn btn--primary btn--sm" href="${SITE.cta.href}">${SITE.cta.label}</a>

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
   삽입 실행
   -------------------------------------------------------------------------- */
function mountComponents() {
  const headerSlot = document.getElementById('site-header');
  const footerSlot = document.getElementById('site-footer');

  if (headerSlot) headerSlot.outerHTML = renderHeader();
  if (footerSlot) footerSlot.outerHTML = renderFooter();

  // 헤더/푸터가 DOM에 올라온 뒤 인터랙션을 초기화하도록 알림
  window.componentsReady = true;
  document.dispatchEvent(new CustomEvent('components:ready'));
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountComponents);
} else {
  mountComponents();
}
