export const mockProducts = [
  { id: 1, name: 'MANNOL 5W-40 Extreme', article: 'MN7909-4', stock1: 1200, stock2: 450, rating: 4.8, isNew: true, price: 8500, recommendation: '' },
  { id: 2, name: 'MANNOL ATF AG55', article: 'MN8206-4', stock1: 340, stock2: 120, rating: 4.9, isNew: false, price: 9200, recommendation: '' },
  { id: 3, name: 'MANNOL Diesel Extra 10W-40', article: 'MN7504-10', stock1: 85, stock2: 15, rating: 4.7, isNew: false, price: 14500, recommendation: 'Малый остаток - рекомендуем пополнить' },
  { id: 4, name: 'MANNOL Antifreeze AF12+', article: 'MN4012-5', stock1: 560, stock2: 220, rating: 4.6, isNew: true, price: 6800, recommendation: '' },
  { id: 5, name: 'MANNOL Molibden Benzin 10W-40', article: 'MN1120-4', stock1: 42, stock2: 8, rating: 4.8, isNew: false, price: 7900, recommendation: 'Критический остаток!' },
];

export const mockOrders = [
  { 
    id: 12847, 
    date: '18.12.2024', 
    status: 'В обработке', 
    statusColor: 'secondary' as const,
    total: 245600,
    items: [
      { productId: 1, quantity: 120, warehouse: 'Склад 1' },
      { productId: 3, quantity: 50, warehouse: 'Склад 1' },
    ]
  },
  { 
    id: 12851, 
    date: '20.12.2024', 
    status: 'Подтвержден', 
    statusColor: 'green' as const,
    total: 187340,
    items: [
      { productId: 2, quantity: 80, warehouse: 'Склад 2' },
      { productId: 4, quantity: 150, warehouse: 'Склад 1' },
    ]
  },
  { 
    id: 12869, 
    date: '23.12.2024', 
    status: 'Отгружен', 
    statusColor: 'blue' as const,
    total: 312890,
    items: [
      { productId: 1, quantity: 200, warehouse: 'Склад 1' },
      { productId: 5, quantity: 95, warehouse: 'Склад 2' },
      { productId: 3, quantity: 30, warehouse: 'Склад 1' },
    ]
  },
];
