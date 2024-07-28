import React from 'react';

const ContractForm = ({ contract, setContract }) => (
  <>
    <div className="mb-3">
      <label htmlFor="clientName" className="form-label">Nome do Cliente:</label>
      <input
        type="text"
        className="form-control"
        id="clientName"
        name="clientName"
        value={contract.clientName}
        onChange={(e) => setContract({ ...contract, clientName: e.target.value })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="startDate" className="form-label">Data de Início:</label>
      <input
        type="date"
        className="form-control"
        id="startDate"
        name="startDate"
        value={contract.startDate}
        onChange={(e) => setContract({ ...contract, startDate: e.target.value })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="endDate" className="form-label">Data de Término:</label>
      <input
        type="date"
        className="form-control"
        id="endDate"
        name="endDate"
        value={contract.endDate}
        onChange={(e) => setContract({ ...contract, endDate: e.target.value })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="value" className="form-label">Valor:</label>
      <input
        type="number"
        className="form-control"
        id="value"
        name="value"
        value={contract.value}
        onChange={(e) => setContract({ ...contract, value: parseFloat(e.target.value) })}
        required
      />
    </div>
    <div className="mb-3">
      <label htmlFor="status" className="form-label">Status:</label>
      <select
        className="form-select"
        id="status"
        name="status"
        value={contract.status}
        onChange={(e) => setContract({ ...contract, status: e.target.value })}
        required
      >
        <option value="ativo">Ativo</option>
        <option value="expirado">Expirado</option>
        <option value="pendente">Pendente</option>
      </select>
    </div>
  </>
);

export default ContractForm;
