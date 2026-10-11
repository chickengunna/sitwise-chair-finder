/* Procedural chair illustrations (original artwork). viewBox 0 0 100 120 */
function mixHex(hex, to, t) {
  const p = h => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const a = p(hex), b = p(to);
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
}

function chairSVG(c, uid) {
  const col = c.color, fr = c.frame;
  const light = mixHex(col, '#ffffff', 0.22), dark = mixHex(col, '#000000', 0.28);
  const dk = mixHex(col, '#000000', 0.45);
  const g = `g${uid}`;
  let s = `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">`;
  s += `<defs><linearGradient id="${g}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${light}"/><stop offset="1" stop-color="${dark}"/></linearGradient></defs>`;
  s += `<ellipse cx="50" cy="113" rx="26" ry="3.4" fill="#000" opacity=".1"/>`;

  // base
  if (c.base === 'star') {
    s += `<rect x="48.4" y="86" width="3.2" height="19" rx="1.4" fill="${fr}"/>`;
    [[14, 109.5], [31, 114], [69, 114], [86, 109.5], [50, 108]].forEach(([x, y]) => {
      s += `<path d="M50 104 L${x} ${y}" stroke="${fr}" stroke-width="2.8" stroke-linecap="round"/>`;
      s += `<circle cx="${x}" cy="${y + 1.6}" r="2.3" fill="#333"/>`;
    });
  } else if (c.base === 'disc') {
    s += `<rect x="48.4" y="86" width="3.2" height="22" rx="1.4" fill="${fr}"/>`;
    s += `<ellipse cx="50" cy="109.5" rx="21" ry="4" fill="${fr}"/><ellipse cx="50" cy="108.6" rx="21" ry="3.6" fill="${mixHex(fr, '#ffffff', 0.25)}"/>`;
  } else {
    [[34, 31], [66, 69], [41, 43], [59, 57]].forEach(([x1, x2], i) => {
      s += `<path d="M${x1} 84 L${x2} ${i < 2 ? 112 : 108}" stroke="${fr}" stroke-width="2.4" stroke-linecap="round"/>`;
    });
  }

  // arms
  const seatTop = 72, seatH = c.style === 'pad' || c.style === 'soft' ? 13 : c.style === 'shell' ? 9 : 10;
  if (c.arms !== 'none') {
    [26, 74].forEach(x => {
      s += `<path d="M${x} ${seatTop + 6} L${x} 56" stroke="${fr}" stroke-width="2.4" stroke-linecap="round"/>`;
      s += `<rect x="${x - 4.5}" y="53" width="9" height="4" rx="2" fill="${c.arms === 'adj' ? '#262626' : dk}"/>`;
      if (c.arms === 'adj') s += `<rect x="${x - 2.4}" y="62" width="4.8" height="2.6" rx="1.2" fill="#8d8d8d"/>`;
    });
  }

  // seat
  const sw = c.style === 'soft' ? 52 : 48;
  s += `<rect x="${50 - sw / 2}" y="${seatTop}" width="${sw}" height="${seatH}" rx="${seatH / 2}" fill="url(#${g})"/>`;
  if (c.style === 'pad') s += `<path d="M30 ${seatTop + 3.5} H70" stroke="${dark}" stroke-width=".7" opacity=".5" stroke-linecap="round"/>`;
  s += `<ellipse cx="50" cy="${seatTop + 2}" rx="${sw / 2 - 6}" ry="1.2" fill="#fff" opacity=".25"/>`;

  // back
  const bw = c.backW, bh = c.backH, by = seatTop - bh - 4, bx = 50 - bw / 2;
  const rx = c.style === 'soft' ? Math.min(bw / 2.2, 17) : c.style === 'shell' ? bw / 2.4 : Math.min(bw / 3.4, 9);
  s += `<rect x="47.4" y="${seatTop - 5}" width="5.2" height="8" rx="2" fill="${fr}"/>`;
  if (c.style === 'mesh') {
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" fill="${fr}"/>`;
    s += `<rect x="${bx + 2.2}" y="${by + 2.2}" width="${bw - 4.4}" height="${bh - 4.4}" rx="${Math.max(rx - 2, 2)}" fill="url(#${g})"/>`;
    for (let y = by + 5; y < by + bh - 3; y += 3) s += `<path d="M${bx + 3} ${y} H${bx + bw - 3}" stroke="#fff" stroke-width=".5" opacity=".28"/>`;
  } else {
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${bh}" rx="${rx}" fill="url(#${g})"/>`;
    if (c.style === 'pad') for (let y = by + 7; y < by + bh - 4; y += 7) s += `<path d="M${bx + 3} ${y} H${bx + bw - 3}" stroke="${dark}" stroke-width=".7" opacity=".5"/>`;
    if (c.style === 'shell' || c.style === 'soft') s += `<path d="M${bx + rx} ${by + 3} H${bx + bw - rx}" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity=".28"/>`;
  }

  // headrest
  if (c.head) {
    s += `<rect x="47.8" y="${by - 5}" width="4.4" height="7" fill="${fr}"/>`;
    s += `<rect x="40" y="${by - 11}" width="20" height="8" rx="4" fill="url(#${g})"/>`;
  }
  return s + '</svg>';
}
