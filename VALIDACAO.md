# Revisão de responsividade — AnaCraft

## Verificações realizadas

A revisão foi validada no Chromium com larguras de 320, 375, 390, 768, 1024 e 1440 px. Os testes de celular usaram viewport e toque emulados.

Foram conferidas seis páginas em cada largura: home, catálogo, produto, sobre, checkout vazio e página de endereço inexistente. As 36 verificações passaram sem rolagem horizontal indevida, imagem quebrada ou erro de JavaScript.

Os três slides, o carrinho e os favoritos também foram abertos nas seis larguras. O checkout preenchido e a confirmação foram conferidos nessas mesmas larguras.

## Fluxos conferidos

- Abrir e fechar o menu mobile, inclusive por Escape.
- Buscar por Enter e abrir os resultados no catálogo.
- Abrir o catálogo pelo botão do carrossel.
- Filtrar produtos por categoria.
- Impedir a inclusão de produtos sem personalizações obrigatórias.
- Preservar a quantidade mínima na página e no carrinho.
- Manter itens com personalizações diferentes separados.
- Persistir carrinho e favoritos após recarregar.
- Fechar os painéis por Escape e devolver o foco ao botão que os abriu.
- Manter a navegação por Tab dentro do painel aberto.
- Bloquear a rolagem do fundo enquanto o painel está aberto.
- Preencher o checkout, confirmar a simulação e limpar o carrinho.
- Reiniciar quantidade e personalização ao abrir outro produto.
- Recuperar a aplicação quando há conteúdo inválido no LocalStorage.
- Usar o menu com celular na horizontal.
- Acessar campos com viewport reduzido, simulando o espaço ocupado pelo teclado.
- Trocar e pausar os slides automaticamente.

O build de produção e o lint foram executados com sucesso.

## Imagens

A pasta de imagens passou de 36.122.822 bytes para aproximadamente 2,2 milhões de bytes, uma redução de cerca de 94%. Os banners do desktop têm entre 180 e 242 KB; a imagem mobile tem aproximadamente 120 KB. Todos os arquivos WebP foram conferidos com decodificação completa.

As variantes pequenas dos produtos são usadas nos cards. Imagens secundárias carregam sob demanda. As fontes são servidas pela aplicação.

## Limites da conferência

A inspeção visual incluiu capturas de home em celular e desktop, catálogo, página de produto, checkout e slides. Os testes automatizados usaram os arquivos do build com requisições atendidas localmente pelo navegador de teste.

Não foi realizado teste em um aparelho físico, no Safari ou em uma conexão móvel real. O teclado foi simulado pela redução do viewport; não foi aberto um teclado virtual de sistema operacional. A regra de rotas da Vercel foi incluída, mas não foi realizado deploy nesta revisão.

O checkout continua sendo uma demonstração front-end, sem pagamentos ou envio real de encomendas.
