import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import OrderConfirmationDialog from '@/components/OrderConfirmationDialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockProducts } from '@/data/mockData';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<Array<{ id: number; quantity: number }>>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleNotificationClick = () => {};

  const cartTotal = cartItems.reduce((sum, item) => {
    const product = mockProducts.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== productId));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const handleConfirmOrder = (selectedDate: string) => {
    console.log('Заказ подтвержден на дату:', selectedDate);
    setShowConfirmDialog(false);
    setCartItems([]);
    
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-slide-in flex items-center gap-3';
    notification.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <div>
        <p class="font-semibold">Заказ успешно отправлен в 1С!</p>
        <p class="text-sm opacity-90">Дата отгрузки: ${selectedDate}</p>
      </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 5000);

    setTimeout(() => {
      navigate('/orders');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={cartItems.length} onNotificationClick={handleNotificationClick} />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Корзина</h1>

        {cartItems.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Icon name="ShoppingCart" className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-xl text-muted-foreground mb-4">Корзина пуста</p>
              <Button onClick={() => navigate('/catalog')}>
                Перейти в каталог
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => {
                const product = mockProducts.find(p => p.id === item.id);
                if (!product) return null;

                return (
                  <Card key={item.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.article}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">
                              {product.stock1 + product.stock2} шт в наличии
                            </Badge>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>

                          <div className="text-right min-w-[120px]">
                            <p className="font-bold text-lg">
                              {(product.price * item.quantity).toLocaleString('ru-RU')} ₽
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {product.price.toLocaleString('ru-RU')} ₽/шт
                            </p>
                          </div>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeItem(item.id)}
                          >
                            <Icon name="Trash2" size={18} className="text-destructive" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Итого</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Товаров:</span>
                    <span className="font-semibold">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t">
                    <span className="text-lg font-semibold">Сумма:</span>
                    <span className="text-2xl font-bold text-primary">
                      {cartTotal.toLocaleString('ru-RU')} ₽
                    </span>
                  </div>

                  {cartTotal < 50000 && (
                    <Badge variant="outline" className="w-full justify-center py-2">
                      <Icon name="Info" size={14} className="mr-2" />
                      Минимальный заказ: 50,000 ₽
                    </Badge>
                  )}

                  <Button 
                    className="w-full" 
                    size="lg"
                    disabled={cartTotal < 50000}
                    onClick={() => setShowConfirmDialog(true)}
                  >
                    Оформить заказ
                  </Button>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate('/catalog')}
                  >
                    Продолжить покупки
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <OrderConfirmationDialog
          open={showConfirmDialog}
          onClose={() => setShowConfirmDialog(false)}
          onConfirm={handleConfirmOrder}
        />
      </main>
    </div>
  );
};

export default Cart;
