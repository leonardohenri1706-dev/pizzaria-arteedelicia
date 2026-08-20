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
      ingredients: "Molho, Mussarela, Calabresa, Tomate, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
      image: "assets/calabresa.jpg"
    },
    {
      id: "frango",
      name: "FRANGO",
      ingredients: "Molho, Mussarela, Frango, Tomate, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
      image: "assets/hero.jpg"
    },
    {
      id: "portuguesa",
      name: "PORTUGUESA",
      ingredients: "Molho, Mussarela, Presunto, Ovo, Tomate, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
      image: "assets/portuguesa.jpg"
    },
    {
      id: "mussarela",
      name: "MUSSARELA",
      ingredients: "Molho Especial, Farta Camada de Queijo Mussarela, Tomate, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 20.00, M: 27.00, G: 33.00, GG: 55.00 },
      image: "assets/mussarela.jpg"
    },
    {
      id: "mista",
      name: "MISTA",
      ingredients: "Molho, Mussarela, Presunto, Tomate, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 21.00, M: 28.00, G: 35.00, GG: 58.00 },
      image: "assets/mista.jpg"
    },
    {
      id: "o_delicia",
      name: "Ó DELÍCIA",
      ingredients: "Molho, Mussarela, Presunto, Batata Palha, Cebola, Tomate, Azeitona e Orégano",
      category: "classica",
      prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
      image: "assets/a_moda_da_casa.jpg"
    },
    {
      id: "marguerita",
      name: "MARGUERITA",
      ingredients: "Molho, Mussarela, Tomate, Manjericão, Cebola, Azeitona e Orégano",
      category: "classica",
      prices: { P: 22.00, M: 29.00, G: 36.00, GG: 60.00 },
      image: "assets/marguerita.jpg"
    }
  ],
  pizzasEspeciais: [
    {
      id: "nordestina",
      name: "NORDESTINA",
      ingredients: "Molho, Mussarela, Carne Do Sol, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 22.00, M: 34.00, G: 40.00, GG: 65.00 },
      image: "assets/nordestina.jpg"
    },
    {
      id: "calabresa_cheddar_catupiry",
      name: "CALABRESA C/ CHEDDAR OU CATUPIRY",
      ingredients: "Molho, Mussarela, Calabresa, Cheddar ou Catupiry, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
      image: "assets/calabresa.jpg"
    },
    {
      id: "a_moda_da_casa",
      name: "A MODA DA CASA",
      ingredients: "Molho, Mussarela, Calabresa, Presunto, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 22.00, M: 34.00, G: 40.00, GG: 65.00 },
      image: "assets/a_moda_da_casa.jpg"
    },
    {
      id: "frango_catupiry",
      name: "FRANGO CATUPIRY",
      ingredients: "Molho, Mussarela, Frango, Catupiry, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
      image: "assets/frango_catupiry.jpg"
    },
    {
      id: "4_queijos",
      name: "4 QUEIJOS",
      ingredients: "Molho, Mussarela, Qualho, Catupiry, Cheddar, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 22.00, M: 32.00, G: 38.00, GG: 63.00 },
      image: "assets/quatro_queijos.jpg"
    },
    {
      id: "franbacon",
      name: "FRANBACON",
      ingredients: "Molho, Mussarela, Frango, Bacon, Tomate, Cebola, Azeitona e Orégano",
      category: "especial",
      prices: { P: 23.00, M: 33.00, G: 40.00, GG: 65.00 },
      image: "assets/frango_catupiry.jpg"
    },
    {
      id: "camarao",
      name: "CAMARÃO",
      ingredients: "Molho, Mussarela, Camarão, Tomate, Cebola, Azeitona e Orégano",
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
  ]
};
