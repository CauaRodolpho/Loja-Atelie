Markdown
# 🌸 AnaCraft Ateliê — E-Commerce de Produtos Artesanais Personalizados

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

> **Projeto de Portfólio Front-End** focado em proporcionar uma experiência de compra moderna, responsiva e intuitiva para um ateliê de mimos e papelaria personalizada.

---

## 📌 Visão Geral

O **AnaCraft Ateliê** é uma aplicação web (Single Page Application) desenvolvida para simular o fluxo completo de um e-commerce artesanal. 

O maior desafio técnico do projeto foi gerenciar a **alta variação de personalização dos produtos** (como gravação de nomes, frases e escolha de acabamentos) dentro do estado global da aplicação, permitindo que o mesmo produto possa ser adicionado ao carrinho múltiplas vezes com personalizações diferentes sem sobrescrever os itens existentes.

---

## ✨ Principais Funcionalidades

- 🔍 **Busca Instantânea no Header:** Pesquisa dinâmica em tempo real com dropdown de resultados e navegação direta para o produto.
- 🛍️ **Carrinho de Compras Inteligente (`CartDrawer`):**
  - Gerenciamento de estado global com React Context API.
  - Agrupamento de produtos com base em chaves únicas de personalização.
  - Persistência dos dados no `localStorage`.
- ❤️ **Lista de Favoritos (`FavoritesDrawer`):**
  - Adição/remoção de produtos aos favoritos a partir de qualquer página.
  - Contadores com badges sincronizados no Header.
- 🛣️ **Rotas Dinâmicas (`/produto/:productId`):**
  - Página de detalhes dinâmica com seleção de quantidades e campos customizáveis por produto.
- 💳 **Fluxo de Checkout Simulado:**
  - Formulário completo para dados do cliente e endereço de entrega.
  - Redirecionamento para uma página de confirmação de pedido personalizada.
- 📄 **Página de Sucesso & Documentação Técnica (`/pedido-confirmado`):**
  - Apresenta o resumo do pedido do cliente e funciona como uma vitrine/README técnico interativo.

---

## 🛠️ Tech Stack & Bibliotecas

- **Core:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Roteamento:** [React Router DOM v6](https://reactrouter.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Gerenciamento de Estado:** React Context API + LocalStorage

---

## 📂 Estrutura de Pastas

```text
src/
 ├── assets/          # Logos e recursos estáticos de imagem
 ├── components/      # Componentes reutilizáveis (CartDrawer, FavoritesDrawer, etc.)
 ├── context/         # Contextos globais (CartContext, FavoritesContext)
 ├── data/            # Mocks de dados (catálogo de produtos)
 ├── layout/          # Estruturas da página (Header, Hero, Categories, Footer)
 ├── pages/           # Páginas da aplicação (Home, ProductDetailPage, CheckoutPage, etc.)
 ├── types/           # Interfaces TypeScript (Product, CartItem, CustomizationOption)
 ├── App.tsx          # Configuração de rotas e providers globais
 └── main.tsx         # Ponto de entrada da aplicação
🚀 Como Executar o Projeto Localmente
Pré-requisitos
Certifica-te de ter o Node.js instalado na tua máquina.

Passo a passo
Clona este repositório:

Bash
git clone [https://github.com/teu-usuario/anacraft-atelie.git](https://github.com/teu-usuario/anacraft-atelie.git)
Acede à pasta do projeto:

Bash
cd anacraft-atelie
Instala as dependências:

Bash
npm install
Inicia o servidor de desenvolvimento:

Bash
npm run dev
Abra o teu navegador em http://localhost:5173 para visualizar a aplicação.

🛡️ Licença e Nota Legal
Este é um projeto de demonstração desenvolvido estritamente para fins de portfólio de desenvolvimento web. Nenhuma transação financeira real é processada e nenhum produto comercializado é entregue.

Desenvolvido com 🌸 por [Seu Nome]


<FollowUp label="Quer que eu adicione links diretos para o teu GitHub/LinkedIn no arquivo?"