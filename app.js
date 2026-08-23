// Helper para obter as configurações centrais
function getConfig() {
  if (typeof RESTAURANT_CONFIG !== 'undefined') {
    return RESTAURANT_CONFIG;
  }
  return {
    brand: {
      name: "RESTAURANTE E PIZZARIA ARTE & DELÍCIA",
      shortName: "ARTE & DELÍCIA",
      subTitle: "Restaurante & Pizzaria",
      ownerOrContactPerson: "Simonny",
      topBannerText: "✨ Mais de 13 anos de tradição e sabor servindo Itaiçaba com carinho!",
      copyrightText: "© 2026 Restaurante e Pizzaria Arte & Delícia. Todos os direitos reservados."
    },
    media: {
      logo: "assets/logo.png",
      heroImage: "assets/nordestina.jpg"
    },
    contact: {
      phoneWhatsApp: "5588993345987",
      phoneDisplay: "(88) 99334-5987",
      address: "Beira Rio, Itaiçaba - CE",
      workingHours: "Segunda a Domingo das 18h às 23h"
    },
    delivery: {
      coverageAlertText: "Entregamos em Itaiçaba (Sede / Beira Rio) e até o <strong>Alto do Brito</strong> e <strong>Boca do Forno</strong> (Taxa de R$ 2,00).",
      defaultFreeLabel: "Grátis (Itaiçaba Sede)",
      regions: [
        { id: "itaicaba", name: "📍 Itaiçaba (Sede / Centro / Beira Rio / Bairros) — Entrega Grátis", shortLabel: "Itaiçaba Sede", fee: 0, keywords: ["itaicaba", "sede", "centro", "beira rio"] },
        { id: "brito", name: "🛵 Alto do Brito / Brito — Taxa de R$ 2,00", shortLabel: "Alto do Brito", fee: 2.0, keywords: ["brito", "alto do brito"] },
        { id: "boca_do_forno", name: "🛵 Boca do Forno — Taxa de R$ 2,00", shortLabel: "Boca do Forno", fee: 2.0, keywords: ["boca do forno", "forno"] }
      ]
    },
    menu: (typeof MENU_DATA !== 'undefined' ? MENU_DATA : {})
  };
}

// Injeção de variáveis CSS imediatas (executa assim que o script é lido)
(function applyEarlyTheme() {
  if (typeof RESTAURANT_CONFIG !== 'undefined' && RESTAURANT_CONFIG.theme && RESTAURANT_CONFIG.theme.colors) {
    const root = document.documentElement;
    const c = RESTAURANT_CONFIG.theme.colors;
    if (c.primaryRed) root.style.setProperty('--primary-red', c.primaryRed);
    if (c.primaryRedHover) root.style.setProperty('--primary-red-hover', c.primaryRedHover);
    if (c.primaryRedGradient) root.style.setProperty('--primary-red-gradient', c.primaryRedGradient);
    if (c.accentGold) root.style.setProperty('--accent-gold', c.accentGold);
    if (c.accentYellow) root.style.setProperty('--accent-yellow', c.accentYellow);
    if (c.accentGreen) root.style.setProperty('--accent-green', c.accentGreen);
    if (c.bgDark) root.style.setProperty('--bg-dark', c.bgDark);
    if (c.bgCardDark) root.style.setProperty('--bg-card-dark', c.bgCardDark);
    if (c.bgCardLight) root.style.setProperty('--bg-card-light', c.bgCardLight);
    if (c.textMain) root.style.setProperty('--text-main', c.textMain);
    if (c.textDark) root.style.setProperty('--text-dark', c.textDark);
    if (c.textMuted) root.style.setProperty('--text-muted', c.textMuted);
    if (c.borderDark) root.style.setProperty('--border-dark', c.borderDark);
    if (c.borderLight) root.style.setProperty('--border-light', c.borderLight);
  }
})();

// Aplicação de toda a identidade visual, contatos, mídias e regiões no DOM
function applyRestaurantConfig() {
  const cfg = getConfig();
  if (!cfg) return;

  // 1. Theme / CSS Variables
  if (cfg.theme && cfg.theme.colors) {
    const root = document.documentElement;
    const c = cfg.theme.colors;
    if (c.primaryRed) root.style.setProperty('--primary-red', c.primaryRed);
    if (c.primaryRedHover) root.style.setProperty('--primary-red-hover', c.primaryRedHover);
    if (c.primaryRedGradient) root.style.setProperty('--primary-red-gradient', c.primaryRedGradient);
    if (c.accentGold) root.style.setProperty('--accent-gold', c.accentGold);
    if (c.accentYellow) root.style.setProperty('--accent-yellow', c.accentYellow);
    if (c.accentGreen) root.style.setProperty('--accent-green', c.accentGreen);
    if (c.bgDark) root.style.setProperty('--bg-dark', c.bgDark);
    if (c.bgCardDark) root.style.setProperty('--bg-card-dark', c.bgCardDark);
    if (c.bgCardLight) root.style.setProperty('--bg-card-light', c.bgCardLight);
    if (c.textMain) root.style.setProperty('--text-main', c.textMain);
    if (c.textDark) root.style.setProperty('--text-dark', c.textDark);
    if (c.textMuted) root.style.setProperty('--text-muted', c.textMuted);
    if (c.borderDark) root.style.setProperty('--border-dark', c.borderDark);
    if (c.borderLight) root.style.setProperty('--border-light', c.borderLight);
  }

  // 2. Identidade da Marca e Textos
  if (cfg.brand) {
    const b = cfg.brand;
    if (b.metaTitle) document.title = b.metaTitle;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && b.metaDescription) metaDesc.setAttribute('content', b.metaDescription);

    document.querySelectorAll('.logo-brand-title').forEach(el => el.innerText = b.shortName || b.name);
    document.querySelectorAll('.logo-text p').forEach(el => el.innerText = b.subTitle || 'Restaurante & Pizzaria');

    const topBanner = document.querySelector('.top-banner-text span');
    if (topBanner && b.topBannerText) topBanner.innerText = b.topBannerText;

    const eyebrow = document.querySelector('.hero-cursive-eyebrow');
    if (eyebrow && b.eyebrowText) eyebrow.innerText = b.eyebrowText;

    const heroTitle = document.querySelector('.hero-main-title');
    if (heroTitle && b.heroTitle) {
      heroTitle.innerHTML = `${b.heroTitle} <span>${b.heroTitleHighlight || ''}</span>`;
    }

    const heroDesc = document.querySelector('.hero-description');
    if (heroDesc && b.heroDescription) heroDesc.innerHTML = b.heroDescription;

    const waTooltip = document.querySelector('.whatsapp-tooltip');
    if (waTooltip) {
      waTooltip.innerText = `Fale com ${b.ownerOrContactPerson || 'a gente'}! 🍕`;
    }

    const btnFinalize = document.querySelector('#cartModal .btn-primary');
    if (btnFinalize) {
      btnFinalize.innerHTML = `<i class="fa-brands fa-whatsapp"></i> ENVIAR PEDIDO PARA O WHATSAPP`;
    }

    const btnRes = document.querySelector('.btn-res-submit');
    if (btnRes) {
      btnRes.innerHTML = `SOLICITAR RESERVA COM ${b.ownerOrContactPerson ? b.ownerOrContactPerson.toUpperCase() : 'A CASA'} <i class="fa-solid fa-arrow-right"></i>`;
    }

    const aboutLead = document.querySelector('.about-lead');
    if (aboutLead && b.aboutLead) aboutLead.innerHTML = b.aboutLead;

    const aboutDesc = document.querySelector('.about-desc');
    if (aboutDesc && b.aboutDescription) aboutDesc.innerHTML = b.aboutDescription;

    const footerAbout = document.querySelector('.footer-brand-col p');
    if (footerAbout && (b.footerText || b.aboutLead)) {
      footerAbout.innerText = `${b.name}. ${b.aboutLead || ''}`;
    }
    const footerBottom = document.querySelector('.footer-bottom-bar p');
    if (footerBottom && b.copyrightText) footerBottom.innerText = b.copyrightText;
  }

  // 3. Mídias
  if (cfg.media) {
    const m = cfg.media;
    if (m.favicon) {
      const fav = document.querySelector('link[rel="icon"]');
      if (fav) fav.href = m.favicon;
    }
    if (m.logo) {
      document.querySelectorAll('.site-official-logo, .drawer-official-logo, .footer-official-logo').forEach(img => {
        img.src = m.logo;
        img.alt = `Logo ${cfg.brand?.name || 'Restaurante'}`;
      });
    }
    if (m.heroImage) {
      const heroImg = document.querySelector('.hero-large-pizza-img');
      if (heroImg) heroImg.src = m.heroImage;
    }
    if (m.aboutVideo) {
      const video = document.getElementById('aboutVideoPlayer');
      if (video) {
        video.src = m.aboutVideo;
        if (m.aboutVideoPoster) video.poster = m.aboutVideoPoster;
      }
    }
  }

  // 4. Contatos & Links do WhatsApp
  if (cfg.contact) {
    const c = cfg.contact;
    const phone = c.phoneWhatsApp || '5588993345987';
    const phoneDisplay = c.phoneDisplay || phone;
    const greeting = encodeURIComponent(`Olá ${cfg.brand?.ownerOrContactPerson || ''}, estou no site e gostaria de fazer um pedido!`);

    document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach(a => {
      a.href = `https://wa.me/${phone}?text=${greeting}`;
    });

    const topSocial = document.querySelector('.top-socials span, .top-socials a');
    if (topSocial) {
      topSocial.innerHTML = `<i class="fa-solid fa-phone"></i> ${phoneDisplay}`;
    }

    const topInfoSpans = document.querySelectorAll('.top-info span');
    if (topInfoSpans.length >= 3) {
      if (c.address) topInfoSpans[0].innerHTML = `<i class="fa-solid fa-location-dot"></i> ${c.address}`;
      if (c.workingHours) topInfoSpans[2].innerHTML = `<i class="fa-solid fa-clock"></i> ${c.workingHours}`;
    }

    const heroLocSpans = document.querySelectorAll('.hero-location-line span');
    if (heroLocSpans.length >= 3) {
      if (c.addressShort || c.address) heroLocSpans[0].innerHTML = `<i class="fa-solid fa-location-dot"></i> ${c.addressShort || c.address}`;
      if (c.workingHoursShort || c.workingHours) heroLocSpans[2].innerHTML = `<i class="fa-regular fa-clock"></i> ${c.workingHoursShort || c.workingHours}`;
    }

    const footerContact = document.querySelector('.footer-contact-col');
    if (footerContact) {
      footerContact.innerHTML = `
        <h4>CONTATO & HORÁRIO</h4>
        <p><i class="fa-brands fa-whatsapp"></i> ${phoneDisplay} (${cfg.brand?.ownerOrContactPerson || 'Atendimento'})</p>
        <p><i class="fa-regular fa-clock"></i> ${c.workingHours || '18h às 23h'}</p>
        <p><i class="fa-solid fa-location-dot"></i> ${c.addressShort || c.address || ''}</p>
      `;
    }
  }

  // 5. Regiões de Entrega e Alerta de Cobertura
  if (cfg.delivery) {
    const del = cfg.delivery;
    const covAlert = document.querySelector('.delivery-coverage-alert span');
    if (covAlert && del.coverageAlertText) {
      covAlert.innerHTML = del.coverageAlertText;
    }

    const sel = document.getElementById('deliveryRegion');
    if (sel && del.regions && del.regions.length) {
      sel.innerHTML = del.regions.map(r => `
        <option value="${r.id}" data-fee="${r.fee}">${r.name}</option>
      `).join('');
    }
  }
}

// Application State
let currentCategory = 'all';
let cart = JSON.parse(localStorage.getItem('arte_delicia_cart')) || [];
let favorites = JSON.parse(localStorage.getItem('arte_delicia_favs')) || [];
let selectedPizza = null;
let selectedSize = 'G'; // Default size
let isHalfHalf = false;
let secondFlavor = null;
let orderType = 'delivery';

// DOM Loaded Initialization
document.addEventListener('DOMContentLoaded', () => {
  applyRestaurantConfig();
  renderPizzaGrid();
  updateCartBadge();
  updateUserNavBadge();

  // Intercepta TODOS os links internos de âncora para usar scroll com offset da navbar fixa
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;
    const id = hash.slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    // Só intercepta se NÃO tiver onclick já tratando (filterCategory etc.)
    if (link.getAttribute('onclick') && link.getAttribute('onclick').includes('event.preventDefault()')) return;
    e.preventDefault();
    scrollToSection(id);
  });

  // Inicialização do efeito FoldText (React Bits para Vanilla JS)
  try {
    initFoldText();
  } catch (err) {
    console.warn("Erro ao inicializar efeito FoldText:", err);
  }

  // Inicialização de navegação sênior e efeitos interativos
  try {
    initNavbarScroll();
    initScrollSpy();
    initMagneticButtons();
    initTestimonialsCarousel();
  } catch (err) {
    console.warn("Erro ao inicializar interações sênior:", err);
  }
});

// Customer Account & Saved Profile System
function getUserProfile() {
  try {
    return JSON.parse(localStorage.getItem('arte_delicia_user')) || null;
  } catch (e) {
    return null;
  }
}

function updateUserNavBadge() {
  const user = getUserProfile();
  const navBtn = document.getElementById('navAccountBtn');
  const navText = document.getElementById('navAccountText');
  
  if (navText && navBtn) {
    if (user && user.name) {
      const firstName = user.name.trim().split(' ')[0];
      navText.innerText = `Olá, ${firstName}`;
      navBtn.classList.add('logged-in');
    } else {
      navText.innerText = 'Minha Conta';
      navBtn.classList.remove('logged-in');
    }
  }
}

function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (!modal) return;

  const user = getUserProfile();
  const btnClear = document.getElementById('btnClearProfile');

  if (user) {
    if (document.getElementById('profileName')) document.getElementById('profileName').value = user.name || '';
    if (document.getElementById('profilePhone')) document.getElementById('profilePhone').value = user.phone || '';
    if (document.getElementById('profileStreet')) document.getElementById('profileStreet').value = user.street || '';
    if (document.getElementById('profileNeighborhood')) document.getElementById('profileNeighborhood').value = user.neighborhood || '';
    if (document.getElementById('profileComplement')) document.getElementById('profileComplement').value = user.complement || '';
    if (document.getElementById('profilePaymentPref') && user.paymentPref) {
      document.getElementById('profilePaymentPref').value = user.paymentPref;
    }
    if (btnClear) btnClear.style.display = 'inline-flex';
  } else {
    document.getElementById('authProfileForm')?.reset();
    if (btnClear) btnClear.style.display = 'none';
  }

  modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active');
}

function saveUserProfile(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('profileName')?.value.trim();
  const phone = document.getElementById('profilePhone')?.value.trim();
  const street = document.getElementById('profileStreet')?.value.trim();
  const neighborhood = document.getElementById('profileNeighborhood')?.value.trim();
  const complement = document.getElementById('profileComplement')?.value.trim();
  const paymentPref = document.getElementById('profilePaymentPref')?.value;

  if (!name || !phone) {
    alert('Por favor, preencha pelo menos seu Nome e WhatsApp.');
    return;
  }

  const userData = {
    name,
    phone,
    street: street || '',
    neighborhood: neighborhood || '',
    complement: complement || '',
    paymentPref: paymentPref || 'Pix'
  };

  localStorage.setItem('arte_delicia_user', JSON.stringify(userData));
  updateUserNavBadge();
  closeAuthModal();

  // If cart modal is currently open, pre-fill it immediately
  prefillCartFromProfile();

  alert(`Dados salvos com sucesso! Olá, ${name.split(' ')[0]}. Seus dados serão preenchidos automaticamente nos próximos pedidos.`);
}

function clearUserProfile() {
  if (confirm('Deseja realmente limpar seus dados salvos deste navegador?')) {
    localStorage.removeItem('arte_delicia_user');
    updateUserNavBadge();
    closeAuthModal();
    const alertBox = document.getElementById('savedAccountAlert');
    if (alertBox) alertBox.style.display = 'none';
    alert('Seus dados foram removidos.');
  }
}

function prefillCartFromProfile() {
  const user = getUserProfile();
  const alertBox = document.getElementById('savedAccountAlert');

  if (user) {
    if (document.getElementById('cartCustomerName')) document.getElementById('cartCustomerName').value = user.name || '';
    if (document.getElementById('cartCustomerPhone')) document.getElementById('cartCustomerPhone').value = user.phone || '';
    if (document.getElementById('deliveryStreet')) document.getElementById('deliveryStreet').value = user.street || '';
    if (document.getElementById('deliveryNeighborhood')) document.getElementById('deliveryNeighborhood').value = user.neighborhood || '';
    if (document.getElementById('deliveryComplement')) document.getElementById('deliveryComplement').value = user.complement || '';
    if (document.getElementById('paymentMethod') && user.paymentPref) {
      document.getElementById('paymentMethod').value = user.paymentPref;
      toggleChangeBox(user.paymentPref);
    }
    if (alertBox) {
      alertBox.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>Olá, <strong>${user.name}</strong>! Seus dados e endereço foram carregados automaticamente. <a href="javascript:void(0)" onclick="openAuthModal()">Alterar</a></span>`;
      alertBox.style.display = 'flex';
    }
  } else {
    if (alertBox) alertBox.style.display = 'none';
  }
}

window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.saveUserProfile = saveUserProfile;
window.clearUserProfile = clearUserProfile;
window.getUserProfile = getUserProfile;

// Combine all pizzas into a single array (sem bebidas)
function getAllPizzas() {
  const cfg = getConfig();
  const m = cfg.menu || (typeof MENU_DATA !== 'undefined' ? MENU_DATA : {});
  return [
    ...(m.pizzasClassicas || []),
    ...(m.pizzasEspeciais || []),
    ...(m.pizzasDoces || [])
  ];
}

let currentMenuSize = 'G'; // Tamanho selecionado no cardápio ('P', 'M', 'G', 'GG')

function filterMenuSize(size) {
  currentMenuSize = size;
  document.querySelectorAll('.size-pill').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`size-btn-${size}`)?.classList.add('active');
  renderPizzaGrid();

  if (typeof gsap !== 'undefined') {
    gsap.fromTo('.pizza-card-clean',
      { y: 18, opacity: 0, scale: 0.97 },
      { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.04, ease: 'power2.out' }
    );
  }
}
window.filterMenuSize = filterMenuSize;

// Render Pizzas Grid in Clean Card Style
function renderPizzaGrid() {
  const grid = document.getElementById('pizzaGrid');
  if (!grid) return;

  const cfg = getConfig();
  const menu = cfg.menu || (typeof MENU_DATA !== 'undefined' ? MENU_DATA : {});
  const sizeContainer = document.getElementById('sizePillsContainer');
  const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';

  // --- BEBIDAS ---
  if (currentCategory === 'bebida') {
    if (sizeContainer) sizeContainer.style.display = 'none';

    let bebidas = [...(menu.bebidas || [])];
    if (searchQuery.trim() !== '') {
      bebidas = bebidas.filter(b =>
        b.name.toLowerCase().includes(searchQuery) ||
        (b.description && b.description.toLowerCase().includes(searchQuery))
      );
    }

    // Ordenação decrescente por preço (mais caras no topo, mais baratas embaixo)
    bebidas.sort((a, b) => b.price - a.price);

    if (bebidas.length === 0) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted);"><i class="fa-solid fa-glass-water" style="font-size:3rem;margin-bottom:1rem;color:var(--primary-red);"></i><h3>Nenhuma bebida encontrada</h3></div>`;
      return;
    }
    grid.innerHTML = bebidas.map(b => {
      const price = b.price.toFixed(2).replace('.', ',');
      return `
        <div class="pizza-card-clean drink-card">
          <div class="drink-icon-wrap">
            ${b.image ? `<img src="${b.image}" alt="${b.name}" class="drink-img-thumb" loading="lazy">` : `<span class="drink-emoji">${b.icon}</span>`}
          </div>
          <h3 class="pizza-clean-title">${b.name}</h3>
          <p class="pizza-clean-ingredients">${b.description}</p>
          <div class="pizza-clean-footer">
            <div class="price-container-clean">
              <span class="size-label-clean">Unidade</span>
              <div class="price-tag-clean">R$ ${price}</div>
            </div>
            <button class="btn-add-cart-clean" onclick="addDrinkToCart('${b.id}')">
              <i class="fa-solid fa-plus"></i> ADICIONAR
            </button>
          </div>
        </div>
      `;
    }).join('');
    return;
  }

  // --- PIZZAS ---
  if (sizeContainer) sizeContainer.style.display = 'flex';

  let pizzas = getAllPizzas();
  if (currentCategory === 'classica') pizzas = menu.pizzasClassicas || [];
  else if (currentCategory === 'especial') pizzas = menu.pizzasEspeciais || [];
  else if (currentCategory === 'doce') pizzas = menu.pizzasDoces || [];

  // Filtrar apenas pizzas disponíveis no tamanho selecionado (ex: Doces não têm GG)
  pizzas = pizzas.filter(p => p.prices && p.prices[currentMenuSize] != null);

  if (searchQuery.trim() !== '') {
    pizzas = pizzas.filter(p =>
      p.name.toLowerCase().includes(searchQuery) ||
      p.ingredients.toLowerCase().includes(searchQuery)
    );
  }

  // Ordenação decrescente por preço no tamanho selecionado (mais caras no topo, mais baratas embaixo)
  pizzas.sort((a, b) => {
    const priceA = a.prices[currentMenuSize] || 0;
    const priceB = b.prices[currentMenuSize] || 0;
    return priceB - priceA;
  });

  if (pizzas.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-pizza-slice" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-red);"></i>
        <h3>Nenhuma pizza encontrada</h3>
        <p>Tente buscar por outro termo ou selecione outro tamanho.</p>
      </div>
    `;
    return;
  }

  const sizeLabelMap = {
    'P': 'Tamanho P (4 fatias)',
    'M': 'Tamanho M (6 fatias)',
    'G': 'Tamanho G (8 fatias)',
    'GG': 'Tamanho GG (12 fatias)'
  };

  grid.innerHTML = pizzas.map(pizza => {
    const isFav = favorites.includes(pizza.id);
    const sizePrice = pizza.prices[currentMenuSize] || pizza.prices.G || 0;
    const priceFormatted = sizePrice.toFixed(2).replace('.', ',');
    const sizeLabel = (currentMenuSize === 'GG' && pizza.category === 'doce')
      ? 'Tamanho GG (Até 1/3 doce • 3 Sabores)'
      : (sizeLabelMap[currentMenuSize] || `Tamanho ${currentMenuSize}`);

    return `
      <div class="pizza-card-clean">
        <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${pizza.id}', event)">
          <i class="${isFav ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
        </button>

        <img src="${pizza.image}" alt="${pizza.name}" class="pizza-clean-img" loading="lazy">
        
        <h3 class="pizza-clean-title">${pizza.name}</h3>
        <p class="pizza-clean-ingredients">${pizza.ingredients}</p>
        
        <div class="pizza-clean-footer">
          <div class="price-container-clean">
            <span class="size-label-clean">${sizeLabel}</span>
            <div class="price-tag-clean">R$ ${priceFormatted}</div>
          </div>
          <button class="btn-add-cart-clean" onclick="openCustomizerModal('${pizza.id}', '${currentMenuSize}')">
            <i class="fa-solid fa-cart-plus"></i> MONTAR PIZZA
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Adicionar bebida ao carrinho diretamente (sem customizador)
function addDrinkToCart(drinkId) {
  const drink = (MENU_DATA.bebidas || []).find(b => b.id === drinkId);
  if (!drink) return;

  const existing = cart.find(i => i.type === 'bebida' && (i.drinkId === drinkId || i.id === drinkId));
  if (existing) {
    existing.quantity += 1;
    existing.totalPrice = (existing.price || existing.unitPrice || drink.price) * existing.quantity;
  } else {
    cart.push({
      id: 'drink_' + drink.id + '_' + Date.now(),
      type: 'bebida',
      drinkId: drink.id,
      name: drink.name,
      title: drink.name,
      icon: drink.icon,
      image: drink.image || '',
      size: 'Unidade',
      quantity: 1,
      price: drink.price,
      unitPrice: drink.price,
      totalPrice: drink.price
    });
  }

  saveCart();
  updateCartBadge();
  showCartToast(`${drink.name} adicionado! 🥤`, 'Toque aqui para ver seu carrinho');

  // Feedback visual no botão
  const btn = event?.target?.closest('button');
  if (btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-check"></i> ADICIONADO!';
    btn.style.background = 'var(--accent-green)';
    setTimeout(() => {
      btn.innerHTML = orig;
      btn.style.background = '';
    }, 1200);
  }
}
window.addDrinkToCart = addDrinkToCart;


// Favorite toggle handler
function toggleFavorite(pizzaId, e) {
  e.stopPropagation();
  if (favorites.includes(pizzaId)) {
    favorites = favorites.filter(id => id !== pizzaId);
  } else {
    favorites.push(pizzaId);
  }
  localStorage.setItem('arte_delicia_favs', JSON.stringify(favorites));
  renderPizzaGrid();
}

// Utility: scroll to element accounting for fixed navbar + top-bar height
function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;

  const topBar = document.querySelector('.top-bar');
  const navbar = document.querySelector('.navbar');
  const topBarH = (topBar && getComputedStyle(topBar).display !== 'none') ? (topBar.offsetHeight || 30) : 0;
  const navbarH = navbar ? (navbar.offsetHeight || 68) : 68;
  const offset = topBarH + navbarH + 12; // 12px extra breathing room

  const elementTop = target.getBoundingClientRect().top + window.pageYOffset;
  window.scrollTo({ top: elementTop - offset, behavior: 'smooth' });
}

// Category Filter — filtra pizzas e rola para a seção #cardapio unificada
function filterCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${category}`)?.classList.add('active');
  renderPizzaGrid();

  requestAnimationFrame(() => {
    scrollToSection('cardapio');
    setTimeout(() => {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.pizza-card-clean',
          { y: 25, opacity: 0, scale: 0.96 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
        );
      }
    }, 200);
  });
}

// Scroll animado para todas as pizzas no cardápio
function scrollToCatalogAndAnimate(category = 'all') {
  currentCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${category}`)?.classList.add('active');
  renderPizzaGrid();

  requestAnimationFrame(() => {
    scrollToSection('cardapio');
    setTimeout(() => {
      if (typeof gsap !== 'undefined') {
        gsap.fromTo('.pizza-card-clean',
          { y: 35, opacity: 0, scale: 0.94 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.06, ease: 'back.out(1.2)' }
        );
      }
    }, 300);
  });
}

// Global exposure
window.scrollToCatalogAndAnimate = scrollToCatalogAndAnimate;
window.filterCategory = filterCategory;
window.scrollToSection = scrollToSection;

// Search Filter
function filterPizzas() {
  renderPizzaGrid();
}

// =========================================================================
// NOVO SISTEMA DE MONTAGEM & CUSTOMIZAÇÃO INTUITIVA DE PIZZAS
// =========================================================================

let customizerState = {
  size: 'G',
  flavorCount: 1,
  flavors: [null, null, null], // [pizzaObj1, pizzaObj2, pizzaObj3]
  crust: { id: 'catupiry', name: 'Borda Catupiry', price: 0 },
  quickNotes: [],
  notes: '',
  drinks: {} // { drinkId: quantity }
};

let activePickerSlot = 0; // 0 (1º Sabor / Metade 1), 1 (2º Sabor / Metade 2), 2 (3º Sabor / Metade 3)
let currentPickerCategory = 'all';

function openCustomizer(pizzaId, initialSize) {
  const allPizzas = getAllPizzas();
  let basePizza = allPizzas.find(p => p.id === pizzaId) || allPizzas[0];
  
  const targetSize = initialSize || currentMenuSize || 'G';
  customizerState.size = (basePizza && basePizza.prices && basePizza.prices[targetSize] != null) ? targetSize : 'G';
  
  // Sabor 1
  customizerState.flavors[0] = basePizza;

  // Sabor 2 default (se for diferente de sabor 1)
  const defaultSecond = allPizzas.find(p => p.id !== basePizza.id && p.prices && p.prices[customizerState.size] != null && p.category !== 'doce') || allPizzas[1] || basePizza;
  customizerState.flavors[1] = defaultSecond;

  // Sabor 3 default (se for GG)
  const defaultThird = allPizzas.find(p => p.id !== basePizza.id && p.id !== defaultSecond.id && p.prices && p.prices[customizerState.size] != null && p.category !== 'doce') || allPizzas[2] || basePizza;
  customizerState.flavors[2] = defaultThird;

  // Regra GG se for doce: 3 sabores
  if (customizerState.size === 'GG' && basePizza.category === 'doce') {
    customizerState.flavorCount = 3;
  } else {
    customizerState.flavorCount = 1;
  }

  customizerState.crust = { id: 'catupiry', name: 'Borda Catupiry', price: 0 };
  customizerState.quickNotes = [];
  customizerState.drinks = {};
  
  const notesInput = document.getElementById('pizzaNotes');
  if (notesInput) notesInput.value = '';

  document.querySelectorAll('.quick-chip').forEach(btn => btn.classList.remove('active'));

  renderCustomizerUI();

  const modal = document.getElementById('customizerModal');
  if (modal) modal.classList.add('active');
}

function closeCustomizerModal() {
  const modal = document.getElementById('customizerModal');
  if (modal) modal.classList.remove('active');
}

function renderCustomizerUI() {
  renderSizeSelector();
  updateFlavorTabsForSize();
  renderFlavorSlots();
  renderCrustOptions();
  renderCustomizerDrinks();
  updateCustomizerTotal();
}

function renderSizeSelector() {
  const container = document.getElementById('sizeSelector');
  if (!container) return;

  const cfg = getConfig();
  const menuSizes = (cfg.menu && cfg.menu.sizes) || (typeof MENU_DATA !== 'undefined' ? MENU_DATA.sizes : []);
  const p1 = customizerState.flavors[0];
  if (!p1) return;

  const availableSizes = menuSizes.filter(s => p1.prices && p1.prices[s.key] != null);

  // Se o tamanho atual não estiver disponível, seleciona o maior disponível
  if (p1.prices[customizerState.size] == null && availableSizes.length > 0) {
    customizerState.size = availableSizes[availableSizes.length - 1].key;
  }

  container.innerHTML = availableSizes.map(sizeObj => {
    const isSelected = sizeObj.key === customizerState.size ? 'selected' : '';
    const price = p1.prices[sizeObj.key] || 0;

    return `
      <div class="size-card-option ${isSelected}" onclick="selectSize('${sizeObj.key}')">
        <div class="size-card-info">
          <strong>${sizeObj.label}</strong>
          <small>${sizeObj.slices || ''}</small>
        </div>
        <span class="size-card-price">R$ ${price.toFixed(2).replace('.', ',')}</span>
      </div>
    `;
  }).join('');
}

function selectSize(sizeKey) {
  customizerState.size = sizeKey;
  
  const p1 = customizerState.flavors[0];
  if (customizerState.size === 'GG' && p1 && p1.category === 'doce') {
    customizerState.flavorCount = 3;
  } else if (customizerState.size !== 'GG' && customizerState.flavorCount === 3) {
    customizerState.flavorCount = 2;
  }

  renderCustomizerUI();
}

function updateFlavorTabsForSize() {
  const tab1 = document.getElementById('tab1Flavor');
  const tab2 = document.getElementById('tab2Flavors');
  const tab3 = document.getElementById('tab3Flavors');
  const hint = document.getElementById('flavorDivisionHint');

  const p1 = customizerState.flavors[0];
  const isSweet = p1 && p1.category === 'doce';

  if (customizerState.size === 'GG') {
    if (tab3) tab3.style.display = 'block';

    if (isSweet) {
      if (tab1) tab1.style.display = 'none';
      if (tab2) tab2.style.display = 'none';
      customizerState.flavorCount = 3;
      if (hint) {
        hint.innerHTML = 'No tamanho <strong>Família (GG)</strong>, pizzas doces são montadas exclusivamente na opção de <strong>3 Sabores (com até 1/3 doce)</strong>.';
      }
    } else {
      if (tab1) tab1.style.display = 'block';
      if (tab2) tab2.style.display = 'block';
      if (hint) {
        hint.innerText = 'O valor da pizza meio a meio é calculado pela média exata dos sabores escolhidos.';
      }
    }
  } else {
    if (tab1) tab1.style.display = 'block';
    if (tab2) tab2.style.display = 'block';
    if (tab3) tab3.style.display = 'none';
    if (customizerState.flavorCount === 3) {
      customizerState.flavorCount = 2;
    }
    if (hint) {
      hint.innerText = 'O valor da pizza meio a meio é calculado pela média exata dos sabores escolhidos.';
    }
  }

  if (tab1) tab1.classList.toggle('active', customizerState.flavorCount === 1);
  if (tab2) tab2.classList.toggle('active', customizerState.flavorCount === 2);
  if (tab3) tab3.classList.toggle('active', customizerState.flavorCount === 3);
}

function setFlavorCount(count) {
  customizerState.flavorCount = count;
  renderCustomizerUI();
}

function renderFlavorSlots() {
  const container = document.getElementById('flavorSlotsContainer');
  if (!container) return;

  const count = customizerState.flavorCount;
  const currentSize = customizerState.size;

  let slotsHtml = '';

  for (let i = 0; i < count; i++) {
    const pizza = customizerState.flavors[i] || customizerState.flavors[0];
    const fractionLabel = count === 1 ? '100% da Pizza (Sabor Único)' : (count === 2 ? `Metade ${i + 1} (50%)` : `1/3 Parte ${i + 1} (33%)`);

    slotsHtml += `
      <div class="flavor-slot-card">
        <div class="slot-left">
          <img src="${pizza.image}" alt="${pizza.name}" class="slot-photo">
          <div class="slot-details">
            <span class="slot-fraction-tag">${fractionLabel}</span>
            <h4 class="slot-name">${pizza.name} ${pizza.category === 'doce' ? '🍰' : ''}</h4>
            <p class="slot-ingredients">${pizza.ingredients}</p>
          </div>
        </div>
        <button type="button" class="btn-swap-flavor magnetic-btn" onclick="openFlavorPicker(${i})">
          <i class="fa-solid fa-arrows-rotate"></i> Trocar Sabor
        </button>
      </div>
    `;
  }

  container.innerHTML = slotsHtml;
}

function getCrustPrice(crustId, size) {
  if (crustId === 'chocolate') {
    return size === 'GG' ? 6.00 : 4.00;
  }
  return 0.00;
}

function renderCrustOptions() {
  document.querySelectorAll('.crust-option-card').forEach(card => {
    card.classList.remove('active');
  });
  
  const activeCard = document.getElementById(`crust-${customizerState.crust.id}`);
  if (activeCard) activeCard.classList.add('active');

  // Atualizar badge de preço do chocolate baseado no tamanho (GG = 6, outros = 4)
  const chocPriceEl = document.getElementById('crustChocolatePriceTag');
  if (chocPriceEl) {
    const chocPrice = customizerState.size === 'GG' ? 6 : 4;
    chocPriceEl.innerText = `+ R$ ${chocPrice.toFixed(2).replace('.', ',')}`;
  }

  // Recalcular preço atual da borda se for chocolate
  if (customizerState.crust.id === 'chocolate') {
    customizerState.crust.price = getCrustPrice('chocolate', customizerState.size);
  }
}

function selectCrust(crustId) {
  const names = {
    'catupiry': 'Borda Catupiry',
    'cheddar': 'Borda Cheddar',
    'nenhuma': 'Tradicional (Sem Recheio na Borda)',
    'chocolate': 'Borda Doce de Chocolate'
  };
  
  const price = getCrustPrice(crustId, customizerState.size);

  customizerState.crust = {
    id: crustId,
    name: names[crustId] || 'Borda Catupiry',
    price: price
  };
  
  renderCrustOptions();
  updateCustomizerTotal();
}

function toggleQuickNote(text) {
  const input = document.getElementById('pizzaNotes');
  if (!input) return;

  let current = input.value.trim();
  if (current.includes(text)) {
    current = current.replace(text, '').replace(/,\s*,/g, ',').replace(/^,\s*|,\s*$/g, '').trim();
  } else {
    current = current ? `${current}, ${text}` : text;
  }
  input.value = current;

  // Atualizar visual dos chips
  document.querySelectorAll('.quick-chip').forEach(btn => {
    if (btn.innerText.includes(text)) {
      btn.classList.toggle('active', input.value.includes(text));
    }
  });
}

function renderCustomizerDrinks() {
  const container = document.getElementById('customizerDrinksGrid');
  if (!container) return;

  const cfg = getConfig();
  const drinks = (typeof MENU_DATA !== 'undefined' && MENU_DATA.bebidas) ? MENU_DATA.bebidas : ((cfg.menu && cfg.menu.bebidas) || []);

  container.innerHTML = drinks.map(d => {
    const qty = customizerState.drinks[d.id] || 0;
    const hasQty = qty > 0 ? 'has-qty' : '';
    const imgHtml = d.image ? `<img src="${d.image}" alt="${d.name}" class="drink-card-img" loading="lazy">` : `<div class="drink-card-icon">${d.icon || '🥤'}</div>`;

    return `
      <div class="customizer-drink-card ${hasQty}">
        <div class="drink-card-left">
          ${imgHtml}
          <div class="drink-card-info">
            <div class="drink-card-name">${d.name}</div>
            <div class="drink-card-price">R$ ${d.price.toFixed(2).replace('.', ',')}</div>
          </div>
        </div>
        <div class="drink-card-qty-ctrl">
          <button type="button" class="btn-drink-qty" onclick="changeCustomizerDrinkQty('${d.id}', -1)" aria-label="Diminuir"><i class="fa-solid fa-minus"></i></button>
          <span class="drink-qty-num">${qty}</span>
          <button type="button" class="btn-drink-qty" onclick="changeCustomizerDrinkQty('${d.id}', 1)" aria-label="Aumentar"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    `;
  }).join('');
}

function changeCustomizerDrinkQty(drinkId, delta) {
  const current = customizerState.drinks[drinkId] || 0;
  const next = Math.max(0, current + delta);
  if (next > 0) {
    customizerState.drinks[drinkId] = next;
  } else {
    delete customizerState.drinks[drinkId];
  }
  renderCustomizerDrinks();
  updateCustomizerTotal();
}

function getCalculatedPizzaPrice() {
  const count = customizerState.flavorCount;
  const size = customizerState.size;
  let sum = 0;

  for (let i = 0; i < count; i++) {
    const p = customizerState.flavors[i] || customizerState.flavors[0];
    sum += (p.prices && p.prices[size] != null ? p.prices[size] : 0);
  }

  const avgPrice = sum / count;
  return avgPrice + (customizerState.crust.price || 0);
}

function getCalculatedDrinksPrice() {
  const cfg = getConfig();
  const drinks = (typeof MENU_DATA !== 'undefined' && MENU_DATA.bebidas) ? MENU_DATA.bebidas : ((cfg.menu && cfg.menu.bebidas) || []);
  let sum = 0;
  for (const [drinkId, qty] of Object.entries(customizerState.drinks)) {
    const d = drinks.find(item => item.id === drinkId);
    if (d && qty > 0) {
      sum += (d.price * qty);
    }
  }
  return sum;
}

function getCalculatedPrice() {
  return getCalculatedPizzaPrice() + getCalculatedDrinksPrice();
}

function updateCustomizerTotal() {
  const total = getCalculatedPrice();
  const display = document.getElementById('modalTotalPrice');
  if (display) {
    display.innerText = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  const summaryEl = document.getElementById('customizerSummaryText');
  if (summaryEl) {
    const sizeLabels = { 'P': 'Broto (P)', 'M': 'Média (M)', 'G': 'Grande (G)', 'GG': 'Família (GG)' };
    const sizeLabel = sizeLabels[customizerState.size] || customizerState.size;
    const count = customizerState.flavorCount;
    
    let flavorDesc = '';
    if (count === 1) {
      flavorDesc = customizerState.flavors[0]?.name || '';
    } else if (count === 2) {
      flavorDesc = `Meio a Meio: ${customizerState.flavors[0]?.name} + ${customizerState.flavors[1]?.name}`;
    } else if (count === 3) {
      flavorDesc = `3 Sabores: ${customizerState.flavors[0]?.name} + ${customizerState.flavors[1]?.name} + ${customizerState.flavors[2]?.name}`;
    }

    let crustDesc = '';
    if (customizerState.crust) {
      if (customizerState.crust.price > 0) {
        crustDesc = ` • ${customizerState.crust.name} (+R$ ${customizerState.crust.price.toFixed(2).replace('.', ',')})`;
      } else {
        crustDesc = ` • ${customizerState.crust.name}`;
      }
    }

    const drinksCount = Object.values(customizerState.drinks).reduce((a, b) => a + b, 0);
    let drinksDesc = drinksCount > 0 ? ` • +${drinksCount} ${drinksCount === 1 ? 'Bebida' : 'Bebidas'}` : '';

    summaryEl.innerHTML = `<strong>${sizeLabel}</strong> • ${flavorDesc}${crustDesc}${drinksDesc}`;
  }
}

// =========================================================================
// SUB-MODAL / GAVETA VISUAL DE TROCA DE SABOR
// =========================================================================
function openFlavorPicker(slotIndex) {
  activePickerSlot = slotIndex;
  
  const badge = document.getElementById('pickerTargetBadge');
  if (badge) {
    const count = customizerState.flavorCount;
    if (count === 1) badge.innerText = 'Alterando Sabor da Pizza';
    else if (count === 2) badge.innerText = `Alterando Metade ${slotIndex + 1} (50%)`;
    else badge.innerText = `Alterando Sabor ${slotIndex + 1} (1/3)`;
  }

  const searchInput = document.getElementById('pickerSearchInput');
  if (searchInput) searchInput.value = '';

  currentPickerCategory = 'all';
  document.querySelectorAll('.picker-cat-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById('pickerCat-all')?.classList.add('active');

  renderFlavorPickerGrid();

  const modal = document.getElementById('flavorPickerModal');
  if (modal) modal.classList.add('active');
}

function closeFlavorPickerModal() {
  const modal = document.getElementById('flavorPickerModal');
  if (modal) modal.classList.remove('active');
}

function setPickerCategory(category) {
  currentPickerCategory = category;
  document.querySelectorAll('.picker-cat-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`pickerCat-${category}`)?.classList.add('active');
  renderFlavorPickerGrid();
}

function filterPickerFlavors() {
  renderFlavorPickerGrid();
}

function renderFlavorPickerGrid() {
  const container = document.getElementById('flavorPickerGrid');
  if (!container) return;

  const currentSize = customizerState.size;
  const currentSlotPizza = customizerState.flavors[activePickerSlot];
  const query = (document.getElementById('pickerSearchInput')?.value || '').toLowerCase().trim();

  let pizzas = getAllPizzas().filter(p => p.prices && p.prices[currentSize] != null);

  // Filtrar por categoria
  if (currentPickerCategory !== 'all') {
    pizzas = pizzas.filter(p => p.category === currentPickerCategory);
  }

  // Filtrar por busca
  if (query) {
    pizzas = pizzas.filter(p => 
      p.name.toLowerCase().includes(query) || 
      (p.ingredients && p.ingredients.toLowerCase().includes(query))
    );
  }

  // Regra GG: não permitir mais de 1 sabor doce
  if (currentSize === 'GG' && customizerState.flavorCount >= 2) {
    const hasOtherSweet = customizerState.flavors.some((p, idx) => idx !== activePickerSlot && p && p.category === 'doce');
    if (hasOtherSweet) {
      pizzas = pizzas.filter(p => p.category !== 'doce');
    }
  }

  if (pizzas.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        <i class="fa-solid fa-pizza-slice" style="font-size: 2rem; margin-bottom: 0.5rem; color: var(--primary-red);"></i>
        <p>Nenhum sabor encontrado para a busca.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = pizzas.map(p => {
    const isSelected = currentSlotPizza && currentSlotPizza.id === p.id;
    const price = (p.prices[currentSize] || 0).toFixed(2).replace('.', ',');
    const badge = p.category === 'doce' ? ' 🍰' : (p.category === 'especial' ? ' ⭐' : '');

    return `
      <div class="flavor-picker-item ${isSelected ? 'active-choice' : ''}" onclick="selectFlavorForSlot('${p.id}')">
        <div class="picker-item-left">
          <img src="${p.image}" alt="${p.name}" class="picker-item-img" loading="lazy">
          <div class="picker-item-info">
            <h4 class="picker-item-title">${p.name}${badge} ${isSelected ? '<span style="font-size:0.75rem; color:var(--accent-green); font-weight:900;">(Atual)</span>' : ''}</h4>
            <p class="picker-item-desc">${p.ingredients}</p>
          </div>
        </div>
        <div class="picker-item-price">R$ ${price}</div>
      </div>
    `;
  }).join('');
}

function selectFlavorForSlot(pizzaId) {
  const pizza = getAllPizzas().find(p => p.id === pizzaId);
  if (!pizza) return;

  customizerState.flavors[activePickerSlot] = pizza;
  closeFlavorPickerModal();
  renderCustomizerUI();
}

// Global exposure for event handlers
window.openCustomizer = openCustomizer;
window.openCustomizerModal = openCustomizer;
window.closeCustomizerModal = closeCustomizerModal;
window.setFlavorCount = setFlavorCount;
window.selectSize = selectSize;
window.selectCrust = selectCrust;
window.toggleQuickNote = toggleQuickNote;
window.openFlavorPicker = openFlavorPicker;
window.closeFlavorPickerModal = closeFlavorPickerModal;
window.setPickerCategory = setPickerCategory;
window.filterPickerFlavors = filterPickerFlavors;
window.selectFlavorForSlot = selectFlavorForSlot;
window.changeCustomizerDrinkQty = changeCustomizerDrinkQty;

// Add Item to Cart
function addCustomizedPizzaToCart() {
  const p1 = customizerState.flavors[0];
  if (!p1) return;

  const notesInput = document.getElementById('pizzaNotes');
  const userNotes = notesInput ? notesInput.value.trim() : '';
  const pizzaPrice = getCalculatedPizzaPrice();
  const size = customizerState.size;
  const count = customizerState.flavorCount;

  let title = '';
  if (count === 1) {
    title = `Pizza ${p1.name}`;
  } else if (count === 2) {
    const p2 = customizerState.flavors[1] || p1;
    title = `Meio a Meio: 1/2 ${p1.name} + 1/2 ${p2.name}`;
  } else if (count === 3) {
    const p2 = customizerState.flavors[1] || p1;
    const p3 = customizerState.flavors[2] || p1;
    title = `3 Sabores: 1/3 ${p1.name} + 1/3 ${p2.name} + 1/3 ${p3.name}`;
  }

  let finalNotes = [];
  if (customizerState.crust) {
    if (customizerState.crust.price > 0) {
      finalNotes.push(`${customizerState.crust.name} (+R$ ${customizerState.crust.price.toFixed(2).replace('.', ',')})`);
    } else {
      finalNotes.push(`${customizerState.crust.name}`);
    }
  }
  if (userNotes) {
    finalNotes.push(userNotes);
  }

  // 1. Adicionar Pizza ao Carrinho
  const pizzaCartItem = {
    id: Date.now(),
    pizzaId: p1.id,
    title: title,
    size: size,
    crust: customizerState.crust,
    notes: finalNotes.join(' | '),
    price: pizzaPrice,
    unitPrice: pizzaPrice,
    quantity: 1,
    image: p1.image
  };
  cart.push(pizzaCartItem);

  // 2. Adicionar Bebidas Selecionadas ao Carrinho
  const cfg = getConfig();
  const allDrinks = (typeof MENU_DATA !== 'undefined' && MENU_DATA.bebidas) ? MENU_DATA.bebidas : ((cfg.menu && cfg.menu.bebidas) || []);
  let drinksAddedCount = 0;

  for (const [drinkId, qty] of Object.entries(customizerState.drinks)) {
    if (qty > 0) {
      const drink = allDrinks.find(d => d.id === drinkId);
      if (drink) {
        drinksAddedCount += qty;
        const existing = cart.find(i => i.type === 'bebida' && (i.drinkId === drinkId || i.id === drinkId));
        if (existing) {
          existing.quantity += qty;
          existing.totalPrice = (existing.price || existing.unitPrice || drink.price) * existing.quantity;
        } else {
          cart.push({
            id: 'drink_' + drink.id + '_' + (Date.now() + Math.random()),
            type: 'bebida',
            drinkId: drink.id,
            name: drink.name,
            title: drink.name,
            icon: drink.icon,
            image: drink.image || '',
            size: 'Unidade',
            quantity: qty,
            price: drink.price,
            unitPrice: drink.price,
            totalPrice: drink.price * qty
          });
        }
      }
    }
  }

  saveCart();
  updateCartBadge();
  closeCustomizerModal();

  // Exibir toast chamativo para o cliente
  const toastMsg = drinksAddedCount > 0 
    ? `${title} + ${drinksAddedCount} ${drinksAddedCount === 1 ? 'bebida' : 'bebidas'} adicionadas!` 
    : `${title} adicionada! 🍕`;
  showCartToast(toastMsg, 'Toque aqui para ver seu pedido e finalizar');

  // Highlight cart button
  const cartBtn = document.querySelector('.btn-cart');
  if (cartBtn) {
    cartBtn.style.transform = 'scale(1.15)';
    setTimeout(() => cartBtn.style.transform = 'none', 300);
  }
}

// Save Cart LocalStorage
function saveCart() {
  localStorage.setItem('arte_delicia_cart', JSON.stringify(cart));
}

// Toast de Notificação
function showCartToast(title, subtitle) {
  const toast = document.getElementById('cartToast');
  if (!toast) return;

  const tTitle = document.getElementById('toastTitle');
  const tSub = document.getElementById('toastSubtitle');
  if (tTitle && title) tTitle.innerText = title;
  if (tSub && subtitle) tSub.innerText = subtitle;

  toast.classList.add('active');
  clearTimeout(window.cartToastTimeout);
  window.cartToastTimeout = setTimeout(() => {
    toast.classList.remove('active');
  }, 4500);
}

// Update Cart Badges & Floating Bar
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + ((item.price || item.unitPrice || 0) * item.quantity), 0);

  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.innerText = totalItems;

  const floatBubbleEl = document.getElementById('floatBubble');
  if (floatBubbleEl) floatBubbleEl.innerText = totalItems;

  const floatCountEl = document.getElementById('floatCount');
  if (floatCountEl) floatCountEl.innerText = `${totalItems} ${totalItems === 1 ? 'item no pedido' : 'itens no pedido'}`;

  const floatTotalEl = document.getElementById('floatTotal');
  if (floatTotalEl) floatTotalEl.innerText = `R$ ${totalPrice.toFixed(2).replace('.', ',')}`;

  const floatBar = document.getElementById('floatingCartBar');
  if (floatBar) {
    if (totalItems > 0) {
      floatBar.classList.add('active');
    } else {
      floatBar.classList.remove('active');
    }
  }
}

// Cart Modal
function openCartModal() {
  renderCartItems();
  prefillCartFromProfile();
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.add('active');
    const modalBody = modal.querySelector('.modal-body');
    if (modalBody) modalBody.scrollTop = 0;
  }
}

function closeCartModal() {
  const modal = document.getElementById('cartModal');
  if (modal) modal.classList.remove('active');
}

function renderCartItems() {
  const container = document.getElementById('cartItemsList');
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <i class="fa-solid fa-basket-shopping" style="font-size: 2.5rem; color: rgba(255,255,255,0.15); margin-bottom: 0.8rem; display:block;"></i>
        <p style="font-size:1rem; font-weight:700;">Seu carrinho está vazio.</p>
        <span style="font-size:0.8rem;">Adicione pizzas saborosas do cardápio para continuar!</span>
      </div>
    `;
    updateDeliveryFee();
    return;
  }

  const sizeLabels = {
    'P': 'Broto (P - 4 fatias)',
    'M': 'Média (M - 6 fatias)',
    'G': 'Grande (G - 8 fatias)',
    'GG': 'Família (GG - 12 fatias)'
  };

  container.innerHTML = cart.map((item, index) => {
    // --- BEBIDA ---
    if (item.type === 'bebida') {
      const unitPrice = (item.unitPrice || 0).toFixed(2).replace('.', ',');
      const total = (item.totalPrice || item.unitPrice * item.quantity).toFixed(2).replace('.', ',');
      return `
        <div class="cart-item-card">
          ${item.image ? `<img src="${item.image}" alt="${item.name}" class="cart-item-img">` : `<div class="cart-drink-icon">${item.icon || '🥤'}</div>`}
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-meta"><span class="badge-size">Bebida</span></div>
            <div class="cart-item-price-row">
              <span class="cart-item-unit-price">R$ ${unitPrice} un.</span>
              <span class="cart-item-total-price">R$ ${total}</span>
            </div>
          </div>
          <div class="cart-item-actions">
            <button class="btn-qty-ctrl" onclick="changeDrinkQty(${index}, -1)" aria-label="Diminuir"><i class="fa-solid fa-minus"></i></button>
            <span class="cart-qty-num">${item.quantity}</span>
            <button class="btn-qty-ctrl" onclick="changeDrinkQty(${index}, 1)" aria-label="Aumentar"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
      `;
    }

    // --- PIZZA ---
    const sizeLabels = { 'P': 'Broto (4 fatias)', 'M': 'Média (6 fatias)', 'G': 'Grande (8 fatias)', 'GG': 'Família (12 fatias)' };
    const sizeName = sizeLabels[item.size] || `Tamanho ${item.size}`;
    const unitPrice = (item.price || item.unitPrice || 0).toFixed(2).replace('.', ',');
    const itemTotal = ((item.price || item.unitPrice || 0) * item.quantity).toFixed(2).replace('.', ',');
    return `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-name">${item.title}</div>
          <div class="cart-item-meta">
            <span class="badge-size">${sizeName}</span>
            ${item.notes ? `<span class="badge-notes">Obs: ${item.notes}</span>` : ''}
          </div>
          <div class="cart-item-price-row">
            <span class="cart-item-unit-price">R$ ${unitPrice} un.</span>
            <span class="cart-item-total-price">R$ ${itemTotal}</span>
          </div>
        </div>
        <div class="cart-item-actions">
          <button class="btn-qty-ctrl" onclick="changeQuantity(${item.id}, -1)" aria-label="Diminuir quantidade"><i class="fa-solid fa-minus"></i></button>
          <span class="cart-qty-num">${item.quantity}</span>
          <button class="btn-qty-ctrl" onclick="changeQuantity(${item.id}, 1)" aria-label="Aumentar quantidade"><i class="fa-solid fa-plus"></i></button>
        </div>
      </div>
    `;
  }).join('');

  updateDeliveryFee();
}

function changeDrinkQty(index, delta) {
  if (!cart[index] || cart[index].type !== 'bebida') return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  } else {
    const itemPrice = cart[index].price || cart[index].unitPrice || 0;
    cart[index].totalPrice = itemPrice * cart[index].quantity;
  }
  saveCart();
  updateCartBadge();
  renderCartItems();
}
window.changeDrinkQty = changeDrinkQty;


function getDeliveryFee() {
  if (orderType !== 'delivery') return 0;

  const cfg = getConfig();
  const regions = (cfg.delivery && cfg.delivery.regions) || [];
  const regionSelect = document.getElementById('deliveryRegion');
  const neighborhood = document.getElementById('deliveryNeighborhood')?.value.toLowerCase().trim() || '';
  const street = document.getElementById('deliveryStreet')?.value.toLowerCase().trim() || '';

  if (regionSelect && regionSelect.value) {
    const selectedRegion = regions.find(r => r.id === regionSelect.value);
    if (selectedRegion) return Number(selectedRegion.fee) || 0;
  }

  for (const r of regions) {
    if (r.fee > 0 && r.keywords && r.keywords.length) {
      for (const kw of r.keywords) {
        if (neighborhood.includes(kw) || street.includes(kw)) {
          return Number(r.fee) || 0;
        }
      }
    }
  }

  return 0.00;
}

function updateDeliveryFee() {
  const subtotal = cart.reduce((sum, item) => sum + ((item.price || item.unitPrice || 0) * item.quantity), 0);
  const fee = getDeliveryFee();
  const grandTotal = subtotal + fee;

  const subtotalEl = document.getElementById('cartSubtotalPrice');
  const feeEl = document.getElementById('cartDeliveryFeePrice');
  const feeLine = document.getElementById('deliveryFeeLine');
  const grandTotalEl = document.getElementById('cartTotalPrice');
  const floatTotalEl = document.getElementById('floatTotal');

  if (subtotalEl) subtotalEl.innerText = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;

  if (feeEl) {
    if (orderType === 'pickup') {
      feeEl.innerText = 'Não se aplica';
      feeEl.style.color = 'var(--text-muted)';
      if (feeLine) feeLine.style.display = 'none';
    } else {
      if (feeLine) feeLine.style.display = 'flex';
      const cfg = getConfig();
      const regions = (cfg.delivery && cfg.delivery.regions) || [];
      const regionSelect = document.getElementById('deliveryRegion');
      const selectedRegion = regions.find(r => r.id === regionSelect?.value);

      if (fee > 0) {
        const regionLabel = selectedRegion?.shortLabel || selectedRegion?.name || 'Taxa de Entrega';
        feeEl.innerText = `R$ ${fee.toFixed(2).replace('.', ',')} (${regionLabel})`;
        feeEl.style.color = 'var(--accent-yellow)';
      } else {
        const freeLabel = cfg.delivery?.defaultFreeLabel || (selectedRegion?.shortLabel ? `Grátis (${selectedRegion.shortLabel})` : 'Grátis');
        feeEl.innerText = freeLabel;
        feeEl.style.color = '#51cf66';
      }
    }
  }

  if (grandTotalEl) grandTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
  if (floatTotalEl) floatTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

function detectNeighborhoodFee() {
  const neighborhood = document.getElementById('deliveryNeighborhood')?.value.toLowerCase().trim() || '';
  const regionSelect = document.getElementById('deliveryRegion');
  if (!regionSelect || !neighborhood) return;

  const cfg = getConfig();
  const regions = (cfg.delivery && cfg.delivery.regions) || [];
  for (const r of regions) {
    if (r.keywords && r.keywords.length) {
      for (const kw of r.keywords) {
        if (neighborhood.includes(kw)) {
          regionSelect.value = r.id;
          updateDeliveryFee();
          return;
        }
      }
    }
  }
  updateDeliveryFee();
}

function changeQuantity(itemId, delta) {
  const item = cart.find(i => i.id === itemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== itemId);
  }

  saveCart();
  updateCartBadge();
  renderCartItems();
}

function setOrderType(type) {
  orderType = type;
  const btnDel = document.getElementById('btnTypeDelivery');
  const btnPic = document.getElementById('btnTypePickup');
  const addrGroup = document.getElementById('deliveryAddressGroup');

  if (type === 'delivery') {
    btnDel?.classList.add('active');
    btnPic?.classList.remove('active');
    if (addrGroup) addrGroup.style.display = 'block';
  } else {
    btnPic?.classList.add('active');
    btnDel?.classList.remove('active');
    if (addrGroup) addrGroup.style.display = 'none';
  }
  updateDeliveryFee();
}

function toggleChangeBox(method) {
  const container = document.getElementById('changeBoxContainer');
  if (container) {
    if (method === 'Dinheiro') {
      container.style.display = 'block';
    } else {
      container.style.display = 'none';
    }
  }
}

function toggleTrocoInput(show) {
  const trocoGroup = document.getElementById('trocoAmountGroup');
  if (trocoGroup) {
    trocoGroup.style.display = show ? 'block' : 'none';
  }
}

// Exportar funções globais
window.toggleChangeBox = toggleChangeBox;
window.toggleTrocoInput = toggleTrocoInput;
window.updateDeliveryFee = updateDeliveryFee;
window.detectNeighborhoodFee = detectNeighborhoodFee;
window.getDeliveryFee = getDeliveryFee;

// WhatsApp Order Formatting & Dispatch
function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    alert('Adicione itens ao seu carrinho antes de finalizar.');
    return;
  }

  const customerName = document.getElementById('cartCustomerName')?.value.trim();
  const customerPhone = document.getElementById('cartCustomerPhone')?.value.trim();

  if (!customerName) {
    alert('Por favor, informe seu nome para o pedido.');
    document.getElementById('cartCustomerName')?.focus();
    return;
  }

  const street = document.getElementById('deliveryStreet')?.value.trim();
  const neighborhood = document.getElementById('deliveryNeighborhood')?.value.trim();
  const complement = document.getElementById('deliveryComplement')?.value.trim();

  if (orderType === 'delivery') {
    if (!street) {
      alert('Por favor, informe a Rua e o Número para entrega.');
      document.getElementById('deliveryStreet')?.focus();
      return;
    }
    if (!neighborhood) {
      alert('Por favor, informe o Bairro / Ponto de Referência para entrega.');
      document.getElementById('deliveryNeighborhood')?.focus();
      return;
    }
  }

  const payment = document.getElementById('paymentMethod')?.value || 'Pix';
  const generalNotes = document.getElementById('cartGeneralNotes')?.value.trim();

  // Salvar/Atualizar perfil opcional se checkbox estiver marcada
  const saveCheck = document.getElementById('cartSaveProfileCheck');
  if (saveCheck && saveCheck.checked) {
    const userData = {
      name: customerName,
      phone: customerPhone,
      street: street || '',
      neighborhood: neighborhood || '',
      complement: complement || '',
      paymentPref: payment
    };
    localStorage.setItem('arte_delicia_user', JSON.stringify(userData));
    updateUserNavBadge();
  }

  // Informações de Troco se for dinheiro
  let needChange = false;
  let changeForAmount = '';
  if (payment === 'Dinheiro') {
    const radioChecked = document.querySelector('input[name="needChangeRadio"]:checked')?.value;
    needChange = (radioChecked === 'sim');
    changeForAmount = document.getElementById('changeForAmount')?.value.trim();
  }

  let subtotal = 0;
  const sizeLabels = {
    'P': 'Broto (P - 4 fatias)',
    'M': 'Média (M - 6 fatias)',
    'G': 'Grande (G - 8 fatias)',
    'GG': 'Família (GG - 12 fatias)'
  };

  const orderItems = cart.map((item, index) => {
    const itemPrice = item.price || item.unitPrice || 0;
    const itemTotal = itemPrice * item.quantity;
    subtotal += itemTotal;
    const isDrink = item.type === 'bebida';
    const sizeName = isDrink ? 'Unidade' : (sizeLabels[item.size] || `Tamanho ${item.size}`);
    return {
      index: index + 1,
      type: item.type || 'pizza',
      title: item.title || item.name,
      size: sizeName,
      notes: item.notes || '',
      quantity: item.quantity,
      unitPrice: itemPrice.toFixed(2).replace('.', ','),
      subtotal: itemTotal.toFixed(2).replace('.', ',')
    };
  });

  const deliveryFee = getDeliveryFee();
  const finalTotal = subtotal + deliveryFee;

  // Estrutura de dados em JSON
  const orderJSON = {
    customer: customerName,
    phone: customerPhone,
    orderType: orderType === 'delivery' ? 'Entrega (Delivery)' : 'Retirada no Balcão',
    isDelivery: orderType === 'delivery',
    deliveryFee: deliveryFee,
    subtotal: subtotal.toFixed(2).replace('.', ','),
    address: orderType === 'delivery' ? {
      street: street,
      neighborhood: neighborhood,
      complement: complement || ''
    } : null,
    items: orderItems,
    total: finalTotal.toFixed(2).replace('.', ','),
    payment: payment,
    isCash: payment === 'Dinheiro',
    needChange: needChange,
    changeFor: changeForAmount,
    changeDiff: (payment === 'Dinheiro' && needChange && changeForAmount) ? (parseFloat(changeForAmount.replace('R$', '').replace('.', '').replace(',', '.').trim()) - finalTotal) : null,
    generalNotes: generalNotes
  };

  // Registrar pedido assincronamente no backend Supabase
  if (window.logOrderToSupabase) {
    window.logOrderToSupabase({
      customerName,
      customerPhone,
      orderType: orderType === 'delivery' ? 'Delivery' : 'Retirada',
      deliveryAddress: orderType === 'delivery' ? `${street}, ${neighborhood}${complement ? ' - ' + complement : ''}` : 'Retirada no Balcão',
      items: orderJSON.items,
      totalAmount: finalTotal,
      paymentMethod: payment,
      notes: generalNotes
    });
  }

  const cfg = getConfig();
  const messageText = generateWhatsAppMessageFromJSON(orderJSON);
  const phone = (cfg.contact && cfg.contact.phoneWhatsApp) || (typeof MENU_DATA !== 'undefined' ? MENU_DATA.phoneWhatsApp : "5588993345987");

  // Limpa o carrinho e fecha o modal
  cart = [];
  saveCart();
  updateCartBadge();
  closeCartModal();

  // Disparo seguro para o WhatsApp
  dispatchWhatsApp(phone, messageText);
}

// Função de decodificação e montagem do texto com emojis via CodePoint
function generateWhatsAppMessageFromJSON(data) {
  const cfg = getConfig();
  const brandName = cfg.brand?.name || "RESTAURANTE E PIZZARIA ARTE & DELÍCIA";
  const contactPerson = cfg.brand?.ownerOrContactPerson || "";

  const E_PIZZA = String.fromCodePoint(0x1F355);  // 🍕
  const E_USER = String.fromCodePoint(0x1F464);   // 👤
  const E_PHONE = String.fromCodePoint(0x1F4F1);  // 📱
  const E_MOTO = String.fromCodePoint(0x1F6F5);   // 🛵
  const E_STORE = String.fromCodePoint(0x1F3EA);  // 🏪
  const E_PIN = String.fromCodePoint(0x1F4CD);    // 📍
  const E_CLIP = String.fromCodePoint(0x1F4CB);   // 📋
  const E_MONEY = String.fromCodePoint(0x1F4B0);  // 💰
  const E_CARD = String.fromCodePoint(0x1F4B3);   // 💳
  const E_CASH = String.fromCodePoint(0x1F4B5);   // 💵
  const E_NOTE = String.fromCodePoint(0x1F4DD);   // 📝
  const E_DOT = String.fromCodePoint(0x2022);     // •

  const LINE = '------------------------------------------';

  let txt = `${E_PIZZA} *NOVO PEDIDO - ${brandName.toUpperCase()}*\n`;
  if (contactPerson) {
    txt += `_Aos cuidados de ${contactPerson}_\n`;
  }
  txt += `${LINE}\n\n`;

  txt += `${E_USER} *CLIENTE:* ${data.customer}\n`;
  if (data.phone) {
    txt += `${E_PHONE} *WHATSAPP:* ${data.phone}\n`;
  }
  txt += `${data.isDelivery ? E_MOTO : E_STORE} *TIPO:* ${data.orderType}\n\n`;

  if (data.isDelivery && data.address) {
    txt += `${E_PIN} *ENDEREÇO DE ENTREGA:*\n`;
    txt += `${E_DOT} *Rua / Nº:* ${data.address.street}\n`;
    txt += `${E_DOT} *Bairro / Ref:* ${data.address.neighborhood}\n`;
    if (data.address.complement) {
      txt += `${E_DOT} *Complemento:* ${data.address.complement}\n`;
    }
    const regions = (cfg.delivery && cfg.delivery.regions) || [];
    const regionSelect = document.getElementById('deliveryRegion');
    const selectedRegion = regions.find(r => r.id === regionSelect?.value);
    const regionLabel = selectedRegion?.shortLabel || selectedRegion?.name || '';

    if (data.deliveryFee > 0) {
      txt += `${E_MOTO} *Taxa de Entrega:* R$ ${data.deliveryFee.toFixed(2).replace('.', ',')}${regionLabel ? ' (' + regionLabel + ')' : ''}\n`;
    } else {
      txt += `${E_MOTO} *Taxa de Entrega:* ${cfg.delivery?.defaultFreeLabel || 'Grátis'}\n`;
    }
    txt += `\n`;
  }

  txt += `${LINE}\n`;
  txt += `${E_CLIP} *ITENS DO PEDIDO:*\n\n`;

  data.items.forEach(it => {
    if (it.type === 'bebida') {
      txt += `*${it.index}. ${it.quantity}x ${it.title}*\n`;
      txt += `   ${E_DOT} *Item:* Bebida Gelada\n`;
      txt += `   ${E_DOT} *Subtotal:* R$ ${it.subtotal}\n\n`;
    } else {
      txt += `*${it.index}. ${it.quantity}x ${it.title}*\n`;
      txt += `   ${E_DOT} *Tamanho:* ${it.size}\n`;
      if (it.notes) {
        txt += `   ${E_DOT} *Obs:* ${it.notes}\n`;
      }
      txt += `   ${E_DOT} *Subtotal:* R$ ${it.subtotal}\n\n`;
    }
  });

  txt += `${LINE}\n`;
  if (data.isDelivery && data.deliveryFee > 0) {
    txt += `*Subtotal dos Itens:* R$ ${data.subtotal}\n`;
    txt += `*Taxa de Entrega:* R$ ${data.deliveryFee.toFixed(2).replace('.', ',')}\n`;
  }
  txt += `${E_MONEY} *VALOR TOTAL DO PEDIDO: R$ ${data.total}*\n`;
  txt += `${E_CARD} *FORMA DE PAGAMENTO:* ${data.payment}\n`;

  if (data.isCash) {
    if (data.needChange && data.changeFor) {
      if (data.changeDiff && data.changeDiff > 0) {
        txt += `${E_CASH} *TROCO:* Levar troco para ${data.changeFor} (Troco de R$ ${data.changeDiff.toFixed(2).replace('.', ',')})\n`;
      } else {
        txt += `${E_CASH} *TROCO:* Levar troco para ${data.changeFor}\n`;
      }
    } else {
      txt += `${E_CASH} *TROCO:* Não precisa de troco (Valor exato)\n`;
    }
  }

  if (data.generalNotes) {
    txt += `\n${E_NOTE} *OBSERVAÇÕES GERAIS:*\n${data.generalNotes}\n`;
  }

  txt += `${LINE}\n`;
  txt += `_Pedido gerado diretamente pelo site oficial_`;

  return txt;
}

// Disparador seguro que copia para clipboard e abre o link preservando UTF-8
function dispatchWhatsApp(phone, messageText) {
  // Cópia automática para o clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(messageText).catch(() => {});
  }

  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

  // Utiliza link DOM temporário com noopener para compatibilidade total
  const link = document.createElement('a');
  link.href = whatsappUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  setTimeout(() => link.remove(), 100);
}

// Reservation Form Handler
function handleReservationSubmit(e) {
  e.preventDefault();
  const cfg = getConfig();
  const brandShort = cfg.brand?.shortName || cfg.brand?.name || "RESTAURANTE";
  const contactPerson = cfg.brand?.ownerOrContactPerson || "";
  const phone = (cfg.contact && cfg.contact.phoneWhatsApp) || "5588993345987";

  const name = document.getElementById('resName')?.value;
  const phoneInput = document.getElementById('resPhone')?.value;
  const guests = document.getElementById('resGuests')?.value;
  const date = document.getElementById('resDate')?.value;
  const time = document.getElementById('resTime')?.value;

  const reservationJSON = {
    name: name,
    phone: phoneInput,
    guests: guests,
    date: date,
    time: time
  };

  const E_CAL = String.fromCodePoint(0x1F4C5);   // 📅
  const E_USER = String.fromCodePoint(0x1F464);  // 👤
  const E_PHONE = String.fromCodePoint(0x1F4F1); // 📱
  const E_PARTY = String.fromCodePoint(0x1F389); // 🎉
  const E_CLOCK = String.fromCodePoint(0x23F0);  // ⏰
  const LINE = '------------------------------------------';

  let msg = `${E_CAL} *SOLICITAÇÃO DE RESERVA / EVENTO - ${brandShort.toUpperCase()}*\n`;
  if (contactPerson) {
    msg += `_Aos cuidados de ${contactPerson}_\n`;
  }
  msg += `${LINE}\n\n`;
  msg += `${E_USER} *Nome:* ${reservationJSON.name}\n`;
  msg += `${E_PHONE} *Telefone:* ${reservationJSON.phone}\n`;
  msg += `${E_PARTY} *Pessoas/Evento:* ${reservationJSON.guests}\n`;
  msg += `${E_CAL} *Data:* ${reservationJSON.date}\n`;
  msg += `${E_CLOCK} *Horário:* ${reservationJSON.time}\n\n`;
  msg += `${LINE}\n`;
  msg += `Olá${contactPerson ? ' ' + contactPerson : ''}, gostaria de confirmar a disponibilidade para esta reserva.`;

  dispatchWhatsApp(phone, msg);
}

function scrollToMenu() {
  document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' });
}

// =========================================================================
// EFEITO FOLDTEXT (TRANSPOSTO DE REACT BITS PARA VANILLA JS + GSAP)
// =========================================================================

function initFoldText() {
  // Registrar o plugin ScrollTrigger no GSAP se ele estiver disponível
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  } else {
    console.warn("GSAP ou ScrollTrigger não encontrados. O efeito FoldText não rodará.");
    return;
  }

  const elements = document.querySelectorAll('.fold-text-effect');

  elements.forEach(el => {
    const text = el.getAttribute('data-text') || el.innerText;
    const splitBy = el.getAttribute('data-split') || 'char'; // 'char' | 'word'
    const hinge = el.getAttribute('data-hinge') || 'top';
    const duration = parseFloat(el.getAttribute('data-duration')) || 0.65;
    const stagger = parseFloat(el.getAttribute('data-stagger')) || 0.045;
    const ease = el.getAttribute('data-ease') || 'power3.out';
    const perspective = el.getAttribute('data-perspective') || '700px';
    const creaseShading = parseFloat(el.getAttribute('data-crease')) || 0.55;

    // Limpar o elemento
    el.innerHTML = '';
    el.classList.add('fold-text');

    // Configurar estilos básicos no elemento via variáveis CSS
    el.style.setProperty('--fold-text-color', 'inherit');
    el.style.setProperty('--fold-text-font-size', 'inherit');
    el.style.setProperty('--fold-text-font-weight', 'inherit');

    // Elemento acessível para leitores de tela
    const srOnly = document.createElement('span');
    srOnly.className = 'fold-text-sr-only';
    srOnly.innerText = text;
    el.appendChild(srOnly);

    // Container visual (oculto para leitores de tela)
    const visual = document.createElement('span');
    visual.className = 'fold-text-visual';
    visual.setAttribute('aria-hidden', 'true');
    el.appendChild(visual);

    let parts = [];
    if (splitBy === 'word') {
      parts = text.split(/(\s+)/);
    } else {
      parts = Array.from(text);
    }

    const HINGE_CONFIG = {
      top: { origin: '50% 0%', rotateX: -92, rotateY: 0 },
      bottom: { origin: '50% 100%', rotateX: 92, rotateY: 0 },
      left: { origin: '0% 50%', rotateX: 0, rotateY: 92 },
      right: { origin: '100% 50%', rotateX: 0, rotateY: -92 }
    };
    const hingeConfig = HINGE_CONFIG[hinge] || HINGE_CONFIG.top;

    let segmentIndex = 0;
    parts.forEach((part, index) => {
      if (splitBy === 'word') {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          // Espaço em branco
          const ws = document.createElement('span');
          ws.className = 'fold-text-whitespace';
          ws.innerText = part.replace(/ /g, '\u00A0');
          visual.appendChild(ws);
          return;
        }
      } else {
        if (part === ' ') {
          const ws = document.createElement('span');
          ws.className = 'fold-text-whitespace';
          ws.innerHTML = '&nbsp;';
          visual.appendChild(ws);
          return;
        }
        if (part === '\n') {
          visual.appendChild(document.createElement('br'));
          return;
        }
      }

      segmentIndex++;

      // Criar segmento 3D
      const segment = document.createElement('span');
      segment.className = 'fold-text-segment';
      segment.setAttribute('data-fold-split', splitBy);
      segment.style.setProperty('--fold-perspective', perspective);

      const piece = document.createElement('span');
      piece.className = 'fold-text-piece';
      piece.setAttribute('data-fold-hinge', hinge);
      piece.style.transformOrigin = hingeConfig.origin;
      piece.style.setProperty('--fold-crease', 0);
      piece.innerText = part;

      segment.appendChild(piece);
      visual.appendChild(segment);
    });

    const pieces = el.querySelectorAll('.fold-text-piece');
    const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const fromVars = {
      opacity: 0,
      rotateX: reduceMotion ? 0 : hingeConfig.rotateX,
      rotateY: reduceMotion ? 0 : hingeConfig.rotateY,
      '--fold-crease': reduceMotion ? 0 : creaseShading,
      transformOrigin: hingeConfig.origin,
      force3D: true
    };

    const toVars = {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      '--fold-crease': 0,
      duration: reduceMotion ? Math.min(duration, 0.22) : duration,
      ease: reduceMotion ? 'power1.out' : ease,
      stagger: reduceMotion ? Math.min(stagger, 0.02) : stagger,
      clearProps: 'willChange'
    };

    // Criar a animação e vinculá-la ao ScrollTrigger com toggleActions para repetir ao rolar a página
    const anim = gsap.fromTo(pieces, fromVars, toVars);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      end: 'bottom 12%',
      animation: anim,
      toggleActions: 'restart reset restart reset'
    });
  });
}

// =========================================================================
// INTERAÇÕES SÊNIOR E NAVEGAÇÃO AVANÇADA
// =========================================================================

// 1. Encolher Navbar no Scroll
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// 2. Scroll Spy inteligente com IntersectionObserver
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const drawerLinks = document.querySelectorAll('.drawer-links a');

  if (!sections.length) return;

  const options = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Ativa quando a seção ocupa a maior parte do viewport
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Ativar link na barra desktop
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });

        // Ativar link no menu gaveta mobile
        drawerLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, options);

  sections.forEach(section => observer.observe(section));
}

// 3. Efeito Magnético sênior nos botões importantes (Magnet de React Bits)
function initMagneticButtons() {
  // Evitar em dispositivos móveis ou preferências de movimento reduzido
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
  
  const buttons = document.querySelectorAll('.magnetic-btn');

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Mover o botão suavemente para o cursor
      gsap.to(btn, {
        x: x * 0.35,
        y: y * 0.35,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      // Efeito elástico de retorno rápido
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)'
      });
    });
  });
}

// 4. Controle do Drawer Menu (Gaveta de Navegação Mobile)
function toggleMobileDrawer(open) {
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('drawerOverlay');
  if (drawer && overlay) {
    if (open) {
      drawer.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // impede rolagem de fundo
    } else {
      drawer.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

// Exportar globalmente para eventos onclick no HTML
window.toggleMobileDrawer = toggleMobileDrawer;

// =========================================================================
// 5. CARROSSEL AUTOMÁTICO DE DEPOIMENTOS (AUTOPLAY CONTINUO)
// =========================================================================

let currentSlideIndex = 0;
let carouselTimer = null;

function getVisibleSlidesCount() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function updateCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('carouselDots');
  if (!track || !slides.length) return;

  const visibleCount = getVisibleSlidesCount();
  const maxIndex = Math.max(0, slides.length - visibleCount);

  if (currentSlideIndex > maxIndex) {
    currentSlideIndex = 0;
  } else if (currentSlideIndex < 0) {
    currentSlideIndex = maxIndex;
  }

  const slideWidthPercent = 100 / visibleCount;
  track.style.transform = `translateX(-${currentSlideIndex * slideWidthPercent}%)`;

  // Atualizar bullets / dots
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      if (idx === currentSlideIndex) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
}

function nextTestimonial() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const visibleCount = getVisibleSlidesCount();
  const maxIndex = Math.max(0, slides.length - visibleCount);
  currentSlideIndex = currentSlideIndex >= maxIndex ? 0 : currentSlideIndex + 1;
  updateCarousel();
  resetCarouselTimer();
}

function prevTestimonial() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const visibleCount = getVisibleSlidesCount();
  const maxIndex = Math.max(0, slides.length - visibleCount);
  currentSlideIndex = currentSlideIndex <= 0 ? maxIndex : currentSlideIndex - 1;
  updateCarousel();
  resetCarouselTimer();
}

function goToSlide(index) {
  currentSlideIndex = index;
  updateCarousel();
  resetCarouselTimer();
}

function resetCarouselTimer() {
  if (carouselTimer) clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    nextTestimonial();
  }, 3500);
}

function initTestimonialsCarousel() {
  const track = document.getElementById('testimonialsTrack');
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('carouselDots');
  const wrapper = document.getElementById('testimonialsCarousel');

  if (!track || !slides.length) return;

  // Criar dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    const visibleCount = getVisibleSlidesCount();
    const totalDots = Math.max(1, slides.length - visibleCount + 1);
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('button');
      dot.className = `dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Ir para depoimento ${i + 1}`);
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  updateCarousel();
  resetCarouselTimer();

  // Pausar no hover
  if (wrapper) {
    wrapper.addEventListener('mouseenter', () => {
      if (carouselTimer) clearInterval(carouselTimer);
    });
    wrapper.addEventListener('mouseleave', () => {
      resetCarouselTimer();
    });
  }
}

// Exportar funções do carrossel globalmente
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.goToSlide = goToSlide;

// Navbar Scroll Blur & Compact State
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 25) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
}, { passive: true });

// =========================================================================
// GESTÃO DE PERFIL DO CLIENTE & SINCRONIZAÇÃO COM SUPABASE
// =========================================================================

function getUserProfile() {
  const saved = localStorage.getItem('arte_delicia_user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return null;
    }
  }
  return null;
}

function updateUserNavBadge() {
  const user = getUserProfile();
  const navBtn = document.getElementById('navAccountBtn');
  const navText = document.getElementById('navAccountText');
  if (navText && user && user.name) {
    const firstName = user.name.split(' ')[0];
    navText.innerText = `Olá, ${firstName}`;
    if (navBtn) navBtn.classList.add('logged-in');
  } else if (navText) {
    navText.innerText = 'Minha Conta';
    if (navBtn) navBtn.classList.remove('logged-in');
  }
}

function openAuthModal() {
  const modal = document.getElementById('authModal');
  const user = getUserProfile();
  
  if (user) {
    if (document.getElementById('profileName')) document.getElementById('profileName').value = user.name || '';
    if (document.getElementById('profilePhone')) document.getElementById('profilePhone').value = user.phone || '';
    if (document.getElementById('profileStreet')) document.getElementById('profileStreet').value = user.street || '';
    if (document.getElementById('profileNeighborhood')) document.getElementById('profileNeighborhood').value = user.neighborhood || '';
    if (document.getElementById('profileComplement')) document.getElementById('profileComplement').value = user.complement || '';
    if (document.getElementById('profilePaymentPref')) document.getElementById('profilePaymentPref').value = user.paymentPref || 'Pix';
    
    const clearBtn = document.getElementById('btnClearProfile');
    if (clearBtn) clearBtn.style.display = 'inline-flex';
  } else {
    const clearBtn = document.getElementById('btnClearProfile');
    if (clearBtn) clearBtn.style.display = 'none';
  }

  if (modal) modal.classList.add('active');
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active');
}

async function saveUserProfile(e) {
  if (e) e.preventDefault();
  
  const name = document.getElementById('profileName')?.value.trim();
  const phone = document.getElementById('profilePhone')?.value.trim();
  const street = document.getElementById('profileStreet')?.value.trim();
  const neighborhood = document.getElementById('profileNeighborhood')?.value.trim();
  const complement = document.getElementById('profileComplement')?.value.trim();
  const paymentPref = document.getElementById('profilePaymentPref')?.value;

  if (!name || !phone || !street || !neighborhood) {
    alert('Por favor, preencha todos os campos obrigatórios (*).');
    return;
  }

  const profile = {
    name,
    phone,
    street,
    neighborhood,
    complement: complement || '',
    paymentPref: paymentPref || 'Pix'
  };

  // Salvar no localStorage
  localStorage.setItem('arte_delicia_user', JSON.stringify(profile));
  updateUserNavBadge();

  // Sincronizar com o Supabase
  if (window.syncProfileWithSupabase) {
    await window.syncProfileWithSupabase(profile);
  }

  closeAuthModal();
  alert(`✅ Dados salvos com sucesso, ${name.split(' ')[0]}! Seus dados estão seguros e sincronizados.`);
}

function clearUserProfile() {
  if (confirm('Tem certeza que deseja apagar seus dados salvos deste navegador?')) {
    localStorage.removeItem('arte_delicia_user');
    updateUserNavBadge();
    const form = document.getElementById('authProfileForm');
    if (form) form.reset();
    const clearBtn = document.getElementById('btnClearProfile');
    if (clearBtn) clearBtn.style.display = 'none';
    closeAuthModal();
    alert('Seus dados salvos foram removidos.');
  }
}

function prefillCartFromProfile() {
  const user = getUserProfile();
  if (!user) return;

  if (document.getElementById('cartCustomerName') && !document.getElementById('cartCustomerName').value) {
    document.getElementById('cartCustomerName').value = user.name || '';
  }
  if (document.getElementById('cartCustomerPhone') && !document.getElementById('cartCustomerPhone').value) {
    document.getElementById('cartCustomerPhone').value = user.phone || '';
  }
  if (document.getElementById('deliveryStreet') && !document.getElementById('deliveryStreet').value) {
    document.getElementById('deliveryStreet').value = user.street || '';
  }
  if (document.getElementById('deliveryNeighborhood') && !document.getElementById('deliveryNeighborhood').value) {
    document.getElementById('deliveryNeighborhood').value = user.neighborhood || '';
  }
  if (document.getElementById('deliveryComplement') && !document.getElementById('deliveryComplement').value) {
    document.getElementById('deliveryComplement').value = user.complement || '';
  }
  if (document.getElementById('paymentMethod') && user.paymentPref) {
    document.getElementById('paymentMethod').value = user.paymentPref;
  }
}

// Inicializar badge ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  updateUserNavBadge();

  // Listener para ativar som do vídeo ao clicar
  const video = document.getElementById('aboutVideoPlayer');
  if (video) {
    video.addEventListener('volumechange', () => {
      const soundBtn = document.getElementById('videoSoundBtn');
      const soundIcon = document.getElementById('videoSoundIcon');
      const soundText = document.getElementById('videoSoundText');
      if (!video.muted && video.volume > 0) {
        if (soundBtn) soundBtn.classList.add('unmuted');
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
        if (soundText) soundText.innerText = 'Áudio Ativado 🔊';
      } else {
        if (soundBtn) soundBtn.classList.remove('unmuted');
        if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
        if (soundText) soundText.innerText = 'Toque para ativar o som 🔊';
      }
    });

    video.addEventListener('click', () => {
      if (video.muted) {
        video.muted = false;
        video.volume = 1.0;
        if (video.paused) video.play();
      }
    });
  }
});

// Função para alternar áudio ao clicar no card ou botão do vídeo
function toggleVideoAudio(e) {
  if (e && e.target && e.target.closest('.btn-video-res')) return;

  const video = document.getElementById('aboutVideoPlayer');
  const soundBtn = document.getElementById('videoSoundBtn');
  const soundIcon = document.getElementById('videoSoundIcon');
  const soundText = document.getElementById('videoSoundText');

  if (!video) return;

  if (video.muted) {
    video.muted = false;
    video.volume = 1.0;
    if (video.paused) video.play();

    if (soundBtn) soundBtn.classList.add('unmuted');
    if (soundIcon) soundIcon.className = 'fa-solid fa-volume-high';
    if (soundText) soundText.innerText = 'Áudio Ativado 🔊';
  } else {
    if (e && e.target && e.target.closest('#videoSoundBtn')) {
      video.muted = true;
      if (soundBtn) soundBtn.classList.remove('unmuted');
      if (soundIcon) soundIcon.className = 'fa-solid fa-volume-xmark';
      if (soundText) soundText.innerText = 'Toque para ativar o som 🔊';
    }
  }
}

// Exportar globalmente
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.saveUserProfile = saveUserProfile;
window.clearUserProfile = clearUserProfile;
window.getUserProfile = getUserProfile;
window.toggleVideoAudio = toggleVideoAudio;




