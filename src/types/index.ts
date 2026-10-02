interface CustomizationOption {
  id: string;
  label: string;
  type: "image" | "text" | "color" | "select";
  required: boolean;
  options?: string[]; // Para o tipo 'select'
}

interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  imageUrlSmall?: string;
  minQuantity: number;
  productionsDays: number;
  customizationOptions: CustomizationOption[];
  material?: string;
  dimensions?: string;
  productionTime?: string;
  careInstructions?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  customValues: { [key: string]: string }; // Armazena os valores personalizados para cada opção
  photoUrl: string; // URL da foto personalizada
  totalPrice: number; // Preço total do item (quantidade * preço do produto)
}

interface HeroSlide {
  id: string;
  badgeText: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  imagePosition: 'left' | 'right';
  // Propriedades de Estilização:
  bgColor: string;        // Ex: 'bg-pink-50' ou 'bg-amber-50'
  badgeBg: string;        // Ex: 'bg-[#FF6987]'
  buttonBg: string;       // Ex: 'bg-[#FF6987] hover:bg-pink-600'
  titleColor: string;     // Ex: 'text-gray-800'
}


export type { Product, CustomizationOption, CartItem, HeroSlide, };

export interface OrderDetails {
  orderNumber: string;
  cart: CartItem[];
  subtotal: number;
  deliveryMethod: 'delivery' | 'pickup';
  formData: {
    name: string;
    phone: string;
    cep: string;
    address: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    observations: string;
  };
}
