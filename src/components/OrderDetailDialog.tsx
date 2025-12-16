import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderStatusHistory from './OrderStatusHistory';

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
}

interface OrderItem {
  productId: number;
  quantity: number;
  warehouse: string;
}

interface Order {
  id: number;
  date: string;
  status: string;
  statusColor: string;
  total: number;
  items: OrderItem[];
}

interface OrderDetailDialogProps {
  order: Order | null;
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
}

const OrderDetailDialog = ({ order, products, isOpen, onClose }: OrderDetailDialogProps) => {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Дата заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{order.date}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Сумма заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{order.total.toLocaleString()} ₽</p>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Icon name="Package" size={18} />
              Состав заказа
            </h3>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Товар</TableHead>
                    <TableHead>Артикул</TableHead>
                    <TableHead className="text-center">Количество</TableHead>
                    <TableHead>Склад</TableHead>
                    <TableHead className="text-right">Цена</TableHead>
                    <TableHead className="text-right">Сумма</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item, idx) => {
                    const product = products.find(p => p.id === item.productId);
                    if (!product) return null;
                    return (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell className="text-muted-foreground">{product.article}</TableCell>
                        <TableCell className="text-center">{item.quantity} шт</TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.warehouse}</Badge>
                        </TableCell>
                        <TableCell className="text-right">{product.price.toLocaleString()} ₽</TableCell>
                        <TableCell className="text-right font-semibold">{(product.price * item.quantity).toLocaleString()} ₽</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex gap-2">
              <Button variant="outline">
                <Icon name="FileText" size={16} className="mr-2" />
                Скачать PDF
              </Button>
              <Button variant="outline">
                <Icon name="Printer" size={16} className="mr-2" />
                Печать
              </Button>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Итого к оплате:</p>
              <p className="text-2xl font-bold">{order.total.toLocaleString()} ₽</p>
            </div>
          </div>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <OrderStatusHistory orderId={order.id} currentStatus={order.status} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailDialog;