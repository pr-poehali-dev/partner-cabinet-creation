import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface StatusHistoryItem {
  status: string;
  date: string;
  time: string;
  description: string;
  user: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface OrderStatusHistoryProps {
  orderId: number;
  currentStatus: string;
}

const OrderStatusHistory = ({ orderId, currentStatus }: OrderStatusHistoryProps) => {
  const getStatusHistory = (status: string): StatusHistoryItem[] => {
    const baseHistory: StatusHistoryItem[] = [
      {
        status: 'Создан',
        date: '18.12.2024',
        time: '10:24',
        description: 'Заказ создан партнером',
        user: 'Иван Петров',
        isCompleted: true,
        isCurrent: false,
      },
      {
        status: 'Отправлен в 1С',
        date: '18.12.2024',
        time: '10:25',
        description: 'Заказ загружен в систему 1С для обработки',
        user: 'Система',
        isCompleted: true,
        isCurrent: false,
      },
      {
        status: 'В обработке',
        date: '18.12.2024',
        time: '11:42',
        description: 'Менеджер проверяет наличие и формирует отгрузку',
        user: 'Светлана Иванова',
        isCompleted: status !== 'В обработке',
        isCurrent: status === 'В обработке',
      },
      {
        status: 'Подтвержден',
        date: status === 'В обработке' ? '—' : '18.12.2024',
        time: status === 'В обработке' ? '—' : '14:15',
        description: 'Заказ подтвержден, товар зарезервирован',
        user: status === 'В обработке' ? '—' : 'Светлана Иванова',
        isCompleted: status !== 'В обработке' && status !== 'Подтвержден',
        isCurrent: status === 'Подтвержден',
      },
      {
        status: 'Комплектация',
        date: status === 'В обработке' || status === 'Подтвержден' ? '—' : '19.12.2024',
        time: status === 'В обработке' || status === 'Подтвержден' ? '—' : '09:30',
        description: 'Товар комплектуется на складе',
        user: status === 'В обработке' || status === 'Подтвержден' ? '—' : 'Склад №1',
        isCompleted: status === 'Отгружен' || status === 'Доставлен',
        isCurrent: status === 'Комплектация',
      },
      {
        status: 'Отгружен',
        date: status === 'Отгружен' || status === 'Доставлен' ? '20.12.2024' : '—',
        time: status === 'Отгружен' || status === 'Доставлен' ? '15:20' : '—',
        description: 'Товар отгружен, ожидайте доставку',
        user: status === 'Отгружен' || status === 'Доставлен' ? 'Склад №1' : '—',
        isCompleted: status === 'Доставлен',
        isCurrent: status === 'Отгружен',
      },
      {
        status: 'Доставлен',
        date: status === 'Доставлен' ? '21.12.2024' : '—',
        time: status === 'Доставлен' ? '11:45' : '—',
        description: 'Товар доставлен получателю',
        user: status === 'Доставлен' ? 'Курьер' : '—',
        isCompleted: status === 'Доставлен',
        isCurrent: status === 'Доставлен',
      },
    ];

    return baseHistory;
  };

  const history = getStatusHistory(currentStatus);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="GitBranch" size={20} />
          История статусов заказа #{orderId}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-muted" />
          
          <div className="space-y-6">
            {history.map((item, index) => (
              <div key={index} className="relative flex gap-4 items-start">
                <div className={cn(
                  "relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2",
                  item.isCompleted && "bg-green-500 border-green-500",
                  item.isCurrent && "bg-primary border-primary animate-pulse",
                  !item.isCompleted && !item.isCurrent && "bg-muted border-muted"
                )}>
                  {item.isCompleted ? (
                    <Icon name="Check" size={16} className="text-white" />
                  ) : item.isCurrent ? (
                    <Icon name="Loader2" size={16} className="text-white animate-spin" />
                  ) : (
                    <div className="w-2 h-2 bg-muted-foreground/30 rounded-full" />
                  )}
                </div>

                <div className="flex-1 pb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={cn(
                      "font-semibold",
                      item.isCurrent && "text-primary"
                    )}>
                      {item.status}
                    </h4>
                    {item.isCurrent && (
                      <Badge variant="default" className="text-xs">Текущий</Badge>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={12} />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="User" size={12} />
                      <span>{item.user}</span>
                    </div>
                  </div>

                  {item.isCurrent && (
                    <div className="mt-3 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
                      <div className="flex items-start gap-2">
                        <Icon name="Info" size={16} className="text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="font-medium text-blue-900">Ожидаемое время обработки</p>
                          <p className="text-blue-800 text-xs mt-1">
                            {currentStatus === 'В обработке' && 'Обычно занимает 2-4 часа'}
                            {currentStatus === 'Подтвержден' && 'Комплектация начнется в течение 1 часа'}
                            {currentStatus === 'Комплектация' && 'Комплектация занимает 4-6 часов'}
                            {currentStatus === 'Отгружен' && 'Доставка в течение 1-2 дней'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600">
                {history.filter(h => h.isCompleted).length}
              </p>
              <p className="text-xs text-muted-foreground">Завершено</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">
                {history.filter(h => h.isCurrent).length}
              </p>
              <p className="text-xs text-muted-foreground">В процессе</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground">
                {history.filter(h => !h.isCompleted && !h.isCurrent).length}
              </p>
              <p className="text-xs text-muted-foreground">Ожидают</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderStatusHistory;
