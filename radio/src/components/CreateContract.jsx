import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../style/CreateContract.css'; 

function CreateContract() {
  const [formData, setFormData] = useState({
    clientName: '',
    startDate: '',
    endDate: '',
    value: '',
    status: 'ativo',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.clientName) newErrors.clientName = 'Nome do cliente é obrigatório.';
    if (!formData.startDate) newErrors.startDate = 'Data de início é obrigatória.';
    if (!formData.endDate) newErrors.endDate = 'Data de término é obrigatória.';
    if (!formData.value) newErrors.value = 'Valor é obrigatório.';
    if (!formData.status) newErrors.status = 'Status é obrigatório.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await axios.post('https://teste-front-1.azurewebsites.net/contracts', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccessMessage('Contrato criado com sucesso!');
      navigate('/contracts');
      navigate('/dashboard');
      setFormData({
        clientName: '',
        startDate: '',
        endDate: '',
        value: '',
        status: 'ativo',
      });
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      setErrorMessage('Erro ao criar contrato.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-contract">
      <h2>Criar Novo Contrato</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome do Cliente:</label>
          <input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
          />
          {errors.clientName && <p>{errors.clientName}</p>}
        </div>
        <div>
          <label>Data de Início:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
          />
          {errors.startDate && <p>{errors.startDate}</p>}
        </div>
        <div>
          <label>Data de Término:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
          />
          {errors.endDate && <p>{errors.endDate}</p>}
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            name="value"
            value={formData.value}
            onChange={handleChange}
          />
          {errors.value && <p>{errors.value}</p>}
        </div>
        <div>
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="ativo">Ativo</option>
            <option value="expirado">Expirado</option>
            <option value="pendente">Pendente</option>
          </select>
          {errors.status && <p>{errors.status}</p>}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Criando...' : 'Criar Contrato'}
        </button>
        {successMessage && <p>{successMessage}</p>}
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <div className="button-group">
        <button onClick={() => navigate('/contracts')}>Ir para a Lista de Contratos</button>
        <button onClick={() => navigate('/dashboard')}>Ir para o Gráfico</button>
      </div>
    </div>
  );
}

export default CreateContract;
