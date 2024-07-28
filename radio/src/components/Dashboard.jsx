import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; // Importando o CSS do Bootstrap
import '../style/Dashboard.css'; // Importar estilos personalizados, se necessário

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [contracts, setContracts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const response = await axios.get('https://teste-front-1.azurewebsites.net/contracts');
        console.log('Dados dos contratos:', response.data);  
        setContracts(response.data);
      } catch (error) {
        console.error("Erro ao buscar contratos:", error);
      }
    };
    fetchContracts();
  }, []);

  const contractStatusData = {
    labels: ['Ativo', 'Expirado', 'Pendente'],
    datasets: [
      {
        label: 'Status dos Contratos',
        data: [
          contracts.filter(contract => contract.status === 'ativo').length,
          contracts.filter(contract => contract.status === 'expirado').length,
          contracts.filter(contract => contract.status === 'pendente').length,
        ],
        backgroundColor: ['#4caf50', '#f44336', '#ff9800'],
      },
    ],
  };

  console.log('Dados para o gráfico:', contractStatusData); 

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Dashboard</h2>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow">
            <div className="chart-container mb-4">
              {contracts.length > 0 ? (
                <Pie data={contractStatusData} />
              ) : (
                <p>Carregando dados...</p>
              )}
            </div>
            <button 
              className="btn btn-primary w-100"
              onClick={() => navigate('/contracts')}
            >
              Ver Contratos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
