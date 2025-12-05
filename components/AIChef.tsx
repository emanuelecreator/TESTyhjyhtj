import React, { useState } from 'react';
import { SendIcon, SparklesIcon } from './Icons';
import { getPizzaRecommendation } from '../services/geminiService';
import { AIRecommendation } from '../types';
import { MENU_ITEMS } from '../constants';

interface AIChefProps {
  onRecommend: (pizzaId: string) => void;
}

const AIChef: React.FC<AIChefProps> = ({ onRecommend }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<AIRecommendation | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setRecommendation(null);
    
    const result = await getPizzaRecommendation(input);
    setRecommendation(result);
    setLoading(false);
  };

  const recommendedPizza = recommendation 
    ? MENU_ITEMS.find(p => p.id === recommendation.recommendedPizzaId) 
    : null;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-amber-200">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-amber-100 p-2 rounded-full text-amber-600">
          <SparklesIcon className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-gray-800">Chef AI: Cosa ti va oggi?</h2>
      </div>
      
      <p className="text-gray-600 mb-6">
        Non sai cosa scegliere? Dimmi cosa ti piace (es. "Qualcosa di leggero", "Adoro i funghi", "Voglio qualcosa di piccante") e ti consiglierò la pizza perfetta.
      </p>

      <form onSubmit={handleSubmit} className="relative mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Es: Ho molta fame e mi piace il piccante..."
          className="w-full pl-4 pr-12 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-pizza-red focus:border-transparent outline-none transition-all"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 top-2 p-2 bg-pizza-red text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <SendIcon className="w-5 h-5" />
          )}
        </button>
      </form>

      {recommendation && recommendedPizza && (
        <div className="bg-amber-50 rounded-xl p-6 animate-fade-in border border-amber-100">
          <div className="md:flex gap-6 items-center">
            <img 
              src={recommendedPizza.image} 
              alt={recommendedPizza.name} 
              className="w-full md:w-32 h-32 object-cover rounded-lg shadow-md mb-4 md:mb-0"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-pizza-dark mb-2">
                Ti consiglio: <span className="text-pizza-red">{recommendedPizza.name}</span>
              </h3>
              <p className="text-gray-700 italic mb-3">"{recommendation.reasoning}"</p>
              <div className="text-sm font-semibold text-amber-800 bg-amber-200 inline-block px-3 py-1 rounded-full mb-4">
                🍷 {recommendation.pairingSuggestion}
              </div>
              <div>
                <button
                  onClick={() => onRecommend(recommendedPizza.id)}
                  className="bg-pizza-dark text-white px-6 py-2 rounded-full hover:bg-black transition-colors text-sm font-semibold"
                >
                  Ordina questa Pizza
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChef;