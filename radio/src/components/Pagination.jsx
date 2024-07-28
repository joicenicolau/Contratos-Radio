import React from 'react';

const Pagination = ({ currentPage, totalPages, handleNextPage, handlePreviousPage }) => (
  <nav aria-label="Page navigation">
    <ul className="pagination">
      <li className="page-item">
        <button className="page-link" onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</button>
      </li>
      <li className="page-item disabled"><span className="page-link">Página {currentPage} de {totalPages}</span></li>
      <li className="page-item">
        <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages}>Próxima</button>
      </li>
    </ul>
  </nav>
);

export default Pagination;