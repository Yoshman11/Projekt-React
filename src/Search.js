// Search.js
import React, { useState } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';

const Search = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Form inline className="mr-2" style={{ display: 'flex', alignItems: 'center' }}>
      <FormControl
        type="text"
        placeholder="Wpisz szukaną frazę"
        className="mr-sm-2"
        value={searchTerm}
        onChange={handleInputChange}
        style={{ flex: '1' }}
      />
      <Button variant="outline-success" onClick={handleSearch} style={{ flex: '0 0 auto' }}>Szukaj</Button>
    </Form>
  );
};

export default Search;
