import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { mockProducts, mockOrders } from '@/data/mockData';

const Analytics = () => {
  const navigate = useNavigate();

  const handleNotificationClick = () => {};

  const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0);
  const averageOrderValue = totalRevenue / mockOrders.length;
  const topProducts = mockProducts
    .sort((a, b) => (b.stock1 + b.stock2) - (a.stock1 + a.stock2))
    .slice(0, 5);
  const lowStockProducts = mockProducts.filter(p => p.stock1 + p.stock2 < 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={0} onNotificationClick={handleNotificationClick} />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Аналитика</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
              <Icon name="TrendingUp" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRevenue.toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-1">За текущий период</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
              <Icon name="DollarSign" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(averageOrderValue).toLocaleString('ru-RU')} ₽</div>
              <p className="text-xs text-muted-foreground mt-1">На заказ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
              <Icon name="ShoppingCart" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockOrders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Активных заказов</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Товаров в каталоге</CardTitle>
              <Icon name="Package" className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProducts.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Позиций</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Топ-5 товаров по остаткам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </Badge>
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.article}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">
                      {(product.stock1 + product.stock2).toLocaleString()} шт
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="AlertTriangle" className="h-5 w-5 text-orange-500" />
                Критические остатки
              </CardTitle>
            </CardHeader>
            <CardContent>
              {lowStockProducts.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  Все товары в наличии
                </p>
              ) : (
                <div className="space-y-4">
                  {lowStockProducts.map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.article}</p>
                      </div>
                      <Badge variant="destructive">
                        {product.stock1 + product.stock2} шт
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
