const MENU_DATA = {
  restaurantName: "RESTAURANTE E PIZZARIA ARTE & DELÍCIA",
  phoneWhatsApp: "5588993345987",
  contactName: "Simonny",
  sizes: [
    { key: "P", label: "Pequena (4 fatias)" },
    { key: "M", label: "Média (6 fatias)" },
    { key: "G", label: "Grande (8 fatias)" },
    { key: "GG", label: "Gigante (12 fatias)" }
  ],
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
  pizzasDoces: [
    {
      id: "banana_canela",
      name: "BANANA COM CANELA",
      ingredients: "Fatias de Banana Selecionadas, Queijo Mussarela ou Creme Especial, Canela Salpicada e Açúcar",
      category: "doce",
      prices: { P: 20.00, M: 30.00, G: 40.00 },
      image: "assets/banana_canela.jpg"
    },
    {
      id: "chocolate_mm",
      name: "CHOCOLATE C/ M&M E LEITE CONDENSADO",
      ingredients: "Base de Chocolate ao Leite Cremoso, Confeitos de M&Ms Coloridos e Cobertura de Leite Condensado",
      category: "doce",
      prices: { P: 25.00, M: 35.00, G: 45.00 },
      image: "assets/chocolate_mm.jpg"
    }
  ],
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
};
