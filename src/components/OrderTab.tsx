import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface OrderTabProps {
  cartItems: CartItem[];
  products: Product[];
  cartTotal: number;
  onSubmitOrder: () => void;
}

const OrderTab = ({ cartItems, products, cartTotal, onSubmitOrder }: OrderTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Формирование заказа</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Icon name="Upload" size={16} className="mr-2" />
                Загрузить из Excel
              </Button>
              <Button variant="outline" size="sm">
                <Icon name="Download" size={16} className="mr-2" />
                Загрузить из 1С
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {cartItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg mb-2">Корзина пуста</p>
              <p className="text-sm">Добавьте товары из каталога</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => {
                const product = products.find(p => p.id === item.id);
                if (!product) return null;
                return (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-muted-foreground">{product.article}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">-</Button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0">+</Button>
                      </div>
                      <p className="font-bold w-24 text-right">{(product.price * item.quantity).toLocaleString()} ₽</p>
                      <Button size="sm" variant="ghost" className="text-destructive">
                        <Icon name="Trash2" size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Итоги заказа</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Товаров:</span>
              <span className="font-medium">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Сумма:</span>
              <span className="font-medium">{cartTotal.toLocaleString()} ₽</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Итого:</span>
              <span>{cartTotal.toLocaleString()} ₽</span>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t">
            <label className="text-sm font-medium">Дата отгрузки</label>
            <Input type="date" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-sm">Прямой заказ с завода</span>
            </label>
          </div>

          <Button 
            className="w-full bg-primary hover:bg-primary/90" 
            size="lg" 
            disabled={cartItems.length === 0 || cartTotal < 50000}
            onClick={onSubmitOrder}
          >
            <Icon name="CheckCircle" size={18} className="mr-2" />
            Отправить заказ
          </Button>

          {cartTotal < 50000 && cartItems.length > 0 && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 text-sm text-orange-800">
              <Icon name="Info" size={16} className="inline mr-1" />
              Минимальная сумма заказа: 50 000 ₽
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderTab;