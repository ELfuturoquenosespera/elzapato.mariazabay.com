/* Selección accesible de personajes para El zapato de la lengua rota. */
(() => {
  'use strict';
  const list = document.getElementById('characterTabs');
  if (!list) return;
  const tabs = [...list.querySelectorAll('[role="tab"][data-char]')];
  const panels = new Map(tabs.map(tab => [tab.dataset.char, document.getElementById(tab.dataset.char)]));
  function selectCharacter(key, focusTab = false) {
    if (!panels.has(key)) return;
    for (const tab of tabs) {
      const selected = tab.dataset.char === key;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      panels.get(tab.dataset.char).hidden = !selected;
      if (selected && focusTab) tab.focus();
    }
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectCharacter(tab.dataset.char));
    tab.addEventListener('keydown', event => {
      const last = tabs.length - 1;
      const next = event.key === 'ArrowRight' ? (index + 1) % tabs.length
        : event.key === 'ArrowLeft' ? (index + last) % tabs.length
        : event.key === 'Home' ? 0
        : event.key === 'End' ? last : null;
      if (next === null) return;
      event.preventDefault();
      selectCharacter(tabs[next].dataset.char, true);
    });
  });
  document.querySelectorAll('.menu-characters [data-character]').forEach(link => {
    link.addEventListener('click', () => selectCharacter(link.dataset.character));
  });
  // Compatibilidad con los antiguos enlaces directos a las fichas individuales.
  function selectHashCharacter() {
    const key = decodeURIComponent(window.location.hash.slice(1));
    if (panels.has(key)) selectCharacter(key);
  }
  window.addEventListener('hashchange', selectHashCharacter);
  selectHashCharacter();
})();
