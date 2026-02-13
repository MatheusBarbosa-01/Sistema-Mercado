// src/components/LowStockAlerts.tsx
import { ListGroup, Badge } from 'react-bootstrap';
import type { Product } from '../types/Product';

interface LowStockAlertsProps {
  products: Product[];
}

const LowStockAlerts = ({ products }: LowStockAlertsProps) => {
  return (
    <div>
      <h5>Alerta de Estoque Baixo (Menos de 10 unidades)</h5>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
            {product.name}
            <Badge bg="warning" pill>
              {product.quantity}
            </Badge>
          </ListGroup.Item>
        ))}
        {products.length === 0 && <ListGroup.Item>Nenhum produto com estoque baixo.</ListGroup.Item>}
      </ListGroup>
    </div>
  );
};

export default LowStockAlerts;
