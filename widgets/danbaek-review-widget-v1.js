(function(){
  if (window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__) return;
  window.__YD_EXTERNAL_REVIEW_WIDGET_ACTIVE__ = true;
  var config = window.YD_DANBAEK_REVIEW_WIDGET_CONFIG || {};
  var feedUrl = config.feedUrl || 'https://2019yundiet-cloud.github.io/yundiet-review-widget-preview/feeds/danbaekbap-review-feed.json';
  if (location.href.indexOf('/admin') !== -1 || location.href.indexOf('/_/') !== -1) return;
  function isProductPage(){ return document.body.classList.contains('shop_view') || location.pathname.indexOf('/shop_view') !== -1; }
  if (!isProductPage()) return;
  function ready(fn){ if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  function escapeHtml(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function text(el){ return (el && (el.innerText || el.textContent) || '').replace(/\s+/g,' ').trim(); }
  function visible(el){ if(!el) return false; var r = el.getBoundingClientRect(); var cs = getComputedStyle(el); return r.width > 1 && r.height > 1 && cs.display !== 'none' && cs.visibility !== 'hidden'; }
  function waitFor(fn, cb, tries){ tries = tries || 0; var value = fn(); if(value) return cb(value); if(tries > 60) return; setTimeout(function(){ waitFor(fn, cb, tries + 1); }, 200); }
  function bestReviewTarget(){
    var candidates = Array.prototype.slice.call(document.querySelectorAll('#first_review, .detail_review_wrap, ._detail_review_wrap, ._review_wrap'));
    candidates = candidates.map(function(el){ var r = el.getBoundingClientRect(); return {el:el, w:r.width, h:r.height, area:Math.max(0,r.width) * Math.max(0,r.height)}; }).filter(function(o){ return o.w > 300 && o.h > 80 && getComputedStyle(o.el).display !== 'none' && getComputedStyle(o.el).visibility !== 'hidden'; });
    candidates.sort(function(a,b){ return b.area - a.area; });
    return candidates.length ? candidates[0].el : null;
  }
  function injectStyle(){
    if (document.getElementById('yd-inline-review-style')) return;
    var style = document.createElement('style');
    style.id = 'yd-inline-review-style';
    style.textContent = '#yd-review-top-proof,#yd-review-inline-system{font-family:Inter,Apple SD Gothic Neo,Noto Sans KR,system-ui,-apple-system,BlinkMacSystemFont,sans-serif;color:#1c241f;letter-spacing:0;box-sizing:border-box}#yd-review-top-proof *,#yd-review-inline-system *{box-sizing:border-box;letter-spacing:0}#yd-review-top-proof{margin:18px 0 16px;border:1px solid #dfe9e3;background:#fbfdfb;border-radius:8px;padding:14px 16px;display:grid;gap:12px}#yd-review-top-proof .yd-top-row{display:flex;align-items:center;justify-content:space-between;gap:12px}#yd-review-top-proof .yd-score{display:flex;align-items:center;gap:10px;min-width:0}#yd-review-top-proof .yd-score strong{font-size:24px;line-height:1;font-weight:900;color:#137a42}#yd-review-top-proof .yd-score span{font-size:13px;color:#5d7064}#yd-review-top-proof .yd-jump{border:1px solid #cbdcd2;background:#fff;color:#244b34;border-radius:8px;height:34px;padding:0 12px;font-size:12px;font-weight:800;cursor:pointer;white-space:nowrap}#yd-review-top-proof .yd-mini-tags{display:flex;flex-wrap:wrap;gap:6px}#yd-review-top-proof .yd-mini-tags span{border:1px solid #d7e6dd;background:#fff;border-radius:999px;padding:6px 9px;font-size:12px;color:#365a43}#yd-review-inline-system{border-top:2px solid #1d2b22;padding:28px 0 34px;margin:8px 0 28px;background:#fff}#yd-review-inline-system .yd-system-head{display:grid;grid-template-columns:minmax(0,1fr) 250px;gap:24px;align-items:end;margin-bottom:22px}#yd-review-inline-system .yd-kicker{margin:0 0 8px;font-size:12px;color:#137a42;font-weight:900;text-transform:uppercase}#yd-review-inline-system h3{margin:0;font-size:28px;line-height:1.25;font-weight:900;color:#17201a}#yd-review-inline-system .yd-sub{margin:10px 0 0;font-size:14px;line-height:1.6;color:#5d7064}#yd-review-inline-system .yd-score-panel{border:1px solid #dfe9e3;border-radius:8px;background:#f8fbf9;padding:16px}#yd-review-inline-system .yd-score-panel strong{display:block;font-size:36px;line-height:1;font-weight:900;color:#137a42}#yd-review-inline-system .yd-score-panel span{display:block;margin-top:7px;font-size:13px;color:#5f7467}#yd-review-inline-system .yd-source-note{margin-top:8px;font-size:11px;line-height:1.5;color:#7a8b80}#yd-review-inline-system .yd-product-strip{display:grid;grid-template-columns:1.15fr 1fr 1fr;gap:10px;margin-bottom:20px}#yd-review-inline-system .yd-product-img{min-height:160px;border:1px solid #dfe9e3;border-radius:8px;overflow:hidden;background:#f5f7f5;position:relative}#yd-review-inline-system .yd-product-img img{width:100%;height:100%;min-height:160px;display:block;object-fit:cover}#yd-review-inline-system .yd-product-img span{position:absolute;left:10px;bottom:10px;background:rgba(255,255,255,.92);border-radius:999px;padding:6px 9px;font-size:11px;font-weight:850;color:#244b34}#yd-review-inline-system .yd-proof-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:20px}#yd-review-inline-system .yd-proof-card{border:1px solid #dfe9e3;border-radius:8px;background:#fbfdfb;padding:14px 13px;min-height:104px}#yd-review-inline-system .yd-proof-card b{display:block;font-size:14px;color:#172a1d;margin-bottom:6px}#yd-review-inline-system .yd-proof-card p{margin:0;font-size:12px;line-height:1.55;color:#617367}#yd-review-inline-system .yd-keyword-row{display:flex;flex-wrap:wrap;gap:8px;margin:0 0 18px}#yd-review-inline-system .yd-keyword-row button{height:34px;border:1px solid #d5e2da;background:#fff;border-radius:999px;padding:0 12px;color:#2d4f3a;font-size:12px;font-weight:800;cursor:pointer}#yd-review-inline-system .yd-keyword-row button.is-active{background:#137a42;color:#fff;border-color:#137a42}#yd-review-inline-system .yd-review-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;margin-bottom:18px}#yd-review-inline-system .yd-review-card{border:1px solid #e2ebe5;border-radius:8px;background:#fff;padding:15px;min-height:172px}#yd-review-inline-system .yd-review-card .yd-stars{color:#137a42;font-weight:900;font-size:13px;margin-bottom:9px}#yd-review-inline-system .yd-review-card p{margin:0;font-size:13px;line-height:1.7;color:#24332a;display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}#yd-review-inline-system .yd-review-card small{display:block;margin-top:12px;font-size:11px;color:#7a8b80}#yd-review-inline-system .yd-photo-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:18px}#yd-review-inline-system .yd-photo-tile{border-radius:8px;min-height:132px;background:#f5f7f5;border:1px solid #dfe9e3;overflow:hidden;position:relative}#yd-review-inline-system .yd-photo-tile img{width:100%;height:132px;display:block;object-fit:cover}#yd-review-inline-system .yd-photo-tile span{position:absolute;left:8px;bottom:8px;background:rgba(255,255,255,.9);border-radius:999px;padding:5px 8px;color:#2a4635;font-size:11px;font-weight:850}#yd-review-inline-system .yd-native-note{display:flex;justify-content:space-between;gap:16px;align-items:center;border:1px dashed #cbdcd2;background:#f9fbfa;border-radius:8px;padding:14px 16px;color:#52675b;font-size:13px;line-height:1.55}#yd-review-inline-system .yd-native-note b{color:#203529}#yd-review-inline-system[data-filter="taste"] .yd-review-card:not([data-topic="taste"]),#yd-review-inline-system[data-filter="delivery"] .yd-review-card:not([data-topic="delivery"]),#yd-review-inline-system[data-filter="routine"] .yd-review-card:not([data-topic="routine"]),#yd-review-inline-system[data-filter="satiety"] .yd-review-card:not([data-topic="satiety"]){opacity:.38}#yd-review-inline-system .yd-section-label{font-size:12px;font-weight:900;color:#137a42;margin:0 0 10px}@media(max-width:900px){#yd-review-inline-system .yd-system-head{grid-template-columns:1fr}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-review-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr 1fr}#yd-review-inline-system h3{font-size:23px}}@media(max-width:560px){#yd-review-top-proof .yd-top-row{align-items:flex-start;flex-direction:column}#yd-review-inline-system{padding:22px 0 28px}#yd-review-inline-system .yd-proof-grid,#yd-review-inline-system .yd-review-grid,#yd-review-inline-system .yd-photo-strip,#yd-review-inline-system .yd-product-strip{grid-template-columns:1fr}#yd-review-inline-system h3{font-size:21px}#yd-review-inline-system .yd-native-note{display:block}}';
    document.head.appendChild(style);
  }
  function imgCard(item, idx){ return item && item.url ? '<div class="yd-product-img"><img loading="lazy" src="'+escapeHtml(item.url)+'" alt="윤식단 단백밥 실제 상품 이미지"><span>'+escapeHtml(item.label || ('실제 상품 이미지 '+(idx+1)))+'</span></div>' : ''; }
  function photoCard(item, idx){ return item && item.url ? '<div class="yd-photo-tile"><img loading="lazy" src="'+escapeHtml(item.url)+'" alt="윤식단 단백밥 실제 포토 구매평 이미지"><span>'+escapeHtml(item.label || ('포토 구매평 '+(idx+1)))+'</span></div>' : ''; }
  function makeTopBar(feed){
    var count = Number(feed.product.review_count || 0).toLocaleString('ko-KR');
    var el = document.createElement('div');
    el.id = 'yd-review-top-proof';
    el.innerHTML = '<div class="yd-top-row"><div class="yd-score"><strong>'+escapeHtml(feed.product.rating)+'</strong><span>단백밥 실제 리뷰 '+count+'개 기반</span></div><button type="button" class="yd-jump">실제 리뷰 UX 보기</button></div><div class="yd-mini-tags"><span>포만감</span><span>맛/영양</span><span>직장 점심</span><span>재구매</span></div>';
    el.querySelector('.yd-jump').addEventListener('click', function(){ var target = document.querySelector('#yd-review-inline-system') || document.querySelector('#first_review'); if(target) target.scrollIntoView({behavior:'smooth', block:'start'}); });
    return el;
  }
  function makeReviewSystem(feed){
    var el = document.createElement('section');
    el.id = 'yd-review-inline-system';
    el.setAttribute('data-filter','all');
    var count = Number(feed.product.review_count || 0).toLocaleString('ko-KR');
    var productHtml = (feed.product.images || []).slice(0,3).map(imgCard).join('');
    var proofHtml = (feed.proof_cards || []).map(function(c){ return '<div class="yd-proof-card"><b>'+escapeHtml(c.title)+'</b><p>'+escapeHtml(c.body)+'</p></div>'; }).join('');
    var keywordHtml = (feed.keywords || []).map(function(k, i){ return '<button type="button" class="'+(i===0?'is-active':'')+'" data-filter="'+escapeHtml(k.id)+'">'+escapeHtml(k.label)+'</button>'; }).join('');
    var reviewHtml = (feed.reviews || []).slice(0,6).map(function(r){ return '<article class="yd-review-card" data-topic="'+escapeHtml(r.topic)+'"><div class="yd-stars">★★★★★</div><p>'+escapeHtml(r.text)+'</p><small>'+escapeHtml(r.source)+' · '+escapeHtml(r.date)+(r.has_image ? ' · 포토' : '')+'</small></article>'; }).join('');
    var photoHtml = (feed.review_images || []).slice(0,8).map(photoCard).join('');
    el.innerHTML = [
      '<div class="yd-system-head"><div><p class="yd-kicker">단백밥 실제 공개 리뷰 피드 · 상품 상세 내장형</p><h3>실제 단백밥 리뷰를 구매 망설임별로 재배치한 UX</h3><p class="yd-sub">현재 영역은 외부 리뷰 피드에서 불러온 실제 공개 구매평과 사진을 사용합니다. 원본 리뷰 목록을 그대로 복사해 붙이는 대신, 구매자가 판단하기 쉬운 구조로 요약·배치했습니다.</p></div><div class="yd-score-panel"><strong>'+escapeHtml(feed.product.rating)+'</strong><span>실제 구매평 '+count+'개</span><p class="yd-source-note">피드 생성: '+escapeHtml(feed.generated_at_kst || '')+' KST<br>출처: 윤식단 단백밥 공개 상품 페이지</p></div></div>',
      '<p class="yd-section-label">실제 단백밥 상품 사진</p><div class="yd-product-strip">'+productHtml+'</div>',
      '<div class="yd-proof-grid">'+proofHtml+'</div>',
      '<p class="yd-section-label">실제 리뷰 키워드 필터 시안</p><div class="yd-keyword-row">'+keywordHtml+'</div>',
      '<div class="yd-review-grid">'+reviewHtml+'</div>',
      '<p class="yd-section-label">실제 포토 구매평 이미지</p><div class="yd-photo-strip">'+photoHtml+'</div>',
      '<div class="yd-native-note"><span><b>아래 기존 구매평 목록은 유지</b><br>운영 버전에서는 이 외부 피드가 주기적으로 갱신되며, Footer Code는 같은 UI를 계속 재사용합니다.</span><span>현재 테스트: 외부 피드 기반 · 고객 ID 마스킹</span></div>'
    ].join('');
    Array.prototype.forEach.call(el.querySelectorAll('[data-filter]'), function(btn){ btn.addEventListener('click', function(){ var f = btn.getAttribute('data-filter'); el.setAttribute('data-filter', f); Array.prototype.forEach.call(el.querySelectorAll('[data-filter]'), function(b){ b.classList.toggle('is-active', b === btn); }); }); });
    return el;
  }
  function render(feed){
    injectStyle();
    if (document.getElementById('yd-review-preview-root')) document.getElementById('yd-review-preview-root').remove();
    waitFor(function(){ return document.querySelector('._item_detail_wrap') || document.querySelector('.item_detail') || Array.prototype.find.call(document.querySelectorAll('a,button'), function(el){ return visible(el) && /구매하기/.test(text(el)); }); }, function(target){
      if (!document.getElementById('yd-review-top-proof')) {
        var anchor = target.classList && (target.classList.contains('_item_detail_wrap') || target.classList.contains('item_detail')) ? target : target.parentElement;
        anchor.insertAdjacentElement('afterend', makeTopBar(feed));
      }
    });
    waitFor(bestReviewTarget, function(review){
      if (document.getElementById('yd-review-inline-system')) return;
      var system = makeReviewSystem(feed);
      var wrap = review.matches && review.matches('._review_wrap') ? review : (review.querySelector && review.querySelector('._review_wrap'));
      if (wrap && wrap.parentNode && visible(wrap)) wrap.parentNode.insertBefore(system, wrap); else review.insertBefore(system, review.firstChild);
    });
  }
  ready(function(){
    fetch(feedUrl, { mode: 'cors', credentials: 'omit', cache: 'no-store' })
      .then(function(res){ if(!res.ok) throw new Error('feed_http_'+res.status); return res.json(); })
      .then(render)
      .catch(function(err){ console.warn('[YD Review Widget] feed load failed', err); });
  });
})();

