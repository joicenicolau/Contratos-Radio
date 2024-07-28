import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import '../style/CreateContract.css'; // Importar estilos personalizados, se necessário

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
    <div className="container mt-5">
      <h2 className="text-center mb-4">Criar Novo Contrato</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="clientName" className="form-label">Nome do Cliente:</label>
                <input
                  type="text"
                  className={`form-control ${errors.clientName ? 'is-invalid' : ''}`}
                  id="clientName"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                />
                {errors.clientName && <div className="invalid-feedback">{errors.clientName}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">Data de Início:</label>
                <input
                  type="date"
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">Data de Término:</label>
                <input
                  type="date"
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="value" className="form-label">Valor:</label>
                <input
                  type="number"
                  className={`form-control ${errors.value ? 'is-invalid' : ''}`}
                  id="value"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                />
                {errors.value && <div className="invalid-feedback">{errors.value}</div>}
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <select
                  className={`form-select ${errors.status ? 'is-invalid' : ''}`}
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="ativo">Ativo</option>
                  <option value="expirado">Expirado</option>
                  <option value="pendente">Pendente</option>
                </select>
                {errors.status && <div className="invalid-feedback">{errors.status}</div>}
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? 'Criando...' : 'Criar Contrato'}
              </button>
              {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
              {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
            </form>
            <div className="mt-3">
              <button className="btn btn-secondary me-2" onClick={() => navigate('/contracts')}>
                Ir para a Lista de Contratos
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Ir para o Gráfico
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateContract;
