export interface Pizza {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'rossa' | 'bianca' | 'speciale';
  ingredients: string[];
  spicy: boolean;
  vegetarian: boolean;
}

export interface CartItem extends Pizza {
  quantity: number;
}

export interface AIRecommendation {
  recommendedPizzaId: string;
  reasoning: string;
  pairingSuggestion: string;
}
