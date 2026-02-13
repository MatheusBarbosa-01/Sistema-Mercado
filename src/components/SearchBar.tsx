// src/components/SearchBar.tsx
import { Form, InputGroup } from 'react-bootstrap';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  return (
    <InputGroup className="mb-3">
      <Form.Control
        placeholder="Buscar por nome ou categoria..."
        aria-label="Buscar produtos"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </InputGroup>
  );
};

export default SearchBar;
