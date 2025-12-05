import { Pizza } from './types';

export const MENU_ITEMS: Pizza[] = [
  {
    id: 'margherita',
    name: 'Margherita DOP',
    description: 'La regina delle pizze. Pomodoro San Marzano, Mozzarella di Bufala, Basilico fresco.',
    price: 8.50,
    image: 'https://picsum.photos/id/1080/400/300',
    category: 'rossa',
    ingredients: ['Pomodoro', 'Mozzarella di Bufala', 'Basilico', 'Olio EVO'],
    spicy: false,
    vegetarian: true
  },
  {
    id: 'diavola',
    name: 'Diavola Vesuviana',
    description: 'Per chi ama il piccante. Salame piccante napoletano e peperoncino fresco.',
    price: 10.00,
    image: 'https://picsum.photos/id/1062/400/300',
    category: 'rossa',
    ingredients: ['Pomodoro', 'Fior di latte', 'Salame piccante', 'Peperoncino'],
    spicy: true,
    vegetarian: false
  },
  {
    id: 'quattro_formaggi',
    name: '4 Formaggi',
    description: 'Un trionfo di formaggi italiani selezionati.',
    price: 11.50,
    image: 'https://picsum.photos/id/1025/400/300',
    category: 'bianca',
    ingredients: ['Fior di latte', 'Gorgonzola', 'Fontina', 'Parmigiano Reggiano'],
    spicy: false,
    vegetarian: true
  },
  {
    id: 'capricciosa',
    name: 'Capricciosa',
    description: 'Un classico ricco di sapori autunnali.',
    price: 12.00,
    image: 'https://picsum.photos/id/292/400/300',
    category: 'rossa',
    ingredients: ['Pomodoro', 'Mozzarella', 'Carciofi', 'Prosciutto Cotto', 'Funghi', 'Olive'],
    spicy: false,
    vegetarian: false
  },
  {
    id: 'tartufata',
    name: 'Tartufata Reale',
    description: 'Crema di tartufo nero e salsiccia di Norcia.',
    price: 14.00,
    image: 'https://picsum.photos/id/195/400/300',
    category: 'speciale',
    ingredients: ['Crema di Tartufo', 'Mozzarella', 'Salsiccia', 'Prezzemolo'],
    spicy: false,
    vegetarian: false
  },
  {
    id: 'ortolana',
    name: 'Ortolana Fresca',
    description: 'Verdure di stagione grigliate su base bianca.',
    price: 9.50,
    image: 'https://picsum.photos/id/225/400/300',
    category: 'bianca',
    ingredients: ['Mozzarella', 'Zucchine', 'Melanzane', 'Peperoni', 'Pomodorini'],
    spicy: false,
    vegetarian: true
  }
];
