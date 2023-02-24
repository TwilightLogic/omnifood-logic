'use strict';

const header = document.querySelector('header');
const btn = document.querySelector('.btn-mobile-nav');
const allLinks = document.querySelectorAll('a:link');

// 任务栏弹出/关闭
btn.addEventListener('click', function (e) {
  e.preventDefault(e);

  // header.classList.contains("nav-open")
  //   ? header.classList.remove("nav-open")
  //   : header.classList.add("nav-open");

  header.classList.toggle('nav-open');
});

// smooth scrolling
allLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#') window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      // 页面会跳到sectionEl
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }

    // Close mobile navigation
    if (link.classList.contains('main-nav-link')) {
      header.classList.toggle('nav-open');
    }
  });
});

// Sticky navigation
// 我们要observe这个hero section，因为如果我们滑出这个页面，我们想要做一些事件
const sectionHeroEl = document.querySelector('.section-hero');

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    if (ent.isIntersecting === false) document.body.classList.add('sticky');

    if (ent.isIntersecting === true) document.body.classList.remove('sticky');
  },
  {
    // 我们observe的内容就在这个viewport，所以root是null
    root: null,
    // 一旦hero页面移出，我们就会触发事件
    threshold: 0,
    // 一旦在hero页面前的80px时移出，就会触发事件
    rootMargin: '-80px',
  }
);

obs.observe(sectionHeroEl);

// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}

checkFlexGap();
