// src/components/ExpirationAlerts.tsx
import { ListGroup, Badge } from 'react-bootstrap';
import type { Product } from '../types/Product';
import { differenceInDays, parseISO } from 'date-fns';

interface ExpirationAlertsProps {
  products: Product[];
}

const ExpirationAlerts = ({ products }: ExpirationAlertsProps) => {
  return (
    <div>
      <h5>Produtos Próximos do Vencimento (30 dias)</h5>
      <ListGroup>
        {products.map(product => (
          <ListGroup.Item key={product.id} className="d-flex justify-content-between align-items-center">
            {product.name}
            <Badge bg="danger">
              Vence em {differenceInDays(parseISO(product.expirationDate), new Date())} dias
            </Badge>
          </ListGroup.Item>
        ))}
        {products.length === 0 && <ListGroup.Item>Nenhum produto próximo do vencimento.</ListGroup.Item>}
      </ListGroup>
    </div>
  );
};

export default ExpirationAlerts;
