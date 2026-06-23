(function(){
  if (window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__) return;
  window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__ = true;

  var config = window.YD_DANBAEK_REVIEW_WIDGET_CONFIG || {};
  var feedUrl = config.feedUrl || 'https://2019yundiet-cloud.github.io/yundiet-review-widget-preview/feeds/danbaekbap-review-feed.json';
  var placementVariant = normalizeVariant(config.variant || queryValue('yd_review_variant') || queryValue('review_variant') || 'a2d');
  if (location.href.indexOf('/admin') !== -1 || location.href.indexOf('/_/') !== -1) return;

  function isProductPage(){
    return document.body.classList.contains('shop_view') || location.pathname.indexOf('/shop_view') !== -1;
  }
  if (!isProductPage()) return;

  function initialNativeTabKind(){
    var hash = String(location.hash || '').toLowerCase();
    if (hash.indexOf('review') !== -1) return 'review';
    if (hash.indexOf('qna') !== -1) return 'qna';
    return window.__YD_LALA_ACTIVE_TAB__ || 'detail';
  }
  var activeNativeTab = initialNativeTabKind();
  function syncNativeTabAttribute(kind){
    activeNativeTab = kind || window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || 'detail';
    window.__YD_LALA_ACTIVE_TAB__ = activeNativeTab;
    if (document.documentElement) document.documentElement.setAttribute('data-yd-lala-active-tab', activeNativeTab);
    if (document.body) document.body.setAttribute('data-yd-lala-active-tab', activeNativeTab);
  }
  function injectPreflightStyle(){
    var style = document.getElementById('yd-lala-preflight-style');
    if (style && style.getAttribute('data-yd-lala-preflight-version') === 'green-stable-v1') return;
    if (!style) {
      style = document.createElement('style');
      style.id = 'yd-lala-preflight-style';
    }
    style.setAttribute('data-yd-lala-preflight-version', 'green-stable-v1');
    style.textContent = [
      'html[data-yd-lala-active-tab="detail"] .detail_review_wrap,html[data-yd-lala-active-tab="detail"] .detail_review_wrap_mobile,html[data-yd-lala-active-tab="detail"] .detail_qna_wrap,html[data-yd-lala-active-tab="detail"] .detail_qna_wrap_mobile{display:none!important}',
      'html[data-yd-lala-active-tab="review"] .detail_detail_wrap,html[data-yd-lala-active-tab="review"] .detail_detail_wrap_mobile,html[data-yd-lala-active-tab="review"] .detail_qna_wrap,html[data-yd-lala-active-tab="review"] .detail_qna_wrap_mobile{display:none!important}',
      'html[data-yd-lala-active-tab="qna"] .detail_detail_wrap,html[data-yd-lala-active-tab="qna"] .detail_detail_wrap_mobile,html[data-yd-lala-active-tab="qna"] .detail_review_wrap,html[data-yd-lala-active-tab="qna"] .detail_review_wrap_mobile{display:none!important}',
      'body[data-yd-lala-active-tab="detail"] .detail_review_wrap,body[data-yd-lala-active-tab="detail"] .detail_review_wrap_mobile,body[data-yd-lala-active-tab="detail"] .detail_qna_wrap,body[data-yd-lala-active-tab="detail"] .detail_qna_wrap_mobile{display:none!important}',
      'body[data-yd-lala-active-tab="review"] .detail_detail_wrap,body[data-yd-lala-active-tab="review"] .detail_detail_wrap_mobile,body[data-yd-lala-active-tab="review"] .detail_qna_wrap,body[data-yd-lala-active-tab="review"] .detail_qna_wrap_mobile{display:none!important}',
      'body[data-yd-lala-active-tab="qna"] .detail_detail_wrap,body[data-yd-lala-active-tab="qna"] .detail_detail_wrap_mobile,body[data-yd-lala-active-tab="qna"] .detail_review_wrap,body[data-yd-lala-active-tab="qna"] .detail_review_wrap_mobile{display:none!important}',
      '._prod_detail_tab_fixed a._detail,._prod_detail_tab_fixed a._review,._prod_detail_tab_fixed a._qna,#fixed_tab a._detail,#fixed_tab a._review,#fixed_tab a._qna,#fixed_tab_mobile a._detail,#fixed_tab_mobile a._review,#fixed_tab_mobile a._qna{border:0!important;box-shadow:none!important;background:#fff!important;color:#191d24!important;font-weight:500!important;text-decoration:none!important;transition:none!important;animation:none!important}',
      'html[data-yd-lala-active-tab="detail"] ._prod_detail_tab_fixed a._detail,html[data-yd-lala-active-tab="detail"] #fixed_tab a._detail,html[data-yd-lala-active-tab="detail"] #fixed_tab_mobile a._detail,body[data-yd-lala-active-tab="detail"] ._prod_detail_tab_fixed a._detail,body[data-yd-lala-active-tab="detail"] #fixed_tab a._detail,body[data-yd-lala-active-tab="detail"] #fixed_tab_mobile a._detail{font-weight:800!important;color:#2c5d42!important}',
      'html[data-yd-lala-active-tab="review"] ._prod_detail_tab_fixed a._review,html[data-yd-lala-active-tab="review"] #fixed_tab a._review,html[data-yd-lala-active-tab="review"] #fixed_tab_mobile a._review,body[data-yd-lala-active-tab="review"] ._prod_detail_tab_fixed a._review,body[data-yd-lala-active-tab="review"] #fixed_tab a._review,body[data-yd-lala-active-tab="review"] #fixed_tab_mobile a._review{font-weight:800!important;color:#2c5d42!important}',
      'html[data-yd-lala-active-tab="qna"] ._prod_detail_tab_fixed a._qna,html[data-yd-lala-active-tab="qna"] #fixed_tab a._qna,html[data-yd-lala-active-tab="qna"] #fixed_tab_mobile a._qna,body[data-yd-lala-active-tab="qna"] ._prod_detail_tab_fixed a._qna,body[data-yd-lala-active-tab="qna"] #fixed_tab a._qna,body[data-yd-lala-active-tab="qna"] #fixed_tab_mobile a._qna{font-weight:800!important;color:#2c5d42!important}',
      'html[data-yd-lala-active-tab="detail"] body li.prod_tab_3 a._review,html[data-yd-lala-active-tab="detail"] body li.prod_tab_3 a._qna,html[data-yd-lala-active-tab="review"] body li.prod_tab_3 a._detail,html[data-yd-lala-active-tab="review"] body li.prod_tab_3 a._qna,html[data-yd-lala-active-tab="qna"] body li.prod_tab_3 a._detail,html[data-yd-lala-active-tab="qna"] body li.prod_tab_3 a._review{font-weight:500!important;color:#191d24!important}',
      'html[data-yd-lala-active-tab="detail"] body li.prod_tab_3 a._detail,html[data-yd-lala-active-tab="review"] body li.prod_tab_3 a._review,html[data-yd-lala-active-tab="qna"] body li.prod_tab_3 a._qna{font-weight:800!important;color:#2c5d42!important}',
      '._prod_detail_tab_fixed li.prod_tab_3,#fixed_tab li.prod_tab_3,#fixed_tab_mobile li.prod_tab_3{min-width:33.333%!important;text-align:center!important}',
      '._prod_detail_tab_fixed a._detail,._prod_detail_tab_fixed a._review,._prod_detail_tab_fixed a._qna,#fixed_tab a._detail,#fixed_tab a._review,#fixed_tab a._qna,#fixed_tab_mobile a._detail,#fixed_tab_mobile a._review,#fixed_tab_mobile a._qna{display:inline-flex!important;align-items:center!important;justify-content:center!important;min-width:66px!important;white-space:nowrap!important;transition:none!important;animation:none!important}'
    ].join('\n');
    if (!style.parentNode) (document.head || document.documentElement).appendChild(style);
  }
  syncNativeTabAttribute(activeNativeTab);
  injectPreflightStyle();

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }
  function queryValue(key){
    var match = new RegExp('[?&]'+key+'=([^&]*)').exec(location.search);
    return match ? decodeURIComponent(match[1].replace(/\+/g, ' ')) : '';
  }
  function normalizeVariant(value){
    value = String(value || '').toLowerCase();
    if (value === 'control' || value === 'base' || value === 'baseline') return 'control';
    if (value === 'a2' || value === 'top' || value === 'prime') return 'a2';
    if (value === 'd' || value === 'bottom' || value === 'cta') return 'd';
    if (value === 'c01' || value === 'fastproof' || value === 'quickproof') return 'c01';
    if (value === 'c02' || value === 'photo' || value === 'photoproof') return 'c02';
    if (value === 'c03' || value === 'objection' || value === 'worry') return 'c03';
    if (value === 'c04' || value === 'routine' || value === 'lunch') return 'c04';
    if (value === 'c05' || value === 'reorder' || value === 'repeat') return 'c05';
    if (value === 'c06' || value === 'nutrition' || value === 'taste') return 'c06';
    if (value === 'c07' || value === 'delivery' || value === 'storage') return 'c07';
    if (value === 'c08' || value === 'keyword' || value === 'finder') return 'c08';
    if (value === 'c09' || value === 'mobile' || value === 'sticky') return 'c09';
    if (value === 'c10' || value === 'story' || value === 'longform') return 'c10';
    return 'a2d';
  }
  function variantHas(part){
    var concept = currentConcept();
    if (part === 'a2') return !!concept.prime;
    if (part === 'd') return !!concept.bottom || /^c(?:0[1-9]|10)$/.test(concept.id || '');
    return placementVariant === part;
  }
  function currentConcept(){
    var concepts = {
      control: {
        id: 'control',
        prime: false,
        bottom: false,
        kicker: '윤식단 단백밥 실제 구매평',
        headline: '구매 전 가장 많이 확인하는 리뷰 포인트',
        sub: '원본 구매평을 길게 훑기 전에 포만감, 맛과 영양, 직장 점심 루틴, 재구매 신호를 먼저 확인할 수 있도록 실제 공개 리뷰를 재배치했습니다.',
        topText: '실제 구매평 {count}개에서 확인한 단백밥 핵심 포인트',
        topButton: '구매평 핵심 보기',
        primeText: '실제 구매평 {count}개 · 핵심 보기',
        mobileLabel: '리뷰보기',
        tags: ['포만감','맛/영양','직장 점심','재구매']
      },
      a2: {
        id: 'a2',
        prime: true,
        bottom: false,
        kicker: '윤식단 단백밥 실제 구매평',
        headline: '구매 전 가장 많이 확인하는 리뷰 포인트',
        sub: '상품명 바로 아래에서 리뷰 신뢰를 먼저 확인하고, 아래 리뷰 영역에서 포만감과 재구매 신호를 자세히 볼 수 있습니다.',
        topText: '실제 구매평 {count}개에서 확인한 단백밥 핵심 포인트',
        topButton: '구매평 핵심 보기',
        primeText: '실제 구매평 {count}개 · 핵심 보기',
        mobileLabel: '리뷰보기',
        tags: ['상품명 아래 신뢰','포만감','맛/영양','재구매']
      },
      d: {
        id: 'd',
        prime: false,
        bottom: true,
        kicker: '윤식단 단백밥 실제 구매평',
        headline: '구매 버튼 옆에서 바로 확인하는 리뷰 핵심',
        sub: '모바일 하단 버튼에서 리뷰 영역으로 바로 이동해 구매 직전 망설임을 줄이는 구성입니다.',
        topText: '구매 직전 확인할 실제 구매평 {count}개 요약',
        topButton: '리뷰로 이동',
        primeText: '실제 구매평 {count}개 · 핵심 보기',
        mobileLabel: '리뷰보기',
        tags: ['모바일 CTA','구매 직전','포토 리뷰','재구매']
      },
      a2d: {
        id: 'a2d',
        prime: true,
        bottom: true,
        kicker: '윤식단 단백밥 실제 구매평',
        headline: '상단 신뢰와 구매 직전 리뷰 이동을 함께 강화',
        sub: '상품명 아래에서는 리뷰 신뢰를 먼저 만들고, 모바일 구매 버튼에서는 리뷰 확인 행동으로 자연스럽게 이어지게 만든 추천안입니다.',
        topText: '실제 구매평 {count}개에서 확인한 단백밥 핵심 포인트',
        topButton: '구매평 핵심 보기',
        primeText: '실제 구매평 {count}개 · 핵심 보기',
        mobileLabel: '리뷰보기',
        tags: ['상단 신뢰','모바일 CTA','포만감','재구매']
      },
      c01: {
        id: 'c01',
        prime: true,
        bottom: false,
        kicker: '시안 01 · 빠른 신뢰',
        headline: '3초 안에 보는 구매 확신 지표',
        sub: '평점, 구매평 수, 최신 포토 리뷰를 상품명 아래와 리뷰 첫 화면에서 가장 빠르게 읽히게 만든 안입니다.',
        topText: '평점 {rating} · 구매평 {count}개 · 최신 포토 리뷰',
        topButton: '3초 요약',
        primeText: '3초 요약 · {rating} / {count}개',
        mobileLabel: '리뷰보기',
        tags: ['빠른 판단','21,085개','4.9 평점','최신 리뷰']
      },
      c02: {
        id: 'c02',
        prime: true,
        bottom: false,
        kicker: '시안 02 · 포토 우선',
        headline: '실제 사진으로 먼저 확인하는 단백밥',
        sub: '글보다 사진을 먼저 보는 고객을 위해 실제 포토 구매평과 상품 이미지를 리뷰 상단에 크게 배치합니다.',
        topText: '포토 구매평 먼저 보기 · 총 {count}개 리뷰',
        topButton: '사진 보기',
        primeText: '포토 리뷰 먼저 보기 · {count}개',
        mobileLabel: '포토보기',
        tags: ['실제 사진','도시락 구성','포토 구매평','상품 확인']
      },
      c03: {
        id: 'c03',
        prime: true,
        bottom: true,
        kicker: '시안 03 · 망설임 해소',
        headline: '구매 전 걱정을 리뷰로 바로 풀어드립니다',
        sub: '양이 적을까, 맛이 질릴까, 배송은 괜찮을까 같은 구매 전 질문을 리뷰 근거로 답하는 안입니다.',
        topText: '걱정별 실제 리뷰 답변 · {count}개 기반',
        topButton: '걱정 풀기',
        primeText: '구매 전 걱정 해결 · {count}개 리뷰',
        mobileLabel: '걱정해소',
        tags: ['양이 적을까?','맛이 질릴까?','배송 괜찮을까?','재구매할까?']
      },
      c04: {
        id: 'c04',
        prime: true,
        bottom: false,
        kicker: '시안 04 · 직장 점심 루틴',
        headline: '사무실 점심 루틴에 맞춘 리뷰 흐름',
        sub: '직장 점심, 냉동실 비축, 저녁 대체처럼 실제 이용 상황을 시간순으로 보여주는 안입니다.',
        topText: '직장 점심 리뷰 흐름 · {count}개 구매평',
        topButton: '루틴 보기',
        primeText: '직장 점심 리뷰 · 포만감 확인',
        mobileLabel: '루틴보기',
        tags: ['사무실 점심','냉동실 비축','저녁 대체','간편식']
      },
      c05: {
        id: 'c05',
        prime: true,
        bottom: true,
        kicker: '시안 05 · 재구매 증거',
        headline: '돌고 돌아 다시 산다는 리뷰를 전면에',
        sub: '신규 고객에게 가장 강한 사회적 증거인 재구매, 추가구매, 계속 시켜먹겠다는 신호를 강조합니다.',
        topText: '재구매 신호 먼저 보기 · {count}개 구매평',
        topButton: '재구매 보기',
        primeText: '재구매 리뷰 먼저 보기',
        mobileLabel: '재구매',
        tags: ['두번째 구매','계속 시켜먹어요','추가구매','냉동실 비축']
      },
      c06: {
        id: 'c06',
        prime: true,
        bottom: false,
        kicker: '시안 06 · 맛과 영양 균형',
        headline: '다이어트식도 맛있어야 오래 갑니다',
        sub: '맛, 영양, 포만감의 균형을 분리해서 보여주며 단백질 도시락 구매 이유를 선명하게 만듭니다.',
        topText: '맛·영양·포만감 리뷰 균형 · {count}개',
        topButton: '균형 보기',
        primeText: '맛/영양 리뷰 · {rating} 평점',
        mobileLabel: '맛보기',
        tags: ['맛','영양','포만감','단백질']
      },
      c07: {
        id: 'c07',
        prime: false,
        bottom: true,
        kicker: '시안 07 · 배송/보관 안심',
        headline: '냉동 보관과 배송 걱정을 먼저 줄이는 리뷰',
        sub: '식품 구매에서 생기는 배송, 보관, 냉동실 비축 걱정을 실제 리뷰 흐름으로 먼저 확인하게 합니다.',
        topText: '배송·보관 안심 리뷰 · {count}개 기반',
        topButton: '안심 보기',
        primeText: '배송/보관 리뷰 확인',
        mobileLabel: '안심리뷰',
        tags: ['배송','냉동 보관','비축','간편 조리']
      },
      c08: {
        id: 'c08',
        prime: true,
        bottom: false,
        kicker: '시안 08 · 키워드 탐색',
        headline: '내가 궁금한 리뷰만 바로 골라보기',
        sub: '전체 리뷰를 읽기 전에 포만감, 맛/영양, 직장 점심, 배송/보관 키워드를 빠르게 전환해 보는 안입니다.',
        topText: '키워드별 리뷰 바로가기 · {count}개',
        topButton: '키워드 보기',
        primeText: '궁금한 키워드로 리뷰 보기',
        mobileLabel: '키워드',
        tags: ['포만감','맛/영양','직장/재구매','배송/보관']
      },
      c09: {
        id: 'c09',
        prime: false,
        bottom: true,
        kicker: '시안 09 · 모바일 구매 직전 강화',
        headline: '구매하기 직전, 리뷰 확인을 한 번 더 열어주는 안',
        sub: '모바일 하단 CTA를 리뷰 확인과 구매 행동으로 분리해 구매 직전 이탈을 줄이는 방향입니다.',
        topText: '모바일 구매 직전 리뷰 확인 · {count}개',
        topButton: '하단 CTA 확인',
        primeText: '모바일 리뷰 CTA',
        mobileLabel: '리뷰보기',
        tags: ['모바일 전환','구매 직전','리뷰 확인','CTA']
      },
      c10: {
        id: 'c10',
        prime: true,
        bottom: true,
        kicker: '시안 10 · 리뷰 스토리텔링',
        headline: '한 고객의 긴 구매평으로 시작하는 설득',
        sub: '짧은 요약보다 실제 긴 리뷰의 맥락을 먼저 보여주며 포만감과 재구매 이유를 이야기처럼 전달합니다.',
        topText: '대표 장문 리뷰로 먼저 확인 · {count}개 구매평',
        topButton: '스토리 보기',
        primeText: '대표 장문 리뷰 먼저 보기',
        mobileLabel: '스토리',
        tags: ['장문 리뷰','포만감','맛 만족','재구매 고려']
      }
    };
    return concepts[placementVariant] || concepts.a2d;
  }
  function escapeHtml(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }
  function text(el){
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g,' ').trim();
  }
  function visible(el){
    if (!el) return false;
    var r = el.getBoundingClientRect();
    var cs = getComputedStyle(el);
    return r.width > 1 && r.height > 1 && cs.display !== 'none' && cs.visibility !== 'hidden';
  }
  function waitFor(fn, cb, tries){
    tries = tries || 0;
    var value = fn();
    if (value) return cb(value);
    if (tries > 240) return;
    setTimeout(function(){ waitFor(fn, cb, tries + 1); }, 50);
  }
  function formatCount(n){
    return Number(n || 0).toLocaleString('ko-KR');
  }
  function conceptText(template, feed){
    var product = feed.product || {};
    return String(template || '')
      .replace(/\{count\}/g, formatCount(product.review_count))
      .replace(/\{rating\}/g, product.rating || '');
  }
  function tagHtml(tags){
    return (tags || []).map(function(tag){
      return '<span>'+escapeHtml(tag)+'</span>';
    }).join('');
  }
  function topicLabel(topic){
    return {
      satiety: '포만감',
      taste: '맛/영양',
      routine: '직장·재구매',
      delivery: '보관·배송'
    }[topic] || '구매평';
  }
  function bestReviewTarget(){
    var selectors = '#first_review, .detail_review_wrap, ._detail_review_wrap, ._review_wrap, .review-box';
    var candidates = Array.prototype.slice.call(document.querySelectorAll(selectors));
    candidates = candidates.map(function(el){
      var r = el.getBoundingClientRect();
      return {el: el, w: r.width, h: r.height, area: Math.max(0, r.width) * Math.max(0, r.height)};
    }).filter(function(o){
      var cs = getComputedStyle(o.el);
      return o.w > 300 && o.h > 80 && cs.display !== 'none' && cs.visibility !== 'hidden';
    });
    candidates.sort(function(a,b){ return b.area - a.area; });
    return candidates.length ? candidates[0].el : null;
  }
  function isMobileReviewViewport(){
    return window.matchMedia && window.matchMedia('(max-width: 640px)').matches;
  }
  function mobileReviewSystemAnchor(){
    return null;
  }
  function nativeTabPaneSelectors(kind){
    return {
      detail: '.detail_detail_wrap, .detail_detail_wrap_mobile',
      review: '.detail_review_wrap, .detail_review_wrap_mobile',
      qna: '.detail_qna_wrap, .detail_qna_wrap_mobile'
    }[kind] || '';
  }
  function nativeTabPanes(kind){
    var selector = nativeTabPaneSelectors(kind);
    return selector ? Array.prototype.slice.call(document.querySelectorAll(selector)) : [];
  }
  var lastNativeReviewCountLabel = '';
  function rememberNativeReviewCount(value){
    var number = Number(String(value || '').replace(/,/g, '')) || 0;
    if (number > 0) lastNativeReviewCountLabel = formatCount(number);
    return lastNativeReviewCountLabel;
  }
  function currentNativeReviewCountLabel(feed){
    var rawCount = Number(feed && feed.product && feed.product.review_count) || nativeCountFromPage();
    return rememberNativeReviewCount(rawCount) || lastNativeReviewCountLabel;
  }
  function syncNativeReviewTabLabel(){
    var label = lastNativeReviewCountLabel ? '리뷰 '+lastNativeReviewCountLabel : '리뷰';
    Array.prototype.forEach.call(document.querySelectorAll('a._review'), function(anchor){
      if (!anchor.closest('#yd-review-inline-system') && cleanReviewText(text(anchor)) !== label) {
        anchor.textContent = label;
      }
    });
  }
  function markNativeTabsReady(){
    if (document.documentElement) document.documentElement.setAttribute('data-yd-lala-preboot-ready', '1');
    if (document.body) document.body.setAttribute('data-yd-lala-preboot-ready', '1');
  }
  function syncNativeTabActiveClasses(){
    Array.prototype.forEach.call(document.querySelectorAll('a._detail, a._review, a._qna'), function(anchor){
      var tab = anchor.classList.contains('_review') ? 'review' : anchor.classList.contains('_qna') ? 'qna' : 'detail';
      var isActive = tab === activeNativeTab;
      anchor.classList.toggle('active', isActive);
      anchor.classList.toggle('on', isActive);
      anchor.setAttribute('aria-selected', isActive ? 'true' : 'false');
      anchor.style.setProperty('color', isActive ? '#2c5d42' : '#191d24', 'important');
      anchor.style.setProperty('font-weight', isActive ? '800' : '500', 'important');
      anchor.style.setProperty('transition', 'none', 'important');
      anchor.style.setProperty('animation', 'none', 'important');
      anchor.style.setProperty('min-width', '66px', 'important');
      anchor.style.setProperty('white-space', 'nowrap', 'important');
      var holder = anchor.closest && anchor.closest('li.prod_tab_3');
      if (holder) {
        holder.classList.toggle('active', isActive);
        holder.classList.toggle('on', isActive);
        holder.style.setProperty('min-width', '33.333%', 'important');
        holder.style.setProperty('text-align', 'center', 'important');
        holder.style.setProperty('transition', 'none', 'important');
      }
    });
  }
  function nativeTabTarget(kind){
    if (kind === 'review') return document.querySelector('#yd-review-inline-system') || nativeTabPanes('review')[0];
    return nativeTabPanes(kind)[0] || document.querySelector('#yd-review-inline-system');
  }
  function scrollToNativeTab(kind){
    var target = nativeTabTarget(kind);
    if (!target) return;
    var offset = window.matchMedia && window.matchMedia('(max-width: 640px)').matches ? 64 : 58;
    var top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({top: top, behavior:'smooth'});
  }
  function applyNativeTabState(kind, shouldScroll){
    syncNativeTabAttribute(kind || window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || 'detail');
    ['detail','review','qna'].forEach(function(tab){
      nativeTabPanes(tab).forEach(function(pane){
        pane.classList.toggle('yd-tab-pane-hidden', tab !== activeNativeTab);
      });
    });
    syncNativeTabActiveClasses();
    syncNativeReviewTabLabel();
    if (shouldScroll) scrollToNativeTab(activeNativeTab);
  }
  function placeSystemAt(system, parent, before){
    if (!system || !parent) return false;
    if (before === system) return true;
    if (system.parentNode === parent && system.nextSibling === before) return true;
    parent.insertBefore(system, before || null);
    return true;
  }
  function injectStyle(){
    if (document.getElementById('yd-inline-review-style')) return;
    var style = document.createElement('style');
    style.id = 'yd-inline-review-style';
    style.textContent = [
      '#yd-review-top-proof,#yd-review-inline-system,#yd-prime-review-link,.yd-mobile-review-mode{--yd-brand:#2c5d42;--yd-ink:#3d3d3d;--yd-muted:#73776f;--yd-line:rgba(44,93,66,.16);--yd-soft:#f7f7f5;--yd-star:#2c5d42;--yd-badge:#f0f2f1;--yd-green-soft:#d6e6d9;font-family:"Pretendard English",Pretendard,"Apple SD Gothic Neo","Malgun Gothic","Nanum Gothic","Noto Sans",sans-serif;color:var(--yd-ink);letter-spacing:0;box-sizing:border-box}',
      '#yd-review-top-proof *,#yd-review-inline-system *{box-sizing:border-box;letter-spacing:0}',
      '#yd-review-top-proof{margin:18px 0 16px;border:1px solid var(--yd-line);border-left:4px solid var(--yd-brand);background:#fff;border-radius:6px;padding:14px 16px;display:grid;gap:10px}',
      '#yd-review-top-proof .yd-top-row{display:flex;align-items:center;justify-content:space-between;gap:14px}',
      '#yd-review-top-proof .yd-score{display:flex;align-items:center;gap:9px;min-width:0;flex-wrap:wrap}',
      '#yd-review-top-proof .yd-stars{color:var(--yd-star);font-size:14px;font-weight:900;line-height:1}',
      '#yd-review-top-proof .yd-score strong{font-size:20px;line-height:1;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-top-proof .yd-score span{font-size:13px;color:var(--yd-muted)}',
      '#yd-review-top-proof .yd-jump{border:1px solid rgba(44,93,66,.22);background:var(--yd-brand);color:#fff;border-radius:4px;height:34px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}',
      '#yd-review-top-proof .yd-mini-tags{display:flex;flex-wrap:wrap;gap:6px}',
      '#yd-review-top-proof .yd-mini-tags span{border:1px solid rgba(44,93,66,.12);background:var(--yd-badge);border-radius:10px;padding:4px 7px;font-size:11px;font-weight:700;color:#717680}',
      '#yd-prime-review-link{margin:12px 0 10px;border-top:1px solid rgba(44,93,66,.16);border-bottom:1px solid rgba(44,93,66,.16);background:#fff;padding:10px 0;display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--yd-brand);max-width:520px}',
      '#yd-prime-review-link .yd-prime-main{display:flex;align-items:center;gap:6px;min-width:0;white-space:nowrap;overflow:hidden}',
      '#yd-prime-review-link .yd-stars{color:var(--yd-star);font-weight:900;font-size:13px;line-height:1}',
      '#yd-prime-review-link .yd-prime-score{font-size:16px;font-weight:800;color:var(--yd-brand)}',
      '#yd-prime-review-link .yd-prime-text{font-size:13px;color:#717680;overflow:hidden;text-overflow:ellipsis}',
      '#yd-prime-review-link button{height:32px;border:1px solid var(--yd-brand);border-radius:4px;background:#fff;color:var(--yd-brand);padding:0 10px;font-size:12px;font-weight:800;white-space:nowrap;cursor:pointer}',
      '.yd-mobile-review-mode .btn.defualt-cart{background:#fff!important;border:1px solid rgba(44,93,66,.18)!important;color:var(--yd-brand)!important;font-weight:800!important}',
      '.yd-mobile-review-mode .btn.defualt-cart .yd-mobile-review-score{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:18px;margin-right:5px;border-radius:999px;background:var(--yd-brand);color:#fff;font-size:11px;font-weight:800;vertical-align:1px}',
      '.yd-mobile-review-mode .btn.defualt-cart .yd-mobile-review-label{vertical-align:1px}',
      '#yd-review-inline-system{border-top:2px solid var(--yd-brand);padding:30px 0 38px;margin:10px 0 30px;background:#fff}',
      '#yd-review-inline-system .yd-system-head{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:30px;align-items:stretch;margin-bottom:24px}',
      '#yd-review-inline-system .yd-kicker{margin:0 0 9px;font-size:12px;line-height:1.35;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system h3{margin:0;font-size:26px;line-height:1.32;font-weight:800;color:var(--yd-ink)}',
      '#yd-review-inline-system .yd-sub{margin:10px 0 0;font-size:14px;line-height:1.72;color:#5f645c;max-width:760px}',
      '#yd-review-inline-system .yd-score-panel{border:1px solid rgba(44,93,66,.12);border-radius:6px;background:var(--yd-soft);padding:17px 18px;min-height:150px;display:flex;flex-direction:column;justify-content:center}',
      '#yd-review-inline-system .yd-score-panel .yd-stars{color:var(--yd-star);font-size:17px;font-weight:900;margin-bottom:9px}',
      '#yd-review-inline-system .yd-score-panel strong{display:block;font-size:38px;line-height:1;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-score-panel span{display:block;margin-top:8px;font-size:13px;color:#666b63}',
      '#yd-review-inline-system .yd-source-note{margin:10px 0 0;font-size:11px;line-height:1.5;color:#8a8e87}',
      '#yd-review-inline-system .yd-section-label{margin:0 0 11px;font-size:13px;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-focus-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:18px;margin-bottom:24px}',
      '#yd-review-inline-system .yd-lead-review{border-top:1px solid var(--yd-brand);border-bottom:1px solid rgba(44,93,66,.15);padding:18px 0 17px;display:grid;grid-template-columns:minmax(0,1fr) 132px;gap:18px;align-items:start}',
      '#yd-review-inline-system .yd-lead-review .yd-review-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}',
      '#yd-review-inline-system .yd-stars{color:var(--yd-star);font-weight:900;font-size:14px;line-height:1}',
      '#yd-review-inline-system .yd-badge{display:inline-flex;align-items:center;min-height:22px;border-radius:10px;background:var(--yd-badge);color:#717680;padding:2px 7px;font-size:12px;font-weight:700}',
      '#yd-review-inline-system .yd-topic{display:inline-flex;align-items:center;min-height:22px;border-radius:10px;background:var(--yd-green-soft);color:var(--yd-brand);padding:2px 7px;font-size:12px;font-weight:800}',
      '#yd-review-inline-system .yd-lead-review p{margin:0;font-size:14px;line-height:1.78;color:#373c35}',
      '#yd-review-inline-system .yd-lead-review small{display:block;margin-top:12px;font-size:12px;color:#8a8e87}',
      '#yd-review-inline-system .yd-lead-photo{width:132px;aspect-ratio:1/1;border:1px solid rgba(44,93,66,.12);border-radius:4px;overflow:hidden;background:#f1f2ef}',
      '#yd-review-inline-system .yd-lead-photo img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      '#yd-review-inline-system .yd-proof-card{border:1px solid rgba(44,93,66,.12);border-radius:6px;background:#fff;padding:13px 13px;min-height:104px}',
      '#yd-review-inline-system .yd-proof-card b{display:block;font-size:14px;color:var(--yd-brand);margin-bottom:6px;font-weight:800}',
      '#yd-review-inline-system .yd-proof-card p{margin:0;font-size:12px;line-height:1.58;color:#646960}',
      '#yd-review-inline-system .yd-product-strip{display:grid;grid-template-columns:1.12fr 1fr 1fr;gap:10px;margin:0 0 22px}',
      '#yd-review-inline-system .yd-product-img{height:190px;border:1px solid rgba(44,93,66,.12);border-radius:4px;overflow:hidden;background:#f1f2ef;position:relative}',
      '#yd-review-inline-system .yd-product-img img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-product-img span{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.92);border:1px solid rgba(44,93,66,.1);border-radius:10px;padding:5px 8px;font-size:11px;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-keyword-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}',
      '#yd-review-inline-system .yd-keyword-row button{height:34px;border:1px solid rgba(44,93,66,.2);background:#fff;border-radius:4px;padding:0 12px;color:var(--yd-brand);font-size:12px;font-weight:700;cursor:pointer}',
      '#yd-review-inline-system .yd-keyword-row button.is-active{background:var(--yd-brand);color:#fff;border-color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-review-list{border-top:1px solid var(--yd-brand);margin-bottom:23px}',
      '#yd-review-inline-system .yd-review-card{display:grid;grid-template-columns:146px minmax(0,1fr);gap:16px;border-bottom:1px solid rgba(44,93,66,.15);padding:15px 0;min-height:116px;background:#fff}',
      '#yd-review-inline-system .yd-review-card .yd-review-side{display:flex;flex-direction:column;gap:8px;align-items:flex-start}',
      '#yd-review-inline-system .yd-review-card p{margin:0;font-size:14px;line-height:1.72;color:#343a32;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}',
      '#yd-review-inline-system .yd-review-card small{display:block;margin-top:10px;font-size:12px;color:#8a8e87}',
      '#yd-review-inline-system .yd-photo-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:20px}',
      '#yd-review-inline-system .yd-photo-tile{border-radius:4px;min-height:132px;background:#f1f2ef;border:1px solid rgba(44,93,66,.12);overflow:hidden;position:relative}',
      '#yd-review-inline-system .yd-photo-tile img{width:100%;height:132px;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-photo-tile span{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.9);border-radius:10px;padding:4px 7px;color:#4f554d;font-size:11px;font-weight:700}',
      '#yd-review-inline-system .yd-native-note{display:flex;justify-content:space-between;gap:16px;align-items:center;border:1px solid rgba(44,93,66,.14);background:#fff;border-radius:6px;padding:14px 16px;color:#62675f;font-size:13px;line-height:1.58}',
      '#yd-review-inline-system .yd-native-note b{color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-concept-block{margin:0 0 24px;border-top:1px solid var(--yd-brand);border-bottom:1px solid rgba(44,93,66,.15);padding:18px 0;display:grid;gap:14px}',
      '#yd-review-inline-system .yd-concept-title{margin:0;font-size:16px;line-height:1.45;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-concept-copy{margin:0;font-size:13px;line-height:1.7;color:#5f645c}',
      '#yd-review-inline-system .yd-metric-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
      '#yd-review-inline-system .yd-metric{border:1px solid rgba(44,93,66,.13);border-radius:6px;background:#f8f8f5;padding:13px 12px;min-height:86px}',
      '#yd-review-inline-system .yd-metric b{display:block;font-size:21px;line-height:1.15;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system .yd-metric span{display:block;margin-top:6px;font-size:12px;line-height:1.45;color:#656a62}',
      '#yd-review-inline-system .yd-answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
      '#yd-review-inline-system .yd-answer{border:1px solid rgba(44,93,66,.13);border-radius:6px;background:#fff;padding:13px 13px}',
      '#yd-review-inline-system .yd-answer b{display:block;margin-bottom:6px;font-size:13px;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system .yd-answer p{margin:0;font-size:12px;line-height:1.62;color:#5f645c}',
      '#yd-review-inline-system .yd-photo-led{display:grid;grid-template-columns:1.05fr .95fr;gap:12px;align-items:stretch}',
      '#yd-review-inline-system .yd-photo-led-main{min-height:260px;border:1px solid rgba(44,93,66,.12);border-radius:4px;overflow:hidden;background:#f1f2ef;position:relative}',
      '#yd-review-inline-system .yd-photo-led-main img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-photo-led-main span{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.92);border:1px solid rgba(44,93,66,.1);border-radius:10px;padding:5px 8px;font-size:11px;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-photo-led-side{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
      '#yd-review-inline-system .yd-photo-led-side .yd-photo-tile{min-height:126px;margin:0}',
      '#yd-review-inline-system .yd-photo-led-side .yd-photo-tile img{height:126px}',
      '#yd-review-inline-system .yd-timeline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}',
      '#yd-review-inline-system .yd-step{border-left:3px solid var(--yd-brand);background:#f8f8f5;padding:12px 12px;min-height:94px}',
      '#yd-review-inline-system .yd-step b{display:block;font-size:13px;color:var(--yd-brand);font-weight:800;margin-bottom:6px}',
      '#yd-review-inline-system .yd-step span{display:block;font-size:12px;line-height:1.55;color:#5f645c}',
      '#yd-review-inline-system .yd-quote-focus{display:grid;grid-template-columns:120px minmax(0,1fr);gap:14px;align-items:start}',
      '#yd-review-inline-system .yd-quote-score{border:1px solid rgba(44,93,66,.13);border-radius:6px;background:#f8f8f5;padding:14px 12px;text-align:center;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-quote-score b{display:block;font-size:31px;line-height:1;font-weight:800}',
      '#yd-review-inline-system .yd-quote-score span{display:block;margin-top:7px;font-size:11px;line-height:1.45;color:#636860}',
      '#yd-review-inline-system .yd-quote-focus blockquote{margin:0;font-size:15px;line-height:1.82;color:#343a32}',
      '#yd-review-inline-system .yd-quote-focus small{display:block;margin-top:10px;color:#8a8e87;font-size:12px}',
      '#yd-review-inline-system[data-concept="c01"] .yd-system-head{grid-template-columns:minmax(0,1fr) 210px}',
      '#yd-review-inline-system[data-concept="c02"] .yd-product-strip{display:none}',
      '#yd-review-inline-system[data-concept="c02"] .yd-concept-block{border-top:0;padding-top:0}',
      '#yd-review-inline-system[data-concept="c03"] .yd-proof-grid{display:none}',
      '#yd-review-inline-system[data-concept="c05"] .yd-score-panel{background:#fff;border-color:rgba(255,77,63,.24)}',
      '#yd-review-inline-system[data-concept="c06"] .yd-metric b{font-size:18px}',
      '#yd-review-inline-system[data-concept="c08"] .yd-keyword-row{position:sticky;top:0;z-index:2;background:#fff;padding:8px 0;border-top:1px solid rgba(44,93,66,.1);border-bottom:1px solid rgba(44,93,66,.1)}',
      '#yd-review-inline-system[data-concept="c09"] .yd-concept-block{background:#f8f8f5;border:1px solid rgba(44,93,66,.13);border-left:4px solid var(--yd-brand);border-radius:6px;padding:15px}',
      '#yd-review-inline-system[data-concept="c10"] .yd-lead-review{display:none}',
      '#yd-review-inline-system[data-filter="taste"] .yd-review-card:not([data-topic="taste"]),#yd-review-inline-system[data-filter="delivery"] .yd-review-card:not([data-topic="delivery"]),#yd-review-inline-system[data-filter="routine"] .yd-review-card:not([data-topic="routine"]),#yd-review-inline-system[data-filter="satiety"] .yd-review-card:not([data-topic="satiety"]){display:none}',
      '@media(max-width:900px){#yd-review-inline-system .yd-system-head,#yd-review-inline-system .yd-focus-grid{grid-template-columns:1fr}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr 1fr}#yd-review-inline-system .yd-product-img{height:170px}#yd-review-inline-system h3{font-size:23px}}',
      '@media(max-width:900px){#yd-review-inline-system .yd-metric-grid,#yd-review-inline-system .yd-answer-grid,#yd-review-inline-system .yd-photo-led,#yd-review-inline-system .yd-timeline{grid-template-columns:1fr 1fr}#yd-review-inline-system .yd-photo-led-main{min-height:220px}}',
      '@media(max-width:560px){#yd-prime-review-link{margin:10px 0 8px;padding:9px 0}#yd-prime-review-link .yd-prime-text{font-size:12px}#yd-prime-review-link .yd-prime-score{font-size:15px}#yd-prime-review-link button{height:28px;padding:0 9px}#yd-review-top-proof .yd-top-row{align-items:flex-start;flex-direction:column}#yd-review-inline-system{padding:24px 0 30px}#yd-review-inline-system .yd-system-head{gap:16px}#yd-review-inline-system h3{font-size:21px}#yd-review-inline-system .yd-lead-review{grid-template-columns:1fr}#yd-review-inline-system .yd-lead-photo{width:100%;max-width:180px}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip,#yd-review-inline-system .yd-metric-grid,#yd-review-inline-system .yd-answer-grid,#yd-review-inline-system .yd-photo-led,#yd-review-inline-system .yd-photo-led-side,#yd-review-inline-system .yd-timeline,#yd-review-inline-system .yd-quote-focus{grid-template-columns:1fr}#yd-review-inline-system .yd-product-img{height:220px}#yd-review-inline-system .yd-photo-led-main{min-height:240px}#yd-review-inline-system .yd-review-card{grid-template-columns:1fr;gap:8px}#yd-review-inline-system .yd-native-note{display:block}}',
      '#yd-review-top-proof{border-left:0;border-top:2px solid #2c5d42;border-color:#dfe4ef;border-radius:0;background:#fff;box-shadow:none}',
      '#yd-review-top-proof .yd-stars,#yd-prime-review-link .yd-stars{color:#2c5d42}',
      '#yd-review-top-proof .yd-score strong,#yd-prime-review-link .yd-prime-score{color:#1f2937}',
      '#yd-review-top-proof .yd-jump,#yd-prime-review-link button{background:#fff;color:#1f2937;border-color:#cfd7e6;border-radius:2px}',
      '#yd-review-inline-system.yd-lalasweet-system{--yd-lala-blue:#2c5d42;--yd-lala-gold:#2c5d42;--yd-lala-ink:#273241;--yd-lala-muted:#8b94a3;--yd-lala-line:#e4e8ef;max-width:1000px;margin:72px auto 44px;padding:0 10px 38px;border-top:0;background:#fff;color:var(--yd-lala-ink);scroll-margin-top:72px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-title{margin:0 0 16px;font-size:26px;line-height:1;font-weight:900;color:#2b3038;letter-spacing:0}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-rule{height:2px;background:var(--yd-lala-blue);border-bottom:1px solid rgba(44,93,66,.35);margin-bottom:38px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-summary{display:block;margin:0 0 56px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-score{text-align:center;border-right:0;min-height:96px;display:flex;flex-direction:column;justify-content:center;align-items:center;margin:0 0 42px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-score-main{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-big-star{color:var(--yd-lala-gold);font-size:31px;line-height:1}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-score-main b{font-size:32px;line-height:1;font-weight:900;color:#273241}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-score em{font-style:normal;color:#9199a6;font-size:17px;font-weight:700}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-score em strong{color:var(--yd-lala-gold);font-weight:900}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-bars{display:grid;gap:10px;max-width:360px;margin:0 auto}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-bar{display:grid;grid-template-columns:86px minmax(0,1fr) 58px;gap:12px;align-items:center;font-size:13px;color:#8d96a4}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-bar.is-main{color:var(--yd-lala-gold);font-weight:800}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-track{height:8px;border-radius:999px;background:#f1f3f6;overflow:hidden}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-fill{height:100%;border-radius:999px;background:var(--yd-lala-gold)}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-bar-num{text-align:right;font-weight:700;color:#9ca4b0}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-review-count{margin:0;padding:18px 0 16px;border-top:1px solid var(--yd-lala-line);border-bottom:1px solid #cfd5df;font-size:20px;font-weight:900;color:#273241}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-toolbar{display:grid;grid-template-columns:minmax(130px,1fr) auto;align-items:center;gap:12px;min-height:52px;padding:0 0;border-bottom:1px solid var(--yd-lala-line)}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo-toggle{display:inline-flex;align-items:center;gap:6px;width:max-content;border:0;background:transparent;padding:0;color:#273241;font-size:14px;font-weight:900;line-height:1;cursor:pointer}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo-icon{position:relative;width:15px;height:15px;border:2px solid #273241;border-radius:4px;box-sizing:border-box;flex:0 0 auto}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo-icon:before{content:"";position:absolute;left:3px;top:4px;width:4px;height:4px;border:1.7px solid #273241;border-radius:50%;box-sizing:border-box}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo-icon:after{content:"";position:absolute;right:2px;top:2px;width:3px;height:3px;background:#273241;border-radius:50%}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-sort{display:flex;align-items:center;justify-content:flex-end;gap:14px;min-width:0;font-size:13px;font-weight:800;color:#273241;white-space:nowrap}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-sort-button,#yd-review-inline-system.yd-lalasweet-system .yd-lala-search{display:inline-flex;align-items:center;gap:7px;border:0;background:transparent;padding:0;color:inherit;font:inherit;line-height:1;cursor:pointer}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-search{color:#a3abb7;font-weight:700}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-divider{display:block;width:1px;height:16px;background:#e1e6ee}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-caret{display:block;width:7px;height:7px;border-right:2px solid #a6aeba;border-bottom:2px solid #a6aeba;transform:rotate(45deg);margin-top:-4px;box-sizing:border-box}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-search-icon{position:relative;display:block;width:17px;height:17px;flex:0 0 auto}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-search-icon:before{content:"";position:absolute;left:1px;top:1px;width:10px;height:10px;border:2px solid #c3cad4;border-radius:50%;box-sizing:border-box}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-search-icon:after{content:"";position:absolute;right:1px;bottom:1px;width:7px;height:2px;background:#c3cad4;transform:rotate(45deg);transform-origin:center;border-radius:2px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-filters{display:flex;gap:8px;padding:12px 0 10px;border-bottom:1px solid var(--yd-lala-line);overflow-x:auto}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-filters button{display:inline-flex;align-items:center;justify-content:space-between;gap:14px;height:44px;min-width:130px;border:1px solid #cfd5df;background:#fff;border-radius:2px;padding:0 18px;text-align:left;color:#273241;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-filters button.is-active{border-color:#cfd5df;background:#fff}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-row{display:grid;grid-template-columns:185px minmax(0,1fr);gap:38px;border-bottom:1px solid var(--yd-lala-line);padding:30px 0}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-profile{display:grid;grid-template-columns:42px minmax(0,1fr);gap:12px;align-content:start;color:#667085;font-size:13px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(#eef2f7,#dce3ed)}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-name{font-weight:800;color:#3f4856;margin-top:3px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-date{margin-top:10px;color:#6d7582}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-stars{color:var(--yd-lala-gold);font-size:19px;letter-spacing:1px;line-height:1;margin:0 0 12px;font-weight:900}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-source-badge{display:inline-flex;align-items:center;height:24px;margin:0 0 12px;border:1px solid #d8dee8;border-radius:999px;padding:0 9px;color:#6f7a89;font-size:12px;font-weight:800}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-text{margin:0;font-size:15px;line-height:1.75;color:#222b38;word-break:keep-all}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-meta{display:block;margin-top:10px;font-size:12px;color:#98a1ad}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-empty{border-bottom:1px solid var(--yd-lala-line);padding:42px 0;color:#7f8896;text-align:center;font-size:14px;line-height:1.7}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;margin-top:20px;max-width:760px}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo{aspect-ratio:1/1;background:#f1f3f6;overflow:hidden}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo img{width:100%;height:100%;object-fit:cover;display:block}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-feature{display:grid;grid-template-columns:170px minmax(0,1fr);gap:24px;margin:0 0 18px;padding:22px 0;border-bottom:1px solid var(--yd-lala-line)}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-feature-kicker{margin:0 0 9px;color:var(--yd-lala-gold);font-size:12px;font-weight:900}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-feature-title{margin:0;color:#273241;font-size:18px;line-height:1.42;font-weight:900}',
      '#yd-review-inline-system.yd-lalasweet-system .yd-lala-feature-text{margin:0;color:#222b38;font-size:15px;line-height:1.8;word-break:keep-all}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact{max-width:900px}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-rule{margin-bottom:24px}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-summary{display:flex;align-items:center;justify-content:space-between;gap:18px;margin-bottom:22px;padding:16px 0;border-top:1px solid var(--yd-lala-line);border-bottom:1px solid var(--yd-lala-line)}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-score{border-right:0;border-bottom:1px solid #d7dce5;min-height:80px;padding-bottom:16px;flex-direction:row;gap:12px}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-score{border-bottom:0;min-height:0;padding-bottom:0}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-score-main{margin-bottom:0}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-bars,#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-filters{display:none}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-toolbar{padding-left:0;padding-right:0;background:#fff}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-row{grid-template-columns:135px minmax(0,1fr);gap:24px;padding:20px 0}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-text{font-size:14px;line-height:1.65}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-focus .yd-lala-feature{background:#f8fafc;border:1px solid #d8dee8;border-radius:4px;padding:22px}',
      '#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-focus .yd-lala-list .yd-lala-row:first-child{display:none}',
      '@media(max-width:760px){#yd-review-inline-system.yd-lalasweet-system .yd-lala-feature{grid-template-columns:1fr;gap:12px;padding:18px 0}#yd-review-inline-system.yd-lalasweet-system.yd-lala-mode-compact .yd-lala-row{grid-template-columns:1fr;gap:10px}}',
      '.yd-native-review-source-hidden{display:none!important}',
      '.yd-tab-pane-hidden{display:none!important}',
      'body[data-yd-lala-active-tab="detail"] .detail_review_wrap,body[data-yd-lala-active-tab="detail"] .detail_review_wrap_mobile,body[data-yd-lala-active-tab="detail"] .detail_qna_wrap,body[data-yd-lala-active-tab="detail"] .detail_qna_wrap_mobile{display:none!important}',
      'body[data-yd-lala-active-tab="review"] .detail_detail_wrap,body[data-yd-lala-active-tab="review"] .detail_detail_wrap_mobile,body[data-yd-lala-active-tab="review"] .detail_qna_wrap,body[data-yd-lala-active-tab="review"] .detail_qna_wrap_mobile{display:none!important}',
      'body[data-yd-lala-active-tab="qna"] .detail_detail_wrap,body[data-yd-lala-active-tab="qna"] .detail_detail_wrap_mobile,body[data-yd-lala-active-tab="qna"] .detail_review_wrap,body[data-yd-lala-active-tab="qna"] .detail_review_wrap_mobile{display:none!important}',
      '.yd-lala-tabs-normalized{border-bottom:0!important;background:#fff!important}',
      '.yd-lala-tabs-normalized .prod_tab_3{position:relative!important;border:0!important;border-bottom:0!important;box-shadow:none!important;background:#fff!important}',
      '.yd-lala-tabs-normalized .prod_tab_3:before,.yd-lala-tabs-normalized .prod_tab_3:after{display:none!important}',
      '.yd-lala-tabs-normalized .prod_tab_3:not(:last-child) > a:after{content:"|";position:absolute;right:0;top:50%;transform:translateY(-50%);color:#111;font-weight:400}',
      '.yd-lala-tabs-normalized a{position:relative!important;border:0!important;border-bottom:0!important;box-shadow:none!important;font-size:14px!important;font-weight:700!important;color:#191d24!important;text-decoration:none!important}',
      '#yd-review-inline-system.yd-lalasweet-system[data-filter="taste"] .yd-lala-row:not([data-topic="taste"]),#yd-review-inline-system.yd-lalasweet-system[data-filter="delivery"] .yd-lala-row:not([data-topic="delivery"]),#yd-review-inline-system.yd-lalasweet-system[data-filter="routine"] .yd-lala-row:not([data-topic="routine"]),#yd-review-inline-system.yd-lalasweet-system[data-filter="satiety"] .yd-lala-row:not([data-topic="satiety"]){display:none}',
      '@media(max-width:760px){#yd-review-inline-system.yd-lalasweet-system{margin:42px auto 30px;padding:0 14px 30px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-title{font-size:24px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-rule{margin-bottom:26px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-summary{display:block;margin-bottom:54px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-score{border-right:0;min-height:112px;padding-bottom:0;margin-bottom:36px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-bar{grid-template-columns:84px minmax(0,1fr) 52px;gap:9px;font-size:12px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-toolbar{grid-template-columns:minmax(118px,1fr) auto;gap:8px;min-height:52px;padding-left:0;padding-right:0}#yd-review-inline-system.yd-lalasweet-system .yd-lala-photo-toggle{font-size:13px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-sort{gap:11px;font-size:12px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-search{gap:6px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-filters{padding-bottom:12px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-filters button{min-width:128px;height:44px;font-size:12px;padding:0 18px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-row{grid-template-columns:1fr;gap:14px;padding:24px 0}#yd-review-inline-system.yd-lalasweet-system .yd-lala-profile{grid-template-columns:34px minmax(0,1fr)}#yd-review-inline-system.yd-lalasweet-system .yd-lala-avatar{width:34px;height:34px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-date{margin-top:4px}#yd-review-inline-system.yd-lalasweet-system .yd-lala-photos{grid-template-columns:repeat(2,minmax(0,1fr))}}'
    ].join('\n');
    document.head.appendChild(style);
  }
  function imgCard(item, idx){
    if (!item || !item.url) return '';
    return '<div class="yd-product-img"><img loading="lazy" src="'+escapeHtml(item.url)+'" alt="윤식단 단백밥 실제 상품 이미지"><span>'+escapeHtml(item.label || ('상품 이미지 '+(idx+1)))+'</span></div>';
  }
  function photoCard(item, idx){
    if (!item || !item.url) return '';
    return '<div class="yd-photo-tile"><img loading="lazy" src="'+escapeHtml(item.url)+'" alt="윤식단 단백밥 실제 포토 구매평 이미지"><span>'+escapeHtml(item.label || ('포토 구매평 '+(idx+1)))+'</span></div>';
  }
  function topicReview(feed, topic){
    var reviews = feed.reviews || [];
    for (var i = 0; i < reviews.length; i += 1) {
      if (reviews[i].topic === topic) return reviews[i];
    }
    return reviews[0] || {};
  }
  function reviewText(feed, topic){
    var r = topicReview(feed, topic);
    return r.text || '';
  }
  function makeConceptBlock(feed, concept){
    var product = feed.product || {};
    var count = formatCount(product.review_count);
    var rating = product.rating || '';
    var photos = feed.review_images || [];
    var photoMain = photos[0] || (product.images || [])[0] || {};
    var photoSide = photos.slice(1,5).map(photoCard).join('');
    var lead = (feed.reviews || [])[0] || {};
    var html = '';

    if (concept.id === 'c01') {
      html = '<div class="yd-metric-grid"><div class="yd-metric"><b>'+escapeHtml(rating)+'</b><span>구매평 평균 평점</span></div><div class="yd-metric"><b>'+count+'</b><span>공개 리뷰 기반 신뢰도</span></div><div class="yd-metric"><b>최신</b><span>'+escapeHtml((lead.date || '').slice(0,10))+' 리뷰 반영</span></div></div>';
    } else if (concept.id === 'c02') {
      html = '<div class="yd-photo-led"><div class="yd-photo-led-main"><img loading="lazy" src="'+escapeHtml(photoMain.url || '')+'" alt="윤식단 단백밥 포토 구매평 대표 이미지"><span>실제 포토 구매평 대표</span></div><div class="yd-photo-led-side">'+photoSide+'</div></div>';
    } else if (concept.id === 'c03') {
      html = '<div class="yd-answer-grid"><div class="yd-answer"><b>양이 적을까?</b><p>'+escapeHtml(reviewText(feed, 'satiety'))+'</p></div><div class="yd-answer"><b>맛이 질릴까?</b><p>'+escapeHtml(reviewText(feed, 'taste'))+'</p></div><div class="yd-answer"><b>회사 점심으로 괜찮을까?</b><p>'+escapeHtml(reviewText(feed, 'delivery'))+'</p></div><div class="yd-answer"><b>또 살 만할까?</b><p>'+escapeHtml(reviewText(feed, 'routine'))+'</p></div></div>';
    } else if (concept.id === 'c04') {
      html = '<div class="yd-timeline"><div class="yd-step"><b>출근 전</b><span>냉동실에서 꺼내 챙기기 좋은 간편식</span></div><div class="yd-step"><b>점심 시간</b><span>사무실 근처 밥집 대신 든든한 한 끼</span></div><div class="yd-step"><b>오후 3시</b><span>포만감이 오래 간다는 리뷰를 먼저 확인</span></div><div class="yd-step"><b>퇴근 후</b><span>저녁 대체와 추가구매 리뷰까지 연결</span></div></div>';
    } else if (concept.id === 'c05') {
      html = '<div class="yd-answer-grid"><div class="yd-answer"><b>돌고 돌아 결국 윤식단</b><p>'+escapeHtml(reviewText(feed, 'routine'))+'</p></div><div class="yd-answer"><b>냉동실에 다시 비축</b><p>이번에도 냉동실에 쟁여둡니다~</p></div><div class="yd-answer"><b>계속 시켜먹는 이유</b><p>'+escapeHtml(reviewText(feed, 'delivery'))+'</p></div><div class="yd-answer"><b>두번째 구매 신호</b><p>두번째 구매입니다. 맛이 바뀌었는데 더 맛나짐</p></div></div>';
    } else if (concept.id === 'c06') {
      html = '<div class="yd-metric-grid"><div class="yd-metric"><b>맛</b><span>'+escapeHtml(reviewText(feed, 'taste'))+'</span></div><div class="yd-metric"><b>영양</b><span>단백질 도시락을 찾는 이유를 리뷰 전면에 배치</span></div><div class="yd-metric"><b>포만감</b><span>든든한 양과 식감을 언급한 장문 리뷰 강조</span></div></div>';
    } else if (concept.id === 'c07') {
      html = '<div class="yd-answer-grid"><div class="yd-answer"><b>배송 후 보관</b><p>냉동실에 비축해두고 점심/저녁으로 꺼내 먹는 리뷰 흐름을 먼저 보여줍니다.</p></div><div class="yd-answer"><b>사무실 식사</b><p>'+escapeHtml(reviewText(feed, 'delivery'))+'</p></div><div class="yd-answer"><b>간편 조리</b><p>먹기 편하고 든든하다는 짧은 리뷰를 구매 직전 근거로 사용합니다.</p></div><div class="yd-answer"><b>재고 불안 완화</b><p>여러 팩을 쟁여두는 리뷰를 통해 반복 구매 상황을 보여줍니다.</p></div></div>';
    } else if (concept.id === 'c08') {
      html = '<div class="yd-metric-grid"><div class="yd-metric"><b>포만감</b><span>양과 식감이 궁금한 고객</span></div><div class="yd-metric"><b>맛/영양</b><span>다이어트식 지속성이 걱정인 고객</span></div><div class="yd-metric"><b>배송/보관</b><span>냉동식품 구매가 처음인 고객</span></div></div>';
    } else if (concept.id === 'c09') {
      html = '<div class="yd-answer-grid"><div class="yd-answer"><b>하단 왼쪽 버튼</b><p>장바구니 대신 4.9 리뷰보기로 바뀌어 구매 직전 리뷰 확인 행동을 만듭니다.</p></div><div class="yd-answer"><b>하단 오른쪽 버튼</b><p>구매하기는 그대로 유지해 구매 동선을 끊지 않습니다.</p></div></div>';
    } else if (concept.id === 'c10') {
      html = '<div class="yd-quote-focus"><div class="yd-quote-score"><b>'+escapeHtml(rating)+'</b><span>'+count+'개 구매평 기반</span></div><div><blockquote>'+escapeHtml(lead.text || '')+'</blockquote><small>'+escapeHtml(lead.source || '구매평')+' · '+escapeHtml(lead.date || '')+'</small></div></div>';
    } else {
      html = '<div class="yd-metric-grid"><div class="yd-metric"><b>'+escapeHtml(rating)+'</b><span>평균 평점</span></div><div class="yd-metric"><b>'+count+'</b><span>실제 구매평</span></div><div class="yd-metric"><b>4가지</b><span>구매 망설임별 리뷰 요약</span></div></div>';
    }

    return '<div class="yd-concept-block"><p class="yd-concept-title">'+escapeHtml(concept.kicker)+'</p><p class="yd-concept-copy">'+escapeHtml(concept.sub)+'</p>'+html+'</div>';
  }
  function makeTopBar(feed){
    var concept = currentConcept();
    var count = formatCount(feed.product && feed.product.review_count);
    var el = document.createElement('div');
    el.id = 'yd-review-top-proof';
    el.setAttribute('data-concept', concept.id);
    el.innerHTML = '<div class="yd-top-row"><div class="yd-score"><span class="yd-stars">★★★★★</span><strong>'+escapeHtml(feed.product.rating)+'</strong><span>'+escapeHtml(conceptText(concept.topText, feed))+'</span></div><button type="button" class="yd-jump">'+escapeHtml(concept.topButton)+'</button></div><div class="yd-mini-tags">'+tagHtml(concept.tags)+'</div>';
    el.querySelector('.yd-jump').addEventListener('click', scrollToReviewSystem);
    return el;
  }
  function scrollToReviewSystem(ev){
    if (ev) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    applyNativeTabState('review', true);
  }
  function nativeTabKindFromTrigger(el){
    if (!el || !el.closest || el.closest('#yd-review-inline-system')) return false;
    var trigger = el.closest('a._detail, a._review, a._qna, li.prod_tab_3, a[href="#prod_detail_detail"], a[href="#prod_detail_review"], a[href="#prod_detail_qna"], [onclick*="changeContentTab"], [onclick*="changeContentPCTab"]');
    if (!trigger || trigger.closest('#yd-review-inline-system')) return false;
    var triggerText = text(trigger);
    if (/구매평|리뷰/.test(triggerText) || trigger.classList.contains('_review') || String(trigger.getAttribute('href') || '').indexOf('review') !== -1) return 'review';
    if (/Q&A|문의/.test(triggerText) || trigger.classList.contains('_qna') || String(trigger.getAttribute('href') || '').indexOf('qna') !== -1) return 'qna';
    if (/상세정보/.test(triggerText) || trigger.classList.contains('_detail') || String(trigger.getAttribute('href') || '').indexOf('detail') !== -1) return 'detail';
    return '';
  }
  var nativeReviewTabBound = false;
  var nativeTabLabelGuardBound = false;
  function bindNativeTabLabelGuard(){
    if (nativeTabLabelGuardBound || !window.MutationObserver || !document.body) return;
    nativeTabLabelGuardBound = true;
    var observer = new MutationObserver(function(mutations){
      var touchedNativeTab = mutations.some(function(mutation){
        var target = mutation.target && mutation.target.nodeType === 3 ? mutation.target.parentElement : mutation.target;
        return !!(target && target.closest && target.closest('a._review, a._detail, a._qna, li.prod_tab_3'));
      });
      if (!touchedNativeTab) return;
      syncNativeReviewTabLabel();
      syncNativeTabActiveClasses();
    });
    observer.observe(document.body, {childList:true, subtree:true, characterData:true});
  }
  function bindNativeReviewTabLinks(){
    if (nativeReviewTabBound) return;
    nativeReviewTabBound = true;
    function reinforceNativeTabState(kind, shouldScroll){
      applyNativeTabState(kind, shouldScroll);
      setTimeout(function(){ applyNativeTabState(kind, false); }, 0);
      if (window.requestAnimationFrame) {
        var startedAt = Date.now();
        var frameSync = function(){
          applyNativeTabState(kind, false);
          if (Date.now() - startedAt < 320) requestAnimationFrame(frameSync);
        };
        requestAnimationFrame(frameSync);
      }
    }
    function handleNativeTabClick(ev){
      var kind = nativeTabKindFromTrigger(ev.target);
      if (!kind) return;
      if (ev.cancelable) ev.preventDefault();
      ev.stopPropagation();
      if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      reinforceNativeTabState(kind, true);
      [8, 16, 24, 32, 48, 64, 80, 120, 160, 240, 420, 900, 1500].forEach(function(delay){
        setTimeout(function(){ applyNativeTabState(kind, false); }, delay);
      });
    }
    ['pointerdown','touchstart','mousedown','pointerup','touchend','mouseup'].forEach(function(type){
      window.addEventListener(type, handleNativeTabClick, {capture:true, passive:false});
      document.addEventListener(type, handleNativeTabClick, {capture:true, passive:false});
    });
    window.addEventListener('click', handleNativeTabClick, true);
    document.addEventListener('click', handleNativeTabClick, true);
  }
  function normalizeNativeTabLabels(feed){
    var count = currentNativeReviewCountLabel(feed);
    Array.prototype.forEach.call(document.querySelectorAll('a._detail, a._review, a._qna'), function(anchor){
      if (anchor.classList.contains('_detail')) anchor.textContent = '상세정보';
      if (anchor.classList.contains('_review')) anchor.textContent = count ? '리뷰 '+count : '리뷰';
      if (anchor.classList.contains('_qna')) anchor.textContent = 'Q&A';
      var nav = anchor.closest('._prod_detail_tab_fixed') || anchor.closest('#fixed_tab') || anchor.closest('#fixed_tab_mobile') || anchor.parentElement;
      if (nav) nav.classList.add('yd-lala-tabs-normalized');
    });
    markNativeTabsReady();
    syncNativeTabActiveClasses();
  }
  function makePrimeReviewLink(feed){
    var concept = currentConcept();
    var el = document.createElement('div');
    el.id = 'yd-prime-review-link';
    el.setAttribute('data-concept', concept.id);
    el.innerHTML = '<div class="yd-prime-main"><span class="yd-stars">★★★★★</span><span class="yd-prime-score">'+escapeHtml(feed.product.rating)+'</span><span class="yd-prime-text">'+escapeHtml(conceptText(concept.primeText, feed))+'</span></div><button type="button">'+escapeHtml(concept.topButton || '리뷰보기')+'</button>';
    el.querySelector('button').addEventListener('click', scrollToReviewSystem);
    return el;
  }
  function enhanceMobileBottomCta(feed){
    var concept = currentConcept();
    if (!window.matchMedia || !window.matchMedia('(max-width: 640px)').matches) return;
    var cart = document.querySelector('.buy_btns.mobile .cart_btn a.btn.defualt-cart');
    if (!cart || cart.getAttribute('data-yd-review-bound') === '1') return;
    var wrap = cart.closest && cart.closest('.cart_btn');
    cart.setAttribute('data-yd-review-bound', '1');
    cart.setAttribute('data-yd-original-label', text(cart));
    cart.setAttribute('href', 'javascript:void(0)');
    cart.innerHTML = '<span class="yd-mobile-review-score">'+escapeHtml(feed.product.rating || '')+'</span><span class="yd-mobile-review-label">'+escapeHtml(concept.mobileLabel || '리뷰보기')+'</span>';
    if (wrap) wrap.classList.add('yd-mobile-review-mode');
    cart.addEventListener('click', function(ev){
      ev.preventDefault();
      ev.stopPropagation();
      if (ev.stopImmediatePropagation) ev.stopImmediatePropagation();
      scrollToReviewSystem();
    }, true);
  }
  function leadPhoto(feed){
    var img = (feed.review_images || [])[0] || (feed.product.images || [])[0];
    if (!img || !img.url) return '';
    return '<div class="yd-lead-photo"><img loading="lazy" src="'+escapeHtml(img.url)+'" alt="윤식단 단백밥 대표 포토 구매평"></div>';
  }
  function makeLeadReview(feed){
    var r = (feed.reviews || [])[0] || {};
    return '<article class="yd-lead-review" data-topic="'+escapeHtml(r.topic || 'satiety')+'"><div><div class="yd-review-meta"><span class="yd-stars">★★★★★</span><span class="yd-badge">'+escapeHtml(r.source || '구매평')+'</span><span class="yd-topic">'+escapeHtml(topicLabel(r.topic))+'</span></div><p>'+escapeHtml(r.text || '')+'</p><small>'+escapeHtml(r.date || '')+(r.has_image ? ' · 포토 리뷰' : '')+'</small></div>'+leadPhoto(feed)+'</article>';
  }
  function shortDate(date){
    var match = String(date || '').match(/(\d{4})-(\d{2})-(\d{2})/);
    if (!match) return '';
    return match[1].slice(2)+'.'+match[2]+'.'+match[3];
  }
  function defaultKeywords(){
    return [
      {id:'all', label:'전체'},
      {id:'satiety', label:'포만감'},
      {id:'taste', label:'맛/품질'},
      {id:'routine', label:'재구매/선물'},
      {id:'delivery', label:'배송/보관'}
    ];
  }
  function cleanReviewText(value){
    return String(value || '').replace(/\s+/g, ' ').trim();
  }
  function nativeReviewWraps(){
    return Array.prototype.filter.call(document.querySelectorAll('._review_wrap'), function(wrap){
      return !wrap.closest('#yd-review-inline-system') && !wrap.closest('#yd-prime-review-link') && !wrap.closest('#yd-review-top-proof');
    });
  }
  function nativeReviewSourceWraps(){
    var wraps = nativeReviewWraps();
    var preferred = wraps.filter(function(wrap){
      var section = wrap.closest('.detail_review_wrap_mobile, .detail_review_wrap');
      if (!section) return false;
      var isMobileSection = /mobile/.test(section.className || '');
      return isMobileReviewViewport() ? isMobileSection : !isMobileSection;
    });
    if (preferred.length) return preferred.slice(0, 1);
    var visibleWraps = wraps.filter(visible);
    if (visibleWraps.length) return visibleWraps.slice(0, 1);
    return wraps.slice(0, 1);
  }
  function nativeReviewItems(){
    var items = [];
    nativeReviewSourceWraps().forEach(function(wrap){
      Array.prototype.forEach.call(wrap.querySelectorAll('li.list_review_inner, li._show_more_review'), function(item){
        if (!item.closest('#yd-review-inline-system')) items.push(item);
      });
    });
    return items;
  }
  function nativeCountFromPage(){
    var count = 0;
    Array.prototype.forEach.call(document.querySelectorAll('._review_count_text, .braket-badge, a._review'), function(el){
      if (el.closest('#yd-review-inline-system') || el.closest('#yd-prime-review-link') || el.closest('#yd-review-top-proof')) return;
      var match = cleanReviewText(text(el)).match(/(\d[\d,]*)/);
      if (match) count = Math.max(count, Number(match[1].replace(/,/g, '')) || 0);
    });
    return count;
  }
  function nativeProductTitle(){
    return text(document.querySelector('#prod_goods_form header h1')) || text(document.querySelector('#prod_goods_form .view_tit')) || document.title || '';
  }
  function nativeReviewBody(item){
    var body = item.querySelector('._review_body') || item.querySelector('._txt') || item.querySelector('.txt');
    if (body) return cleanReviewText(text(body));
    var cell = item.querySelector('.txt_wrap') || item.querySelector('.text-14');
    return cleanReviewText(text(cell));
  }
  function nativeReviewDate(item){
    var match = cleanReviewText(text(item)).match(/(20\d{2}[-.]\d{2}[-.]\d{2}(?:\s+\d{2}:\d{2})?)/);
    return match ? match[1].replace(/\./g, '-') : '';
  }
  function nativeReviewAuthor(item, date){
    var summary = item.querySelector('.use_summary') || item.querySelector('.width-5');
    var value = '';
    if (summary) {
      var children = Array.prototype.filter.call(summary.children, function(child){
        return cleanReviewText(text(child));
      });
      if (children.length) value = cleanReviewText(text(children[0]));
      if (!value) value = cleanReviewText(text(summary)).replace(date || '', '').trim();
    }
    if (!value) value = '구매고객';
    return value;
  }
  function nativeReviewRating(item){
    var label = cleanReviewText(text(item.querySelector('.star-point-wrap, .star_point_wrap, .rating, .review_star')));
    var numeric = label.match(/([1-5](?:\.\d)?)/);
    if (numeric) return Number(numeric[1]) || 0;
    var stars = cleanReviewText(text(item)).match(/★/g);
    return stars && stars.length ? Math.min(5, stars.length) : 0;
  }
  function nativeReviewImages(item){
    var seen = {};
    return Array.prototype.map.call(item.querySelectorAll('img'), function(img){
      return img.currentSrc || img.src || img.getAttribute('data-src') || '';
    }).filter(function(src){
      if (!src || seen[src]) return false;
      seen[src] = true;
      return !/blank|spacer|profile|avatar/i.test(src);
    }).map(function(src, index){
      return {url: src, label: '구매평 사진 '+(index + 1)};
    });
  }
  function classifyReviewTopic(value){
    var s = String(value || '');
    if (/배송|포장|보관|냉동|택배|파손/.test(s)) return 'delivery';
    if (/재구매|또|선물|추천|만족|최고/.test(s)) return 'routine';
    if (/맛|향|품질|고소|담백|영양|식감/.test(s)) return 'taste';
    if (/양|든든|포만|크기|넉넉/.test(s)) return 'satiety';
    return 'taste';
  }
  function buildNativeReviewFeed(){
    var seen = {};
    var reviews = nativeReviewItems().map(function(item){
      var body = nativeReviewBody(item);
      var date = nativeReviewDate(item);
      var author = nativeReviewAuthor(item, date);
      var images = nativeReviewImages(item);
      var key = body+'|'+date+'|'+author;
      if (!body || seen[key]) return null;
      seen[key] = true;
      return {
        topic: classifyReviewTopic(body),
        source: '레갈로 자사몰 구매평',
        text: body,
        date: date,
        masked_reviewer: author,
        rating: nativeReviewRating(item),
        has_image: images.length > 0,
        images: images
      };
    }).filter(Boolean);
    var listedCount = nativeCountFromPage();
    if (listedCount > 0 && reviews.length > listedCount) reviews = reviews.slice(0, listedCount);
    var ratingTotal = 0;
    var ratingCount = 0;
    reviews.forEach(function(review){
      if (review.rating) {
        ratingTotal += review.rating;
        ratingCount += 1;
      }
    });
    var reviewImages = [];
    reviews.forEach(function(review){
      review.images.forEach(function(img){ reviewImages.push(img); });
    });
    return {
      version: 'imweb-native-live',
      source: {type:'imweb_native_review_dom', url: location.href},
      product: {
        title: nativeProductTitle(),
        rating: ratingCount ? (Math.round((ratingTotal / ratingCount) * 10) / 10).toFixed(1) : '4.9',
        review_count: listedCount || reviews.length
      },
      keywords: defaultKeywords(),
      reviews: reviews,
      review_images: reviewImages
    };
  }
  function findNativeReviewWriteButton(){
    var buttons = Array.prototype.filter.call(document.querySelectorAll('a,button'), function(el){
      return !el.closest('#yd-review-inline-system') && cleanReviewText(text(el)) === '구매평 작성';
    });
    return buttons[0] || null;
  }
  function clickNativeReviewWrite(){
    var button = findNativeReviewWriteButton();
    if (button) button.click();
  }
  function hideNativeReviewSources(){
    nativeReviewWraps().forEach(function(wrap){
      wrap.classList.add('yd-native-review-source-hidden');
      wrap.setAttribute('aria-hidden', 'true');
    });
  }
  function starText(rating){
    var n = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));
    return n ? new Array(n + 1).join('★') : '';
  }
  function nativeReviewMode(){
    return 'board';
  }
  function nativeModeLabel(){
    return {
      board: '기본 게시판형',
      compact: '압축 리스트형',
      focus: '대표 리뷰 강조형'
    }[nativeReviewMode()] || '기본 게시판형';
  }
  function makeFeaturedReview(feed){
    if (nativeReviewMode() !== 'focus') return '';
    var review = (feed.reviews || [])[0];
    if (!review) return '';
    var rating = starText(review.rating);
    return [
      '<article class="yd-lala-feature" data-topic="'+escapeHtml(review.topic || '')+'">',
        '<div><p class="yd-lala-feature-kicker">BEST REVIEW</p><h3 class="yd-lala-feature-title">'+escapeHtml(review.masked_reviewer || '구매고객')+'님의 구매평</h3><span class="yd-lala-meta">'+escapeHtml(shortDate(review.date) || review.date || '')+' 작성</span></div>',
        '<div>'+(rating ? '<div class="yd-lala-stars">'+escapeHtml(rating)+'</div>' : '<div class="yd-lala-source-badge">구매평</div>')+'<p class="yd-lala-feature-text">'+escapeHtml(review.text || '')+'</p>'+((review.has_image && review.images.length) ? '<div class="yd-lala-photos">'+makeLalaPhotos(review.images)+'</div>' : '')+'</div>',
      '</article>'
    ].join('');
  }
  function makeLalaBars(feed){
    var reviews = feed.reviews || [];
    var total = Math.max(1, reviews.length);
    var ratingCounts = [0,0,0,0,0];
    reviews.forEach(function(r){
      var rating = Math.round(Number(r.rating) || 0);
      if (rating >= 1 && rating <= 5) ratingCounts[5 - rating] += 1;
    });
    var hasRatings = ratingCounts.some(function(n){ return n > 0; });
    if (!hasRatings) ratingCounts[0] = Number(feed.product && feed.product.review_count) || reviews.length;
    var bars = [
      {label:'매우 만족', count:ratingCounts[0]},
      {label:'만족', count:ratingCounts[1]},
      {label:'보통', count:ratingCounts[2]},
      {label:'그저그래요', count:ratingCounts[3]},
      {label:'아쉬워요', count:ratingCounts[4]}
    ];
    return bars.map(function(bar, index){
      var width = total ? Math.round(bar.count / Math.max(1, Number(feed.product && feed.product.review_count) || total) * 100) : 0;
      return '<div class="yd-lala-bar '+(index === 0 ? 'is-main' : '')+'"><span>'+escapeHtml(bar.label)+'</span><div class="yd-lala-track"><div class="yd-lala-fill" style="width:'+width+'%;min-width:'+(bar.count ? '8px' : '0')+'"></div></div><span class="yd-lala-bar-num">'+escapeHtml(formatCount(bar.count))+'</span></div>';
    }).join('');
  }
  function makeLalaPhotos(items){
    return (items || []).map(function(item){
      if (!item || !item.url) return '';
      return '<div class="yd-lala-photo"><img loading="lazy" src="'+escapeHtml(item.url)+'" alt="구매평 사진"></div>';
    }).join('');
  }
  function makeLalaRows(feed){
    var reviews = (feed.reviews || []).slice(0,7);
    if (!reviews.length) {
      return '<div class="yd-lala-empty">아직 등록된 구매평이 없습니다.<br>고객이 구매평을 작성하면 이 영역에 자동으로 반영됩니다.</div>';
    }
    return reviews.map(function(r, index){
      var photos = r.has_image ? '<div class="yd-lala-photos">'+makeLalaPhotos(r.images)+'</div>' : '';
      var rating = starText(r.rating);
      var ratingHtml = rating ? '<div class="yd-lala-stars">'+escapeHtml(rating)+'</div>' : '<div class="yd-lala-source-badge">구매평</div>';
      return [
        '<article class="yd-lala-row" data-topic="'+escapeHtml(r.topic || '')+'">',
          '<div class="yd-lala-profile"><span class="yd-lala-avatar"></span><div><div class="yd-lala-name">'+escapeHtml(r.masked_reviewer || '구매고객')+'</div><div class="yd-lala-date">'+escapeHtml(shortDate(r.date) || r.date || '')+' 작성</div></div></div>',
          '<div>'+ratingHtml+'<p class="yd-lala-text">'+escapeHtml(r.text || '')+'</p><span class="yd-lala-meta">'+escapeHtml(r.source || '구매평')+(r.has_image ? ' · 포토 리뷰' : '')+'</span>'+photos+'</div>',
        '</article>'
      ].join('');
    }).join('');
  }
  function makeReviewSystem(feed){
    var el = document.createElement('section');
    el.id = 'yd-review-inline-system';
    el.className = 'yd-lalasweet-system yd-lala-mode-'+nativeReviewMode();
    el.setAttribute('data-filter','all');
    el.setAttribute('data-concept', currentConcept().id);
    el.setAttribute('data-mode', nativeReviewMode());
    el.setAttribute('data-build', 'lalasweet-c01-v1');

    var product = feed.product || {};
    var count = rememberNativeReviewCount(product.review_count) || formatCount(product.review_count);
    var hasRating = !!product.rating;
    var scoreHtml = hasRating ? '<span class="yd-lala-big-star">★</span><b>'+escapeHtml(product.rating)+'</b>' : '<b>리뷰</b>';
    var keywordList = feed.keywords || [];
    var tasteKeyword = keywordList.filter(function(k){
      return k && k.id === 'taste';
    })[0] || keywordList.filter(function(k){
      return k && k.id !== 'all';
    })[0] || { id: 'taste', label: '가장 맛있...' };
    var keywordHtml = [
      '<button type="button" class="is-active" data-filter-value="all"><span>별점</span><span class="yd-lala-caret"></span></button>',
      '<button type="button" data-filter-value="'+escapeHtml(tasteKeyword.id || 'taste')+'"><span>가장 맛있...</span><span class="yd-lala-caret"></span></button>'
    ].join('');

    el.innerHTML = [
      '<h2 class="yd-lala-title">REVIEW</h2><div class="yd-lala-rule"></div>',
      '<div class="yd-lala-summary"><div class="yd-lala-score"><div class="yd-lala-score-main">'+scoreHtml+'</div><em><strong>'+count+'</strong>개 리뷰</em></div><div class="yd-lala-bars">'+makeLalaBars(feed)+'</div></div>',
      '<h3 class="yd-lala-review-count">리뷰'+count+'</h3>',
      '<div class="yd-lala-toolbar"><button type="button" class="yd-lala-photo-toggle"><span class="yd-lala-photo-icon" aria-hidden="true"></span><span>포토&동영상</span></button><div class="yd-lala-sort"><button type="button" class="yd-lala-sort-button">최신순<span class="yd-lala-caret" aria-hidden="true"></span></button><span class="yd-lala-divider" aria-hidden="true"></span><button type="button" class="yd-lala-search">직접검색<span class="yd-lala-search-icon" aria-hidden="true"></span></button></div></div>',
      '<div class="yd-lala-filters">'+keywordHtml+'</div>',
      makeFeaturedReview(feed),
      '<div class="yd-lala-list">'+makeLalaRows(feed)+'</div>'
    ].join('');

    Array.prototype.forEach.call(el.querySelectorAll('[data-filter-value]'), function(btn){
      btn.addEventListener('click', function(){
        var f = btn.getAttribute('data-filter-value');
        el.setAttribute('data-filter', f);
        Array.prototype.forEach.call(el.querySelectorAll('[data-filter-value]'), function(b){
          b.classList.toggle('is-active', b === btn);
        });
      });
    });
    var writeButton = el.querySelector('.yd-lala-write');
    if (writeButton) writeButton.addEventListener('click', clickNativeReviewWrite);
    return el;
  }
  var responsiveSyncTimer = null;
  var responsiveSyncBound = false;
  var currentReviewFingerprint = '';
  function reviewFingerprint(feed){
    return [
      nativeReviewMode(),
      feed.product && feed.product.review_count,
      feed.product && feed.product.rating,
      (feed.reviews || []).map(function(r){
        return [r.text, r.date, r.masked_reviewer, r.rating, (r.images || []).length].join('|');
      }).join('||')
    ].join('::');
  }
  function reviewSystemFor(feed){
    var existing = document.getElementById('yd-review-inline-system');
    var fingerprint = reviewFingerprint(feed);
    if (existing && existing.getAttribute('data-feed-fingerprint') === fingerprint) return existing;
    var system = makeReviewSystem(feed);
    system.setAttribute('data-feed-fingerprint', fingerprint);
    if (existing && existing.parentNode) existing.parentNode.replaceChild(system, existing);
    currentReviewFingerprint = fingerprint;
    return system;
  }
  function placeReviewSystem(feed){
    var system = reviewSystemFor(feed);
    var mobileAnchor = mobileReviewSystemAnchor();
    if (mobileAnchor) return placeSystemAt(system, mobileAnchor.parent, mobileAnchor.before);

    var reviewPane = nativeTabPanes('review')[0];
    if (reviewPane) {
      return placeSystemAt(system, reviewPane, reviewPane.firstChild);
    }

    var nativeWraps = nativeReviewSourceWraps();
    var nativeWrap = nativeWraps.filter(visible)[0] || nativeWraps[0];
    if (nativeWrap && nativeWrap.parentNode) {
      return placeSystemAt(system, nativeWrap.parentNode, nativeWrap);
    }

    var review = bestReviewTarget();
    if (!review) return false;
    var wrap = review.matches && review.matches('._review_wrap') ? review : (review.querySelector && review.querySelector('._review_wrap'));
    if (wrap && wrap.parentNode && visible(wrap)) {
      placeSystemAt(system, wrap.parentNode, wrap);
    } else {
      placeSystemAt(system, review, review.firstChild);
    }
    return true;
  }
  function syncResponsiveReviewUi(feed){
    var placed = placeReviewSystem(feed);
    if (placed) hideNativeReviewSources();
  }
  function scheduleResponsiveReviewUi(feed){
    if (responsiveSyncTimer) clearTimeout(responsiveSyncTimer);
    responsiveSyncTimer = setTimeout(function(){ syncResponsiveReviewUi(feed); }, 120);
  }
  function bindResponsiveReviewUi(feed){
    if (responsiveSyncBound) return;
    responsiveSyncBound = true;
    var sync = function(){ scheduleResponsiveReviewUi(feed); };
    window.addEventListener('resize', sync, {passive:true});
    window.addEventListener('orientationchange', sync, {passive:true});
    if (window.visualViewport) window.visualViewport.addEventListener('resize', sync, {passive:true});
    if (window.matchMedia) {
      var mobileQuery = window.matchMedia('(max-width: 640px)');
      if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', sync);
      else if (mobileQuery.addListener) mobileQuery.addListener(sync);
    }
  }
  function render(feed){
    injectStyle();
    if (document.getElementById('yd-review-preview-root')) document.getElementById('yd-review-preview-root').remove();
    if (document.getElementById('yd-prime-review-link')) document.getElementById('yd-prime-review-link').remove();
    if (document.getElementById('yd-review-top-proof')) document.getElementById('yd-review-top-proof').remove();
    bindResponsiveReviewUi(feed);
    normalizeNativeTabLabels(feed);
    waitFor(function(){
      return mobileReviewSystemAnchor() || nativeTabPanes('review')[0] || bestReviewTarget();
    }, function(){
      placeReviewSystem(feed);
      hideNativeReviewSources();
      normalizeNativeTabLabels(feed);
      applyNativeTabState(window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || 'detail', false);
    });
  }
  var nativeReviewObserverBound = false;
  var nativeReviewRenderTimer = null;
  function scheduleNativeReviewRender(){
    if (nativeReviewRenderTimer) clearTimeout(nativeReviewRenderTimer);
    nativeReviewRenderTimer = setTimeout(function(){
      var feed = buildNativeReviewFeed();
      if (reviewFingerprint(feed) !== currentReviewFingerprint || !document.getElementById('yd-review-inline-system')) {
        render(feed);
      } else {
        hideNativeReviewSources();
        normalizeNativeTabLabels(feed);
        applyNativeTabState(window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || 'detail', false);
      }
    }, 40);
  }
  function bindNativeReviewObserver(){
    if (nativeReviewObserverBound || !window.MutationObserver) return;
    nativeReviewObserverBound = true;
    var observer = new MutationObserver(function(mutations){
      var shouldRender = mutations.some(function(mutation){
        var target = mutation.target;
        if (target && target.closest && target.closest('#yd-review-inline-system')) return false;
        return true;
      });
      if (shouldRender) scheduleNativeReviewRender();
    });
    observer.observe(document.body, {childList:true, subtree:true, characterData:true});
  }
  function startNativeReviewAdapter(){
    syncNativeTabAttribute(window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || initialNativeTabKind());
    injectPreflightStyle();
    injectStyle();
    bindNativeReviewTabLinks();
    bindNativeTabLabelGuard();
    normalizeNativeTabLabels({product:{review_count:nativeCountFromPage()}});
    applyNativeTabState(window.__YD_LALA_ACTIVE_TAB__ || activeNativeTab || 'detail', false);
    waitFor(function(){
      return nativeTabPanes('review')[0] || nativeReviewWraps().length || bestReviewTarget() || document.querySelector('.review-box');
    }, function(){
      var feed = buildNativeReviewFeed();
      render(feed);
      bindNativeReviewObserver();
    });
  }
  ready(function(){
    if (config.previewFeed || queryValue('yd_review_preview') === 'feed') {
      fetch(feedUrl, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
        .then(function(res){
          if (!res.ok) throw new Error('feed_http_'+res.status);
          return res.json();
        })
        .then(render)
        .catch(function(err){
          console.warn('[YD Review Widget] feed load failed', err);
          startNativeReviewAdapter();
        });
    } else {
      startNativeReviewAdapter();
    }
  });
})();
