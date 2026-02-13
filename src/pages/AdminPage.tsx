// src/pages/AdminPage.tsx
import { useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { mockProducts } from "../services/mockProducts";
import type { Product } from "../types/Product";
import StatCard from "../components/StatCard";
import LowStockAlerts from "../components/LowStockAlerts";
import ExpirationAlerts from "../components/ExpirationAlerts";
import { differenceInDays, parseISO } from "date-fns";

const AdminPage = () => {
  // In a real app, you'd fetch this data or get it from a global state
  const products = mockProducts;

  const dashboardStats = useMemo(() => {
    const totalValue = products.reduce(
      (sum, p) => sum + p.price * p.quantity,
      0,
    );
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
    const lowStockProducts = products.filter(
      (p) => p.quantity > 0 && p.quantity < 10,
    );
    const expiringSoonProducts = products.filter((p) => {
      try {
        const daysUntilExpiration = differenceInDays(
          parseISO(p.expirationDate),
          new Date(),
        );
        return daysUntilExpiration >= 0 && daysUntilExpiration <= 30;
      } catch (error) {
        return false;
      }
    });

    return {
      totalValue,
      totalItems,
      lowStockProducts,
      expiringSoonProducts,
    };
  }, [products]);

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <h2 className="mb-0">Painel do Administrador</h2>
          <p className="text-muted">Visão geral do sistema e do inventário.</p>
        </Col>
      </Row>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={4}>
          <StatCard
            title="Valor Total do Inventário"
            value={dashboardStats.totalValue.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
            color="success"
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            title="Total de Itens em Estoque"
            value={dashboardStats.totalItems.toLocaleString("pt-BR")}
            color="info"
          />
        </Col>
        <Col md={6} lg={4}>
          <StatCard
            title="Alertas de Estoque Baixo"
            value={dashboardStats.lowStockProducts.length}
            color="warning"
          />
        </Col>
      </Row>

      {/* Alerts Lists */}
      <Row className="g-4">
        <Col lg={6}>
          <LowStockAlerts products={dashboardStats.lowStockProducts} />
        </Col>
        <Col lg={6}>
          <ExpirationAlerts products={dashboardStats.expiringSoonProducts} />
        </Col>
      </Row>

      {/* User Management Placeholder */}
      <Row className="mt-5">
        <Col>
          <h3 className="mb-3">Gerenciamento de Usuários</h3>
          <p className="text-muted">
            (Funcionalidade a ser implementada) - Aqui você poderá criar, editar
            e remover outros administradores e almoxarifes do sistema.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
