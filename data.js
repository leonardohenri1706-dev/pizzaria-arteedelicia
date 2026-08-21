/**
 * Retrocompatibilidade: MENU_DATA agora é montado dinamicamente
 * a partir de RESTAURANT_CONFIG (definido no config.js).
 */
const MENU_DATA = (function() {
  if (typeof RESTAURANT_CONFIG !== 'undefined') {
    return {
      restaurantName: RESTAURANT_CONFIG.brand.name,
      phoneWhatsApp: RESTAURANT_CONFIG.contact.phoneWhatsApp,
      contactName: RESTAURANT_CONFIG.brand.ownerOrContactPerson,
      sizes: RESTAURANT_CONFIG.menu.sizes,
      pizzasClassicas: RESTAURANT_CONFIG.menu.pizzasClassicas,
      pizzasEspeciais: RESTAURANT_CONFIG.menu.pizzasEspeciais,
      pizzasDoces: RESTAURANT_CONFIG.menu.pizzasDoces,
      bebidas: RESTAURANT_CONFIG.menu.bebidas
    };
  }
  return {};
})();

if (typeof window !== 'undefined') {
  window.MENU_DATA = MENU_DATA;
}
