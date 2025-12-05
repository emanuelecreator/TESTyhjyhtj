import React, { useState } from 'react';
import { PizzaIcon, CartIcon, PlusIcon, XIcon, ChevronRightIcon } from './components/Icons';
import AIChef from './components/AIChef';
import { MENU_ITEMS } from './constants';
import { CartItem, Pizza } from './types';

const App = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'rossa' | 'bianca' | 'speciale'>('all');

  const addToCart = (pizza: Pizza) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === pizza.id);
      if (existing) {
        return prev.map(item => 
          item.id === pizza.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...pizza, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (pizzaId: string) => {
    setCart(prev => prev.filter(item => item.id !== pizzaId));
  };

  const updateQuantity = (pizzaId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === pizzaId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const filteredMenu = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const scrollToMenu = () => {
    const menuElement = document.getElementById('menu');
    menuElement?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAIRecommendation = (pizzaId: string) => {
    const pizza = MENU_ITEMS.find(p => p.id === pizzaId);
    if (pizza) {
      addToCart(pizza);
    }
  };

  return (
    <div className="min-h-screen font-sans">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="bg-pizza-red p-2 rounded-full text-white">
                <PizzaIcon className="w-6 h-6" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-pizza-dark">Vesuvio<span className="text-pizza-red">.AI</span></span>
            </div>
            
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors group"
            >
              <CartIcon className="w-7 h-7 text-gray-700 group-hover:text-pizza-red" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-pizza-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center transform scale-100 transition-transform">
                  {cart.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-20">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="h-[600px] w-full bg-cover bg-center relative" style={{ backgroundImage: 'url("https://picsum.photos/id/431/1920/1080")' }}>
          <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 max-w-4xl mx-auto">
            <span className="bg-pizza-red text-white px-4 py-1 rounded-full text-sm font-semibold tracking-wider uppercase mb-6 animate-pulse">
              Autentica Napoletana
            </span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Dove la tradizione incontra l'intelligenza.
            </h1>
            <p className="text-xl text-gray-100 mb-10 max-w-2xl drop-shadow-md">
              Ingredienti DOP, lievitazione di 48 ore e un pizzico di AI per suggerirti la pizza perfetta per il tuo umore.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToMenu}
                className="px-8 py-4 bg-pizza-red text-white font-bold rounded-full hover:bg-red-700 transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
              >
                Ordina Ora <ChevronRightIcon className="w-5 h-5"/>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* AI Chef Section */}
      <section className="py-16 bg-white px-4">
        <div className="max-w-4xl mx-auto -mt-24 relative z-30">
          <AIChef onRecommend={handleAIRecommendation} />
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-pizza-dark mb-4">Il Nostro Menu</h2>
          <div className="flex justify-center gap-4 overflow-x-auto pb-4 no-scrollbar">
            {['all', 'rossa', 'bianca', 'speciale'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`px-6 py-2 rounded-full text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  activeCategory === cat 
                    ? 'bg-pizza-dark text-white shadow-lg' 
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-pizza-dark'
                }`}
              >
                {cat === 'all' ? 'Tutte' : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMenu.map((pizza) => (
            <div key={pizza.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="relative overflow-hidden h-56">
                <img 
                  src={pizza.image} 
                  alt={pizza.name} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4">
                  {pizza.spicy && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full ml-1">Piccante</span>}
                  {pizza.vegetarian && <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full ml-1">Veg</span>}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-pizza-dark font-serif">{pizza.name}</h3>
                  <span className="text-xl font-bold text-pizza-red">€{pizza.price.toFixed(2)}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{pizza.description}</p>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pizza.ingredients.slice(0, 3).map((ing, i) => (
                      <span key={i} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{ing}</span>
                    ))}
                  </div>
                  <button 
                    onClick={() => addToCart(pizza)}
                    className="w-full py-3 bg-pizza-cream text-pizza-dark font-bold rounded-xl hover:bg-pizza-dark hover:text-white transition-colors flex items-center justify-center gap-2 group-hover:bg-pizza-red group-hover:text-white"
                  >
                    <PlusIcon className="w-5 h-5" /> Aggiungi
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Drawer */}
      {isCartOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-50 transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white z-[60] shadow-2xl transform transition-transform duration-300 flex flex-col">
            <div className="p-6 flex justify-between items-center border-b border-gray-100 bg-pizza-cream">
              <h2 className="text-2xl font-serif font-bold text-pizza-dark">Il tuo ordine</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-white rounded-full transition-colors"
              >
                <XIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
                  <CartIcon className="w-16 h-16 opacity-20" />
                  <p>Il carrello è vuoto</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="text-pizza-red font-semibold hover:underline"
                  >
                    Torna al menu
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-bold text-pizza-dark">{item.name}</h4>
                        <p className="text-pizza-red font-semibold">€{(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >-</button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >+</button>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="ml-auto text-xs text-gray-400 hover:text-red-500 underline"
                          >
                            Rimuovi
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-center mb-4 text-lg font-bold text-pizza-dark">
                  <span>Totale</span>
                  <span>€{cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-colors shadow-lg">
                  Procedi al pagamento
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* Footer */}
      <footer className="bg-pizza-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <PizzaIcon className="w-8 h-8 text-pizza-red" />
            <span className="font-serif font-bold text-2xl">Vesuvio<span className="text-pizza-red">.AI</span></span>
          </div>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            La vera pizza napoletana, consegnata con il sorriso e potenziata dalla tecnologia.
          </p>
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} Pizzeria Vesuvio AI. Tutti i diritti riservati.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;