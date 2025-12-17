import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderStatusHistory from './OrderStatusHistory';
import { mockOrders, mockProducts } from '@/data/mockData';

interface OrderDetailDialogProps {
  orderId: number | null;
  open: boolean;
  onClose: () => void;
}

const OrderDetailDialog = ({ orderId, open, onClose }: OrderDetailDialogProps) => {
  const order = mockOrders.find(o => o.id === orderId);
  
  if (!order) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Заказ #{order.id}</span>
            <Badge variant={order.statusColor === 'secondary' ? 'secondary' : 'default'} className={order.statusColor === 'green' ? 'bg-green-600' : order.statusColor === 'blue' ? 'bg-blue-600' : ''}>
              {order.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Детали заказа</TabsTrigger>
            <TabsTrigger value="history">История статусов</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Информация о заказе</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Дата создания</p>
                  <p className="font-semibold">{order.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Общая сумма</p>
                  <p className="font-semibold text-lg">{order.total.toLocaleString('ru-RU')} ₽</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Товары в заказе</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Товар</TableHead>
                      <TableHead>Артикул</TableHead>
                      <TableHead>Склад</TableHead>
                      <TableHead className="text-right">Количество</TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                      <TableHead className="text-right">Сумма</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {order.items.map((item, index) => {
                      const product = mockProducts.find(p => p.id === item.productId);
                      if (!product) return null;
                      
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{product.name}</TableCell>
                          <TableCell>{product.article}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{item.warehouse}</Badge>
                          </TableCell>
                          <TableCell className="text-right">{item.quantity} шт</TableCell>
                          <TableCell className="text-right">{product.price.toLocaleString('ru-RU')} ₽</TableCell>
                          <TableCell className="text-right font-semibold">
                            {(product.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <OrderStatusHistory orderId={order.id} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Закрыть
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;
