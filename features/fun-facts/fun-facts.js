// Fun-fact carousel
var funFacts = [
  { icon: '\u{1F435}', text: 'In 1999, a chimpanzee named Raven outperformed 6,000 professional brokers by throwing darts. Her portfolio gained 213%.', punch: 'Think you can beat a chimp? Prove it.', textRu: 'В 1999 году шимпанзе по имени Рэйвен обошла 6 000 профессиональных брокеров, бросая дротики. Её портфель вырос на 213%.', punchRu: 'Думаете, сможете обыграть обезьяну? Докажите.' },
  { icon: '\u{1F4B0}', text: "Warren Buffett made 99% of his wealth after his 50th birthday.", punch: "You've got time. But why wait?", textRu: 'Уоррен Баффетт заработал 99% своего состояния после 50 лет.', punchRu: 'У вас есть время. Но зачем ждать?' },
  { icon: '\u{1F4F1}', text: 'The average person checks their phone 96 times a day. Imagine if one of those checks was your portfolio.', punch: 'Make screen time productive.', textRu: 'В среднем человек проверяет телефон 96 раз в день. Представьте, если бы одна из этих проверок была вашим портфелем.', punchRu: 'Сделайте экранное время продуктивным.' },
  { icon: '\u{1F467}', text: "In 2020, a 10-year-old girl's portfolio outperformed the S&P 500. Her strategy? 'I just bought what I like.'", punch: 'Sometimes simplicity wins.', textRu: 'В 2020 году портфель 10-летней девочки обошёл S&P 500. Её стратегия? «Я просто покупала то, что мне нравится».', punchRu: 'Иногда простота побеждает.' },
  { icon: '\u{1F333}', text: "The word 'stock' comes from the old English 'stocc' meaning trunk of a tree. Your portfolio is literally a money tree.", punch: 'Time to plant some seeds.', textRu: 'Слово «stock» происходит от староанглийского «stocc» — ствол дерева. Ваш портфель — это буквально денежное дерево.', punchRu: 'Пора посадить семена.' },
  { icon: '\u{1F4C8}', text: 'Apple shares cost $22 at IPO in 1980 — about $0.10 split-adjusted. A $1,000 investment then would have grown into millions.', punch: 'Time in the market beats timing the market.', textRu: 'Акции Apple стоили $22 на IPO в 1980 году — около $0,10 с учётом сплитов. Инвестиция в $1 000 тогда выросла бы в миллионы.', punchRu: 'Время на рынке важнее выбора момента.' },
  { icon: '\u{1F3DB}\u{FE0F}', text: 'The Dutch East India Company (1602) was the first publicly traded company. It was also the first to crash spectacularly.', punch: 'Some things never change.', textRu: 'Голландская Ост-Индская компания (1602) стала первой публичной компанией. И первой, кто обанкротился с размахом.', punchRu: 'Некоторые вещи не меняются.' },
  { icon: '\u{1F4F0}', text: "Isaac Newton lost a fortune in the South Sea Bubble. He said: 'I can calculate the motion of heavenly bodies, but not the madness of people.'", punch: 'Even geniuses get rekt.', textRu: 'Исаак Ньютон потерял состояние на «Пузыре Южных морей». Он сказал: «Я могу рассчитать движение небесных тел, но не безумие людей».', punchRu: 'Даже гении ошибаются.' },
  { icon: '\u{1F48E}', text: "The first stock exchange opened in Antwerp in 1531 — without a single stock listed. Traders just gathered to make deals.", punch: 'The vibes came first.', textRu: 'Первая фондовая биржа открылась в Антверпене в 1531 году — без единой котировки акций. Торговцы просто собирались, чтобы заключать сделки.', punchRu: 'Сначала появилась сама атмосфера.' },
  { icon: '\u{1F402}', text: "Bull markets get their name from how bulls attack — thrusting their horns up. Bears swipe down.", punch: 'Be the bull this season.', textRu: 'Бычьи рынки названы так, потому что быки атакуют рогами снизу вверх. Медведи бьют лапой сверху вниз.', punchRu: 'Будьте быком в этом сезоне.' },
  { icon: '\u{1F3B0}', text: "Casino games have a house edge of 1-15%. The S&P 500 has averaged ~10% annual return since 1957.", punch: 'Choose your battles wisely.', textRu: 'Игры в казино дают заведению преимущество в 1–15%. Среднегодовая доходность S&P 500 с 1957 года — около 10%.', punchRu: 'Выбирайте свои стратегии с умом.' },
  { icon: '\u{1F9E0}', text: 'Research suggests that investors who monitor their portfolios less often may trade less impulsively.', punch: 'Patience > Panic.', textRu: 'Исследования показывают, что инвесторы, реже проверяющие портфель, торгуют менее импульсивно.', punchRu: 'Терпение > Паника.' },
  { icon: '\u{1F984}', text: "Tesla traded under $5/share in 2010. Many said it was overpriced.", punch: 'Conviction matters more than consensus.', textRu: 'В 2010 году акции Tesla торговались ниже $5. Многие говорили, что они переоценены.', punchRu: 'Убеждённость важнее общественного мнения.' },
  { icon: '\u{1F916}', text: "Today, AI-powered hedge funds manage over $1 trillion. You're playing with the same kind of tools — for free.", punch: 'Use the edge.', textRu: 'Сегодня AI-хедж-фонды управляют более $1 трлн. Вы играете с теми же инструментами — бесплатно.', punchRu: 'Используйте преимущество.' },
  { icon: '\u{1F3C6}', text: "Jesse Livermore made $100M shorting the 1929 crash. In today's money: $1.7B.", punch: 'Same logic works in 2026.', textRu: 'Джесси Ливермор заработал $100 млн, играя на понижение во время краха 1929 года. В пересчёте на сегодня: $1,7 млрд.', punchRu: 'Та же логика работает и в 2026 году.' }
];
var currentFact = 0;
var factIcon = document.getElementById('funFactIcon');
var factText = document.getElementById('funFactText');
var factDots = document.getElementById('factDots');

funFacts.forEach(function(_, i) {
  var dot = document.createElement('button');
  dot.className = 'fact-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Go to fact ' + (i + 1));
  dot.onclick = function() { goToFact(i); };
  factDots.appendChild(dot);
});

function isRuActive() {
  return document.cookie.indexOf('pb_lang_manual=ru') !== -1 || document.cookie.indexOf('googtrans=/en/ru') !== -1;
}
function renderFact(idx) {
  var f = funFacts[idx];
  var ru = isRuActive() && f.textRu;
  factIcon.textContent = f.icon;
  factText.innerHTML = (ru ? f.textRu : f.text) + ' <em>' + (ru ? f.punchRu : f.punch) + '</em>';
  factDots.querySelectorAll('.fact-dot').forEach(function(d, i) {
    d.classList.toggle('active', i === idx);
  });
}
function goToFact(idx) { currentFact = idx; renderFact(idx); }
function nextFact() { currentFact = (currentFact + 1) % funFacts.length; renderFact(currentFact); }
function prevFact() { currentFact = (currentFact - 1 + funFacts.length) % funFacts.length; renderFact(currentFact); }
renderFact(0);
setInterval(nextFact, 8000);
