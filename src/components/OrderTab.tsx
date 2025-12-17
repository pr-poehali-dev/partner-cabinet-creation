import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Order {
  id: number;
  date: string;
  status: string;
  statusColor: string;
  total: number;
}

interface OrderTabProps {
  orders: Order[];
  onSelectOrder: (orderId: number) => void;
}

const OrderTab = ({ orders, onSelectOrder }: OrderTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>История заказов</CardTitle>
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
              {orders.map((order) => (
                <TableRow 
                  key={order.id} 
                  className="cursor-pointer hover:bg-muted/20" 
                  onClick={() => onSelectOrder(order.id)}
                >
                  <TableCell>{order.date}</TableCell>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={order.statusColor === 'secondary' ? 'secondary' : 'default'} 
                      className={
                        order.statusColor === 'green' ? 'bg-green-600' : 
                        order.statusColor === 'blue' ? 'bg-blue-600' : ''
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {order.total.toLocaleString('ru-RU')} ₽
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTab;
