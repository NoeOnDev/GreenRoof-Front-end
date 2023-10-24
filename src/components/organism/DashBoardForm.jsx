import React, { useState, useEffect } from 'react';
import '../../assets/styles/Dashboard.css';
import ApexCharts from 'react-apexcharts';
import Swal from 'sweetalert2';


function DashBoardForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("Panel");

  const [temperatureChartData, setTemperatureChartData] = useState({
    series: [  
      {
        name: 'Temperatura (Interna)',
        data: [27, 28, 29, 30, 31, 32, 33],
      },
      {
        name: 'Temperatura (Techo)',
        data: [33, 32, 34, 35, 36, 35, 34],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + ' °C';
          },
        },
      },
    },
  });

  const [humidityChartData, setHumidityChartData] = useState({
    series: [
      {
        name: 'Humedad (Interna)',
        data: [40, 45, 42, 50, 55, 60, 58],
      },
      {
        name: 'Humedad (Techo)',
        data: [55, 60, 58, 62, 65, 60, 59],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19T00:00:00.000Z',
          '2018-09-19T01:30:00.000Z',
          '2018-09-19T02:30:00.000Z',
          '2018-09-19T03:30:00.000Z',
          '2018-09-19T04:30:00.000Z',
          '2018-09-19T05:30:00.000Z',
          '2018-09-19T06:30:00.000Z',
        ],
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm',
        },
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return val + ' %';
          },
        },
      },
    },
  });

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/auth';
      }
    });
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setSelectedOption("Panel");
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option); 
  };
 
  
  return (
    <div>
      <div className={`sidebar ${isMenuOpen ? 'toggleMenu' : ''}`}>
        <div className="logo-dash">
          <h2>
            <i className="uil-pagelines"></i>
            GreenRoof
          </h2>
        </div>
  
        <div className="sidebar-menu">
        <ul>
          <li
            onClick={() => handleOptionClick("Panel")}
            className={selectedOption === "Panel" ? "selected" : ""}
          >
            <i className="uil uil-dashboard"></i>
            <span>Panel</span>
          </li>
          <li
            onClick={() => handleOptionClick("Graficas")}
            className={selectedOption === "Graficas" ? "selected" : ""}
          >
            <i className="uil uil-chart-bar"></i>
            <span>Graficas</span>
          </li>
          <li
            onClick={() => handleOptionClick("Cuenta")}
            className={selectedOption === "Cuenta" ? "selected" : ""}
          >
            <i className="uil uil-user-circle"></i>
            <span>Cuenta</span>
          </li>
          <li>
            <i className="uil uil-signin"></i>
            <button className="span2" onClick={handleLogout}>Cerrar sesión</button>
          </li>
        </ul>
        </div>
      </div>
  
      <div className={`main-content ${isMenuOpen ? 'toggleContent' : ''}`}>
        <div className="header-dash">
          <div className="flex">
            <h2>
              <i
                className="uil uil-bars"
                id="menu-icon"
                onClick={toggleMenu}
              ></i>
            </h2>
  
            <div className="admin-box flex">
              <div className="imagen-perfil">{username.charAt(0)}</div>
              <div>
                <h4 className="nombre-ci-2">{username}</h4>
                <div className="nombre-ci">
                  <small>Activo</small>
                  <div className="green-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <div className="contenedor-dash">
          <div className="cards">
            <div className="single-card">
              <div>
                <span>TEMPERATURA (INTERNA)</span>
                <h2>27 ºC</h2>
              </div>
              <i className="uil uil-temperature-three-quarter"></i>
            </div>
            <div className="single-card">
              <div>
                <span>HUMEDAD (INTERNA)</span>
                <h2>67 %</h2>
              </div>
              <i className="uil uil-tear"></i>
            </div>
            <div className="single-card">
              <div>
                <span>TEMPERATURA (TECHO)</span>
                <h2>34 ºC</h2>
              </div>
              <i className="uil uil-temperature-three-quarter"></i>
            </div>
  
            <div className="single-card">
              <div>
                <span>HUMEDAD (TECHO)</span>
                <h2>49 %</h2>
              </div>
              <i className="uil uil-tear"></i>
            </div>
          </div>
  
          <div className="wrapper flex">
            <div className="customers">
              <div className="card-header flex">
                <h3>Grafica Temperatura</h3>
              </div>
              <div className="tabla-graficas">
                <ApexCharts
                  options={temperatureChartData.options}
                  series={temperatureChartData.series}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>
  
          <div className="wrapper flex">
            <div className="customers">
              <div className="card-header flex">
                <h3>Grafica Humedad</h3>
              </div>
              <div className="tabla-graficas">
                <ApexCharts
                  options={humidityChartData.options}
                  series={humidityChartData.series}
                  type="area"
                  height={350}
                />
              </div>
            </div>
          </div>
          {/*Aqui un titulo de GRAFICAS Y ME MUESTRE MAS GRAFICAS PERO SERÍA OTRA SECCION, PERO NO ES LO MISMO QUE UN STEP*/}
          
        </div>
      </div>
    </div>
  );
  
}

export default DashBoardForm;