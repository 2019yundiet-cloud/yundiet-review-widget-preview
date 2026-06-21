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
    if (tries > 60) return;
    setTimeout(function(){ waitFor(fn, cb, tries + 1); }, 200);
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
  function injectStyle(){
    if (document.getElementById('yd-inline-review-style')) return;
    var style = document.createElement('style');
    style.id = 'yd-inline-review-style';
    style.textContent = [
      '#yd-review-top-proof,#yd-review-inline-system,#yd-prime-review-link,.yd-mobile-review-mode{--yd-brand:#2a341e;--yd-ink:#3d3d3d;--yd-muted:#73776f;--yd-line:rgba(42,52,30,.16);--yd-soft:#f7f7f5;--yd-star:#ff4d3f;--yd-badge:#f0f2f1;--yd-green-soft:#dcebdd;font-family:"Pretendard English",Pretendard,"Apple SD Gothic Neo","Malgun Gothic","Nanum Gothic","Noto Sans",sans-serif;color:var(--yd-ink);letter-spacing:0;box-sizing:border-box}',
      '#yd-review-top-proof *,#yd-review-inline-system *{box-sizing:border-box;letter-spacing:0}',
      '#yd-review-top-proof{margin:18px 0 16px;border:1px solid var(--yd-line);border-left:4px solid var(--yd-brand);background:#fff;border-radius:6px;padding:14px 16px;display:grid;gap:10px}',
      '#yd-review-top-proof .yd-top-row{display:flex;align-items:center;justify-content:space-between;gap:14px}',
      '#yd-review-top-proof .yd-score{display:flex;align-items:center;gap:9px;min-width:0;flex-wrap:wrap}',
      '#yd-review-top-proof .yd-stars{color:var(--yd-star);font-size:14px;font-weight:900;line-height:1}',
      '#yd-review-top-proof .yd-score strong{font-size:20px;line-height:1;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-top-proof .yd-score span{font-size:13px;color:var(--yd-muted)}',
      '#yd-review-top-proof .yd-jump{border:1px solid rgba(42,52,30,.22);background:var(--yd-brand);color:#fff;border-radius:4px;height:34px;padding:0 14px;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap}',
      '#yd-review-top-proof .yd-mini-tags{display:flex;flex-wrap:wrap;gap:6px}',
      '#yd-review-top-proof .yd-mini-tags span{border:1px solid rgba(42,52,30,.12);background:var(--yd-badge);border-radius:10px;padding:4px 7px;font-size:11px;font-weight:700;color:#717680}',
      '#yd-prime-review-link{margin:12px 0 10px;border-top:1px solid rgba(42,52,30,.16);border-bottom:1px solid rgba(42,52,30,.16);background:#fff;padding:10px 0;display:flex;align-items:center;justify-content:space-between;gap:8px;color:var(--yd-brand);max-width:520px}',
      '#yd-prime-review-link .yd-prime-main{display:flex;align-items:center;gap:6px;min-width:0;white-space:nowrap;overflow:hidden}',
      '#yd-prime-review-link .yd-stars{color:var(--yd-star);font-weight:900;font-size:13px;line-height:1}',
      '#yd-prime-review-link .yd-prime-score{font-size:16px;font-weight:800;color:var(--yd-brand)}',
      '#yd-prime-review-link .yd-prime-text{font-size:13px;color:#717680;overflow:hidden;text-overflow:ellipsis}',
      '#yd-prime-review-link button{height:32px;border:1px solid var(--yd-brand);border-radius:4px;background:#fff;color:var(--yd-brand);padding:0 10px;font-size:12px;font-weight:800;white-space:nowrap;cursor:pointer}',
      '.yd-mobile-review-mode .btn.defualt-cart{background:#fff!important;border:1px solid rgba(42,52,30,.18)!important;color:var(--yd-brand)!important;font-weight:800!important}',
      '.yd-mobile-review-mode .btn.defualt-cart .yd-mobile-review-score{display:inline-flex;align-items:center;justify-content:center;min-width:30px;height:18px;margin-right:5px;border-radius:999px;background:var(--yd-brand);color:#fff;font-size:11px;font-weight:800;vertical-align:1px}',
      '.yd-mobile-review-mode .btn.defualt-cart .yd-mobile-review-label{vertical-align:1px}',
      '#yd-review-inline-system{border-top:2px solid var(--yd-brand);padding:30px 0 38px;margin:10px 0 30px;background:#fff}',
      '#yd-review-inline-system .yd-system-head{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:30px;align-items:stretch;margin-bottom:24px}',
      '#yd-review-inline-system .yd-kicker{margin:0 0 9px;font-size:12px;line-height:1.35;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system h3{margin:0;font-size:26px;line-height:1.32;font-weight:800;color:var(--yd-ink)}',
      '#yd-review-inline-system .yd-sub{margin:10px 0 0;font-size:14px;line-height:1.72;color:#5f645c;max-width:760px}',
      '#yd-review-inline-system .yd-score-panel{border:1px solid rgba(42,52,30,.12);border-radius:6px;background:var(--yd-soft);padding:17px 18px;min-height:150px;display:flex;flex-direction:column;justify-content:center}',
      '#yd-review-inline-system .yd-score-panel .yd-stars{color:var(--yd-star);font-size:17px;font-weight:900;margin-bottom:9px}',
      '#yd-review-inline-system .yd-score-panel strong{display:block;font-size:38px;line-height:1;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-score-panel span{display:block;margin-top:8px;font-size:13px;color:#666b63}',
      '#yd-review-inline-system .yd-source-note{margin:10px 0 0;font-size:11px;line-height:1.5;color:#8a8e87}',
      '#yd-review-inline-system .yd-section-label{margin:0 0 11px;font-size:13px;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-focus-grid{display:grid;grid-template-columns:minmax(0,1.08fr) minmax(320px,.92fr);gap:18px;margin-bottom:24px}',
      '#yd-review-inline-system .yd-lead-review{border-top:1px solid var(--yd-brand);border-bottom:1px solid rgba(42,52,30,.15);padding:18px 0 17px;display:grid;grid-template-columns:minmax(0,1fr) 132px;gap:18px;align-items:start}',
      '#yd-review-inline-system .yd-lead-review .yd-review-meta{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px}',
      '#yd-review-inline-system .yd-stars{color:var(--yd-star);font-weight:900;font-size:14px;line-height:1}',
      '#yd-review-inline-system .yd-badge{display:inline-flex;align-items:center;min-height:22px;border-radius:10px;background:var(--yd-badge);color:#717680;padding:2px 7px;font-size:12px;font-weight:700}',
      '#yd-review-inline-system .yd-topic{display:inline-flex;align-items:center;min-height:22px;border-radius:10px;background:var(--yd-green-soft);color:var(--yd-brand);padding:2px 7px;font-size:12px;font-weight:800}',
      '#yd-review-inline-system .yd-lead-review p{margin:0;font-size:14px;line-height:1.78;color:#373c35}',
      '#yd-review-inline-system .yd-lead-review small{display:block;margin-top:12px;font-size:12px;color:#8a8e87}',
      '#yd-review-inline-system .yd-lead-photo{width:132px;aspect-ratio:1/1;border:1px solid rgba(42,52,30,.12);border-radius:4px;overflow:hidden;background:#f1f2ef}',
      '#yd-review-inline-system .yd-lead-photo img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-proof-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}',
      '#yd-review-inline-system .yd-proof-card{border:1px solid rgba(42,52,30,.12);border-radius:6px;background:#fff;padding:13px 13px;min-height:104px}',
      '#yd-review-inline-system .yd-proof-card b{display:block;font-size:14px;color:var(--yd-brand);margin-bottom:6px;font-weight:800}',
      '#yd-review-inline-system .yd-proof-card p{margin:0;font-size:12px;line-height:1.58;color:#646960}',
      '#yd-review-inline-system .yd-product-strip{display:grid;grid-template-columns:1.12fr 1fr 1fr;gap:10px;margin:0 0 22px}',
      '#yd-review-inline-system .yd-product-img{height:190px;border:1px solid rgba(42,52,30,.12);border-radius:4px;overflow:hidden;background:#f1f2ef;position:relative}',
      '#yd-review-inline-system .yd-product-img img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-product-img span{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.92);border:1px solid rgba(42,52,30,.1);border-radius:10px;padding:5px 8px;font-size:11px;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-keyword-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 14px}',
      '#yd-review-inline-system .yd-keyword-row button{height:34px;border:1px solid rgba(42,52,30,.2);background:#fff;border-radius:4px;padding:0 12px;color:var(--yd-brand);font-size:12px;font-weight:700;cursor:pointer}',
      '#yd-review-inline-system .yd-keyword-row button.is-active{background:var(--yd-brand);color:#fff;border-color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-review-list{border-top:1px solid var(--yd-brand);margin-bottom:23px}',
      '#yd-review-inline-system .yd-review-card{display:grid;grid-template-columns:146px minmax(0,1fr);gap:16px;border-bottom:1px solid rgba(42,52,30,.15);padding:15px 0;min-height:116px;background:#fff}',
      '#yd-review-inline-system .yd-review-card .yd-review-side{display:flex;flex-direction:column;gap:8px;align-items:flex-start}',
      '#yd-review-inline-system .yd-review-card p{margin:0;font-size:14px;line-height:1.72;color:#343a32;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}',
      '#yd-review-inline-system .yd-review-card small{display:block;margin-top:10px;font-size:12px;color:#8a8e87}',
      '#yd-review-inline-system .yd-photo-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:20px}',
      '#yd-review-inline-system .yd-photo-tile{border-radius:4px;min-height:132px;background:#f1f2ef;border:1px solid rgba(42,52,30,.12);overflow:hidden;position:relative}',
      '#yd-review-inline-system .yd-photo-tile img{width:100%;height:132px;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-photo-tile span{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.9);border-radius:10px;padding:4px 7px;color:#4f554d;font-size:11px;font-weight:700}',
      '#yd-review-inline-system .yd-native-note{display:flex;justify-content:space-between;gap:16px;align-items:center;border:1px solid rgba(42,52,30,.14);background:#fff;border-radius:6px;padding:14px 16px;color:#62675f;font-size:13px;line-height:1.58}',
      '#yd-review-inline-system .yd-native-note b{color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-concept-block{margin:0 0 24px;border-top:1px solid var(--yd-brand);border-bottom:1px solid rgba(42,52,30,.15);padding:18px 0;display:grid;gap:14px}',
      '#yd-review-inline-system .yd-concept-title{margin:0;font-size:16px;line-height:1.45;font-weight:800;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-concept-copy{margin:0;font-size:13px;line-height:1.7;color:#5f645c}',
      '#yd-review-inline-system .yd-metric-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}',
      '#yd-review-inline-system .yd-metric{border:1px solid rgba(42,52,30,.13);border-radius:6px;background:#f8f8f5;padding:13px 12px;min-height:86px}',
      '#yd-review-inline-system .yd-metric b{display:block;font-size:21px;line-height:1.15;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system .yd-metric span{display:block;margin-top:6px;font-size:12px;line-height:1.45;color:#656a62}',
      '#yd-review-inline-system .yd-answer-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
      '#yd-review-inline-system .yd-answer{border:1px solid rgba(42,52,30,.13);border-radius:6px;background:#fff;padding:13px 13px}',
      '#yd-review-inline-system .yd-answer b{display:block;margin-bottom:6px;font-size:13px;color:var(--yd-brand);font-weight:800}',
      '#yd-review-inline-system .yd-answer p{margin:0;font-size:12px;line-height:1.62;color:#5f645c}',
      '#yd-review-inline-system .yd-photo-led{display:grid;grid-template-columns:1.05fr .95fr;gap:12px;align-items:stretch}',
      '#yd-review-inline-system .yd-photo-led-main{min-height:260px;border:1px solid rgba(42,52,30,.12);border-radius:4px;overflow:hidden;background:#f1f2ef;position:relative}',
      '#yd-review-inline-system .yd-photo-led-main img{width:100%;height:100%;display:block;object-fit:cover}',
      '#yd-review-inline-system .yd-photo-led-main span{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.92);border:1px solid rgba(42,52,30,.1);border-radius:10px;padding:5px 8px;font-size:11px;font-weight:700;color:var(--yd-brand)}',
      '#yd-review-inline-system .yd-photo-led-side{display:grid;grid-template-columns:1fr 1fr;gap:8px}',
      '#yd-review-inline-system .yd-photo-led-side .yd-photo-tile{min-height:126px;margin:0}',
      '#yd-review-inline-system .yd-photo-led-side .yd-photo-tile img{height:126px}',
      '#yd-review-inline-system .yd-timeline{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}',
      '#yd-review-inline-system .yd-step{border-left:3px solid var(--yd-brand);background:#f8f8f5;padding:12px 12px;min-height:94px}',
      '#yd-review-inline-system .yd-step b{display:block;font-size:13px;color:var(--yd-brand);font-weight:800;margin-bottom:6px}',
      '#yd-review-inline-system .yd-step span{display:block;font-size:12px;line-height:1.55;color:#5f645c}',
      '#yd-review-inline-system .yd-quote-focus{display:grid;grid-template-columns:120px minmax(0,1fr);gap:14px;align-items:start}',
      '#yd-review-inline-system .yd-quote-score{border:1px solid rgba(42,52,30,.13);border-radius:6px;background:#f8f8f5;padding:14px 12px;text-align:center;color:var(--yd-brand)}',
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
      '#yd-review-inline-system[data-concept="c08"] .yd-keyword-row{position:sticky;top:0;z-index:2;background:#fff;padding:8px 0;border-top:1px solid rgba(42,52,30,.1);border-bottom:1px solid rgba(42,52,30,.1)}',
      '#yd-review-inline-system[data-concept="c09"] .yd-concept-block{background:#f8f8f5;border:1px solid rgba(42,52,30,.13);border-left:4px solid var(--yd-brand);border-radius:6px;padding:15px}',
      '#yd-review-inline-system[data-concept="c10"] .yd-lead-review{display:none}',
      '#yd-review-inline-system[data-filter="taste"] .yd-review-card:not([data-topic="taste"]),#yd-review-inline-system[data-filter="delivery"] .yd-review-card:not([data-topic="delivery"]),#yd-review-inline-system[data-filter="routine"] .yd-review-card:not([data-topic="routine"]),#yd-review-inline-system[data-filter="satiety"] .yd-review-card:not([data-topic="satiety"]){display:none}',
      '@media(max-width:900px){#yd-review-inline-system .yd-system-head,#yd-review-inline-system .yd-focus-grid{grid-template-columns:1fr}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr 1fr}#yd-review-inline-system .yd-product-img{height:170px}#yd-review-inline-system h3{font-size:23px}}',
      '@media(max-width:900px){#yd-review-inline-system .yd-metric-grid,#yd-review-inline-system .yd-answer-grid,#yd-review-inline-system .yd-photo-led,#yd-review-inline-system .yd-timeline{grid-template-columns:1fr 1fr}#yd-review-inline-system .yd-photo-led-main{min-height:220px}}',
      '@media(max-width:560px){#yd-prime-review-link{margin:10px 0 8px;padding:9px 0}#yd-prime-review-link .yd-prime-text{font-size:12px}#yd-prime-review-link .yd-prime-score{font-size:15px}#yd-prime-review-link button{height:28px;padding:0 9px}#yd-review-top-proof .yd-top-row{align-items:flex-start;flex-direction:column}#yd-review-inline-system{padding:24px 0 30px}#yd-review-inline-system .yd-system-head{gap:16px}#yd-review-inline-system h3{font-size:21px}#yd-review-inline-system .yd-lead-review{grid-template-columns:1fr}#yd-review-inline-system .yd-lead-photo{width:100%;max-width:180px}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip,#yd-review-inline-system .yd-metric-grid,#yd-review-inline-system .yd-answer-grid,#yd-review-inline-system .yd-photo-led,#yd-review-inline-system .yd-photo-led-side,#yd-review-inline-system .yd-timeline,#yd-review-inline-system .yd-quote-focus{grid-template-columns:1fr}#yd-review-inline-system .yd-product-img{height:220px}#yd-review-inline-system .yd-photo-led-main{min-height:240px}#yd-review-inline-system .yd-review-card{grid-template-columns:1fr;gap:8px}#yd-review-inline-system .yd-native-note{display:block}}'
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
    var target = document.querySelector('#yd-review-inline-system') || document.querySelector('#yd-review-top-proof') || document.querySelector('#first_review');
    if (target) target.scrollIntoView({behavior:'smooth', block:'start'});
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
  function makeReviewSystem(feed){
    var concept = currentConcept();
    var el = document.createElement('section');
    el.id = 'yd-review-inline-system';
    el.setAttribute('data-filter','all');
    el.setAttribute('data-concept', concept.id);

    var product = feed.product || {};
    var count = formatCount(product.review_count);
    var productHtml = (product.images || []).slice(0,3).map(imgCard).join('');
    var proofHtml = (feed.proof_cards || []).map(function(c){
      return '<div class="yd-proof-card"><b>'+escapeHtml(c.title)+'</b><p>'+escapeHtml(c.body)+'</p></div>';
    }).join('');
    var keywordHtml = (feed.keywords || []).map(function(k, i){
      return '<button type="button" class="'+(i === 0 ? 'is-active' : '')+'" data-filter-value="'+escapeHtml(k.id)+'">'+escapeHtml(k.label)+'</button>';
    }).join('');
    var reviewHtml = (feed.reviews || []).slice(1,7).map(function(r){
      return '<article class="yd-review-card" data-topic="'+escapeHtml(r.topic)+'"><div class="yd-review-side"><span class="yd-stars">★★★★★</span><span class="yd-topic">'+escapeHtml(topicLabel(r.topic))+'</span></div><div><p>'+escapeHtml(r.text)+'</p><small>'+escapeHtml(r.source)+' · '+escapeHtml(r.date)+(r.has_image ? ' · 포토 리뷰' : '')+'</small></div></article>';
    }).join('');
    var photoHtml = (feed.review_images || []).slice(0,8).map(photoCard).join('');

    el.innerHTML = [
      '<div class="yd-system-head"><div><p class="yd-kicker">'+escapeHtml(concept.kicker)+'</p><h3>'+escapeHtml(concept.headline)+'</h3><p class="yd-sub">'+escapeHtml(concept.sub)+'</p></div><div class="yd-score-panel"><div class="yd-stars">★★★★★</div><strong>'+escapeHtml(product.rating || '')+'</strong><span>총 '+count+'개의 구매평</span><p class="yd-source-note">공개 상품 페이지 기준<br>'+escapeHtml(feed.generated_at_kst || '')+' KST</p></div></div>',
      makeConceptBlock(feed, concept),
      '<div class="yd-focus-grid"><div><p class="yd-section-label">가장 먼저 보여줄 장문 구매평</p>'+makeLeadReview(feed)+'</div><div><p class="yd-section-label">구매 망설임별 요약</p><div class="yd-proof-grid">'+proofHtml+'</div></div></div>',
      '<p class="yd-section-label">실제 상품 이미지</p><div class="yd-product-strip">'+productHtml+'</div>',
      '<p class="yd-section-label">키워드별 구매평 보기</p><div class="yd-keyword-row">'+keywordHtml+'</div>',
      '<div class="yd-review-list">'+reviewHtml+'</div>',
      '<p class="yd-section-label">포토 구매평 모아보기</p><div class="yd-photo-strip">'+photoHtml+'</div>',
      '<div class="yd-native-note"><span><b>원본 구매평 목록은 아래에서 계속 확인할 수 있어요.</b><br>이 영역은 구매자가 먼저 알고 싶은 포인트만 위로 끌어올린 상품 상세형 리뷰 요약입니다.</span><span>고객 ID 마스킹 · 공개 리뷰 기준</span></div>'
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
    return el;
  }
  var responsiveSyncTimer = null;
  var responsiveSyncBound = false;
  function placeReviewSystem(feed){
    var review = bestReviewTarget();
    if (!review) return false;
    var system = document.getElementById('yd-review-inline-system') || makeReviewSystem(feed);
    var wrap = review.matches && review.matches('._review_wrap') ? review : (review.querySelector && review.querySelector('._review_wrap'));
    if (wrap && wrap.parentNode && visible(wrap)) {
      if (system.parentNode !== wrap.parentNode || system.nextSibling !== wrap) wrap.parentNode.insertBefore(system, wrap);
    } else if (system.parentNode !== review || review.firstChild !== system) {
      review.insertBefore(system, review.firstChild);
    }
    return true;
  }
  function syncResponsiveReviewUi(feed){
    if (variantHas('d')) enhanceMobileBottomCta(feed);
    placeReviewSystem(feed);
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
    bindResponsiveReviewUi(feed);
    waitFor(function(){
      return document.querySelector('#prod_goods_form header h1') || document.querySelector('#prod_goods_form .view_tit') || document.querySelector('#prod_goods_form .pay_detail.full-width');
    }, function(anchor){
      if (variantHas('a2') && !document.getElementById('yd-prime-review-link')) {
        anchor.insertAdjacentElement('afterend', makePrimeReviewLink(feed));
      }
      if (variantHas('d')) enhanceMobileBottomCta(feed);
    });
    waitFor(function(){
      return variantHas('d') && window.matchMedia && window.matchMedia('(max-width: 640px)').matches && document.querySelector('.buy_btns.mobile .cart_btn a.btn.defualt-cart');
    }, function(){
      enhanceMobileBottomCta(feed);
    });
    waitFor(function(){
      return document.querySelector('._item_detail_wrap') || document.querySelector('.item_detail') || Array.prototype.find.call(document.querySelectorAll('a,button'), function(el){
        return visible(el) && /구매하기/.test(text(el));
      });
    }, function(target){
      if (!document.getElementById('yd-review-top-proof')) {
        var anchor = target.classList && (target.classList.contains('_item_detail_wrap') || target.classList.contains('item_detail')) ? target : target.parentElement;
        anchor.insertAdjacentElement('afterend', makeTopBar(feed));
      }
    });
    waitFor(bestReviewTarget, function(review){
      placeReviewSystem(feed);
    });
  }
  ready(function(){
    fetch(feedUrl, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(function(res){
        if (!res.ok) throw new Error('feed_http_'+res.status);
        return res.json();
      })
      .then(render)
      .catch(function(err){
        console.warn('[YD Review Widget] feed load failed', err);
      });
  });
})();
