import { useState } from 'react'; // Removido useEffect
import { Form, Button, Row, Col } from 'react-bootstrap';
import type { Product } from '../types/Product';

interface ProductFormProps {
  productToEdit?: Product | null;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  onCancel: () => void;
}

// Objeto base para limpar o form
const emptyProduct = {
  name: '',
  description: '',
  price: '',
  quantity: '',
  imageUrl: '',
  category: '',
  expirationDate: '',
};

const ProductForm = ({ productToEdit, onSave, onCancel }: ProductFormProps) => {
  // ✅ CORREÇÃO: Inicializa o estado diretamente com base na prop
  // Se existir productToEdit, usa ele. Se não, usa o vazio.
  const [formData, setFormData] = useState(() => {
    if (productToEdit) {
      return {
        name: productToEdit.name,
        description: productToEdit.description,
        price: String(productToEdit.price),
        quantity: String(productToEdit.quantity),
        imageUrl: productToEdit.imageUrl,
        category: productToEdit.category,
        expirationDate: productToEdit.expirationDate || '', // Garante string vazia se for null
      };
    }
    return emptyProduct;
  });

  // ❌ O useEffect foi removido daqui para evitar o loop de renderização

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price) || 0,
      quantity: parseInt(formData.quantity, 10) || 0,
    };

    if (productToEdit) {
      onSave({ ...productData, id: productToEdit.id });
    } else {
      onSave(productData);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded bg-light">
      <h4 className="mb-3">{productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</h4>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nome do Produto</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Categoria</Form.Label>
            <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} required />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Descrição</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
      </Form.Group>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Preço (R$)</Form.Label>
            <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Quantidade em Estoque</Form.Label>
            <Form.Control type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Data de Validade</Form.Label>
            <Form.Control type="date" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>URL da Imagem</Form.Label>
        <Form.Control type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/image.png" />
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={onCancel} className="me-2">
          Cancelar
        </Button>
        <Button variant="primary" type="submit">
          Salvar Produto
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;