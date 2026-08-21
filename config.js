/**
 * =========================================================================
 * ARQUIVO CENTRAL DE CONFIGURAÇÃO DO ESTABELECIMENTO
 * =========================================================================
 * 
 * Este é o ÚNICO arquivo que você precisa alterar para personalizar o site
 * para um novo cliente/restaurante. Todas as cores, logotipos, contatos,
 * bairros de entrega, taxas de frete e itens do cardápio são lidos daqui.
 * 
 * Tempo estimado para personalização completa: ~5 a 10 minutos!
 * =========================================================================
 */

const RESTAURANT_CONFIG = {
  // ==========================================
  // 1. IDENTIDADE & DADOS DA EMPRESA
  // ==========================================
  brand: {
    // Nome completo oficial
    name: "RESTAURANTE E PIZZARIA ARTE & DELÍCIA",
    
    // Nome curto para a logo e cabeçalho
    shortName: "ARTE & DELÍCIA",
    
    // Subtítulo descritivo abaixo da marca
    subTitle: "Restaurante & Pizzaria",
    
    // Nome do responsável ou atendente pelo WhatsApp (ex: Simonny)
    ownerOrContactPerson: "Simonny",
    
    // Frase de destaque no topo (Hero Eyebrow)
    eyebrowText: "~ Mais de 13 Anos de Tradição em Itaiçaba ~",
    
    // Título principal do Hero
    heroTitle: "A VERDADEIRA PIZZA ARTESANAL QUE",
    heroTitleHighlight: "CONQUISTOU ITAIÇABA",
    
    // Descrição do banner principal
    heroDescription: "Há mais de 13 anos preparando pizzas inesquecíveis com massas de fermentação lenta, queijos nobres e aquele carinho especial das receitas da Simonny. Venha saborear no nosso salão acolhedor ou receba quentinha na sua porta!",
    
    // Texto do banner superior (Utility Bar)
    topBannerText: "✨ Mais de 13 anos de tradição e sabor servindo Itaiçaba com carinho!",
    
    // Textos da Seção "Sobre Nós"
    aboutSubtitle: "HISTÓRIA, AMOR & TRADIÇÃO",
    aboutTitle: "MAIS DE 13 ANOS DE HISTÓRIA",
    aboutLead: "Mais do que uma pizzaria, somos o ponto de encontro de amigos e famílias em Itaiçaba há mais de 13 anos, onde cada receita é preparada artesanalmente com paixão pela Simonny.",
    aboutDescription: "Nossas massas passam por um processo rigoroso de fermentação lenta e natural, garantindo leveza digestiva e bordas deliciosamente crocantes. Do molho de tomate fresco aos queijos e recheios nobres como Carne de Sol Nordestina, Frango Catupiry e Camarão Especial, cada pizza é feita na hora com o padrão inconfundível da Arte & Delícia.",
    
    // Metatags para Google e redes sociais
    metaTitle: "Restaurante e Pizzaria Arte & Delícia | Cardápio Oficial",
    metaDescription: "Restaurante e Pizzaria Arte & Delícia. Pizzas artesanais preparadas na hora com ingredientes frescos. Atendimento com Simonny.",
    
    // Rodapé Copyright
    copyrightText: "© 2026 Restaurante e Pizzaria Arte & Delícia. Todos os direitos reservados."
  },

  // ==========================================
  // 2. MÍDIAS & IMAGENS
  // ==========================================
  media: {
    // Caminho da Logo (PNG transparente recomendado: 200x200 ou 400x400)
    logo: "assets/logo.png",
    
    // Favicon da aba do navegador
    favicon: "assets/logo.png",
    
    // Imagem principal de destaque no Hero
    heroImage: "assets/nordestina.jpg",
    
    // Vídeo institucional da casa (se não tiver, o poster será exibido)
    aboutVideo: "assets/espaco_pizzaria.mp4",
    aboutVideoPoster: "assets/hero.jpg",
    aboutVideoTitle: "Espaço Amplo & Aconchegante no Beira Rio",
    aboutVideoSubtitle: "Venha saborear sua pizza favorita com amigos e família!"
  },

  // ==========================================
  // 3. CONTATO & LOCALIZAÇÃO & HORÁRIOS
  // ==========================================
  contact: {
    // Número do WhatsApp com DDI + DDD (somente números, ex: 5588993345987)
    phoneWhatsApp: "5588993345987",
    
    // Formato visual do telefone para exibição na tela
    phoneDisplay: "(88) 99334-5987",
    
    // Endereço completo
    address: "Beira Rio, Itaiçaba - CE",
    addressShort: "Beira Rio • Itaiçaba - CE",
    city: "Itaiçaba",
    state: "CE",
    
    // Horário de funcionamento
    workingHours: "Segunda a Domingo das 18h às 23h",
    workingHoursShort: "Aberto Hoje das 18:00 às 23:30",
    
    // Redes sociais
    instagramUrl: "https://instagram.com",
    facebookUrl: "#"
  },

  // ==========================================
  // 4. PALETA DE CORES (TEMA / CSS VARIABLES)
  // Altere os códigos hexadecimais para mudar todo o visual do site
  // ==========================================
  theme: {
    colors: {
      primaryRed: "#c92a2a",               // Cor primária de ação e botões principais
      primaryRedHover: "#b02525",          // Hover dos botões principais
      primaryRedGradient: "linear-gradient(135deg, #d92525, #9b111e)", // Gradiente principal
      accentGold: "#e5a93c",               // Cor secundária dourada / destaques
      accentYellow: "#f6c86a",             // Amarelo para avisos e badges
      accentGreen: "#2f9e44",              // Verde para entrega grátis e status positivo
      bgDark: "#0e0d0c",                   // Cor de fundo geral escura
      bgCardDark: "#171513",               // Cor de fundo dos cards
      bgCardLight: "#ffffff",              // Fundo de elementos claros
      textMain: "#fdfaf6",                 // Texto principal claro
      textDark: "#111827",                 // Texto escuro
      textMuted: "#9c9288",                // Texto secundário/apagado
      borderDark: "rgba(229, 169, 60, 0.15)", // Bordas douradas suaves
      borderLight: "#e5e7eb"               // Bordas claras
    }
  },

  // ==========================================
  // 5. BAIRROS DE ENTREGA & TAXAS DE FRETE
  // Adicione ou remova regiões conforme a cidade do novo cliente
  // ==========================================
  delivery: {
    // Alerta informativo sobre a área de atendimento
    coverageAlertText: "Entregamos em Itaiçaba (Sede / Beira Rio) e até o <strong>Alto do Brito</strong> e <strong>Boca do Forno</strong> (Taxa de R$ 2,00).",
    defaultFreeLabel: "Grátis (Itaiçaba Sede)",
    
    // Regiões com suas respectivas taxas e palavras-chave de detecção automática
    regions: [
      {
        id: "itaicaba",
        name: "📍 Itaiçaba (Sede / Centro / Beira Rio / Bairros) — Entrega Grátis",
        shortLabel: "Itaiçaba Sede",
        fee: 0.00,
        isDefault: true,
        keywords: ["itaicaba", "sede", "centro", "beira rio", "bairro"]
      },
      {
        id: "brito",
        name: "🛵 Alto do Brito / Brito — Taxa de R$ 2,00",
        shortLabel: "Alto do Brito",
        fee: 2.00,
        keywords: ["brito", "alto do brito"]
      },
      {
        id: "boca_do_forno",
        name: "🛵 Boca do Forno — Taxa de R$ 2,00",
        shortLabel: "Boca do Forno",
        fee: 2.00,
        keywords: ["boca do forno", "forno"]
      }
    ]
  },

  // ==========================================
  // 6. BACKEND SUPABASE (OPCIONAL)
  // Caso deseje salvar pedidos e perfis na nuvem
  // ==========================================
  supabase: {
    enabled: true,
    url: "https://wnyglprzohwuqrkbdgff.supabase.co",
    anonKey: "sb_publishable_Oo50PAkXhtKDKJ2is_aX4Q_U24T5DHm"
  },

  // ==========================================
  // 7. CARDÁPIO (TAMANHOS, CATEGORIAS E ITENS)
  // ==========================================
  menu: {
    // Tamanhos disponíveis para as pizzas
    sizes: [
      { key: "P", label: "Broto (P)", slices: "4 fatias", badge: "P" },
      { key: "M", label: "Média (M)", slices: "6 fatias", badge: "M" },
      { key: "G", label: "Grande (G)", slices: "8 fatias", badge: "G", default: true },
      { key: "GG", label: "Família (GG)", slices: "12 fatias", badge: "GG", supports3Flavors: true }
    ],

    // Categorias exibidas no cardápio
    categories: [
      { id: "all", name: "TODAS AS PIZZAS", icon: "🍕" },
      { id: "classica", name: "PIZZAS CLÁSSICAS", icon: "🌟" },
      { id: "especial", name: "PIZZAS ESPECIAIS", icon: "assets/camarao.jpg", isImg: true },
      { id: "doce", name: "PIZZAS DOCES", icon: "🍫" },
      { id: "bebida", name: "BEBIDAS", icon: "🥤" }
    ],

    // Pizzas Clássicas / Tradicionais
    pizzasClassicas: [
      {
        id: "calabresa",
        name: "CALABRESA",
        ingredients: "Molho, Mussarela, Calabresa, Tomate, Cebola e Orégano",
        category: "classica",
        prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
        image: "assets/calabresa.jpg"
      },
      {
        id: "frango",
        name: "FRANGO",
        ingredients: "Molho, Mussarela, Frango, Tomate, Cebola e Orégano",
        category: "classica",
        prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
        image: "assets/frango.jpg"
      },
      {
        id: "portuguesa",
        name: "PORTUGUESA",
        ingredients: "Molho, Mussarela, Presunto, Ovo, Tomate, Cebola e Orégano",
        category: "classica",
        prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
        image: "assets/portuguesa.jpg"
      },
      {
        id: "mussarela",
        name: "MUSSARELA",
        ingredients: "Molho Especial, Farta Camada de Queijo Mussarela, Tomate, Cebola e Orégano",
        category: "classica",
        prices: { P: 20.00, M: 27.00, G: 33.00, GG: 55.00 },
        image: "assets/mussarela.jpg"
      },
      {
        id: "mista",
        name: "MISTA",
        ingredients: "Molho, Mussarela, Presunto, Tomate, Cebola e Orégano",
        category: "classica",
        prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
        image: "assets/mista.jpg"
      },
      {
        id: "o_delicia",
        name: "Ó DELÍCIA",
        ingredients: "Molho, Mussarela, Presunto, Batata Palha, Cebola, Tomate e Orégano",
        category: "classica",
        prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
        image: "assets/a_moda_da_casa.jpg"
      },
      {
        id: "marguerita",
        name: "MARGUERITA",
        ingredients: "Molho, Mussarela, Tomate, Manjericão, Cebola e Orégano",
        category: "classica",
        prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
        image: "assets/marguerita.jpg"
      }
    ],

    // Pizzas Especiais / Premium
    pizzasEspeciais: [
      {
        id: "nordestina",
        name: "NORDESTINA",
        ingredients: "Molho, Mussarela, Carne Do Sol, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 22.00, M: 34.00, G: 40.00, GG: 65.00 },
        image: "assets/nordestina.jpg"
      },
      {
        id: "calabresa_cheddar_catupiry",
        name: "CALABRESA C/ CHEDDAR OU CATUPIRY",
        ingredients: "Molho, Mussarela, Calabresa, Cheddar ou Catupiry, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
        image: "assets/calabresa.jpg"
      },
      {
        id: "a_moda_da_casa",
        name: "A MODA DA CASA",
        ingredients: "Molho, Mussarela, Calabresa, Presunto, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 22.00, M: 34.00, G: 40.00, GG: 65.00 },
        image: "assets/a_moda_da_casa.jpg"
      },
      {
        id: "frango_catupiry",
        name: "FRANGO CATUPIRY",
        ingredients: "Molho, Mussarela, Frango, Catupiry, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
        image: "assets/frango_catupiry.jpg"
      },
      {
        id: "4_queijos",
        name: "4 QUEIJOS",
        ingredients: "Molho, Mussarela, Queijo Coalho, Catupiry, Cheddar, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
        image: "assets/quatro_queijos.jpg"
      },
      {
        id: "franbacon",
        name: "FRANBACON",
        ingredients: "Molho, Mussarela, Frango, Bacon, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 23.00, M: 33.00, G: 40.00, GG: 65.00 },
        image: "assets/frango_catupiry.jpg"
      },
      {
        id: "camarao",
        name: "CAMARÃO",
        ingredients: "Molho, Mussarela, Camarão, Tomate, Cebola e Orégano",
        category: "especial",
        prices: { P: 24.00, M: 34.00, G: 41.00, GG: 67.00 },
        image: "assets/camarao.jpg"
      }
    ],

    // Pizzas Doces / Sobremesas
    pizzasDoces: [
      {
        id: "banana_canela",
        name: "BANANA COM CANELA",
        ingredients: "Fatias de Banana Selecionadas, Queijo Mussarela ou Creme Especial, Canela Salpicada e Açúcar",
        category: "doce",
        prices: { P: 20.00, M: 30.00, G: 40.00, GG: 60.00 },
        image: "assets/banana_canela.jpg"
      },
      {
        id: "chocolate_mm",
        name: "CHOCOLATE C/ M&M E LEITE CONDENSADO",
        ingredients: "Base de Chocolate ao Leite Cremoso, Confeitos de M&Ms Coloridos e Cobertura de Leite Condensado",
        category: "doce",
        prices: { P: 25.00, M: 35.00, G: 45.00, GG: 67.00 },
        image: "assets/chocolate_mm.jpg"
      }
    ],

    // Bebidas & Refrigerantes
    bebidas: [
      {
        id: "guarana_1l",
        name: "GUARANÁ 1L",
        description: "Garrafa gelada de Guaraná Antarctica 1 litro",
        category: "bebida",
        price: 9.00,
        image: "assets/guarana_1l.jpg",
        icon: "🥤",
        color: "#2e7d32"
      },
      {
        id: "guarana_2l",
        name: "GUARANÁ 2L",
        description: "Garrafa gelada de Guaraná Antarctica 2 litros",
        category: "bebida",
        price: 16.00,
        image: "assets/guarana_2l.png",
        icon: "🥤",
        color: "#2e7d32"
      },
      {
        id: "cajuina_1l",
        name: "CAJUÍNA SÃO GERALDO 1L",
        description: "Refrigerante de caju clássico do Ceará 1 litro bem gelado",
        category: "bebida",
        price: 10.00,
        image: "assets/cajuina_1l.png",
        icon: "🍾",
        color: "#e5a93c"
      },
      {
        id: "cajuina_2l",
        name: "CAJUÍNA SÃO GERALDO 2L",
        description: "Refrigerante de caju clássico do Ceará 2 litros para toda a família",
        category: "bebida",
        price: 17.00,
        image: "assets/cajuina_2l.png",
        icon: "🍾",
        color: "#e5a93c"
      },
      {
        id: "pepsi_1l",
        name: "PEPSI 1L",
        description: "Garrafa gelada de Pepsi Cola 1 litro",
        category: "bebida",
        price: 9.00,
        image: "assets/pepsi_1l.jpg",
        icon: "🍾",
        color: "#1565c0"
      },
      {
        id: "pepsi_2l",
        name: "PEPSI 2L",
        description: "Garrafa gelada de Pepsi Cola 2 litros",
        category: "bebida",
        price: 16.00,
        image: "assets/pepsi_2l.png",
        icon: "🍾",
        color: "#1565c0"
      },
      {
        id: "coca_lata",
        name: "COCA-COLA LATA",
        description: "Lata gelada de Coca-Cola Original 350ml",
        category: "bebida",
        price: 6.00,
        image: "assets/coca_lata.jpg",
        icon: "🥤",
        color: "#c62828"
      },
      {
        id: "coca_zero_lata",
        name: "COCA-COLA ZERO LATA",
        description: "Lata gelada de Coca-Cola Zero Açúcar 350ml",
        category: "bebida",
        price: 6.00,
        image: "assets/coca_zero_lata.jpg",
        icon: "⚫",
        color: "#212121"
      },
      {
        id: "coca_2l",
        name: "COCA-COLA 2L",
        description: "Garrafa gelada de Coca-Cola Original 2 litros",
        category: "bebida",
        price: 17.00,
        image: "assets/coca_2l.jpg",
        icon: "🥤",
        color: "#c62828"
      },
      {
        id: "coca_zero_2l",
        name: "COCA-COLA ZERO 2L",
        description: "Garrafa gelada de Coca-Cola Zero Açúcar 2 litros",
        category: "bebida",
        price: 17.00,
        image: "assets/coca_zero_2l.jpg",
        icon: "⚫",
        color: "#212121"
      },
      {
        id: "agua_500ml",
        name: "ÁGUA MINERAL",
        description: "Garrafa de água mineral sem gás 500ml",
        category: "bebida",
        price: 3.00,
        icon: "💧",
        color: "#0288d1"
      }
    ]
  },

  // ==========================================
  // 8. DEPOIMENTOS DE CLIENTES
  // ==========================================
  testimonials: [
    {
      name: "Mariana Santos",
      location: "Beira Rio • Itaiçaba - CE",
      text: "A melhor pizzaria da região! A pizza de Carne de Sol (Nordestina) é divina e a massa é super leve. O atendimento pelo WhatsApp é rápido e muito atencioso.",
      stars: 5
    },
    {
      name: "Carlos Eduardo",
      location: "Centro • Itaiçaba - CE",
      text: "Sempre peço a pizza Meio a Meio de Calabresa com Frango Catupiry. A pizza chega quentinha e no tempo combinado. Ingredientes de altíssima qualidade!",
      stars: 5
    },
    {
      name: "Beatriz Lima",
      location: "Itaiçaba - CE",
      text: "Ambiente muito aconchegante para ir com a família. Fizemos uma comemoração de aniversário lá e organizaram tudo com muito carinho. Nota 10!",
      stars: 5
    },
    {
      name: "Lucas Ferreira",
      location: "Beira Rio • Itaiçaba - CE",
      text: "A pizza Especial de Camarão é espetacular! Massa crocante por fora e macia por dentro. O espaço físico da pizzaria é maravilhoso e muito agradável.",
      stars: 5
    },
    {
      name: "Juliana Ramos",
      location: "Itaiçaba - CE",
      text: "Excelente custo-benefício e rapidez na entrega. A borda recheada de Catupiry original é o diferencial. Viramos clientes fiéis!",
      stars: 5
    }
  ]
};

// Tornar disponível globalmente no navegador e no Node (caso compilado)
if (typeof window !== 'undefined') {
  window.RESTAURANT_CONFIG = RESTAURANT_CONFIG;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = RESTAURANT_CONFIG;
}
