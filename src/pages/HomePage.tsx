import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import { mockProducts } from '../services/mockProducts';
import type { Product } from '../types/Product'; // Certifique-se que Product.ts usa "export interface" (sem default)

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ CORREÇÃO: O filtro é calculado diretamente. 
  // O React recalcula isso automaticamente toda vez que 'searchTerm' muda.
  // Isso elimina o erro de sincronização e deixa o site mais rápido.
  const filteredProducts = mockProducts.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5">Nossos Produtos</h1>
          <p className="lead">Use a barra de busca para encontrar o que precisa.</p>
          {/* Certifique-se que seu SearchBar aceita 'searchTerm' e 'onSearchChange' como props */}
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </Col>
      </Row>
      <Row>
        <Col>
          {filteredProducts.length > 0 ? (
            <ProductList products={filteredProducts} />
          ) : (
            <p className="text-muted">Nenhum produto encontrado com o termo "{searchTerm}".</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;