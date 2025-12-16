import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

interface Product {
  id: number;
  name: string;
  article: string;
  price: number;
  stock1: number;
  stock2: number;
}

interface CartItem {
  id: number;
  quantity: number;
}

interface DeliverySlot {
  date: string;
  availableSlots: number;
  maxSlots: number;
  isRecommended: boolean;
}

interface OrderConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  products: Product[];
  onConfirm: (selectedDate: string) => void;
}

const OrderConfirmationDialog = ({ isOpen, onClose, cartItems, products, onConfirm }: OrderConfirmationDialogProps) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [step, setStep] = useState<'availability' | 'slots'>('availability');

  const deliverySlots: DeliverySlot[] = [
    { date: '25.12.2024', availableSlots: 2, maxSlots: 8, isRecommended: false },
    { date: '26.12.2024', availableSlots: 5, maxSlots: 8, isRecommended: true },
    { date: '27.12.2024', availableSlots: 7, maxSlots: 8, isRecommended: true },
    { date: '30.12.2024', availableSlots: 3, maxSlots: 8, isRecommended: false },
    { date: '31.12.2024', availableSlots: 1, maxSlots: 8, isRecommended: false },
  ];

  const itemsWithAvailability = cartItems.map(item => {
    const product = products.find(p => p.id === item.id);
    if (!product) return null;
    
    const totalStock = product.stock1 + product.stock2;
    const hasStock = totalStock >= item.quantity;
    
    return {
      ...item,
      product,
      hasStock,
      availableQuantity: totalStock,
    };
  }).filter(Boolean);

  const outOfStockItems = itemsWithAvailability.filter(item => !item?.hasStock);
  const inStockItems = itemsWithAvailability.filter(item => item?.hasStock);

  const canProceed = inStockItems.length > 0;

  const handleNext = () => {
    if (step === 'availability') {
      setStep('slots');
    } else if (selectedDate) {
      onConfirm(selectedDate);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="ClipboardCheck" size={24} />
            {step === 'availability' ? 'Проверка наличия товаров' : 'Выбор даты отгрузки'}
          </DialogTitle>
          <DialogDescription>
            {step === 'availability' 
              ? 'Система проверила наличие товаров на складах'
              : 'Выберите удобную дату для отгрузки заказа'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'availability' && (
          <div className="space-y-4 mt-4">
            {inStockItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="CheckCircle2" size={18} className="text-green-600" />
                  <h3 className="font-semibold text-green-600">Товары в наличии ({inStockItems.length})</h3>
                </div>
                <div className="space-y-2">
                  {inStockItems.map((item) => (
                    <Card key={item!.id} className="border-green-200 bg-green-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{item!.product.name}</p>
                            <p className="text-sm text-muted-foreground">{item!.product.article}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Заказано:</p>
                              <p className="font-bold">{item!.quantity} шт</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Доступно:</p>
                              <p className="font-bold text-green-600">{item!.availableQuantity} шт</p>
                            </div>
                            <Icon name="CheckCircle" size={24} className="text-green-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {outOfStockItems.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="AlertCircle" size={18} className="text-orange-600" />
                  <h3 className="font-semibold text-orange-600">Товары с недостаточным остатком ({outOfStockItems.length})</h3>
                </div>
                <div className="space-y-2">
                  {outOfStockItems.map((item) => (
                    <Card key={item!.id} className="border-orange-200 bg-orange-50/30">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <p className="font-medium">{item!.product.name}</p>
                            <p className="text-sm text-muted-foreground">{item!.product.article}</p>
                            <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                              <Icon name="Info" size={12} />
                              Будет отправлено отдельным заказом после поступления
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Заказано:</p>
                              <p className="font-bold">{item!.quantity} шт</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Доступно:</p>
                              <p className="font-bold text-orange-600">{item!.availableQuantity} шт</p>
                            </div>
                            <Icon name="Clock" size={24} className="text-orange-600" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card className="mt-4 bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-blue-900">Заказ будет разделен на 2 части</p>
                        <p className="text-sm text-blue-800 mt-1">
                          <strong>Часть 1:</strong> {inStockItems.length} товаров в наличии будут отгружены по выбранной дате<br />
                          <strong>Часть 2:</strong> {outOfStockItems.length} товаров будут автоматически отправлены в 1С после поступления на склад
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Отменить
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={!canProceed}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Продолжить
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === 'slots' && (
          <div className="space-y-4 mt-4">
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Товаров к отгрузке:</p>
                    <p className="text-2xl font-bold">{inStockItems.length} позиций</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Сумма заказа:</p>
                    <p className="text-2xl font-bold">
                      {inStockItems.reduce((sum, item) => sum + (item!.product.price * item!.quantity), 0).toLocaleString()} ₽
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="CalendarDays" size={18} />
                Доступные даты отгрузки
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {deliverySlots.map((slot) => {
                  const isSelected = selectedDate === slot.date;
                  const isFull = slot.availableSlots === 0;
                  const fillPercent = ((slot.maxSlots - slot.availableSlots) / slot.maxSlots) * 100;
                  
                  return (
                    <Card 
                      key={slot.date}
                      className={cn(
                        "cursor-pointer transition-all hover:shadow-md",
                        isSelected && "border-primary border-2 bg-primary/5",
                        isFull && "opacity-50 cursor-not-allowed",
                        slot.isRecommended && !isSelected && "border-green-200 bg-green-50/30"
                      )}
                      onClick={() => !isFull && setSelectedDate(slot.date)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={cn(
                              "w-12 h-12 rounded-full flex items-center justify-center",
                              isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                            )}>
                              <Icon name={isSelected ? "CheckCircle2" : "Calendar"} size={24} />
                            </div>
                            <div>
                              <p className="font-bold text-lg">{slot.date}</p>
                              <div className="flex items-center gap-2 mt-1">
                                {slot.isRecommended && (
                                  <Badge variant="outline" className="border-green-500 text-green-600 text-xs">
                                    <Icon name="Star" size={10} className="mr-1" />
                                    Рекомендуем
                                  </Badge>
                                )}
                                {isFull ? (
                                  <Badge variant="destructive" className="text-xs">Слоты заняты</Badge>
                                ) : slot.availableSlots <= 2 ? (
                                  <Badge variant="secondary" className="text-xs">Осталось {slot.availableSlots} слота</Badge>
                                ) : (
                                  <span className="text-sm text-muted-foreground">Свободно {slot.availableSlots} из {slot.maxSlots} слотов</span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="w-24">
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={cn(
                                  "h-full transition-all",
                                  fillPercent > 75 ? "bg-red-500" : fillPercent > 50 ? "bg-orange-500" : "bg-green-500"
                                )}
                                style={{ width: `${fillPercent}%` }}
                              />
                            </div>
                            <p className="text-xs text-muted-foreground text-center mt-1">
                              Заполнено {Math.round(fillPercent)}%
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Lightbulb" size={20} className="text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-900">Система слотов для оптимизации логистики</p>
                    <p className="text-sm text-amber-800 mt-1">
                      Даты с меткой "Рекомендуем" имеют больше свободных слотов и оптимальны для быстрой отгрузки
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setStep('availability')} className="flex-1">
                <Icon name="ArrowLeft" size={16} className="mr-2" />
                Назад
              </Button>
              <Button 
                onClick={handleNext}
                disabled={!selectedDate}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                <Icon name="Send" size={16} className="mr-2" />
                Отправить в 1С
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderConfirmationDialog;
