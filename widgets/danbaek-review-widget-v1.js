(function(){
  if (window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__) return;
  window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__ = true;

  var config = window.YD_DANBAEK_REVIEW_WIDGET_CONFIG || {};
  var feedUrl = config.feedUrl || 'https://2019yundiet-cloud.github.io/yundiet-review-widget-preview/feeds/danbaekbap-review-feed.json';
  if (location.href.indexOf('/admin') !== -1 || location.href.indexOf('/_/') !== -1) return;

  function isProductPage(){
    return document.body.classList.contains('shop_view') || location.pathname.indexOf('/shop_view') !== -1;
  }
  if (!isProductPage()) return;

  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
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
      '#yd-review-inline-system[data-filter="taste"] .yd-review-card:not([data-topic="taste"]),#yd-review-inline-system[data-filter="delivery"] .yd-review-card:not([data-topic="delivery"]),#yd-review-inline-system[data-filter="routine"] .yd-review-card:not([data-topic="routine"]),#yd-review-inline-system[data-filter="satiety"] .yd-review-card:not([data-topic="satiety"]){display:none}',
      '@media(max-width:900px){#yd-review-inline-system .yd-system-head,#yd-review-inline-system .yd-focus-grid{grid-template-columns:1fr}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr 1fr}#yd-review-inline-system .yd-product-img{height:170px}#yd-review-inline-system h3{font-size:23px}}',
      '@media(max-width:560px){#yd-prime-review-link{margin:10px 0 8px;padding:9px 0}#yd-prime-review-link .yd-prime-text{font-size:12px}#yd-prime-review-link .yd-prime-score{font-size:15px}#yd-prime-review-link button{height:28px;padding:0 9px}#yd-review-top-proof .yd-top-row{align-items:flex-start;flex-direction:column}#yd-review-inline-system{padding:24px 0 30px}#yd-review-inline-system .yd-system-head{gap:16px}#yd-review-inline-system h3{font-size:21px}#yd-review-inline-system .yd-lead-review{grid-template-columns:1fr}#yd-review-inline-system .yd-lead-photo{width:100%;max-width:180px}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr}#yd-review-inline-system .yd-product-img{height:220px}#yd-review-inline-system .yd-review-card{grid-template-columns:1fr;gap:8px}#yd-review-inline-system .yd-native-note{display:block}}'
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
  function makeTopBar(feed){
    var count = formatCount(feed.product && feed.product.review_count);
    var el = document.createElement('div');
    el.id = 'yd-review-top-proof';
    el.innerHTML = '<div class="yd-top-row"><div class="yd-score"><span class="yd-stars">★★★★★</span><strong>'+escapeHtml(feed.product.rating)+'</strong><span>실제 구매평 '+count+'개에서 확인한 단백밥 핵심 포인트</span></div><button type="button" class="yd-jump">구매평 핵심 보기</button></div><div class="yd-mini-tags"><span>포만감</span><span>맛/영양</span><span>직장 점심</span><span>재구매</span></div>';
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
    var count = formatCount(feed.product && feed.product.review_count);
    var el = document.createElement('div');
    el.id = 'yd-prime-review-link';
    el.innerHTML = '<div class="yd-prime-main"><span class="yd-stars">★★★★★</span><span class="yd-prime-score">'+escapeHtml(feed.product.rating)+'</span><span class="yd-prime-text">실제 구매평 '+count+'개 · 핵심 보기</span></div><button type="button">리뷰보기</button>';
    el.querySelector('button').addEventListener('click', scrollToReviewSystem);
    return el;
  }
  function enhanceMobileBottomCta(feed){
    if (!window.matchMedia || !window.matchMedia('(max-width: 640px)').matches) return;
    var cart = document.querySelector('.buy_btns.mobile .cart_btn a.btn.defualt-cart');
    if (!cart || cart.getAttribute('data-yd-review-bound') === '1') return;
    var wrap = cart.closest && cart.closest('.cart_btn');
    cart.setAttribute('data-yd-review-bound', '1');
    cart.setAttribute('data-yd-original-label', text(cart));
    cart.setAttribute('href', 'javascript:void(0)');
    cart.innerHTML = '<span class="yd-mobile-review-score">'+escapeHtml(feed.product.rating || '')+'</span><span class="yd-mobile-review-label">리뷰보기</span>';
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
    var el = document.createElement('section');
    el.id = 'yd-review-inline-system';
    el.setAttribute('data-filter','all');

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
      '<div class="yd-system-head"><div><p class="yd-kicker">윤식단 단백밥 실제 구매평</p><h3>구매 전 가장 많이 확인하는 리뷰 포인트</h3><p class="yd-sub">원본 구매평을 길게 훑기 전에 포만감, 맛과 영양, 직장 점심 루틴, 재구매 신호를 먼저 확인할 수 있도록 실제 공개 리뷰를 재배치했습니다.</p></div><div class="yd-score-panel"><div class="yd-stars">★★★★★</div><strong>'+escapeHtml(product.rating || '')+'</strong><span>총 '+count+'개의 구매평</span><p class="yd-source-note">공개 상품 페이지 기준<br>'+escapeHtml(feed.generated_at_kst || '')+' KST</p></div></div>',
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
  function render(feed){
    injectStyle();
    if (document.getElementById('yd-review-preview-root')) document.getElementById('yd-review-preview-root').remove();
    waitFor(function(){
      return document.querySelector('#prod_goods_form header h1') || document.querySelector('#prod_goods_form .view_tit') || document.querySelector('#prod_goods_form .pay_detail.full-width');
    }, function(anchor){
      if (!document.getElementById('yd-prime-review-link')) {
        anchor.insertAdjacentElement('afterend', makePrimeReviewLink(feed));
      }
      enhanceMobileBottomCta(feed);
    });
    waitFor(function(){
      return window.matchMedia && window.matchMedia('(max-width: 640px)').matches && document.querySelector('.buy_btns.mobile .cart_btn a.btn.defualt-cart');
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
      if (document.getElementById('yd-review-inline-system')) return;
      var system = makeReviewSystem(feed);
      var wrap = review.matches && review.matches('._review_wrap') ? review : (review.querySelector && review.querySelector('._review_wrap'));
      if (wrap && wrap.parentNode && visible(wrap)) wrap.parentNode.insertBefore(system, wrap);
      else review.insertBefore(system, review.firstChild);
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
