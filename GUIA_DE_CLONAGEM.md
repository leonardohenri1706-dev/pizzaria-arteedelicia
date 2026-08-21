# 🚀 GUIA DE CLONAGEM RÁPIDA (EM 10 MINUTOS)
## Como personalizar e vender este sistema para novos clientes

Este sistema foi 100% parametrizado. Isso significa que **você NÃO precisa mexer em nenhuma linha de código HTML, CSS ou JavaScript do layout** para criar um novo site para uma pizzaria, restaurante ou lanchonete.

Toda a personalização é feita em **um único arquivo**: [`config.js`](file:///c:/Users/Windows11/pizzaria/config.js) (ou [`config/restaurant.json`](file:///c:/Users/Windows11/pizzaria/config/restaurant.json)).

---

## ⏱️ Passo a Passo de 10 Minutos

### 1. Nome do Estabelecimento e Identidade (`brand`)
Abra o [`config.js`](file:///c:/Users/Windows11/pizzaria/config.js) e altere a seção `brand`:
```javascript
brand: {
  name: "PIZZARIA BELLA NAPOLI",                 // Nome oficial
  shortName: "BELLA NAPOLI",                    // Nome curto para a logo
  subTitle: "Forno a Lenha & Delivery",         // Subtítulo
  ownerOrContactPerson: "Carlos",               // Atendente / Dono
  topBannerText: "✨ Mais de 8 anos servindo as melhores pizzas da cidade!",
  // ... textos de "Sobre Nós" e SEO
}
```

### 2. Logotipo e Imagens (`media` e pasta `assets/`)
1. Coloque a logo do novo cliente em `assets/logo.png` (ou informe o caminho em `media.logo`).
2. Se tiver imagem de destaque, coloque em `assets/` e aponte no `media.heroImage`.
3. Se tiver vídeo do espaço, configure em `media.aboutVideo`.

### 3. WhatsApp e Dados de Contato (`contact`)
Configure o número do WhatsApp que receberá os pedidos gerados:
```javascript
contact: {
  phoneWhatsApp: "5511999998888",              // DDI + DDD + Número (sem espaços ou traços)
  phoneDisplay: "(11) 99999-8888",             // Formato visual para o site
  address: "Av. Paulista, 1000 - Bela Vista",  // Endereço
  workingHours: "Terça a Domingo das 18h às 23h30"
}
```

### 4. Paleta de Cores / Tema (`theme.colors`)
Altere as cores principais para combinar com a identidade visual do cliente. O sistema atualiza automaticamente todas as variáveis CSS do site:
```javascript
theme: {
  colors: {
    primaryRed: "#e63946",       // Cor primária de destaque e botões
    primaryRedHover: "#c1121f",  // Cor ao passar o mouse
    accentGold: "#ffb703",       // Cor secundária de detalhes e estrelas
    bgDark: "#121212"            // Cor de fundo do site
  }
}
```

#### 🎨 Sugestões de Paletas Prontas:
* **Pizzaria Clássica / Italiana:** `primaryRed: "#c92a2a"`, `accentGold: "#e5a93c"`
* **Hamburgueria Artesanal / Rústica:** `primaryRed: "#d97706"` (laranja), `accentGold: "#f59e0b"`
* **Sushi / Oriental Sofisticado:** `primaryRed: "#dc2626"`, `accentGold: "#ca8a04"`, `bgDark: "#050505"`
* **Alimentação Saudável / Fit:** `primaryRed: "#16a34a"` (verde esmeralda), `accentGold: "#84cc16"`

---

### 5. Regiões de Entrega e Taxas de Frete (`delivery.regions`)
Adicione ou edite os bairros e taxas de frete da cidade do cliente:
```javascript
delivery: {
  coverageAlertText: "Entregamos no Centro e bairros vizinhos.",
  defaultFreeLabel: "Grátis (Centro)",
  regions: [
    {
      id: "centro",
      name: "📍 Centro / Bairros Próximos — Entrega Grátis",
      shortLabel: "Centro",
      fee: 0.00,
      keywords: ["centro", "vila nova", "matriz"]
    },
    {
      id: "zona_sul",
      name: "🛵 Zona Sul / Bairros Afastados — Taxa de R$ 5,00",
      shortLabel: "Zona Sul",
      fee: 5.00,
      keywords: ["sul", "parque", "jardim"]
    }
  ]
}
```
> O sistema detecta automaticamente o bairro digitado pelo cliente no checkout com base nas `keywords` e calcula a taxa em tempo real!

---

### 6. Cardápio Completo (`menu`)
Edite a lista de pizzas (`pizzasClassicas`, `pizzasEspeciais`, `pizzasDoces`) e `bebidas`.

Exemplo de pizza com preços por tamanho:
```javascript
{
  id: "calabresa_especial",
  name: "CALABRESA ESPECIAL",
  ingredients: "Molho artesanal, mussarela, calabresa fatiada, cebola roxa e azeitonas",
  category: "classica",
  prices: { P: 25.00, M: 35.00, G: 45.00, GG: 68.00 },
  image: "assets/calabresa.jpg"
}
```

Exemplo de bebida:
```javascript
{
  id: "coca_2l",
  name: "COCA-COLA 2L",
  description: "Garrafa gelada de 2 litros",
  category: "bebida",
  price: 16.00,
  image: "assets/coca_2l.jpg"
}
```

---

### 7. Banco de Dados Supabase Opcional (`supabase`)
Se o cliente quiser salvar os clientes e pedidos no banco de dados:
```javascript
supabase: {
  enabled: true,
  url: "https://SEU-PROJETO.supabase.co",
  anonKey: "SUA-ANON-KEY"
}
```
Se não for utilizar, basta alterar para `enabled: false`. O pedido continuará funcionando 100% pelo WhatsApp!

---

## 🚀 Como Publicar em 1 Minuto

1. **Vercel / Netlify / GitHub Pages:**
   - Basta arrastar a pasta ou subir o repositório git. Não requer build (`npm run build`), funciona como site estático ultra-rápido.
2. **Hospedagem cPanel / Apache / Nginx:**
   - Envie os arquivos para a pasta `public_html`.
3. Pronto! O site estará no ar e pronto para receber pedidos no WhatsApp do seu cliente.
