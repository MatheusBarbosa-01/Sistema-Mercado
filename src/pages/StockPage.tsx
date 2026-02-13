// src/pages/StockPage.tsx
import { useState } from 'react';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import Swal from 'sweetalert2';
import StockList from '../components/StockList';
import ProductForm from '../components/ProductForm';
import { mockProducts } from '../services/mockProducts';
import type { Product } from '../types/Product';

const StockPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [showForm, setShowForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setProductToEdit(product);
    setShowForm(true);
  };

  const handleDelete = (productId: number) => {
    Swal.fire({
      title: 'Você tem certeza?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setProducts(products.filter(p => p.id !== productId));
        Swal.fire(
          'Excluído!',
          'O produto foi removido.',
          'success'
        );
      }
    });
  };

  const handleSave = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      // Edit existing product
      setProducts(products.map(p => p.id === productData.id ? productData : p));
      Swal.fire('Sucesso!', 'Produto atualizado com sucesso.', 'success');
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id)) + 1, // Simple ID generation
      };
      setProducts([...products, newProduct]);
      Swal.fire('Sucesso!', 'Produto adicionado com sucesso.', 'success');
    }
    setShowForm(false);
    setProductToEdit(null);
  };
  
  const handleAddNew = () => {
    setProductToEdit(null);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setProductToEdit(null);
  };

  return (
    <Container className="mt-4">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="mb-0">Gerenciamento de Estoque</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={handleAddNew} disabled={showForm}>
            Adicionar Novo Produto
          </Button>
        </Col>
      </Row>
      
      <Collapse in={showForm}>
        <div>
          <ProductForm 
            productToEdit={productToEdit || undefined} 
            onSave={handleSave} 
            onCancel={handleCancel} 
          />
        </div>
      </Collapse>

      <Row className="mt-4">
        <Col>
          <StockList products={products} onEdit={handleEdit} onDelete={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
};

export default StockPage;
