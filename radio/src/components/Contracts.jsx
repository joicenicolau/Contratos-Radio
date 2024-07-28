import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import '../style/Contracts.css'; 
import ContractFormList from './ContractFormList';
import ContractTable from './ContractTable';
import Pagination from './Pagination';

function Contracts() {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editContract, setEditContract] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contractsPerPage = 10;

  const navigate = useNavigate();

  // Função para buscar contratos
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

  // UseEffect para buscar contratos 
  useEffect(() => {
    fetchContracts();
  }, []);

  // Função para deletar contrato
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://teste-front-1.azurewebsites.net/contracts/${id}`);
      setContracts(contracts.filter(contract => contract.id !== id));
    } catch (err) {
      console.error('Erro ao excluir contrato:', err);
    }
  };

  // Função para atualizar contrato
  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://teste-front-1.azurewebsites.net/contracts/${editContract.id}`, editContract, {
        headers: { 'Content-Type': 'application/json' }
      });
      setContracts(contracts.map(contract => contract.id === editContract.id ? editContract : contract));
      setEditMode(false);
      setEditContract(null);
    } catch (err) {
      console.error('Erro ao atualizar contrato:', err);
    }
  };

  // Formulário de edição
  const renderEditFormList = () => {
    if (!editContract) return null;
    return (
      <form onSubmit={handleUpdate} className="mb-4">
        <ContractFormList contract={editContract} setContract={setEditContract} />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-success me-2">Atualizar Contrato</button>
          <button type="button" className="btn btn-secondary" onClick={() => { setEditMode(false); setEditContract(null); }}>Cancelar</button>
        </div>
      </form>
    );
  };

  // Função para entrar no modo de edição
  const handleEdit = (contract) => {
    setEditContract({ ...contract });
    setEditMode(true);
  };

  // Paginação
  const indexOfLastContract = currentPage * contractsPerPage;
  const indexOfFirstContract = indexOfLastContract - contractsPerPage;
  const currentContracts = contracts.slice(indexOfFirstContract, indexOfLastContract);
  const totalPages = Math.ceil(contracts.length / contractsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Contratos</h2>
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-success" onClick={() => navigate('/create-contract')}>Criar Novo Contrato</button>
        <button className="btn btn-success" onClick={() => navigate('/dashboard')}>Ver Gráficos</button>
      </div>
      {editMode && renderEditFormList()}
      <ContractTable contracts={currentContracts} handleEdit={handleEdit} handleDelete={handleDelete} />
      <Pagination currentPage={currentPage} totalPages={totalPages} handleNextPage={handleNextPage} handlePreviousPage={handlePreviousPage} />
    </div>
  );
}

export default Contracts;
