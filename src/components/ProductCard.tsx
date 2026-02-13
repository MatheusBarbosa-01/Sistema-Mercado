// src/components/ProductCard.tsx
import { Card, Badge, Button } from 'react-bootstrap';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const isAvailable = product.quantity > 0;

  return (
    <Card className="h-100 shadow-sm">
      <Card.Img variant="top" src={product.imageUrl} style={{ height: '200px', objectFit: 'cover' }} />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="text-muted">{product.category}</Card.Text>
        <div className="mt-auto">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="h5">R$ {product.price.toFixed(2)}</span>
            <Badge bg={isAvailable ? 'success' : 'danger'}>
              {isAvailable ? 'Em Estoque' : 'Esgotado'}
            </Badge>
          </div>
          <Button variant="primary" className="w-100" disabled={!isAvailable}>
            Adicionar ao Carrinho
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
