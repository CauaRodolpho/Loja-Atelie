import type { Product } from '../types';

// Importação dos Ícones das Categorias
import acessoriosImage from '../assets/icons/acessorios.png';
import adesivosImage from '../assets/icons/personalizado.png';
import canecasImage from '../assets/icons/canecas.png';
import decoracaoImage from '../assets/icons/decoracao.png';
import papelariaImage from '../assets/icons/papelaria.png';

// Importação das Imagens dos Produtos Reais
import acessorio1 from '../assets/itens/acessorio1.png';
import acessorio2 from '../assets/itens/acessorio2.png';
import adesivo1 from '../assets/itens/adesivo1.png';
import adesivo2 from '../assets/itens/adesivo2.png';
import caneca1 from '../assets/itens/caneca1.png';
import caneca2 from '../assets/itens/caneca2.png';
import ima1 from '../assets/itens/ima1.png';
import ima2 from '../assets/itens/ima2.png';
import papelaria1 from '../assets/itens/papelaria1.png';
import papelaria2 from '../assets/itens/papelaria2.png';

export const PRODUCTS: Product[] = [
  // 1. ACESSÓRIOS (2 itens)
  {
    productId: 'kit-acessorios-mimo-rosa',
    name: 'Kit Acessórios Fofos Mimo Rosa Pastel',
    description: 'Conjunto artesanal completo composto por 3 presilhas decoradas para cabelo, scrunchie aveludado em tom rosa, pulseira delicada de pérolas e chaveiro exclusivo AnaCraft.',
    price: 38.90,
    category: 'acessorios',
    imageUrl: acessorio1,
    minQuantity: 1,
    productionsDays: 3,
    customizationOptions: [
      {
        id: 'nome_chaveiro',
        label: 'Nome para a Tag do Chaveiro/Caixa',
        type: 'text',
        required: true,
      },
      {
        id: 'tamanho_pulseira',
        label: 'Tamanho da Pulseira',
        type: 'select',
        required: true,
        options: ['Infantil', 'Adulto'],
      },
      {
        id: 'caixa_presente',
        label: 'Caixinha de Presente',
        type: 'select',
        required: true,
        options: ['Com Caixinha Rosa Personalizada', 'Sem Caixinha'],
      },
    ],
  },
  {
    productId: 'kit-acessorios-mimo-azul',
    name: 'Kit Acessórios Fofos Mimo Azul Bebê',
    description: 'Conjunto artesanal completo composto por 3 presilhas decoradas para cabelo, scrunchie aveludado em tom azul bebê, pulseira delicada de pérolas e chaveiro exclusivo AnaCraft.',
    price: 38.90,
    category: 'acessorios',
    imageUrl: acessorio2,
    minQuantity: 1,
    productionsDays: 3,
    customizationOptions: [
      {
        id: 'nome_chaveiro',
        label: 'Nome para a Tag do Chaveiro/Caixa',
        type: 'text',
        required: true,
      },
      {
        id: 'tamanho_pulseira',
        label: 'Tamanho da Pulseira',
        type: 'select',
        required: true,
        options: ['Infantil', 'Adulto'],
      },
      {
        id: 'caixa_presente',
        label: 'Caixinha de Presente',
        type: 'select',
        required: true,
        options: ['Com Caixinha Azul Personalizada', 'Sem Caixinha'],
      },
    ],
  },

  // 2. ADESIVOS (2 itens)
  {
    productId: 'adesivos-redondos-lacres',
    name: 'Adesivos Redondos Personalizados com Sua Logo (Lacres)',
    description: 'Adesivos em papel fotográfico brilhante à prova d\'água, ideais para fechar sacolas, caixas e mimos com a sua marca ou mensagem fofa.',
    price: 15.00,
    category: 'adesivos',
    imageUrl: adesivo1,
    minQuantity: 1,
    productionsDays: 2,
    customizationOptions: [
      {
        id: 'nome_marca',
        label: 'Nome da Marca / Logotipo',
        type: 'text',
        required: true,
      },
      {
        id: 'tamanho_adesivo',
        label: 'Tamanho do Adesivo',
        type: 'select',
        required: true,
        options: ['2 cm', '3 cm', '3,5 cm', '4 cm', '5 cm'],
      },
      {
        id: 'arte_ilustracao',
        label: 'Ilustração do Lacre',
        type: 'select',
        required: true,
        options: ['Laço Rosa', 'Laço Azul', 'Floral Lilás', 'Coração'],
      },
    ],
  },
  {
    productId: 'kit-papelaria-unboxing',
    name: 'Kit Papelaria Unboxing (Cartões de Agradecimento + Adesivos)',
    description: 'O combo perfeito para encantar seus clientes na hora do envio! Inclui cartões de agradecimento personalizados com seu Instagram, QR Code e WhatsApp, além dos adesivos de fechamento.',
    price: 45.00,
    category: 'adesivos',
    imageUrl: adesivo2,
    minQuantity: 1,
    productionsDays: 3,
    customizationOptions: [
      {
        id: 'nome_atelie',
        label: 'Nome do Ateliê / Marca',
        type: 'text',
        required: true,
      },
      {
        id: 'redes_sociais',
        label: 'Instagram e WhatsApp para o Cartão',
        type: 'text',
        required: true,
      },
      {
        id: 'cor_tema',
        label: 'Cor do Tema do Kit',
        type: 'select',
        required: true,
        options: ['Rosa Delicado', 'Azul Bebê', 'Lilás', 'Misto'],
      },
    ],
  },

  // 3. CANECAS (2 itens)
  {
    productId: 'caneca-gravata-gola',
    name: 'Caneca Temática Gravata & Gola em Relevo',
    description: 'Caneca de cerâmica com design exclusivo trazendo gola em relevo e aplicação de gravata. Ideal para presentear em datas comemorativas com elegância e carinho.',
    price: 49.90,
    category: 'canecas',
    imageUrl: caneca1,
    minQuantity: 1,
    productionsDays: 3,
    customizationOptions: [
      {
        id: 'nome_verso',
        label: 'Nome para o Verso/Caixa',
        type: 'text',
        required: true,
      },
      {
        id: 'cor_gravata',
        label: 'Cor da Gravata/Caneca',
        type: 'select',
        required: true,
        options: ['Azul Executivo', 'Preto Clássico', 'Vinho', 'Rosa'],
      },
      {
        id: 'caixinha_presente',
        label: 'Acompanha Caixinha Presenteável',
        type: 'select',
        required: true,
        options: ['Com Caixinha de Laço', 'Sem Caixinha'],
      },
    ],
  },
  {
    productId: 'caneca-costura-amor',
    name: 'Caneca Ilustrada "Costurar é Transformar Tecido em Amor"',
    description: 'Caneca em cerâmica de alta gramatura com interior e alça coloridos, ilustrada com elementos fofos de costura e artesanato.',
    price: 45.90,
    category: 'canecas',
    imageUrl: caneca2,
    minQuantity: 1,
    productionsDays: 3,
    customizationOptions: [
      {
        id: 'nome_caneca',
        label: 'Nome a Personalizar na Caneca',
        type: 'text',
        required: true,
      },
      {
        id: 'cor_alca',
        label: 'Cor da Alça e Interior',
        type: 'select',
        required: true,
        options: ['Azul Bebê', 'Rosa Chiclete', 'Lilás', 'Branco'],
      },
      {
        id: 'frase_verso',
        label: 'Frase do Verso',
        type: 'select',
        required: true,
        options: ['Frase Padrão', 'Frase Personalizada'],
      },
    ],
  },

  // 4. DECORAÇÃO (2 itens)
  {
    productId: 'ima-resinado-rosa',
    name: 'Ímã de Frigorífico Resinado Mimo Rosa Floral',
    description: 'Ímã decorativo de frigorífico em alto-relevo com camada resinada de alta durabilidade, cantos arredondados e detalhes em tom rosa floral.',
    price: 8.50,
    category: 'decoracao',
    imageUrl: ima1,
    minQuantity: 1,
    productionsDays: 2,
    customizationOptions: [
      {
        id: 'texto_ima',
        label: 'Nome ou Texto a Ser Gravado',
        type: 'text',
        required: true,
      },
      {
        id: 'estilo_ilustracao',
        label: 'Estilo da Ilustração',
        type: 'select',
        required: true,
        options: ['Florzinhas e Coração', 'Apenas Nome'],
      },
      {
        id: 'embalagem_presente',
        label: 'Embalagem para Presente',
        type: 'select',
        required: true,
        options: ['Com Cartãozinho e Saco de Cetim', 'Padrão'],
      },
    ],
  },
  {
    productId: 'ima-resinado-azul',
    name: 'Ímã de Frigorífico Resinado Azul Bebê com Laço',
    description: 'Ímã decorativo de frigorífico em alto-relevo com camada resinada brilhante, acabamento premium e ilustração de laço e flores em tom azul.',
    price: 8.50,
    category: 'decoracao',
    imageUrl: ima2,
    minQuantity: 1,
    productionsDays: 2,
    customizationOptions: [
      {
        id: 'texto_ima',
        label: 'Nome ou Texto a Ser Gravado',
        type: 'text',
        required: true,
      },
      {
        id: 'estilo_ilustracao',
        label: 'Estilo da Ilustração',
        type: 'select',
        required: true,
        options: ['Laço e Florzinhas', 'Apenas Nome'],
      },
      {
        id: 'embalagem_presente',
        label: 'Embalagem para Presente',
        type: 'select',
        required: true,
        options: ['Com Cartãozinho e Saco de Cetim', 'Padrão'],
      },
    ],
  },

  // 5. PAPELARIA (2 itens)
  {
    productId: 'cartao-agradecimento-qr',
    name: 'Cartão de Agradecimento Personalizado com QR Code (Cento)',
    description: 'Cartões em papel offset/couché de alta gramatura com impressão frente e verso. Frente com ilustração dos seus produtos e verso com seus contactos, Instagram e lista de serviços.',
    price: 35.00,
    category: 'papelaria',
    imageUrl: papelaria1,
    minQuantity: 1,
    productionsDays: 4,
    customizationOptions: [
      {
        id: 'nome_atelie',
        label: 'Nome da Marca / Ateliê',
        type: 'text',
        required: true,
      },
      {
        id: 'contactos',
        label: 'Instagram e WhatsApp',
        type: 'text',
        required: true,
      },
      {
        id: 'frase_extra',
        label: 'Chave Pix ou Frase Especial',
        type: 'text',
        required: false,
      },
    ],
  },
  {
    productId: 'sacola-papel-mimos',
    name: 'Sacola Personalizada Mimos de Festa com Ilustração',
    description: 'Sacola em papel reforçado com alça, personalizada no tema do seu ateliê ou festa, com ilustrações exclusivas, padrão xadrez lateral e acabamento acetinado.',
    price: 6.90,
    category: 'papelaria',
    imageUrl: papelaria2,
    minQuantity: 5,
    productionsDays: 5,
    customizationOptions: [
      {
        id: 'nome_tema',
        label: 'Nome / Tema para Impressão',
        type: 'text',
        required: true,
      },
      {
        id: 'cor_predominante',
        label: 'Tom de Cor Predominante',
        type: 'select',
        required: true,
        options: ['Rosa Mimo', 'Azul Bebê', 'Lilás', 'Bege Pastel'],
      },
      {
        id: 'quantidade_kit',
        label: 'Quantidade de Sacolas',
        type: 'select',
        required: true,
        options: ['Kit 5 Unidades', 'Kit 10 Unidades', 'Kit 25 Unidades', 'Kit 50 Unidades'],
      },
    ],
  },
];

export const CATEGORY_ICONS = {
  acessorios: { image: acessoriosImage, title: 'Acessórios' },
  adesivos: { image: adesivosImage, title: 'Adesivos' },
  canecas: { image: canecasImage, title: 'Canecas' },
  decoracao: { image: decoracaoImage, title: 'Decoração' },
  papelaria: { image: papelariaImage, title: 'Papelaria' },
};