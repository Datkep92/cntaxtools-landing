'use strict';
(() => {
  const articles = [...document.querySelectorAll('[data-topic]')], links = [...document.querySelectorAll('#guide-topics a')];
  const search = document.getElementById('guide-search');
  const selectMenu = document.createElement('select');
  selectMenu.id = 'guide-select'; selectMenu.setAttribute('aria-label','Chọn mục hướng dẫn');
  const placeholder = document.createElement('option'); placeholder.value=''; placeholder.textContent='Chọn mục để xem…'; selectMenu.append(placeholder);
  links.forEach(link => { const option=document.createElement('option'); option.value=link.hash; option.textContent=link.textContent.replace(/^(\d+)/,'$1 · '); selectMenu.append(option); });
  search.after(selectMenu);
  selectMenu.onchange = () => { if(selectMenu.value)location.hash=selectMenu.value; };
  const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d');
  function select() {
    const requested = location.hash.slice(1), active = articles.find(x => x.id === requested) || articles[0];
    articles.forEach(x => x.hidden = x !== active);
    links.forEach(x => { if (x.hash === '#' + active.id) x.setAttribute('aria-current','page'); else x.removeAttribute('aria-current'); });
    const heading = active.querySelector('h2');
    document.title = heading.textContent + ' — Hướng dẫn CN Tax Tools (CNTaxTools)';
    selectMenu.value = '#'+active.id;
    if (requested) { heading.tabIndex=-1; heading.focus({preventScroll:true}); }
  }
  search.addEventListener('input', () => {
    const term = normalize(search.value.trim());
    links.forEach((link,i) => link.hidden = !normalize(articles[i].textContent).includes(term));
    [...selectMenu.options].slice(1).forEach((option,i) => { option.hidden=links[i].hidden; option.disabled=links[i].hidden; });
    const currentLink=links.find(link=>link.getAttribute('aria-current')==='page');
    selectMenu.value=currentLink&&!currentLink.hidden?currentLink.hash:'';
    document.getElementById('guide-empty').hidden = links.some(x=>!x.hidden);
  });
  document.querySelectorAll('.copy-link').forEach(button => button.onclick = async () => {
    const article = button.closest('article'), url = new URL('#'+article.id,location.href).href;
    const status = article.querySelector('.copy-status');
    try { await navigator.clipboard.writeText(url); status.textContent='Đã sao chép link. Dán để gửi cho người cần hướng dẫn.'; }
    catch { status.textContent='Sao chép địa chỉ trên thanh trình duyệt để chia sẻ mục này: '+url; }
  });
  window.addEventListener('hashchange', () => { select(); document.querySelector('main').scrollIntoView({block:'start'}); });

  const menuBtn = document.getElementById('guide-menu-btn');
  const menuDialog = document.getElementById('guide-dialog');
  const menuBody = document.getElementById('guide-dialog-body');
  const nav = document.querySelector('.layout > nav');
  const layout = document.querySelector('.layout');
  const main = document.querySelector('main');
  const mobileQuery = window.matchMedia('(max-width: 760px)');

  function openMenu() {
    if (!nav || !menuDialog || !menuBody) return;
    if (nav.parentElement !== menuBody) menuBody.append(nav);
    document.body.classList.add('guide-menu-open');
    if (!menuDialog.open) menuDialog.showModal();
    menuBtn.setAttribute('aria-expanded', 'true');
    const current = nav.querySelector('a[aria-current="page"]');
    if (current) current.scrollIntoView({ block: 'center' });
  }

  function closeMenu() {
    document.body.classList.remove('guide-menu-open');
    if (menuDialog && menuDialog.open) menuDialog.close();
  }

  if (menuBtn && menuDialog) {
    menuBtn.addEventListener('click', openMenu);
    menuDialog.addEventListener('close', () => {
      document.body.classList.remove('guide-menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
    menuDialog.addEventListener('click', event => {
      if (event.target === menuDialog) closeMenu();
    });
  }

  if (nav) nav.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });

  function syncMenuLayout() {
    if (!mobileQuery.matches) {
      closeMenu();
      if (nav && layout && main && nav.parentElement !== layout) layout.insertBefore(nav, main);
    }
  }

  if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', syncMenuLayout);
  else mobileQuery.addListener(syncMenuLayout);

  select();
})();
