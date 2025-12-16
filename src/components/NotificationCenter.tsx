import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Notification {
  id: number;
  type: 'order_status' | 'stock_alert' | 'promotion' | 'system';
  title: string;
  message: string;
  time: string;
  isRead: boolean;
  orderId?: number;
  priority: 'high' | 'medium' | 'low';
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    type: 'order_status',
    title: 'Заказ #12869 отгружен',
    message: 'Ваш заказ на сумму 312,890 ₽ отгружен со склада и передан в доставку',
    time: '2 часа назад',
    isRead: false,
    orderId: 12869,
    priority: 'high',
  },
  {
    id: 2,
    type: 'stock_alert',
    title: 'Критический остаток товара',
    message: 'MANNOL Molibden Benzin 10W-40 (MN1120-4) - осталось всего 50 шт на складах',
    time: '4 часа назад',
    isRead: false,
    priority: 'high',
  },
  {
    id: 3,
    type: 'order_status',
    title: 'Заказ #12851 подтвержден',
    message: 'Заказ подтвержден и передан на комплектацию',
    time: '5 часов назад',
    isRead: true,
    orderId: 12851,
    priority: 'medium',
  },
  {
    id: 4,
    type: 'promotion',
    title: 'Новая акция на моторные масла',
    message: 'Специальные цены на линейку MANNOL Extreme - скидка до 15%',
    time: '1 день назад',
    isRead: true,
    priority: 'low',
  },
  {
    id: 5,
    type: 'system',
    title: 'Обновление личного кабинета',
    message: 'Добавлена новая функция: система слотов для выбора даты отгрузки',
    time: '2 дня назад',
    isRead: true,
    priority: 'low',
  },
  {
    id: 6,
    type: 'order_status',
    title: 'Заказ #12847 в обработке',
    message: 'Менеджер начал обработку вашего заказа',
    time: '3 дня назад',
    isRead: true,
    orderId: 12847,
    priority: 'medium',
  },
];

interface NotificationCenterProps {
  onNotificationClick?: (notification: Notification) => void;
}

const NotificationCenter = ({ onNotificationClick }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order_status':
        return 'Package';
      case 'stock_alert':
        return 'AlertTriangle';
      case 'promotion':
        return 'Tag';
      case 'system':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-orange-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 relative">
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-pulse">
                {unreadCount}
              </span>
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 animate-ping opacity-75" />
            </>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="Bell" size={24} />
              <span>Уведомления</span>
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {unreadCount} новых
                </Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs">
                Прочитать все
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
          <div className="space-y-2">
            {notifications.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Icon name="Bell" size={48} className="mx-auto mb-4 opacity-30" />
                <p className="text-lg mb-2">Нет уведомлений</p>
                <p className="text-sm">Все уведомления будут отображаться здесь</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    !notification.isRead && "bg-blue-50/50 border-blue-200"
                  )}
                  onClick={() => handleNotificationClick(notification)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                        notification.priority === 'high' && "bg-red-100",
                        notification.priority === 'medium' && "bg-orange-100",
                        notification.priority === 'low' && "bg-blue-100"
                      )}>
                        <Icon 
                          name={getIcon(notification.type)} 
                          size={20} 
                          className={getColor(notification.priority)}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className={cn(
                            "font-semibold text-sm",
                            !notification.isRead && "text-primary"
                          )}>
                            {notification.title}
                          </h4>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full shrink-0 mt-1" />
                          )}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Icon name="Clock" size={12} />
                          <span>{notification.time}</span>
                          {notification.orderId && (
                            <>
                              <span>•</span>
                              <span className="text-primary font-medium">
                                Заказ #{notification.orderId}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>

        {notifications.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background to-transparent">
            <Button variant="outline" className="w-full" size="sm">
              <Icon name="Archive" size={16} className="mr-2" />
              Архив уведомлений
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NotificationCenter;
