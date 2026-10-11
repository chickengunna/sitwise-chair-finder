/* Sitwise — app logic */
(() => {
  const $ = (s, e = document) => e.querySelector(s);
  const grid = $('#grid'), panel = $('#panel'), tip = $('#tip'), welcome = $('#welcome');
  const drawer = $('#drawer'), scrim = $('#scrim'), menu = $('#menu'), moreBtn = $('#moreBtn');

  /* ---------- state ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('sitwise.' + k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem('sitwise.' + k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
  };
  const state = {
    lang: store.get('lang', (navigator.language || 'en').startsWith('ru') ? 'ru' : 'en'),
    answers: store.get('answers', {}),
    shortlist: store.get('shortlist', []),
  };
  const L = () => (state.lang === 'ru' ? 1 : 0);
  const tr = x => (Array.isArray(x) ? x[L()] : x);
  const ui = k => tr(UI[k]);
  const money = n => new Intl.NumberFormat(state.lang === 'ru' ? 'ru-RU' : 'en-GB', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

  const isAnswered = (q, a) => (q.type === 'multi' ? Array.isArray(a) && a.length > 0 : a !== undefined && a !== null);

  /* ---------- scoring ---------- */
  let scores = [];
  function compute() {
    scores = CHAIRS.map(c => {
      const parts = [];
      QUESTIONS.forEach((q, qi) => {
        const a = state.answers[q.slug];
        if (isAnswered(q, a)) parts.push({ qi, s: q.score(c, a) });
      });
      const total = parts.length ? Math.round(parts.reduce((t, p) => t + p.s, 0) / parts.length) : null;
      return { total, parts };
    });
  }
  function reasons(c) {
    const out = [];
    scores[c.id].parts.forEach(p => {
      if (p.s < 75) return;
      const q = QUESTIONS[p.qi], a = state.answers[q.slug];
      if (q.type === 'multi') {
        a.filter(i => q.score(c, [i]) >= 75).forEach(i => out.push(tr(q.answers[i].m)));
      } else out.push(tr(q.answers[a].m));
    });
    return out;
  }

  /* ---------- grid ---------- */
  const items = CHAIRS.map(c => {
    const b = document.createElement('button');
    b.className = 'chair';
    b.innerHTML = `<span class="art">${chairSVG(c, 'm' + c.id)}</span><span class="rank"></span><span class="pct"></span>`;
    b.addEventListener('click', () => openDrawer(c.id));
    b.addEventListener('mouseenter', () => showTip(c, b));
    b.addEventListener('focus', () => showTip(c, b));
    b.addEventListener('mouseleave', hideTip);
    b.addEventListener('blur', hideTip);
    grid.appendChild(b);
    return b;
  });

  function layout() {
    const W = grid.clientWidth;
    const cols = W > 1250 ? 8 : W > 950 ? 7 : W > 760 ? 6 : W > 520 ? 4 : 3;
    const cw = W / cols, ch = Math.max(138, cw * 1.12);
    const order = CHAIRS.map(c => c.id);
    if (scores.some(s => s.total !== null)) order.sort((a, b) => (scores[b].total ?? 0) - (scores[a].total ?? 0) || a - b);
    order.forEach((id, pos) => {
      const el = items[id];
      el.style.width = cw + 'px'; el.style.height = ch + 'px';
      el.style.transform = `translate(${(pos % cols) * cw}px, ${Math.floor(pos / cols) * ch}px)`;
    });
    grid.style.height = Math.ceil(order.length / cols) * ch + 'px';
    return order;
  }

  function update() {
    compute();
    const order = layout();
    const any = scores.some(s => s.total !== null);
    const results = location.hash.startsWith('#/results');
    items.forEach((el, id) => {
      const t = scores[id].total, rank = order.indexOf(id);
      el.classList.remove('dim', 'mid', 'hit', 'top');
      if (any) el.classList.add(t >= 75 ? 'hit' : t >= 50 ? 'mid' : 'dim');
      if (any && results && rank < 3 && t >= 50) el.classList.add('top');
      $('.rank', el).textContent = rank + 1;
      $('.pct', el).textContent = any ? t + '%' : '';
      el.setAttribute('aria-label', CHAIRS[id].name + (any ? ` — ${t}%` : ''));
    });
  }

  /* ---------- tooltip ---------- */
  function showTip(c, el) {
    const r = $('.art', el).getBoundingClientRect(), s = scores[c.id];
    const rs = s.total === null ? [] : reasons(c);
    tip.innerHTML = `<b>${c.name}</b>` + (rs.length ? `<ul>${rs.map(x => `<li>${x}</li>`).join('')}</ul>` : '')
      + (s.total !== null ? `<div class="pctline">${s.total}% ${ui('match')}</div>` : `<div class="pctline">${c.year} · ${money(c.price)}</div>`);
    tip.hidden = false;
    const x = Math.min(Math.max(r.left + r.width / 2, 130), innerWidth - 130);
    const below = r.top < tip.offsetHeight + 24;
    tip.style.left = x + 'px';
    tip.style.top = (below ? r.bottom + 8 : r.top - 8) + 'px';
    tip.style.transform = below ? 'translate(-50%, 0)' : 'translate(-50%, -100%)';
  }
  function hideTip() { tip.hidden = true; }

  /* ---------- drawer ---------- */
  let openId = null;
  function openDrawer(id) {
    openId = id; hideTip(); renderDrawer();
    drawer.classList.add('on'); scrim.classList.add('on'); drawer.setAttribute('aria-hidden', 'false');
    $('.x', drawer).focus();
  }
  function closeDrawer() {
    openId = null; drawer.classList.remove('on'); scrim.classList.remove('on'); drawer.setAttribute('aria-hidden', 'true');
  }
  function dots(n, max) { return `<span class="dots">${Array.from({ length: max }, (_, i) => `<i class="${i < n ? 'on' : ''}"></i>`).join('')}</span>`; }
  function renderDrawer() {
    if (openId === null) return;
    const c = CHAIRS[openId], s = scores[openId], rs = s.total === null ? [] : reasons(c), saved = state.shortlist.includes(c.id);
    drawer.innerHTML = `
      <button class="x" aria-label="${ui('close')}">×</button>
      <div class="hero">${chairSVG(c, 'd' + c.id)}</div>
      <h2>${c.name}</h2>
      <p class="meta">${c.year} · ${money(c.price)}</p>
      ${s.total !== null ? `<div class="big-pct">${s.total}%<small>${ui('match')}</small></div>` : ''}
      ${rs.length ? `<h3>${ui('whyFits')}</h3><ul class="why">${rs.map(x => `<li>${x}</li>`).join('')}</ul>` : ''}
      <h3>${ui('specs')}</h3>
      <div class="spec"><span>${ui('longSitting')}</span>${dots(c.hours, 3)}</div>
      <div class="spec"><span>${ui('adjust')}</span>${dots(c.adj, 3)}</div>
      <div class="spec"><span>${ui('breath')}</span>${dots(c.breath + 1, 3)}</div>
      <div class="spec"><span>${ui('padding')}</span>${dots(c.pad + 1, 4)}</div>
      <div class="spec"><span>${ui('armrests')}</span><span>${tr(UI.armsMap[c.arms])}</span></div>
      <button class="save ${saved ? 'on' : ''}">${saved ? '♥ ' + ui('saved') : '♡ ' + ui('save')}</button>`;
    $('.x', drawer).onclick = closeDrawer;
    $('.save', drawer).onclick = () => {
      const i = state.shortlist.indexOf(c.id);
      i < 0 ? state.shortlist.push(c.id) : state.shortlist.splice(i, 1);
      store.set('shortlist', state.shortlist); renderDrawer(); renderMenu();
    };
  }
  scrim.addEventListener('click', closeDrawer);

  /* ---------- panel ---------- */
  const slugs = QUESTIONS.map(q => q.slug);
  function setHint(el, q, a) {
    const set = isAnswered(q, a);
    el.classList.toggle('set', set);
    if (q.type === 'multi') el.textContent = set ? a.map(i => tr(q.answers[i].t)).join(' · ') : ui('chooseMulti');
    else el.textContent = set ? tr(q.answers[a].t) : (q.type === 'yesno' ? ui('chooseYN') : ui('choose'));
  }
  function renderQuestion(slug) {
    const qi = slugs.indexOf(slug), q = QUESTIONS[qi];
    const prev = qi === 0 ? '#/' : '#/q/' + slugs[qi - 1];
    const next = qi === slugs.length - 1 ? '#/results' : '#/q/' + slugs[qi + 1];
    panel.innerHTML = `
      <div class="progress"><i style="width:${((qi + 1) / slugs.length) * 100}%"></i></div>
      <div class="head">
        <a class="nav" href="${prev}" aria-label="${ui('back')}">‹</a>
        <div class="title">${tr(q.q)}<button class="i-btn" aria-label="${ui('moreInfo')}" aria-expanded="false">i</button></div>
        <a class="nav" href="${next}" aria-label="${ui('fwd')}">›</a>
      </div>
      <p class="info" hidden>${tr(q.info)}</p>
      <div class="ctl"></div>
      <div class="hint"></div>`;
    const ctl = $('.ctl', panel), hint = $('.hint', panel);
    const cur = state.answers[slug];
    setHint(hint, q, cur);

    $('.i-btn', panel).onclick = e => {
      const info = $('.info', panel), open = info.hidden;
      info.hidden = !open; e.currentTarget.setAttribute('aria-expanded', open);
    };

    const commit = v => { state.answers[slug] = v; store.set('answers', state.answers); setHint(hint, q, v); update(); renderDrawer(); };

    if (q.type === 'slider') {
      const n = q.answers.length, unset = cur === undefined;
      ctl.innerHTML = `<div class="slider ${unset ? 'unset' : ''}">
          <input type="range" min="0" max="${n - 1}" step="1" value="${unset ? Math.floor((n - 1) / 2) : cur}" aria-label="${tr(q.q)}">
          ${q.ticks ? `<div class="ticks">${'<i></i>'.repeat(n)}</div>` : ''}
        </div>
        <div class="ends"><span>${tr(q.min)}</span><span>${tr(q.max)}</span></div>`;
      const wrap = $('.slider', ctl), inp = $('input', ctl);
      const go = () => { wrap.classList.remove('unset'); commit(+inp.value); };
      inp.addEventListener('input', go);
      inp.addEventListener('pointerup', () => { if (wrap.classList.contains('unset')) go(); });
    } else if (q.type === 'yesno') {
      ctl.innerHTML = `<div class="choices yn">${q.answers.map((a, i) => `<button class="chip" aria-pressed="${cur === i}" data-i="${i}">${tr(a.t)}</button>`).join('')}</div>`;
      ctl.querySelectorAll('.chip').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; ctl.querySelectorAll('.chip').forEach(x => x.setAttribute('aria-pressed', x === b)); commit(i);
      });
    } else {
      const sel = new Set(cur || []);
      ctl.innerHTML = `<div class="choices">${q.answers.map((a, i) => `<button class="chip" aria-pressed="${sel.has(i)}" data-i="${i}">${tr(a.t)}</button>`).join('')}</div>`;
      ctl.querySelectorAll('.chip').forEach(b => b.onclick = () => {
        const i = +b.dataset.i; sel.has(i) ? sel.delete(i) : sel.add(i);
        b.setAttribute('aria-pressed', sel.has(i));
        const arr = [...sel].sort();
        state.answers[slug] = arr; store.set('answers', state.answers); setHint(hint, q, arr); update(); renderDrawer();
      });
    }
  }

  function renderResults() {
    const any = scores.some(s => s.total !== null);
    const top = CHAIRS.map(c => c.id).sort((a, b) => (scores[b].total ?? 0) - (scores[a].total ?? 0) || a - b).slice(0, 3);
    const great = scores.filter(s => s.total >= 75).length;
    panel.innerHTML = `
      <div class="progress"><i style="width:100%"></i></div>
      <div class="head">
        <a class="nav" href="#/q/${slugs[slugs.length - 1]}" aria-label="${ui('back')}">‹</a>
        <div class="title">${ui('results')}</div><span class="nav"></span>
      </div>
      ${any ? `<div class="hint set" style="margin:0 0 4px">${great} ${ui('greatMatches')}</div>
      <ul class="res-list">${top.map((id, n) => `<li><button data-id="${id}"><span class="n">${n + 1}</span><span class="thumb">${chairSVG(CHAIRS[id], 'r' + id)}</span><span class="nm">${CHAIRS[id].name}</span><span class="sc">${scores[id].total}%</span></button></li>`).join('')}</ul>`
        : `<div class="hint">${ui('noAnswer')}</div>`}
      <button class="link-btn" id="reset">${ui('startOver')}</button>`;
    panel.querySelectorAll('.res-list button').forEach(b => b.onclick = () => openDrawer(+b.dataset.id));
    $('#reset', panel).onclick = () => { state.answers = {}; store.set('answers', {}); location.hash = '#/q/' + slugs[0]; };
  }

  /* ---------- welcome ring ---------- */
  function buildRing() {
    const ring = $('#ring'); ring.innerHTML = '';
    const n = CHAIRS.length;
    CHAIRS.forEach((c, i) => {
      const a = (i / n) * Math.PI * 2, R = 46;
      const w = document.createElement('div'); w.className = 'w';
      w.innerHTML = `<div style="left:${Math.cos(a) * R}vmin;top:${Math.sin(a) * R}vmin;width:max(40px,min(8.6vmin,110px))">${chairSVG(c, 'w' + c.id)}</div>`;
      ring.appendChild(w);
    });
  }

  /* ---------- menu ---------- */
  function renderMenu() {
    menu.innerHTML = `
      <h4>${ui('language')}</h4>
      <div class="row"><button class="chip" data-l="en" aria-pressed="${state.lang === 'en'}">EN</button><button class="chip" data-l="ru" aria-pressed="${state.lang === 'ru'}">RU</button></div>
      <h4>${ui('shortlist')}</h4>
      ${state.shortlist.length ? `<ul>${state.shortlist.map(id => `<li><button data-id="${id}">${CHAIRS[id].name}</button></li>`).join('')}</ul>` : `<ul><li class="none">${ui('empty')}</li></ul>`}
      <ul><li><button id="mReset">${ui('startOver')}</button></li></ul>
      <p class="note">${ui('note')}</p>`;
    menu.querySelectorAll('[data-l]').forEach(b => b.onclick = () => setLang(b.dataset.l));
    menu.querySelectorAll('[data-id]').forEach(b => b.onclick = () => { menu.hidden = true; moreBtn.setAttribute('aria-expanded', 'false'); openDrawer(+b.dataset.id); });
    $('#mReset', menu).onclick = () => { state.answers = {}; store.set('answers', {}); menu.hidden = true; location.hash = '#/q/' + slugs[0]; route(); };
  }
  moreBtn.onclick = () => { menu.hidden = !menu.hidden; moreBtn.setAttribute('aria-expanded', !menu.hidden); };
  document.addEventListener('click', e => { if (!menu.hidden && !menu.contains(e.target) && !moreBtn.contains(e.target)) { menu.hidden = true; moreBtn.setAttribute('aria-expanded', 'false'); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeDrawer(); menu.hidden = true; } });

  function setLang(l) {
    state.lang = l; store.set('lang', l); applyStaticText(); renderMenu(); route(); renderDrawer(); update();
  }
  function applyStaticText() {
    document.documentElement.lang = state.lang;
    $('#brand').textContent = ui('brand');
    $('#welcomeTitle').textContent = ui('welcome');
    $('#welcomeSub').textContent = ui('welcomeSub');
    $('#startBtn').textContent = ui('start');
    document.title = state.lang === 'ru' ? 'Sitwise — подбор кресла' : 'Sitwise — Chair Finder';
  }

  /* ---------- router ---------- */
  function route() {
    const h = location.hash || '#/';
    const m = h.match(/^#\/q\/([\w-]+)/);
    const onWelcome = !m && !h.startsWith('#/results');
    welcome.hidden = !onWelcome;
    panel.hidden = onWelcome;
    document.body.style.overflow = onWelcome ? 'hidden' : '';
    hideTip(); closeDrawer();
    if (m && slugs.includes(m[1])) renderQuestion(m[1]);
    else if (h.startsWith('#/results')) renderResults();
    update();
  }

  addEventListener('hashchange', route);
  new ResizeObserver(layout).observe(grid);
  applyStaticText(); buildRing(); renderMenu(); compute(); route();
  requestAnimationFrame(() => requestAnimationFrame(() => $('#stage').classList.add('ready')));
})();
