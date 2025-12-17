import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import NotificationCenter from './NotificationCenter';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderProps {
  cartItemsCount: number;
  onNotificationClick?: (notification: { orderId?: number }) => void;
}

const Header = ({ cartItemsCount, onNotificationClick }: HeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/catalog', label: 'Каталог', icon: 'Package' },
    { path: '/orders', label: 'Заказы', icon: 'ClipboardList' },
    { path: '/analytics', label: 'Аналитика', icon: 'BarChart3' },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center font-bold text-primary text-xl">
              M
            </div>
            <div>
              <h1 className="text-xl font-bold">MANNOL</h1>
              <p className="text-xs text-primary-foreground/80">Личный кабинет партнера</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <NotificationCenter onNotificationClick={onNotificationClick} />
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary-foreground hover:bg-primary-foreground/10 relative"
              onClick={() => navigate('/cart')}
            >
              <Icon name="ShoppingCart" size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartItemsCount}
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
        <nav className="flex gap-1 mt-4 border-t border-primary-foreground/20 pt-3">
          {navItems.map(item => (
            <Button
              key={item.path}
              variant={location.pathname === item.path ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => navigate(item.path)}
              className={location.pathname === item.path ? '' : 'text-primary-foreground hover:bg-primary-foreground/10'}
            >
              <Icon name={item.icon as any} size={16} className="mr-2" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;