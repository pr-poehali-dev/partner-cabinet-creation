import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Header from '@/components/Header';
import CatalogTab from '@/components/CatalogTab';
import OrderTab from '@/components/OrderTab';
import OrderDetailDialog from '@/components/OrderDetailDialog';

const mockProducts = [
  { id: 1, name: 'MANNOL 5W-40 Extreme', article: 'MN7909-4', stock1: 1200, stock2: 450, rating: 4.8, isNew: true, price: 850, recommendation: '' },
  { id: 2, name: 'MANNOL ATF AG55', article: 'MN8206-4', stock1: 340, stock2: 120, rating: 4.9, isNew: false, price: 920, recommendation: '' },
  { id: 3, name: 'MANNOL Diesel Extra 10W-40', article: 'MN7504-10', stock1: 85, stock2: 15, rating: 4.7, isNew: false, price: 1450, recommendation: 'Малый остаток - рекомендуем пополнить' },
  { id: 4, name: 'MANNOL Antifreeze AF12+', article: 'MN4012-5', stock1: 560, stock2: 220, rating: 4.6, isNew: true, price: 680, recommendation: '' },
  { id: 5, name: 'MANNOL Molibden Benzin 10W-40', article: 'MN1120-4', stock1: 42, stock2: 8, rating: 4.8, isNew: false, price: 790, recommendation: 'Критический остаток!' },
];

const mockOrders = [
  { 
    id: 12847, 
    date: '18.12.2024', 
    status: 'В обработке', 
    statusColor: 'secondary',
    total: 245600,
    items: [
      { productId: 1, quantity: 120, warehouse: 'Склад 1' },
      { productId: 3, quantity: 50, warehouse: 'Склад 1' },
    ]
  },
  { 
    id: 12851, 
    date: '20.12.2024', 
    status: 'Подтвержден', 
    statusColor: 'green',
    total: 187340,
    items: [
      { productId: 2, quantity: 80, warehouse: 'Склад 2' },
      { productId: 4, quantity: 150, warehouse: 'Склад 1' },
    ]
  },
  { 
    id: 12869, 
    date: '23.12.2024', 
    status: 'Отгружен', 
    statusColor: 'blue',
    total: 312890,
    items: [
      { productId: 1, quantity: 200, warehouse: 'Склад 1' },
      { productId: 5, quantity: 95, warehouse: 'Склад 2' },
      { productId: 3, quantity: 30, warehouse: 'Склад 1' },
    ]
  },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<Array<{ id: number; quantity: number }>>([]);
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

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

  const cartTotal = cartItems.reduce((sum, item) => {
    const product = mockProducts.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const selectedOrderData = mockOrders.find(o => o.id === selectedOrder) || null;

  return (
    <div className="min-h-screen bg-muted/30">
      <Header cartItemsCount={cartItems.length} />

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Package" size={16} />
                Всего заказов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">127</p>
              <p className="text-xs text-green-600 mt-1">+12% за месяц</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="TrendingUp" size={16} />
                Сумма заказов
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">3.2М ₽</p>
              <p className="text-xs text-green-600 mt-1">+8% за месяц</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Clock" size={16} />
                В обработке
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">5</p>
              <p className="text-xs text-muted-foreground mt-1">заказов</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Icon name="Truck" size={16} />
                Отгружено
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">122</p>
              <p className="text-xs text-muted-foreground mt-1">заказов</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="catalog" className="space-y-4">
          <TabsList className="bg-card border">
            <TabsTrigger value="catalog">
              <Icon name="Grid3x3" size={16} className="mr-2" />
              Каталог товаров
            </TabsTrigger>
            <TabsTrigger value="order">
              <Icon name="ShoppingBag" size={16} className="mr-2" />
              Формирование заказа
            </TabsTrigger>
            <TabsTrigger value="schedule">
              <Icon name="Calendar" size={16} className="mr-2" />
              График отгрузок
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-4">
            <CatalogTab 
              products={mockProducts}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onAddToCart={addToCart}
              filteredProducts={filteredProducts}
            />
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
            <OrderTab 
              cartItems={cartItems}
              products={mockProducts}
              cartTotal={cartTotal}
            />
          </TabsContent>

          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>График отгрузок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Дата</TableHead>
                        <TableHead>Заказ №</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead className="text-right">Сумма</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrders.map((order) => (
                        <TableRow key={order.id} className="cursor-pointer hover:bg-muted/20" onClick={() => setSelectedOrder(order.id)}>
                          <TableCell>{order.date}</TableCell>
                          <TableCell className="font-medium">#{order.id}</TableCell>
                          <TableCell>
                            <Badge variant={order.statusColor === 'secondary' ? 'secondary' : 'default'} className={order.statusColor === 'green' ? 'bg-green-600' : order.statusColor === 'blue' ? 'bg-blue-600' : ''}>
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{order.total.toLocaleString()} ₽</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <OrderDetailDialog 
        order={selectedOrderData}
        products={mockProducts}
        isOpen={selectedOrder !== null}
        onClose={() => setSelectedOrder(null)}
      />
    </div>
  );
};

export default Index;
