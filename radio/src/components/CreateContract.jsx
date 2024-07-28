import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/CreateContract.css';
import ContractForm from './ContractForm';

function CreateContract() {
  const [formData, setFormData] = useState({
    clientName: '',
    startDate: '',
    endDate: '',
    value: '',
    status: 'ativo'
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { clientName, startDate, endDate, value, status } = formData;

    // Verifica se todos os campos estão preenchidos
    if (!clientName || !startDate || !endDate || !value || !status) {
      setError('Por favor, preencha todos os campos antes de criar o contrato.');
      return;
    }

    try {
      await axios.post('https://teste-front-1.azurewebsites.net/contracts', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      navigate('/contracts');
    } catch (err) {
      setError('Erro ao criar contrato.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Criar Novo Contrato</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <ContractForm contract={formData} setContract={setFormData} />
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">Criar Contrato</button>
        </div>
      </form>
    </div>
  );
}

export default CreateContract;
