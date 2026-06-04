// ==================== TRANSLATION OVERRIDES ====================
// Two-layer approach:
// 1. Elements with [data-i18n-ru] get direct text replacement when RU is active
// 2. Fuzzy text-node replacements catch remaining Google Translate errors
//
// Source: "Play AI.xlsx" translation review spreadsheet.

(function() {

  // ---- DIRECT ELEMENT TRANSLATIONS (by data-i18n-ru attribute) ----
  // Applied to specific DOM elements, bypasses Google Translate entirely.
  // Add data-i18n-ru="key" to any element in HTML.
  var RU_DIRECT = {
    // Hero participant state
    'hero-title-live': 'Битва началась. Какова ваша позиция?',
    'hero-subtitle-live': 'Сезон завершается через ',
    'hero-desc-live': 'Таблица лидеров обновляется каждые 3 часа. Проверьте свой рейтинг, скорректируйте стратегию, поднимитесь на вершину. Награды получают только 5 мест — и время поджимает.',
    'hero-cta-play': 'Играть сейчас →',
    'hero-cta-howitworks': 'Как это работает ↓',

    // Hero new_user state
    'hero-title-new': 'AI Investment Challenge стартует через',
    'hero-subtitle-new': '$25 000 виртуальных средств. 95 реальных подарочных акций в качестве призов.',
    'hero-desc-new': 'Соберите портфель. Проверьте, сможете ли вы обойти рынок. Выиграйте реальные акции, зачисленные на ваш счёт Freedom Finance. Без депозитов. Без комиссий. Только ваша стратегия против реальных рыночных данных.',
    'hero-cta-join': 'Присоединяйтесь к битве →',
    'hero-note-new': 'Депозит не требуется. Никаких комиссий. Чем раньше вы зарегистрируетесь, тем больше времени у вас будет, чтобы подняться в рейтинге.',

    // Leaderboard
    'lb-title': 'Таблица лидеров',
    'lb-title-hero': '\u{1F3C6} Таблица лидеров',

    // Ticker disclaimer
    'ticker-disclaimer-text': 'Рыночные данные в реальном времени через Tradernet. Только для информационных целей. Не является инвестиционной рекомендацией.',
    'ticker-disclaimer-link': 'Все 1 000 доступных акций →',

    // Section headers
    'section-benefits-eyebrow': 'Зачем играть?',
    'section-benefits-title': 'Построена для амбициозных',
    'section-howitworks-eyebrow': 'Начните за 2 минуты',
    'section-howitworks-title': 'Как это работает',
    'section-prizes-eyebrow': 'Реальные награды',
    'section-prizes-title': 'Выиграйте реальные подарочные акции',
    'section-coupons-eyebrow': 'Как начисляются награды',
    'section-coupons-title': 'Начисление наград',
    'section-transparency-eyebrow': 'Честная игра',
    'section-transparency-title': 'Полная прозрачность',
    'section-leaderboard-eyebrow': 'Кто лидирует',
    'section-leaderboard-title': 'Таблица лидеров',
    'section-faq-eyebrow': 'Есть вопросы?',
    'section-faq-title': 'Часто задаваемые вопросы',

    // Section subtitles
    'section-benefits-subtitle': 'Спойлер: бездействие — единственная проигрышная стратегия.',
    'section-prizes-subtitle': 'Никаких утешительных призов. Только TOP 5 получают акции. Где окажетесь вы?',

    // Benefits cards
    'benefit-1-title': 'Проверьте свои гипотезы',
    'benefit-1-text': 'Та самая «гениальная» идея с акциями, которая пришла вам в 3 часа ночи? Теперь вы можете проверить её с $25 000 виртуальных средств. Ваши сбережения скажут спасибо.',
    'benefit-2-title': 'Шорт-сделки доступны',
    'benefit-2-text': 'Считаете, что акция переоценена? Откройте короткую позицию. Ведь настоящее инвестирование — это не только покупать, а принимать верные решения.',
    'benefit-3-title': 'Соревнуйтесь по всей Европе',
    'benefit-3-text': 'Вы соревнуетесь не только сами с собой. Тысячи трейдеров по всей Европе тоже в деле. Какое место займёте вы?',
    'benefit-4-title': '95 реальных акций. Без вложений.',
    'benefit-4-text': 'Победитель получает 40 подарочных акций. Второе место — 25. Это реальные акции реальных компаний, зачисленные на ваш счёт. Без депозита, без комиссий. Ваша единственная инвестиция — ваш интеллект.',
    'benefit-5-title': 'Прокачайте финансовый IQ',
    'benefit-5-text': 'Учитесь управлять портфелем на практике. Никаких учебников. Никаких скучных лекций. Только реальные рыночные данные и реальные решения.',
    'benefit-6-title': 'AI-технологии в деле',
    'benefit-6-text': 'Торгуйте через нашего AI-ассистента — ту же технологию, за которую хедж-фонды платят миллионы. Вы получаете это бесплатно. Пока что.',

    // 4-Steps
    'step-1-title': 'Получите приглашение',
    'step-1-text': 'Проверьте email, push-уведомления или сторис в приложении. Если видите приглашение — вы в игре. Нет приглашения? Откройте счёт Freedom Finance. Это займёт 5 минут.',
    'step-2-title': 'Примите вызов',
    'step-2-text': 'Откройте AI-бота. Введите /start. Примите условия. Введите /play. Теперь у вас $25 000 виртуальных средств. Готовы?',
    'step-3-title': 'Соберите портфель',
    'step-3-text': 'Выбирайте из примерно 1 000 акций, доступных в боте. Покупайте. Продавайте. Шортите. Рынок работает. Ваши действия отслеживаются. Таблица лидеров обновляется каждые 3 часа.',
    'step-4-title': 'Выиграйте акции',
    'step-4-text': 'Сезон заканчивается 11 июня 2026 года. Финальный рейтинг зафиксирован. 95 реальных подарочных акций разделят участники из TOP 5: победитель получит 40. Купоны зачисляются на ваш счёт Freedom Finance.',
    'step-1-cta': 'Открыть счёт ',
    'step-2-cta': 'Открыть бота ',
    'step-3-cta': 'Играть ',
    'step-4-cta': 'Призы ',

    // Prizes
    'prizes-desc': 'Сезон заканчивается 11 июня 2026 года. После этого финальный рейтинг будет зафиксирован. 95 реальных подарочных акций разделят участники из TOP 5: победитель получит 40 акций. Купоны будут зачислены на ваш счёт Freedom Finance.',
    'prize-1st': '1-е — 40 акций',
    'prize-2nd': '2-е — 25 акций',
    'prize-3rd': '3-е — 15 акций',
    'prize-4th': '4-е — 10 акций',
    'prize-5th': '5-е — 5 акций',

    // Prize cards
    'prize-card-1st-place': '1-е место',
    'prize-card-1st-label': 'купонов = 40 подарочных акций',
    'prize-card-1st-pct': '42% всех призов',
    'prize-card-2nd-place': '2-е место',
    'prize-card-2nd-label': 'купонов = 25 подарочных акций',
    'prize-card-2nd-pct': '26% всех призов',
    'prize-card-3rd-place': '3-е место',
    'prize-card-3rd-label': 'купонов = 15 подарочных акций',
    'prize-card-3rd-pct': '16% всех призов',
    'prize-card-4th-place': '4-е место',
    'prize-card-4th-label': 'купонов = 10 подарочных акций',
    'prize-card-4th-pct': '11% всех призов',
    'prize-card-5th-place': '5-е место',
    'prize-card-5th-label': 'купонов = 5 подарочных акций',
    'prize-card-5th-pct': '5% всех призов',

    // Coupons
    'coupon-pool-title': 'Реальные подарочные акции',
    'coupon-pool-text': 'Каждый купон — это одна случайно выбранная акция публичной компании. Она будет зачислена напрямую на ваш счёт Freedom Finance. Реальная. Доступная для торговли. Ваша.',
    'coupon-disclaimer': 'Один купон — это одна случайно выбранная подарочная акция из утверждённого списка на freedom24.com/gift-stocks-list. После зачисления акция становится вашей: её можно держать в портфеле, продать или использовать для дальнейшего формирования портфеля.',
    'reward-flow-title': 'Начисление наград',
    'reward-step-1': 'Вы финишируете в первой пятёрке.',
    'reward-step-1-sub': 'Итоговая таблица лидеров зафиксирована.',
    'reward-step-2': 'Вы открываете каждый купон',
    'reward-step-2-sub': 'На счёт зачисляется случайно выбранная подарочная акция.',
    'reward-step-3': 'Реальная акция в портфеле',
    'reward-step-3-sub': 'Держите её, продавайте или развивайте свою стратегию.',

    // Transparency
    'transparency-perf-title': 'Победители по результатам',
    'transparency-perf-text': 'Ваш рейтинг определяется доходностью виртуального портфеля. Без удачи. Без случайных розыгрышей. Только вы и рынок.',
    'transparency-random-title': 'Случайное распределение акций',
    'transparency-random-text': 'Подарочные акции выбираются случайным образом из утверждённого списка.',
    'transparency-weighted-title': 'Вероятность зависит от стоимости',
    'transparency-weighted-text': 'Более дорогие ценные бумаги выпадают реже, менее дорогие — чаще. Распределение проходит честно, прозрачно и автоматически.',
    'transparency-nontransfer-title': 'Без передачи',
    'transparency-nontransfer-text': 'Купоны и подарочные акции привязаны к вашему счёту. Без денежной альтернативы. Без передачи. Но после зачисления — делайте с ними что хотите.',
    'transparency-tie-title': 'Что если ничья?',
    'transparency-tie-text': 'Если два трейдера показали одинаковую доходность, выше окажется тот, кто достиг результата первым. Скорость принятия решений имеет значение.',

    // Stats
    'stat-stocks': 'реальных подарочных акций',
    'stat-capital': 'виртуальный стартовый капитал',
    'stat-top5': 'Выиграйте реальные акции',
    'stat-players': 'Активные игроки',

    // FAQ — questions
    'faq-q-what': 'Что такое AI Investment Challenge?',
    'faq-q-join': 'Как присоединиться?',
    'faq-q-cost': 'Это бесплатно?',
    'faq-q-who': 'Кто может участвовать?',
    'faq-q-trade': 'Чем можно торговать?',
    'faq-q-winners': 'Как определяются победители?',
    'faq-q-prizes': 'Призы настоящие?',
    'faq-q-risk': 'Нужно ли вносить реальные деньги?',
    'faq-q-choose': 'Могу ли я выбрать акцию?',
    'faq-q-gambling': 'Это азартная игра?',

    // FAQ — answers
    'faq-a-cost': 'Да. Полностью бесплатно. Никаких депозитов, скрытых комиссий или платных опций. Вы получаете $25 000 виртуальных средств в момент старта.',
    'faq-a-risk': 'Нет. Для участия не нужны реальные средства или депозиты. Это демо-челлендж с реальными призами.',
    'faq-a-who': 'Вам должно быть (1) не менее 18 лет, (2) вы должны быть клиентом Freedom Finance Europe Ltd, (3) получить приглашение через email, push-уведомление, pop-up или уведомление в сторис.',
    'faq-a-trade': 'Примерно 1 000 акций, доступных в боте. Длинные и короткие позиции. Только рыночные ордера. Без кредитного плеча. Без комиссий, без проскальзывания.',
    'faq-a-winners': 'Рейтинг основан на доходности портфеля (PnL%) от начальных $25 000. Без случайных розыгрышей. Без фактора удачи. Лучший результат побеждает. При равных результатах — выше тот, кто достиг их первым.',
    'faq-a-prizes': 'Да, на 100%. Реальные акции публичных компаний, зачисленные прямо на ваш счёт Freedom Finance. Не виртуальные. Не токены. Настоящие акции.',
    'faq-a-choose': 'Нет. Подарочные акции выбираются случайным образом из утверждённого списка на freedom24.com/gift-stocks-list. Более дорогие бумаги выпадают реже. Распределение автоматическое и взвешенное.',
    'faq-a-gambling': 'Нет. Акция не является лотереей, азартной игрой или игрой на удачу в соответствии с законодательством Кипра. Победители определяются по объективным критериям эффективности, а не случайным образом.',

    // Fun fact
    'fun-fact-title': 'Интересный факт',

    // Ask AI
    'ask-ai-title': 'Спросите AI',
    'ask-ai-desc': 'Не нашли ответ? Получите мгновенную помощь от нашего AI-ассистента.',

    // Footer
    'footer-brand-text': 'Рекламная кампания от Freedom Finance Europe Ltd. Соберите портфель. Проверьте, сможете ли вы обойти рынок. Выиграйте реальные акции.',
    'footer-col-game': 'Игра',
    'footer-col-legal': 'Юридическая информация',
    'footer-col-company': 'Компания',
    'footer-link-terms': 'Правила и условия',
    'footer-link-docs': 'Все документы',
    'footer-link-privacy': 'Политика конфиденциальности',
    'footer-link-risk': 'Раскрытие рисков',
    'footer-link-cookie': 'Политика файлов cookie',

    // Final CTA
    'final-cta-title': 'Готовы к игре?',
    'final-cta-subtitle': 'Присоединяйтесь к тысячам трейдеров по всей Европе. Без депозитов. Без комиссий. Только стратегия.',
    'final-cta-play': 'Играть →',
    'final-cta-subtext': 'Бесплатно · Без депозита · 95 реальных акций на кону · Займёт 60 секунд'
  };

  // ---- FUZZY TEXT-NODE REPLACEMENTS (fallback) ----
  var RU_FUZZY = {
    'Сезон завершилсяin': 'Сезон завершается через ',
    'политика конфиденциальности': 'Политика конфиденциальности',
    'Поток вознаграждений': 'Начисление наград',
    'Акции компаний, предоставляющих реальные подарки': 'реальных подарочных акций',
    '100% реально.': 'Да, на 100%.',
    'Что я могу обменять': 'Чем можно торговать',
    'через систему историй': 'через уведомление в сторис',
    'Перехитрите рынок': 'Проверьте, сможете ли вы обойти рынок',
    'Юридические': 'Юридическая информация',
    '25 000 долларов виртуальных денег': '$25 000 виртуальных средств',
    '25 000 долларов виртуальных средств': '$25 000 виртуальных средств',
    'Чувствуете себя могущественным': 'Готовы',
    'заблокирована': 'зафиксирована',
    'Короткая продажа включена в стоимость': 'Шорт-сделки доступны',
    'Конкурс инвестиций в ИИ': 'AI Investment Challenge',
    'Какое место вы занимаете': 'Какое место займёте вы',
    'Справедливо': 'Честная игра',
    'Акции, распределенные случайным образом': 'Случайное распределение акций',
    'Взвешено по значению': 'Вероятность зависит от стоимости',
    'Ценные бумаги более высокой стоимости': 'Более дорогие ценные бумаги',
    'Убеждение важнее общественного мнения': 'Убеждённость важнее общественного мнения',
    'Та же стратегия работает и в 2026 году': 'Та же логика работает и в 2026 году',
    'Сначала была особая атмосфера': 'Сначала появилась сама атмосфера'
  };

  var OVERRIDES = {
    'ru': { direct: RU_DIRECT, fuzzy: RU_FUZZY }
  };

  // ---- ENGINE ----
  var isProcessing = false;

  function getActiveLanguage() {
    var match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) return match[1];
    var manual = document.cookie.match(/pb_lang_manual=([^;]+)/);
    if (manual) return manual[1];
    return null;
  }

  // Elements where we must preserve a child (e.g. countdown span, dot spans, links)
  // Only for elements where we replace text nodes but keep child elements (spans, SVGs, links)
  var PRESERVE_CHILDREN = [
    'hero-subtitle-live', 'ticker-disclaimer-text',
    'prize-1st', 'prize-2nd', 'prize-3rd', 'prize-4th', 'prize-5th',
    'step-1-cta', 'step-2-cta', 'step-3-cta', 'step-4-cta',
    'hero-cta-join', 'hero-cta-play', 'hero-cta-howitworks',
    'faq-q-cost', 'faq-q-risk', 'faq-q-who', 'faq-q-trade',
    'faq-q-winners', 'faq-q-prizes', 'faq-q-choose', 'faq-q-gambling'
  ];

  function applyDirect(dict) {
    var els = document.querySelectorAll('[data-i18n-ru]');
    var count = 0;
    els.forEach(function(el) {
      var key = el.getAttribute('data-i18n-ru');
      if (!dict[key]) return;

      // Block Google Translate from touching this element
      el.classList.add('notranslate');
      el.setAttribute('translate', 'no');

      if (PRESERVE_CHILDREN.indexOf(key) !== -1) {
        // Replace only text nodes, keep child elements (countdown spans, links)
        for (var i = 0; i < el.childNodes.length; i++) {
          if (el.childNodes[i].nodeType === 3 && el.childNodes[i].textContent.trim()) {
            el.childNodes[i].textContent = dict[key];
            count++;
            break;
          }
        }
        // Clear any remaining text nodes after first
        var found = false;
        for (var j = 0; j < el.childNodes.length; j++) {
          if (el.childNodes[j].nodeType === 3 && el.childNodes[j].textContent.trim()) {
            if (found) el.childNodes[j].textContent = '';
            found = true;
          }
        }
      } else {
        // Full replacement — clear everything and set text
        el.textContent = dict[key];
        count++;
      }
    });
    return count;
  }

  function applyFuzzy(dict) {
    var walker = document.createTreeWalker(
      document.body, NodeFilter.SHOW_TEXT, null, false
    );
    var node;
    var keys = Object.keys(dict);
    var count = 0;

    while (node = walker.nextNode()) {
      var parent = node.parentElement;
      if (!parent) continue;
      var tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE') continue;

      var text = node.textContent;
      if (!text || text.trim().length < 2) continue;

      for (var i = 0; i < keys.length; i++) {
        if (text.indexOf(keys[i]) !== -1) {
          node.textContent = text.replace(keys[i], dict[keys[i]]);
          text = node.textContent;
          count++;
        }
      }
    }
    return count;
  }

  function applyAll() {
    if (isProcessing) return;
    isProcessing = true;

    var lang = getActiveLanguage();
    var config = lang && OVERRIDES[lang] ? OVERRIDES[lang] : null;

    if (!config) { isProcessing = false; return; }

    var d = applyDirect(config.direct);
    var f = applyFuzzy(config.fuzzy);

    if (d + f > 0) {
      console.log('[i18n] Applied ' + d + ' direct + ' + f + ' fuzzy override(s) for ' + lang);
    }

    isProcessing = false;
  }

  // ---- INIT ----
  function init() {
    var lang = getActiveLanguage();
    if (!lang || !OVERRIDES[lang]) return;

    // Apply immediately
    applyAll();

    // Watch GT mutations
    var debounceTimer;
    var observer = new MutationObserver(function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyAll, 200);
    });
    observer.observe(document.body, {
      childList: true, subtree: true, characterData: true
    });

    // Retry — GT can be slow
    setTimeout(applyAll, 1500);
    setTimeout(applyAll, 3000);
    setTimeout(applyAll, 6000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
