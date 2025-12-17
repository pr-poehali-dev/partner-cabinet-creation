import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import Header from '@/components/Header';
import OrderTab from '@/components/OrderTab';
import OrderDetailDialog from '@/components/OrderDetailDialog';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { mockOrders, mockProducts } from '@/data/mockData';

const Orders = () => {
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState<number | null>(null);

  const handleNotificationClick = (notification: { orderId?: number }) => {
    if (notification.orderId) {
      setSelectedOrder(notification.orderId);
    }
  };

  const exportToExcel = () => {
    const data = mockOrders.map(order => {
      const items = order.items.map(item => {
        const product = mockProducts.find(p => p.id === item.productId);
        return {
          'Номер заказа': order.id,
          'Дата': order.date,
          'Статус': order.status,
          'Товар': product?.name || '',
          'Артикул': product?.article || '',
          'Количество': item.quantity,
          'Склад': item.warehouse,
          'Цена': product?.price || 0,
          'Сумма': (product?.price || 0) * item.quantity
        };
      });
      return items;
    }).flat();

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Заказы');
    
    const colWidths = [
      { wch: 15 },
      { wch: 12 },
      { wch: 15 },
      { wch: 30 },
      { wch: 15 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 },
      { wch: 12 }
    ];
    worksheet['!cols'] = colWidths;

    XLSX.writeFile(workbook, `Заказы_${new Date().toLocaleDateString('ru-RU')}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header cartItemsCount={0} onNotificationClick={handleNotificationClick} />
      <main className="container mx-auto px-4 pt-24 pb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-primary">Мои заказы</h1>
          <Button onClick={exportToExcel} className="flex items-center gap-2">
            <Icon name="FileSpreadsheet" size={18} />
            Экспорт в Excel
          </Button>
        </div>
        <OrderTab orders={mockOrders} onSelectOrder={setSelectedOrder} />
        <OrderDetailDialog 
          orderId={selectedOrder}
          open={selectedOrder !== null}
          onClose={() => setSelectedOrder(null)}
        />
      </main>
    </div>
  );
};

export default Orders;
