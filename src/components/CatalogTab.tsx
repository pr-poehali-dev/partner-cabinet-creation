import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Product {
  id: number;
  name: string;
  article: string;
  stock1: number;
  stock2: number;
  rating: number;
  isNew: boolean;
  price: number;
  recommendation: string;
}

interface CatalogTabProps {
  products: Product[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddToCart: (productId: number) => void;
}

const CatalogTab = ({ products, searchQuery, onSearchChange, onAddToCart }: CatalogTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Каталог продукции</span>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              <Icon name="Star" size={12} className="mr-1" />
              Новинки: {products.filter(p => p.isNew).length}
            </Badge>
            <Badge variant="outline" className="text-xs border-orange-500 text-orange-600">
              <Icon name="AlertTriangle" size={12} className="mr-1" />
              Требуют внимания: {products.filter(p => p.recommendation).length}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск по названию или артикулу..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Товар</TableHead>
                <TableHead>Артикул</TableHead>
                <TableHead className="text-center">Склад 1</TableHead>
                <TableHead className="text-center">Склад 2</TableHead>
                <TableHead className="text-center">Рейтинг</TableHead>
                <TableHead className="text-right">Цена</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {product.name}
                      {product.isNew && (
                        <Badge variant="secondary" className="text-xs">NEW</Badge>
                      )}
                    </div>
                    {product.recommendation && (
                      <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
                        <Icon name="AlertCircle" size={12} />
                        {product.recommendation}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.article}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={product.stock1 > 200 ? "default" : product.stock1 > 50 ? "secondary" : "destructive"}>
                      {product.stock1}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant={product.stock2 > 100 ? "default" : product.stock2 > 20 ? "secondary" : "destructive"}>
                      {product.stock2}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Icon name="Star" size={14} className="text-secondary fill-secondary" />
                      <span className="font-medium">{product.rating}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-semibold">{product.price} ₽</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => onAddToCart(product.id)} className="bg-primary hover:bg-primary/90">
                      <Icon name="Plus" size={16} className="mr-1" />
                      В заказ
                    </Button>
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

export default CatalogTab;