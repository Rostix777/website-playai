// ==================== TRANSLATION OVERRIDES ====================
// Fixes incorrect Google Translate output for specific languages.
// After GT translates the page, this script scans text nodes and
// replaces known bad translations with manually corrected versions.
//
// Source: "Play AI.xlsx" translation review spreadsheet.

(function() {

  // ---- RUSSIAN OVERRIDES ----
  // Keys: substring Google Translate produces (bad)
  // Values: corrected text
  var RU_OVERRIDES = {
    // Hero / countdown
    'Сезон завершилсяin': 'Сезон завершается через',
    'Конкурс инвестиций в ИИ стартует в': 'AI Investment Challenge стартует через',

    // Stats block
    'Акции компаний, предоставляющих реальные подарки': 'реальных подарочных акций',

    // 4-Steps block
    'Проверьте свои гипотезы': 'Проверьте свои гипотезы',
    '25 000 долларов виртуальных денег': '$25 000 виртуальных средств',
    'Пожалуйста.': 'Ваши сбережения скажут спасибо.',

    'Короткая продажа включена в стоимость.': 'Шорт-сделки доступны',
    'Считаете, что акции переоценены? Продайте их в короткую. Потому что настоящее инвестирование — это не просто покупка, это умение оказаться правым.':
      'Считаете, что акция переоценена? Откройте короткую позицию. Ведь настоящее инвестирование — это не только покупать, а принимать верные решения.',

    'Какое место вы занимаете?': 'Какое место займёте вы?',
    '25 000 долларов виртуальных денег.': '$25 000 виртуальных средств.',
    'Чувствуете себя могущественным?': 'Готовы показать, на что способны?',

    // Prizes block
    '1-й — 40 акций': '1-е — 40 акций',
    '2-й — 25 акций': '2-е — 25 акций',
    '3-й — 15 акций': '3-е — 15 акций',
    '4-й — 10 акций': '4-е — 10 акций',
    '5-й — 5 акций': '5-е — 5 акций',

    // Coupons / reward flow
    'Поток вознаграждений': 'Начисление наград',
    'Итоговая таблица лидеров заблокирована.': 'Итоговая таблица лидеров зафиксирована.',
    'На счету компании находится случайно выбранная подарочная акция.': 'На счёт зачисляется случайно выбранная подарочная акция.',
    'Держите его, продавайте, стройте вокруг него.': 'Держите её, продавайте или развивайте свою стратегию.',
    'Реальные акции в вашем портфеле': 'Реальная акция в портфеле',

    // Coupons disclaimer
    'Один купон = одна случайно выбранная подарочная акция из утвержденного списка на сайте freedom24.com/gift-stocks-list . Как только акция будет зачислена на ваш счет, вы можете хранить, продавать или использовать ее в нескольких подарочных сертификатах.':
      'Один купон — это одна случайно выбранная подарочная акция из утверждённого списка на freedom24.com/gift-stocks-list. После зачисления акция становится вашей: её можно держать в портфеле, продать или использовать для дальнейшего формирования портфеля.',

    // Transparency
    'Справедливо': 'Честная игра',
    'Акции, распределенные случайным образом': 'Случайное распределение акций',
    'Акции, предназначенные для пожертвований, выбираются случайным образом из утвержденного списка.':
      'Подарочные акции выбираются случайным образом из утверждённого списка.',
    'Взвешено по значению': 'Вероятность зависит от стоимости',
    'Ценные бумаги более высокой стоимости имеют меньшую вероятность успеха. Ценные бумаги меньшей стоимости — более высокую. Справедливо, прозрачно, автоматизировано.':
      'Более дорогие ценные бумаги выпадают реже, менее дорогие — чаще. Распределение проходит честно, прозрачно и автоматически.',

    // Prizes section full text
    'Сезон заканчивается 11 июня 2026 года. Итоговые результаты определены. 95 акций, которые можно подарить, будут распределены между 5 лучшими кандидатами: победитель получит 40 акций. Купоны будут зачислены на ваш счет в Freedom Finance.':
      'Сезон заканчивается 11 июня 2026 года. После этого финальный рейтинг будет зафиксирован. 95 реальных подарочных акций разделят участники из TOP 5: победитель получит 40 акций. Купоны будут зачислены на ваш счёт Freedom Finance.',

    'Каждый купон = одна случайно выбранная акция публично торгуемой компании. Зачисляется непосредственно на ваш счет в Freedom Finance. Реальный. Торгуемый. Ваш.':
      'Каждый купон — это одна случайно выбранная акция публичной компании. Она будет зачислена напрямую на ваш счёт Freedom Finance. Реальная. Доступная для торговли. Ваша.',

    // FAQ
    'Что я могу обменять': 'Чем можно торговать',
    '100% реально.': 'Да, на 100%.',
    'или через систему историй.': 'или через уведомление в сторис.',

    // Footer
    'Перехитрите рынок.': 'Проверьте, сможете ли вы обойти рынок.',
    'Юридические': 'Юридическая информация',
    'политика конфиденциальности': 'Политика конфиденциальности',
    'Рекламная кампания компании Freedom Finance Europe Ltd. Создайте свой инвестиционный портфель. Перехитрите рынок. Выиграйте реальные акции.':
      'Рекламная кампания от Freedom Finance Europe Ltd. Соберите портфель. Проверьте, сможете ли вы обойти рынок. Выиграйте реальные акции.',

    // Fun facts
    'Сначала была особая атмосфера.': 'Сначала появилась сама атмосфера.',
    'Выбирайте, за что бороться, с умом.': 'Выбирайте свои стратегии осознанно.',
    'Та же стратегия работает и в 2026 году.': 'Та же логика работает и в 2026 году.',
    'Убеждение важнее общественного мнения.': 'Убеждённость важнее общественного мнения.'
  };

  // Map language code → overrides dictionary
  var OVERRIDES = {
    'ru': RU_OVERRIDES
  };

  // ---- ENGINE ----
  var activeOverrides = null;
  var isProcessing = false;

  function getActiveLanguage() {
    var match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
    if (match) return match[1];
    var manual = document.cookie.match(/pb_lang_manual=([^;]+)/);
    if (manual) return manual[1];
    return null;
  }

  function applyOverrides() {
    if (!activeOverrides || isProcessing) return;
    isProcessing = true;

    var walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    var node;
    var keys = Object.keys(activeOverrides);
    var replacements = 0;

    while (node = walker.nextNode()) {
      // Skip script/style/notranslate elements
      var parent = node.parentElement;
      if (!parent) continue;
      var tag = parent.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'CODE') continue;
      if (parent.classList.contains('notranslate') || parent.hasAttribute('translate')) continue;

      var text = node.textContent;
      if (!text || text.trim().length < 2) continue;

      for (var i = 0; i < keys.length; i++) {
        var bad = keys[i];
        if (text.indexOf(bad) !== -1) {
          node.textContent = text.replace(bad, activeOverrides[bad]);
          text = node.textContent;
          replacements++;
        }
      }
    }

    if (replacements > 0) {
      console.log('[i18n] Applied ' + replacements + ' translation override(s)');
    }

    isProcessing = false;
  }

  // ---- INIT ----
  function init() {
    var lang = getActiveLanguage();
    activeOverrides = lang && OVERRIDES[lang] ? OVERRIDES[lang] : null;

    if (!activeOverrides) return;

    // Apply immediately (GT may have already translated)
    applyOverrides();

    // Watch for GT mutations (it translates async)
    var debounceTimer;
    var observer = new MutationObserver(function() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(applyOverrides, 300);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Also apply after a delay (GT can be slow)
    setTimeout(applyOverrides, 2000);
    setTimeout(applyOverrides, 5000);
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
