import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import '../style/Contracts.css'; // Importar estilos personalizados, se necessário

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editContract, setEditContract] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contractsPerPage = 10;

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('https://teste-front-1.azurewebsites.net/contracts');
        setContracts(response.data);
      } catch (err) {
        setError('Erro ao carregar contratos.');
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://teste-front-1.azurewebsites.net/contracts/${id}`);
      setContracts(contracts.filter(contract => contract.id !== id));
    } catch (err) {
      console.error('Erro ao excluir contrato:', err);
    }
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://teste-front-1.azurewebsites.net/contracts/${editContract.id}`, editContract, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setContracts(contracts.map(contract => contract.id === editContract.id ? editContract : contract));
      setEditMode(false);
      setEditContract(null);
    } catch (err) {
      console.error('Erro ao atualizar contrato:', err);
    }
  };

  const renderEditForm = () => {
    if (!editContract) return null;
    return (
      <form onSubmit={handleUpdate} className="mb-4">
        <div className="mb-3">
          <label htmlFor="clientName" className="form-label">Nome do Cliente:</label>
          <input
            type="text"
            className="form-control"
            id="clientName"
            value={editContract.clientName}
            onChange={(e) => setEditContract({ ...editContract, clientName: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">Data de Início:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={editContract.startDate}
            onChange={(e) => setEditContract({ ...editContract, startDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">Data de Término:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={editContract.endDate}
            onChange={(e) => setEditContract({ ...editContract, endDate: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="value" className="form-label">Valor:</label>
          <input
            type="number"
            className="form-control"
            id="value"
            value={editContract.value}
            onChange={(e) => setEditContract({ ...editContract, value: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Status:</label>
          <select
            className="form-select"
            id="status"
            value={editContract.status}
            onChange={(e) => setEditContract({ ...editContract, status: e.target.value })}
            required
          >
            <option value="ativo">Ativo</option>
            <option value="expirado">Expirado</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary me-2">Atualizar Contrato</button>
        <button type="button" className="btn btn-secondary" onClick={() => { setEditMode(false); setEditContract(null); }}>Cancelar</button>
      </form>
    );
  };

  const handleEdit = (contract) => {
    setEditContract({ ...contract });
    setEditMode(true);
  };

  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contracts.slice(indexOfFirstContract, indexOfLastContract);

  const totalPages = Math.ceil(contracts.length / contractsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Contratos</h2>
      <button className="btn btn-success mb-4" onClick={() => navigate('/create-contract')}>
        Criar Novo Contrato
      </button>
      {editMode && renderEditForm()}
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
            {currentContracts.map(contract => (
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
    </div>
  );
}

export default Contracts;
