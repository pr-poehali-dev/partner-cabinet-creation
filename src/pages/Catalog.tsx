import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import CatalogTab from '@/components/CatalogTab';
import { mockProducts } from '@/data/mockData';

const Catalog = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ id: number; quantity: number }>>([]);

  const addToCart = (productId: number) => {
    const existing = cartItems.find(item => item.id === productId);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  const filteredProducts = mockProducts.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNotificationClick = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItems.length} onNotificationClick={handleNotificationClick} />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <CatalogTab 
          products={filteredProducts}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddToCart={addToCart}
        />
      </main>
    </div>
  );
};

export default Catalog;
