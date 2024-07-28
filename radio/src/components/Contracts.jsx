import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/Contracts.css';

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
      <form onSubmit={handleUpdate}>
        <div>
          <label>Nome do Cliente:</label>
          <input
            type="text"
            value={editContract.clientName}
            onChange={(e) => setEditContract({ ...editContract, clientName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            value={editContract.startDate}
            onChange={(e) => setEditContract({ ...editContract, startDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Data de Término:</label>
          <input
            type="date"
            value={editContract.endDate}
            onChange={(e) => setEditContract({ ...editContract, endDate: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={editContract.value}
            onChange={(e) => setEditContract({ ...editContract, value: parseFloat(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={editContract.status}
            onChange={(e) => setEditContract({ ...editContract, status: e.target.value })}
            required
          >
            <option value="ativo">Ativo</option>
            <option value="expirado">Expirado</option>
            <option value="pendente">Pendente</option>
          </select>
        </div>
        <button type="submit">Atualizar Contrato</button>
        <button type="button" onClick={() => { setEditMode(false); setEditContract(null); }}>Cancelar</button>
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="contract-list">
      <h2>Lista de Contratos</h2>
      <button className="create-contract-button" onClick={() => navigate('/create-contract')}>
        Criar Novo Contrato
      </button>
      {editMode && renderEditForm()}
      <table>
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
                <button onClick={() => handleEdit(contract)}>Editar</button>
                <button onClick={() => handleDelete(contract.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
}

export default Contracts;
