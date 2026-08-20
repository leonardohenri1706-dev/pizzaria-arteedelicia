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

// Combine all pizzas into a single array
function getAllPizzas() {
  return [
    ...(MENU_DATA.pizzasClassicas || []),
    ...(MENU_DATA.pizzasEspeciais || []),
    ...(MENU_DATA.pizzasDoces || [])
  ];
}

// Render Pizzas Grid in Clean Card Style
function renderPizzaGrid() {
  const grid = document.getElementById('pizzaGrid');
  if (!grid) return;

  const searchQuery = document.getElementById('searchInput')?.value.toLowerCase() || '';
  let pizzas = getAllPizzas();

  // Filter by category
  if (currentCategory === 'classica') {
    pizzas = MENU_DATA.pizzasClassicas || [];
  } else if (currentCategory === 'especial') {
    pizzas = MENU_DATA.pizzasEspeciais || [];
  } else if (currentCategory === 'doce') {
    pizzas = MENU_DATA.pizzasDoces || [];
  }

  // Filter by search query
  if (searchQuery.trim() !== '') {
    pizzas = pizzas.filter(p => 
      p.name.toLowerCase().includes(searchQuery) || 
      p.ingredients.toLowerCase().includes(searchQuery)
    );
  }

  if (pizzas.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align:center; padding: 3rem; color: var(--text-muted);">
        <i class="fa-solid fa-pizza-slice" style="font-size: 3rem; margin-bottom: 1rem; color: var(--primary-red);"></i>
        <h3>Nenhuma pizza encontrada</h3>
        <p>Tente buscar por outro termo ou ingrediente.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = pizzas.map(pizza => {
    const isFav = favorites.includes(pizza.id);
    const priceG = pizza.prices.G.toFixed(2).replace('.', ',');

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
            <span class="size-label-clean">Tamanho G (8 fatias)</span>
            <div class="price-tag-clean">R$ ${priceG}</div>
          </div>
          <button class="btn-add-cart-clean" onclick="openCustomizerModal('${pizza.id}')">
            <i class="fa-solid fa-cart-plus"></i> MONTAR PIZZA
          </button>
        </div>
      </div>
    `;
  }).join('');
}

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

// Category Filter
function filterCategory(category) {
  currentCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${category}`)?.classList.add('active');
  renderPizzaGrid();

  // Aguarda o browser repintar o DOM antes de calcular posição
  requestAnimationFrame(() => {
    const targetId = document.getElementById('cardapio') ? 'cardapio' : 'destaques';
    scrollToSection(targetId);
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

// Smooth animated scroll to all pizzas in catalog
function scrollToCatalogAndAnimate(category = 'all') {
  currentCategory = category;
  document.querySelectorAll('.cat-pill').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`btn-${category}`)?.classList.add('active');
  renderPizzaGrid();

  requestAnimationFrame(() => {
    const targetId = document.getElementById('cardapio') ? 'cardapio' : 'destaques';
    scrollToSection(targetId);
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

// Global Customizer State
let flavorCount = 1;

function openCustomizer(pizzaId) {
  selectedPizza = getAllPizzas().find(p => p.id === pizzaId);
  if (!selectedPizza) return;

  selectedSize = 'G'; // default size
  flavorCount = 1;

  document.getElementById('modalPizzaTitle').innerText = selectedPizza.name;
  document.getElementById('modalIngredients').innerText = selectedPizza.ingredients;
  document.getElementById('pizzaNotes').value = '';

  populateSizeSelector();
  updateFlavorTabsForSize();
  setFlavorCount(1);
  populateFlavorDropdowns();
  updateCustomizerTotal();

  const modal = document.getElementById('customizerModal');
  if (modal) modal.classList.add('active');
}

function closeCustomizerModal() {
  const modal = document.getElementById('customizerModal');
  if (modal) modal.classList.remove('active');
}

function populateSizeSelector() {
  const container = document.getElementById('sizeSelector');
  if (!container || !selectedPizza) return;

  // Filtrar apenas os tamanhos que esta pizza possui
  const availableSizes = MENU_DATA.sizes.filter(s => selectedPizza.prices[s.key] != null);

  // Se o tamanho atual não estiver disponível para esta pizza, seleciona o maior disponível (ex: G)
  if (selectedPizza.prices[selectedSize] == null && availableSizes.length > 0) {
    selectedSize = availableSizes[availableSizes.length - 1].key;
  }

  container.innerHTML = availableSizes.map(sizeObj => {
    const price = selectedPizza.prices[sizeObj.key];
    const isSelected = sizeObj.key === selectedSize ? 'selected' : '';

    return `
      <div class="size-btn ${isSelected}" onclick="selectSize('${sizeObj.key}')">
        <div>
          <span class="size-name">${sizeObj.label}</span>
        </div>
        <span class="size-price">R$ ${price.toFixed(2).replace('.', ',')}</span>
      </div>
    `;
  }).join('');
}

function selectSize(sizeKey) {
  selectedSize = sizeKey;
  populateSizeSelector();
  updateFlavorTabsForSize();
  populateFlavorDropdowns();
  updateCustomizerTotal();
}

function updateFlavorTabsForSize() {
  const tab3 = document.getElementById('tab3Flavors');
  if (tab3) {
    if (selectedSize === 'GG') {
      tab3.style.display = 'flex';
    } else {
      tab3.style.display = 'none';
      if (flavorCount === 3) {
        setFlavorCount(2); // fallback if downgraded from GG
      }
    }
  }
}

function setFlavorCount(count) {
  flavorCount = count;
  
  document.getElementById('tab1Flavor')?.classList.toggle('active', count === 1);
  document.getElementById('tab2Flavors')?.classList.toggle('active', count === 2);
  document.getElementById('tab3Flavors')?.classList.toggle('active', count === 3);

  const secondGroup = document.getElementById('secondFlavorGroup');
  const thirdGroup = document.getElementById('thirdFlavorGroup');
  
  if (secondGroup) {
    secondGroup.style.display = count >= 2 ? 'block' : 'none';
  }
  if (thirdGroup) {
    thirdGroup.style.display = count === 3 ? 'block' : 'none';
  }

  updateCustomizerTotal();
}

function populateFlavorDropdowns() {
  const select2 = document.getElementById('secondFlavorSelect');
  const select3 = document.getElementById('thirdFlavorSelect');
  if (!selectedPizza) return;

  // Filtrar outras pizzas que também possuam preço para o tamanho selecionado
  const otherPizzas = getAllPizzas().filter(p => p.id !== selectedPizza.id && p.prices[selectedSize] != null);

  // Show ONLY the price for the currently selected size
  const optionsHtml = otherPizzas.map(p => {
    const sizePrice = p.prices[selectedSize] || 0;
    return `<option value="${p.id}">${p.name} (R$ ${sizePrice.toFixed(2).replace('.', ',')})</option>`;
  }).join('');

  if (select2) {
    const currentVal2 = select2.value;
    select2.innerHTML = optionsHtml;
    if (currentVal2 && otherPizzas.some(p => p.id === currentVal2)) {
      select2.value = currentVal2;
    }
  }

  if (select3) {
    const currentVal3 = select3.value;
    select3.innerHTML = optionsHtml;
    if (currentVal3 && otherPizzas.some(p => p.id === currentVal3)) {
      select3.value = currentVal3;
    } else if (otherPizzas.length > 1) {
      select3.selectedIndex = 1;
    }
  }
}

// Global exposure for event handlers
window.openCustomizer = openCustomizer;
window.openCustomizerModal = openCustomizer;
window.setFlavorCount = setFlavorCount;
window.selectSize = selectSize;

function getCalculatedPrice() {
  if (!selectedPizza) return 0;
  const price1 = selectedPizza.prices[selectedSize] || 0;

  if (flavorCount === 1) {
    return price1;
  }

  if (flavorCount === 2) {
    const select2 = document.getElementById('secondFlavorSelect');
    const p2Id = select2?.value;
    const pizza2 = getAllPizzas().find(p => p.id === p2Id);
    const price2 = pizza2 ? (pizza2.prices[selectedSize] || 0) : price1;
    // Média aritmética dos 2 sabores
    return (price1 + price2) / 2;
  }

  if (flavorCount === 3 && selectedSize === 'GG') {
    const select2 = document.getElementById('secondFlavorSelect');
    const select3 = document.getElementById('thirdFlavorSelect');
    const p2Id = select2?.value;
    const p3Id = select3?.value;
    const pizza2 = getAllPizzas().find(p => p.id === p2Id);
    const pizza3 = getAllPizzas().find(p => p.id === p3Id);
    const price2 = pizza2 ? (pizza2.prices[selectedSize] || 0) : price1;
    const price3 = pizza3 ? (pizza3.prices[selectedSize] || 0) : price1;
    // Média aritmética dos 3 sabores
    return (price1 + price2 + price3) / 3;
  }

  return price1;
}

function updateCustomizerTotal() {
  const price = getCalculatedPrice();
  const display = document.getElementById('modalTotalPrice');
  if (display) {
    display.innerText = `R$ ${price.toFixed(2).replace('.', ',')}`;
  }
}

// Add Item to Cart
function addCustomizedPizzaToCart() {
  if (!selectedPizza) return;

  const notes = document.getElementById('pizzaNotes')?.value.trim() || '';
  const price = getCalculatedPrice();

  let title = selectedPizza.name;
  if (flavorCount === 2) {
    const select2 = document.getElementById('secondFlavorSelect');
    const p2Id = select2?.value;
    const pizza2 = getAllPizzas().find(p => p.id === p2Id);
    if (pizza2) {
      title = `Meio a Meio: 1/2 ${selectedPizza.name} + 1/2 ${pizza2.name}`;
    }
  } else if (flavorCount === 3 && selectedSize === 'GG') {
    const select2 = document.getElementById('secondFlavorSelect');
    const select3 = document.getElementById('thirdFlavorSelect');
    const p2Id = select2?.value;
    const p3Id = select3?.value;
    const pizza2 = getAllPizzas().find(p => p.id === p2Id);
    const pizza3 = getAllPizzas().find(p => p.id === p3Id);
    const name2 = pizza2 ? pizza2.name : '';
    const name3 = pizza3 ? pizza3.name : '';
    title = `3 Sabores: 1/3 ${selectedPizza.name} + 1/3 ${name2} + 1/3 ${name3}`;
  }

  const cartItem = {
    id: Date.now(),
    pizzaId: selectedPizza.id,
    title: title,
    size: selectedSize,
    notes: notes,
    price: price,
    quantity: 1,
    image: selectedPizza.image
  };

  cart.push(cartItem);
  saveCart();
  updateCartBadge();
  closeCustomizerModal();

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

// Update Cart Badges & Floating Bar
function updateCartBadge() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.innerText = totalItems;

  const floatCountEl = document.getElementById('floatCount');
  if (floatCountEl) floatCountEl.innerText = `${totalItems} ${totalItems === 1 ? 'item' : 'itens'}`;

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
  if (modal) modal.classList.add('active');
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

  container.innerHTML = cart.map(item => {
    const sizeName = sizeLabels[item.size] || `Tamanho ${item.size}`;
    const itemTotal = (item.price * item.quantity).toFixed(2).replace('.', ',');
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
            <span class="cart-item-unit-price">R$ ${item.price.toFixed(2).replace('.', ',')} un.</span>
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

function getDeliveryFee() {
  if (orderType !== 'delivery') return 0;

  const regionSelect = document.getElementById('deliveryRegion');
  const neighborhood = document.getElementById('deliveryNeighborhood')?.value.toLowerCase() || '';
  const street = document.getElementById('deliveryStreet')?.value.toLowerCase() || '';

  if (regionSelect && (regionSelect.value === 'brito' || regionSelect.value === 'boca_do_forno')) {
    return 2.00;
  }

  if (neighborhood.includes('brito') || neighborhood.includes('boca do forno') ||
      street.includes('brito') || street.includes('boca do forno')) {
    return 2.00;
  }

  return 0.00;
}

function updateDeliveryFee() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      if (fee > 0) {
        feeEl.innerText = `R$ ${fee.toFixed(2).replace('.', ',')} (Brito / Boca do Forno)`;
        feeEl.style.color = 'var(--accent-yellow)';
      } else {
        feeEl.innerText = 'Grátis (Itaiçaba Sede)';
        feeEl.style.color = '#51cf66';
      }
    }
  }

  if (grandTotalEl) grandTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
  if (floatTotalEl) floatTotalEl.innerText = `R$ ${grandTotal.toFixed(2).replace('.', ',')}`;
}

function detectNeighborhoodFee() {
  const neighborhood = document.getElementById('deliveryNeighborhood')?.value.toLowerCase() || '';
  const regionSelect = document.getElementById('deliveryRegion');
  if (regionSelect) {
    if (neighborhood.includes('brito')) {
      regionSelect.value = 'brito';
    } else if (neighborhood.includes('boca do forno') || neighborhood.includes('forno')) {
      regionSelect.value = 'boca_do_forno';
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
    alert('Adicione ao menos uma pizza ao seu carrinho antes de finalizar.');
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
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    const sizeName = sizeLabels[item.size] || `Tamanho ${item.size}`;
    return {
      index: index + 1,
      title: item.title,
      size: sizeName,
      notes: item.notes || '',
      quantity: item.quantity,
      unitPrice: item.price.toFixed(2).replace('.', ','),
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

  const messageText = generateWhatsAppMessageFromJSON(orderJSON);
  const phone = MENU_DATA.phoneWhatsApp || "5588993345987";

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

  let txt = `${E_PIZZA} *NOVO PEDIDO - RESTAURANTE E PIZZARIA ARTE & DELÍCIA*\n`;
  txt += `_Aos cuidados de Simonny_\n`;
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
    if (data.deliveryFee > 0) {
      txt += `${E_MOTO} *Taxa de Entrega:* R$ ${data.deliveryFee.toFixed(2).replace('.', ',')} (Alto do Brito / Boca do Forno)\n`;
    } else {
      txt += `${E_MOTO} *Taxa de Entrega:* Grátis (Itaiçaba Sede)\n`;
    }
    txt += `\n`;
  }

  txt += `${LINE}\n`;
  txt += `${E_CLIP} *ITENS DO PEDIDO:*\n\n`;

  data.items.forEach(it => {
    txt += `*${it.index}. ${it.quantity}x ${it.title}*\n`;
    txt += `   ${E_DOT} *Tamanho:* ${it.size}\n`;
    if (it.notes) {
      txt += `   ${E_DOT} *Obs:* ${it.notes}\n`;
    }
    txt += `   ${E_DOT} *Subtotal:* R$ ${it.subtotal}\n\n`;
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

  let msg = `${E_CAL} *SOLICITAÇÃO DE RESERVA / EVENTO - ARTE & DELÍCIA*\n`;
  msg += `_Aos cuidados de Simonny_\n`;
  msg += `${LINE}\n\n`;
  msg += `${E_USER} *Nome:* ${reservationJSON.name}\n`;
  msg += `${E_PHONE} *Telefone:* ${reservationJSON.phone}\n`;
  msg += `${E_PARTY} *Pessoas/Evento:* ${reservationJSON.guests}\n`;
  msg += `${E_CAL} *Data:* ${reservationJSON.date}\n`;
  msg += `${E_CLOCK} *Horário:* ${reservationJSON.time}\n\n`;
  msg += `${LINE}\n`;
  msg += `Olá Simonny, gostaria de confirmar a disponibilidade para esta reserva.`;

  const phone = MENU_DATA.phoneWhatsApp || "5588993345987";
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




