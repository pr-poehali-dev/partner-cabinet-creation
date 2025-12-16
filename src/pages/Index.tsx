import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const mockProducts = [
  { id: 1, name: 'MANNOL 5W-40 Extreme', article: 'MN7909-4', stock1: 1200, stock2: 450, rating: 4.8, isNew: true, price: 850, recommendation: '' },
  { id: 2, name: 'MANNOL ATF AG55', article: 'MN8206-4', stock1: 340, stock2: 120, rating: 4.9, isNew: false, price: 920, recommendation: '' },
  { id: 3, name: 'MANNOL Diesel Extra 10W-40', article: 'MN7504-10', stock1: 85, stock2: 15, rating: 4.7, isNew: false, price: 1450, recommendation: 'Малый остаток - рекомендуем пополнить' },
  { id: 4, name: 'MANNOL Antifreeze AF12+', article: 'MN4012-5', stock1: 560, stock2: 220, rating: 4.6, isNew: true, price: 680, recommendation: '' },
  { id: 5, name: 'MANNOL Molibden Benzin 10W-40', article: 'MN1120-4', stock1: 42, stock2: 8, rating: 4.8, isNew: false, price: 790, recommendation: 'Критический остаток!' },
];

const Index = () => {
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

  const cartTotal = cartItems.reduce((sum, item) => {
    const product = mockProducts.find(p => p.id === item.id);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary text-xl">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold">MANNOL</h1>
              <p className="text-xs text-primary-foreground/80">Личный кабинет партнера</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
              <Icon name="ShoppingCart" size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartItems.length}
                </span>
              )}
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <span className="text-sm font-medium">Иван Петров</span>
            </div>
          </div>
        </div>
      </header>

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Каталог продукции</span>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      <Icon name="Star" size={12} className="mr-1" />
                      Новинки: {mockProducts.filter(p => p.isNew).length}
                    </Badge>
                    <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
                      <Icon name="AlertTriangle" size={12} className="mr-1" />
                      Требуют внимания: {mockProducts.filter(p => p.recommendation).length}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Поиск по названию или артикулу..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/50">
                        <TableHead>Товар</TableHead>
                        <TableHead>Артикул</TableHead>
                        <TableHead className="text-center">Склад 1</TableHead>
                        <TableHead className="text-center">Склад 2</TableHead>
                        <TableHead className="text-center">Рейтинг</TableHead>
                        <TableHead className="text-right">Цена</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id} className="hover:bg-muted/20">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {product.name}
                              {product.isNew && (
                                <Badge variant="secondary" className="text-xs">NEW</Badge>
                              )}
                            </div>
                            {product.recommendation && (
                              <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                                <Icon name="AlertCircle" size={12} />
                                {product.recommendation}
                              </p>
                            )}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{product.article}</TableCell>
                          <TableCell className="text-center">
                            <Badge variant={product.stock1 > 200 ? "default" : product.stock1 > 50 ? "secondary" : "destructive"}>
                              {product.stock1}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant={product.stock2 > 100 ? "default" : product.stock2 > 20 ? "secondary" : "destructive"}>
                              {product.stock2}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Icon name="Star" size={14} className="text-secondary fill-secondary" />
                              <span className="font-medium">{product.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-semibold">{product.price} ₽</TableCell>
                          <TableCell>
                            <Button size="sm" onClick={() => addToCart(product.id)} className="bg-primary hover:bg-primary/90">
                              <Icon name="Plus" size={16} className="mr-1" />
                              В заказ
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="order" className="space-y-4">
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
                        const product = mockProducts.find(p => p.id === item.id);
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

                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg" disabled={cartItems.length === 0}>
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
                      <TableRow>
                        <TableCell>18.12.2024</TableCell>
                        <TableCell className="font-medium">#12847</TableCell>
                        <TableCell>
                          <Badge variant="secondary">В обработке</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">245 600 ₽</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>20.12.2024</TableCell>
                        <TableCell className="font-medium">#12851</TableCell>
                        <TableCell>
                          <Badge className="bg-green-600">Подтвержден</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">187 340 ₽</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>23.12.2024</TableCell>
                        <TableCell className="font-medium">#12869</TableCell>
                        <TableCell>
                          <Badge className="bg-blue-600">Отгружен</Badge>
                        </TableCell>
                        <TableCell className="text-right font-semibold">312 890 ₽</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
