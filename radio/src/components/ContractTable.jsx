import React from 'react';

const ContractTable = ({ contracts, handleEdit, handleDelete }) => (
  <div className="table-responsive">
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          <th>Nome do Cliente</th>
          <th>Data de Início</th>
          <th>Data de Término</th>
          <th>Valor do Contrato</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {contracts.map(contract => (
          <tr key={contract.id}>
            <td>{contract.clientName}</td>
            <td>{contract.startDate}</td>
            <td>{contract.endDate}</td>
            <td>{contract.value}</td>
            <td>{contract.status}</td>
            <td>
              <button className="btn btn-warning me-2" onClick={() => handleEdit(contract)}>Editar</button>
              <button className="btn btn-danger" onClick={() => handleDelete(contract.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ContractTable;