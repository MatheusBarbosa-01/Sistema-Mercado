// src/components/StockList.tsx
import { Table, Button, Badge } from 'react-bootstrap';
import type { Product } from '../types/Product';

interface StockListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const StockList = ({ products, onEdit, onDelete }: StockListProps) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#ID</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Qtd.</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>R$ {product.price.toFixed(2)}</td>
            <td>{product.quantity}</td>
            <td>
              <Badge bg={product.quantity > 0 ? 'success' : 'danger'}>
                {product.quantity > 0 ? 'Em Estoque' : 'Esgotado'}
              </Badge>
            </td>
            <td>
              <Button variant="outline-primary" size="sm" onClick={() => onEdit(product)} className="me-2">
                Editar
              </Button>
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(product.id)}>
                Excluir
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StockList;
