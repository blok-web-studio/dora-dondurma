// ─── scroll reveal ──────────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

revealEls.forEach((el) => {
  // If already visible on load (hero), keep it
  if (!el.classList.contains('is-visible')) {
    revealObserver.observe(el);
  }
});

// ─── flavor game ────────────────────────────────────────
const products = [
  { category: 'Dondurma', name: 'Sakızlı Damla' },
  { category: 'Dondurma', name: 'Sade Krem' },
  { category: 'Dondurma', name: 'Antep Fıstıklı' },
  { category: 'Dondurma', name: 'Meyveli Şölen' },
  { category: 'Pastane', name: 'Trileçe' },
  { category: 'Pastane', name: 'Tiramisu' },
  { category: 'Pastane', name: 'Baklava' },
  { category: 'Pastane', name: 'Islak Kek' },
  { category: 'İçecekler', name: 'Türk Kahvesi' },
  { category: 'İçecekler', name: 'Soğuk Kahve' },
  { category: 'İçecekler', name: 'Limonata' },
  { category: 'İçecekler', name: 'Milkshake' },
  { category: 'Waffle', name: 'Klasik Waffle' },
  { category: 'Waffle', name: 'Orman Meyveli' },
  { category: 'Waffle', name: 'Karışık' },
];

const flavorBtn = document.getElementById('flavorBtn');
const flavorResult = document.getElementById('flavorResult');

flavorBtn.addEventListener('click', () => {
  const pick = products[Math.floor(Math.random() * products.length)];

  // Shuffle icon spin
  const icon = flavorBtn.querySelector('i');
  icon.style.transition = 'transform 0.4s cubic-bezier(0.2, 0, 0, 1)';
  icon.style.transform = 'rotate(360deg)';

  // Quick fade out
  flavorResult.style.opacity = '0';
  flavorResult.style.transform = 'translateY(6px)';

  requestAnimationFrame(() => {
    setTimeout(() => {
      flavorResult.innerHTML = `
        <span class="flavor-name">${pick.name}</span>
        <span class="flavor-category">${pick.category}</span>
      `;
      flavorResult.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.2, 0, 0, 1)';
      flavorResult.style.opacity = '1';
      flavorResult.style.transform = 'translateY(0)';

      // Reset icon spin
      setTimeout(() => {
        icon.style.transition = 'none';
        icon.style.transform = 'rotate(0deg)';
      }, 400);
    }, 200);
  });
});

// ─── hero decorative dots ──────────────────────────────
const decoContainer = document.querySelector('.hero-deco');
if (decoContainer) {
  const dotCount = 28;
  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('span');
    dot.className = 'hero-deco-dot ' + (i % 2 === 0 ? 'is-pink' : 'is-cyan');
    const x = Math.random() * 96 + 2;
    const y = Math.random() * 90 + 5;
    const size = Math.random() * 6 + 4;
    dot.style.cssText = `
      left: ${x}%;
      top: ${y}%;
      width: ${size}px;
      height: ${size}px;
      opacity: ${Math.random() * 0.12 + 0.06};
    `;
    decoContainer.appendChild(dot);
  }
}

// ─── sequential card hover (stagger lift) ──────────────
function addHoverDim(containerSel, cardSel) {
  const containers = document.querySelectorAll(containerSel);
  containers.forEach((container) => {
    const cards = container.querySelectorAll(cardSel);
    cards.forEach((card) => {
      card.addEventListener('mouseenter', () => {
        cards.forEach((sib) => {
          if (sib !== card) {
            sib.style.opacity = '0.7';
            sib.style.transition = 'opacity 0.3s ease';
          }
        });
      });
      card.addEventListener('mouseleave', () => {
        cards.forEach((sib) => {
          sib.style.opacity = '1';
        });
      });
    });
  });
}
addHoverDim('.product-grid', '.product-card');
addHoverDim('.bento-grid', '.bento-card');
addHoverDim('.trio-grid', '.bento-card');
addHoverDim('.scroll-strip', '.strip-card');
