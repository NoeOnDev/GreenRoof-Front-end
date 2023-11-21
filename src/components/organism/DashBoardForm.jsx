import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import '../../assets/styles/Dashboard.css';
import ApexCharts from 'react-apexcharts';
import Swal from 'sweetalert2';
import axios from 'axios';


function DashBoardForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [sensorData, setSensorData] = useState([]);
  const [dates, setDates] = useState([]);
  const [humedadData, setHumedadData] = useState([]);
  const [humedadDates, setHumedadDates] = useState([]);
  const [historicalData, setHistoricalData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Panel");


  const [temperatureChartData, setTemperatureChartData] = useState({
    series: [
      {
        name: "Temperatura Interna",
        data: [],
      },
      {
        name: "Temperatura Techo",
        data: [],
      },
    ],
    options: {
      chart: { height: 350, type: 'line',
        dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2
        },
        toolbar: { show: true,
          tools: { download: true, selection: true, zoom: true, zoomin: true, zoomout: true, pan: true, reset: true
          }
        }
      },
      colors: ['#ff0000', ' #ff5d00 '],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Promedio', align: 'left'
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: { text: 'Temperatura (°C)' }
      },
      legend: { position: 'bottom', horizontalAlign: 'center', floating: false, offsetY: 5, offsetX: 0 }
    }
  });

  const [humedadChartData, setHumedadChartData] = useState({
    series: [
      {
        name: "Humedad Interna",
        data: [],
      },
    ],
    options: {
      chart: { height: 350, type: 'line',
        dropShadow: { enabled: true, color: '#000', top: 18, left: 7, blur: 10, opacity: 0.2
        },
        toolbar: { show: true,
          tools: { download: true, selection: true, zoom: true, zoomin: true, zoomout: true, pan: true, reset: true
          }
        }
      },
      colors: ['#0479fe'],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Promedio', align: 'left'
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: []
      },
      yaxis: {
        title: {
          text: 'Humedad (%)'
        }
      },
      legend: { position: 'bottom', horizontalAlign: 'center', floating: false, offsetY: 5, offsetX: 0 }
    }
  });

  const handleLogout = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres cerrar sesión?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        window.location.href = '/';
      }
    });
  };
  

  const fetchHistoricalData = async () => {
    try {
      const response = await axios.get('https://q2gmqq0k-5000.usw3.devtunnels.ms/sensores');
      setHistoricalData((prevData) => [...response.data, ...prevData.slice(0, 100 - response.data.length)]);
    } catch (error) {
      console.error('Error al obtener datos históricos:', error.message);
    }
  };
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === "Historial") {
      fetchHistoricalData();
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, []);
  

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setSelectedOption("Panel");
  }, []);

  useEffect(() => {
    const socket = io('q2gmqq0k-5000.usw3.devtunnels.ms', {
      transports: ['websocket'],
    });
  
    socket.on('sensorData', (data) => {
      setSensorData((prevData) => [...prevData, data]);
      setDates((prevDates) => [...prevDates, data.fecha_registro]);
      setHumedadData((prevHumedadData) => [...prevHumedadData, data.humedad_dht]);
      setHumedadDates((prevHumedadDates) => [...prevHumedadDates, data.fecha_registro]);
      setHistoricalData((prevData) => [data, ...prevData.slice(0, 100 - 1)]);
    });
  
    return () => socket.disconnect();
  }, []);

  const maxDataPoints = 7;

  useEffect(() => {
    if (sensorData.length > 0) {
      setTemperatureChartData((prevChartData) => {
        const newTemperatureData = {
          series: [
            {
              name: "Temperatura (Interna)",
              data: sensorData.slice(-maxDataPoints).map((data) => data.temperatura_dht),
            },
            {
              name: "Temperatura (Techo)",
              data: sensorData.slice(-maxDataPoints).map((data) => data.temperatura_exterior),
            },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              categories: dates.slice(-maxDataPoints),
            },
          },
        };
        return newTemperatureData;
      });
    }
  }, [sensorData, dates, maxDataPoints]);

  useEffect(() => {
    if (humedadData.length > 0) {
      setHumedadChartData((prevChartData) => {
        const newHumedadData = {
          series: [
            {
              name: "Humedad (Interna)",
              data: humedadData.slice(-maxDataPoints),
            },
          ],
          options: {
            ...prevChartData.options,
            xaxis: {
              categories: humedadDates.slice(-maxDataPoints),
            },
          },
        };
        return newHumedadData;
      });
    }
  }, [humedadData, humedadDates, maxDataPoints]);

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
                <span>Gráficas</span>
              </li>
              <li
                  onClick={() => handleOptionClick("Cuenta")}
                  className={selectedOption === "Cuenta" ? "selected" : ""}
              >
                <i className="uil uil-user-circle"></i>
                <span>Cuenta</span>
              </li>
              <li
                  onClick={() => handleOptionClick("Historial")}
                  className={selectedOption === "Historial" ? "selected" : ""}
              >
                <i className="uil uil-history"></i>
                <span>Historial</span>
              </li>
              <li onClick={handleLogout}>
                <i className="uil uil-signin"></i>
                <button className="span2" >Salir</button>
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
          
        {selectedOption === "Panel" && (
          <div>
            <div className="contenedor-dash">
              <div className="cards">
                <div className="single-card">
                  <div>
                    <span>TEMPERATURA (INTERNA)</span>
                    <h2>{sensorData.length > 0 ? `${sensorData[sensorData.length - 1].temperatura_dht} ºC` : 'Cargando...'}</h2>
                  </div>
                  <i className="uil uil-temperature-three-quarter"></i>
                </div>
                <div className="single-card">
                  <div>
                    <span>HUMEDAD (INTERNA)</span>
                    <h2>{sensorData.length > 0 ? `${sensorData[sensorData.length - 1].humedad_dht} %` : 'Cargando...'}</h2>
                  </div>
                  <i className="uil uil-tear"></i>
                </div>
                <div className="single-card">
                  <div>
                    <span>TEMPERATURA (TECHO)</span>
                    <h2>{sensorData.length > 0 ? `${sensorData[sensorData.length - 1].temperatura_exterior} ºC` : 'Cargando...'}</h2>
                  </div>

                  <i className="uil uil-temperature-three-quarter"></i>
                </div>

                <div className="single-card">
                  <div>
                    <span>HUMEDAD (TECHO)</span>
                    <h2>{sensorData.length > 0 ? `${sensorData[sensorData.length - 1].estado_suelo} ` : 'Cargando...'}</h2>
                  </div>
                  <i className="uil uil-tear"></i>
                </div>
              </div>

              <div className="wrapper flex">
                <div className="customers">
                  <div className="card-header flex">
                    <h3>Gráfica Temperatura</h3>
                  </div>
                  <div className="tabla-graficas">
                    <ApexCharts
                        options={temperatureChartData.options}
                        series={temperatureChartData.series}
                        type="line"
                        height={400}
                    />
                  </div>
                </div>
              </div>

              <div className="wrapper flex">
                <div className="customers">
                  <div className="card-header flex">
                    <h3>Gráfica Humedad</h3>
                  </div>
                  <div className="tabla-graficas">
                    <ApexCharts
                        options={humedadChartData.options}
                        series={humedadChartData.series}
                        type="line"
                        height={400}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === "Graficas" && (
          <div>
            <h1>Gráficas</h1>
            
          </div>
        )}

        {selectedOption === "Cuenta" && (
          <div>
            <h1>Cuenta</h1>
            
          </div>
        )}

        {selectedOption === "Historial" && (
          <div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Fecha Registro</th>
                    <th>Temperatura (Interna)</th>
                    <th>Humedad (Interna)</th>
                    <th>Temperatura (Techo)</th>
                    <th>Estado del Suelo</th>
                  </tr>
                </thead>
                <tbody>
                  {historicalData.map((data, index) => (
                    <tr key={index}>
                      <td>{data.fecha_registro}</td>
                      <td>{typeof data.temperatura_dht === 'number' ? data.temperatura_dht.toFixed(2) + ' ºC' : data.temperatura_dht + ' ºC'}</td>
                      <td>{typeof data.humedad_dht === 'number' ? data.humedad_dht.toFixed(2) + ' %' : data.humedad_dht + ' %'}</td>
                      <td>{typeof data.temperatura_exterior === 'number' ? data.temperatura_exterior.toFixed(2) + ' ºC' : data.temperatura_exterior + ' ºC'}</td>
                      <td>{data.estado_suelo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
          
        </div>
      </div>
  );
}

export default DashBoardForm;