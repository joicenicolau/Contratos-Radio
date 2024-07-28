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
import '../style/Dashboard.css';

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
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="chart-container">
        {contracts.length > 0 ? (
          <Pie data={contractStatusData} />
        ) : (
          <p>Carregando dados...</p>
        )}
      </div>
      <button className="view-contracts-button" onClick={() => navigate('/contracts')}>
        Ver Contratos
      </button>
    </div>
  );
}

export default Dashboard;
