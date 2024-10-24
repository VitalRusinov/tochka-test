import React, { useState } from 'react';
import './FilterButton.css'; // Подключим стили (опционально)

const FilterButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={toggleMenu}>
        Фильтры 
        <span className="triangle">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="filter-menu">
          <ul>
            <li>Опция 1</li>
            <li>Опция 2</li>
            <li>Опция 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterButton;
