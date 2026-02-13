// src/components/StatCard.tsx
import { Card } from 'react-bootstrap';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: string; // Optional: for a class like 'bi-archive-fill'
  color?: string; // Optional: Bootstrap background color e.g., 'primary', 'success'
}

const StatCard = ({ title, value, icon, color = 'primary' }: StatCardProps) => {
  return (
    <Card bg={color} text="white" className="h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Card.Title as="h5">{title}</Card.Title>
            <Card.Text as="h3" className="mb-0">{value}</Card.Text>
          </div>
          {icon && <i className={`${icon} h1`}></i>}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;
