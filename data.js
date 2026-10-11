/* Sitwise — data: chairs, questions, scoring. All products are fictional. */

// [name, style, color, frame, backH, backW, head, arms, base, hours(1-3), adj(1-3), loM, hiM, [desk,upright,dynamic,relaxed 0-10], breath(0-2), pad(0-3), price, year, optAdj]
const CHAIR_ROWS = [
  ['Arca Lounge',   'pad',   '#6b4f3a', '#cfcfcf', 22, 42, 0, 'fixed', 'star',  3, 2, 1.55, 1.95, [6,6,2,10], 0, 3, 3900, 1969, 1],
  ['Lumo 04',       'mesh',  '#f2a413', '#2b2b2b', 26, 38, 0, 'fixed', 'star',  2, 1, 1.50, 1.85, [9,8,5,3],  2, 0, 690,  2018, 0],
  ['Nordo High',    'soft',  '#c9b08a', '#cfcfcf', 34, 40, 1, 'adj',   'star',  3, 3, 1.60, 2.00, [8,9,6,6],  1, 2, 1490, 2021, 0],
  ['Grand Cabinet', 'pad',   '#5a3a2e', '#2b2b2b', 40, 46, 1, 'fixed', 'star',  3, 2, 1.65, 2.00, [4,6,1,10], 0, 3, 5200, 1971, 0],
  ['Veda Cloud',    'mesh',  '#b9bcc0', '#d9d9d9', 36, 40, 1, 'adj',   'star',  3, 3, 1.50, 1.95, [9,10,9,5], 2, 1, 1180, 2020, 0],
  ['Kiro Ply',      'shell', '#d6a96a', '#2b2b2b', 14, 22, 0, 'none',  'star',  1, 1, 1.55, 1.85, [6,3,6,1],  0, 0, 420,  2019, 0],
  ['Sael Cabinet',  'pad',   '#2a3a33', '#cfcfcf', 24, 42, 0, 'fixed', 'star',  3, 2, 1.60, 1.95, [5,7,2,9],  0, 3, 3450, 1969, 1],
  ['Vento Mesh',    'mesh',  '#e6e8ea', '#e9e9e9', 34, 40, 0, 'adj',   'star',  3, 3, 1.50, 1.95, [9,9,10,4], 2, 0, 1090, 2019, 0],
  ['Orbit Leather', 'pad',   '#161a22', '#cfcfcf', 28, 44, 0, 'fixed', 'star',  3, 2, 1.65, 2.00, [5,7,2,9],  0, 3, 4880, 1958, 0],
  ['Pelo Bucket',   'soft',  '#1c2c8c', '#2b2b2b', 22, 46, 0, 'none',  'disc',  1, 1, 1.55, 1.85, [4,4,3,8],  0, 2, 890,  2016, 0],
  ['Tavo Task',     'mesh',  '#1f4d3b', '#2b2b2b', 32, 38, 0, 'adj',   'star',  3, 3, 1.50, 1.95, [10,9,8,3], 2, 0, 990,  2022, 0],
  ['Ione Barrel',   'soft',  '#3e3f44', '#2b2b2b', 20, 48, 0, 'none',  'disc',  2, 1, 1.55, 1.90, [4,5,3,9],  0, 3, 780,  2020, 0],
  ['Mesa Teal',     'pad',   '#0f6b63', '#2b2b2b', 32, 40, 0, 'adj',   'star',  3, 3, 1.55, 1.95, [8,9,7,5],  1, 2, 1250, 2021, 0],
  ['Quill Tufted',  'pad',   '#7ba0c8', '#cfcfcf', 28, 42, 0, 'fixed', 'star',  2, 2, 1.60, 1.95, [5,7,2,8],  0, 3, 2280, 2015, 1],
  ['Rho Studio',    'mesh',  '#5f9b88', '#2b2b2b', 22, 36, 0, 'fixed', 'star',  2, 1, 1.50, 1.85, [8,6,9,2],  2, 0, 640,  2017, 1],
  ['Soma Shell',    'shell', '#e0542c', '#2b2b2b', 18, 36, 0, 'fixed', 'star',  1, 1, 1.55, 1.90, [5,4,7,3],  0, 0, 520,  2014, 0],
  ['Umbra Pivot',   'shell', '#3a3d44', '#cfcfcf', 16, 26, 0, 'none',  'star',  1, 1, 1.55, 1.85, [5,3,6,1],  0, 0, 350,  2012, 0],
  ['Tilda Soft',    'pad',   '#c4a074', '#2b2b2b', 22, 42, 0, 'fixed', 'star',  3, 2, 1.60, 1.95, [6,6,2,9],  0, 3, 3290, 1969, 1],
  ['Yara Mint',     'mesh',  '#8fd3c0', '#e9e9e9', 24, 38, 0, 'fixed', 'star',  2, 1, 1.50, 1.90, [6,6,6,6],  2, 1, 1990, 1958, 0],
  ['Xylo Head',     'mesh',  '#47606f', '#2b2b2b', 38, 40, 1, 'adj',   'star',  3, 3, 1.55, 2.00, [9,9,8,5],  2, 1, 1390, 2023, 0],
  ['Zen Weave',     'pad',   '#e8532b', '#e9e9e9', 36, 40, 0, 'adj',   'star',  3, 3, 1.50, 1.95, [8,9,9,5],  1, 2, 1560, 2024, 0],
  ['Wren Oak',      'shell', '#d8d8d6', '#2b2b2b', 20, 36, 0, 'fixed', 'star',  2, 2, 1.55, 1.90, [7,6,4,5],  0, 1, 1180, 2019, 1],
  ['Noor Terra',    'soft',  '#b24a2c', '#cfcfcf', 30, 40, 0, 'fixed', 'star',  2, 2, 1.55, 1.90, [6,7,3,8],  1, 2, 1640, 2018, 1],
  ['Hale Ply',      'shell', '#e3b985', '#e2e2e2', 18, 40, 0, 'none',  'star',  1, 1, 1.55, 1.90, [4,4,5,5],  0, 0, 720,  2017, 0],
  ['Pico Stool',    'shell', '#e9e9ea', '#e9e9e9', 12, 22, 0, 'none',  'disc',  1, 1, 1.50, 1.85, [3,2,6,1],  0, 0, 240,  2013, 0],
  ['Lark Flex',     'mesh',  '#4a4d52', '#2b2b2b', 26, 38, 0, 'adj',   'star',  2, 3, 1.50, 1.95, [8,8,9,4],  2, 0, 760,  2022, 0],
  ['Merlot Wing',   'soft',  '#6e1f2e', '#2b2b2b', 22, 44, 0, 'none',  'disc',  2, 1, 1.55, 1.90, [4,5,2,10], 0, 3, 1120, 2021, 0],
  ['Dune Mesh Pro', 'mesh',  '#2f3238', '#2b2b2b', 40, 40, 1, 'adj',   'star',  3, 3, 1.55, 2.00, [9,10,9,6], 2, 1, 1650, 2024, 0],
  ['Ink Pad',       'pad',   '#2c1f4a', '#2b2b2b', 26, 38, 0, 'fixed', 'star',  3, 2, 1.55, 1.95, [7,8,4,6],  0, 2, 1320, 2020, 1],
  ['Onyx Slim',     'pad',   '#14161a', '#cfcfcf', 38, 38, 0, 'fixed', 'star',  3, 2, 1.55, 1.95, [6,8,3,8],  0, 2, 2790, 1958, 1],
];

const CHAIRS = CHAIR_ROWS.map((r, i) => ({
  id: i, name: r[0], style: r[1], color: r[2], frame: r[3], backH: r[4], backW: r[5], head: !!r[6],
  arms: r[7], base: r[8], hours: r[9], adj: r[10], lo: r[11], hi: r[12],
  pos: { desk: r[13][0], upright: r[13][1], dynamic: r[13][2], relaxed: r[13][3] },
  breath: r[14], pad: r[15], price: r[16], year: r[17], optAdj: !!r[18],
}));

const HEIGHT_CENTERS = [1.45, 1.55, 1.65, 1.75, 1.85, 1.95];

// Each text is [en, ru]
const QUESTIONS = [
  {
    slug: 'sitting-time', type: 'slider', ticks: false,
    q: ['Sitting time', 'Время сидения'],
    min: ['2h', '2 ч'], max: ['8h', '8 ч'],
    info: ['Some chairs are more suitable for an extended period of sitting than others.', 'Одни кресла лучше подходят для долгого сидения, чем другие.'],
    match: ['Matches your sitting time', 'Подходит под ваше время сидения'],
    answers: [
      { t: ['Couple of hours', 'Пара часов'], m: ['Recommended for short sitting time', 'Рекомендуется для короткого сидения'] },
      { t: ['Several hours', 'Несколько часов'], m: ['Recommended for several hours of sitting', 'Рекомендуется для нескольких часов сидения'] },
      { t: ['All day', 'Весь день'], m: ['Recommended for 8 hours of sitting', 'Рекомендуется для 8 часов сидения'] },
    ],
    score(c, a) { const d = (a + 1) - c.hours; return d <= 0 ? 100 : d === 1 ? 50 : 15; },
  },
  {
    slug: 'sharing-the-chair', type: 'yesno',
    q: ['Sharing the chair?', 'Кресло для нескольких людей?'],
    info: ['Some chairs offer more adjustability options than others.', 'У одних кресел больше вариантов настройки, чем у других.'],
    match: ['Matches your answer', 'Подходит под ваш ответ'],
    answers: [
      { t: ['No', 'Нет'], m: ['Individual adjustment possible', 'Возможна индивидуальная настройка'] },
      { t: ['Yes', 'Да'], m: ['Good for constant switching of users', 'Удобно при частой смене пользователей'] },
    ],
    score(c, a) { return a === 0 ? [55, 78, 100][c.adj - 1] : [100, 72, 52][c.adj - 1]; },
  },
  {
    slug: 'your-height', type: 'slider', ticks: true,
    q: ['Your height', 'Ваш рост'],
    min: ['shorter', 'ниже'], max: ['taller', 'выше'],
    info: ['Some chairs are more suitable for specific adjustments.', 'Некоторые кресла лучше подходят под определённый рост.'],
    match: ['Fits your height', 'Подходит под ваш рост'],
    answers: ['smaller|меньше', '1.50 – 1.60', '1.60 – 1.70', '1.70 – 1.80', '1.80 – 1.90', 'taller|выше'].map(s => {
      const p = s.split('|'); const m = ['Fits your height', 'Подходит под ваш рост'];
      return { t: [p[0], p[1] || p[0]], m };
    }),
    score(c, a) {
      const v = HEIGHT_CENTERS[a];
      if (v >= c.lo && v <= c.hi) return 100;
      const d = v < c.lo ? c.lo - v : v - c.hi;
      return Math.max(0, Math.round(100 - d * 450));
    },
  },
  {
    slug: 'your-sitting-position', type: 'multi',
    q: ['Your sitting position', 'Ваша посадка'],
    info: ['A chair that promotes an optimal sitting position for your work routine is the cornerstone of a functional (home) office. Sitting better means working better.', 'Кресло, которое поддерживает правильную посадку при вашей работе, — основа удобного (домашнего) офиса. Лучше сидишь — лучше работаешь.'],
    match: ['Fits your sitting position', 'Подходит под вашу посадку'],
    answers: [
      { key: 'desk', t: ['Desk oriented', 'Ближе к столу'], m: ['Great for working close to the desk', 'Отлично для работы у стола'] },
      { key: 'upright', t: ['Upright position', 'Прямая спина'], m: ['Supports an upright position', 'Поддерживает прямую посадку'] },
      { key: 'dynamic', t: ['Dynamic sitting', 'Динамичное сидение'], m: ['Moves with you', 'Двигается вместе с вами'] },
      { key: 'relaxed', t: ['Relaxed, leaned back', 'Расслабленно, откинувшись'], m: ['Made for leaning back', 'Создано, чтобы откидываться'] },
    ],
    score(c, sel) { const q = QUESTIONS[3]; const vals = sel.map(i => c.pos[q.answers[i].key] * 10); return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length); },
  },
  {
    slug: 'breathability', type: 'slider', ticks: false,
    q: ['Breathability', 'Воздухопроницаемость'],
    min: ['Less', 'Меньше'], max: ['More', 'Больше'],
    info: ['Some chairs allow air to circulate and offer sustained comfort even in warmer temperatures.', 'Некоторые кресла пропускают воздух и остаются комфортными даже в жару.'],
    match: ['Fits your breathability preference', 'Подходит по воздухопроницаемости'],
    answers: [
      { t: ['No extra breathability', 'Без особой вентиляции'], m: ['No extra breathability', 'Без особой вентиляции'] },
      { t: ['Moderate breathability', 'Умеренная вентиляция'], m: ['Moderate breathability', 'Умеренная вентиляция'] },
      { t: ['Maximum breathability', 'Максимальная вентиляция'], m: ['Maximum breathability', 'Максимальная вентиляция'] },
    ],
    score(c, a) { return Math.max(0, 100 - Math.abs(a - c.breath) * 45); },
  },
  {
    slug: 'padding', type: 'slider', ticks: false,
    q: ['Padding', 'Мягкость'],
    min: ['Less', 'Меньше'], max: ['More', 'Больше'],
    info: ['Different seat upholstery is available to ensure a high degree of comfort to suit each preference.', 'Разная обивка сиденья обеспечивает комфорт на любой вкус.'],
    match: ['Fits your choice of padding', 'Подходит по мягкости'],
    answers: [
      { t: ['Minimal padding', 'Минимум мягкости'], m: ['Minimal padding', 'Минимум мягкости'] },
      { t: ['Medium padding', 'Средняя мягкость'], m: ['Medium padding', 'Средняя мягкость'] },
      { t: ['Extra padding', 'Повышенная мягкость'], m: ['Extra padding', 'Повышенная мягкость'] },
      { t: ['Maximum padding', 'Максимальная мягкость'], m: ['Maximum padding', 'Максимальная мягкость'] },
    ],
    score(c, a) { return Math.max(0, 100 - Math.abs(a - c.pad) * 35); },
  },
  {
    slug: 'armrests', type: 'multi',
    q: ['Armrests?', 'Подлокотники?'],
    info: ['In the correct position, armrests reduce pressure on your shoulders and neck, preventing muscular tension.', 'В правильном положении подлокотники снимают нагрузку с плеч и шеи и предотвращают напряжение мышц.'],
    match: ['Matches your choice of armrests', 'Подходит по подлокотникам'],
    answers: [
      { key: 'fixed', t: ['Fixed armrests', 'Фиксированные'], m: ['Fixed armrests', 'Фиксированные подлокотники'] },
      { key: 'adj', t: ['Adjustable armrests', 'Регулируемые'], m: ['Available with adjustable armrests', 'Есть вариант с регулируемыми подлокотниками'] },
      { key: 'none', t: ['No armrests', 'Без подлокотников'], m: ['No armrests', 'Без подлокотников'] },
    ],
    score(c, sel) {
      const q = QUESTIONS[6];
      return Math.max(...sel.map(i => {
        const k = q.answers[i].key;
        if (c.arms === k) return 100;
        if (k === 'adj' && c.arms === 'fixed' && c.optAdj) return 72;
        return 18;
      }));
    },
  },
];

const UI = {
  brand: ['Sitwise', 'Sitwise'],
  welcome: ['Welcome to the Chair Finder', 'Добро пожаловать в подбор кресла'],
  welcomeSub: ['Answer seven quick questions and watch the right chairs rise to the top.', 'Ответьте на семь коротких вопросов — и подходящие кресла окажутся сверху.'],
  start: ['Start', 'Начать'],
  choose: ['Choose a value', 'Выберите значение'],
  chooseMulti: ['Choose one or more', 'Выберите один или несколько'],
  chooseYN: ['Choose one', 'Выберите вариант'],
  back: ['Go backward', 'Назад'], fwd: ['Go forward', 'Вперёд'], moreInfo: ['More info', 'Подробнее'],
  results: ['Your matches', 'Ваши результаты'],
  greatMatches: ['great matches', 'отлично подходят'],
  topPicks: ['Top picks', 'Лучший выбор'],
  startOver: ['Start over', 'Начать заново'],
  match: ['match', 'совпадение'],
  price: ['Price', 'Цена'], year: ['Year', 'Год'],
  whyFits: ['Why it fits', 'Почему подходит'],
  specs: ['Specs', 'Характеристики'],
  longSitting: ['Long sitting', 'Долгое сидение'], adjust: ['Adjustability', 'Регулировки'],
  breath: ['Breathability', 'Вентиляция'], padding: ['Padding', 'Мягкость'],
  armrests: ['Armrests', 'Подлокотники'],
  armsMap: { none: ['None', 'Нет'], fixed: ['Fixed', 'Фиксированные'], adj: ['Adjustable', 'Регулируемые'] },
  save: ['Save to shortlist', 'В избранное'], saved: ['In shortlist', 'В избранном'],
  shortlist: ['Shortlist', 'Избранное'], empty: ['Nothing saved yet', 'Пока ничего нет'],
  language: ['Language', 'Язык'],
  note: ['Demo project. All chairs are fictional.', 'Демо-проект. Все кресла вымышлены.'],
  close: ['Close', 'Закрыть'],
  noAnswer: ['Answer a question to see matches', 'Ответьте на вопрос, чтобы увидеть совпадения'],
};
