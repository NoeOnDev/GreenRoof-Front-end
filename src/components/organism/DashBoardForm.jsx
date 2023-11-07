import React, { useState, useEffect } from 'react';
import '../../assets/styles/Dashboard.css';
import ApexCharts from 'react-apexcharts';
import Swal from 'sweetalert2';

function DashBoardForm() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("Panel");


  const [temperatureChartData, setTemperatureChartData] = useState({
    series: [
      {
        name: "Temperatura (Interna)",
        data: [25, 22, 27, 30, 31, 28, 29]
      },
      {
        name: "Temperatura (Techo)",
        data: [33, 32, 34, 35, 36, 35, 34]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
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
        text: 'Promedio',
        align: 'left'
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
      },
      yaxis: {
        title: {
          text: 'Temperatura (°C)'
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        offsetY: 5,
        offsetX: 0
      }
    }
  });

  const [humedadChartData, setHumedadChartData] = useState({
    series: [
      {
        name: "Humedad (Interna)",
        data: [47, 61, 58, 67, 71, 74, 65]
      },
      {
        name: "Humedad (Techo)",
        data: [51, 60, 72, 64, 67, 70, 68]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
            selection: true,
            zoom: true,
            zoomin: true,
            zoomout: true,
            pan: true,
            reset: true
          }
        }
      },
      colors: ['#0479fe', ' #04befe '],
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Promedio',
        align: 'left'
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do']
      },
      yaxis: {
        title: {
          text: 'Humedad (%)'
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
        offsetY: 5,
        offsetX: 0
      }
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
        window.location.href = '/auth';
      }
    });
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
    setSelectedOption("Panel");
  }, []);


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
              <li onClick={handleLogout}>
                <i className="uil uil-signin"></i>
                <button className="span2" >Cerrar sesión</button>
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
                  <h3>Gráfica Temperatura</h3>
                </div>
                <div className="tabla-graficas">
                  <ApexCharts
                      options={temperatureChartData.options}
                      series={temperatureChartData.series}
                      type="line"
                      height={450}
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
                      height={450}
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