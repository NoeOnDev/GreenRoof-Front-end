import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import '../../assets/styles/Auth.css';
import validator from 'validator';
import log from '../../assets/img/log.svg';
import register from '../../assets/img/register.svg';
import Swal from 'sweetalert2';
import config from "../../config.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";


function AuthForm() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState(''); // Nueva confirmación de contraseña
    const [isSignUpMode, setSignUpMode] = useState(false);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const isStrongPassword = (password) => {
        const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
        return strongPasswordRegex.test(password);
    };

    const mostrarAdvertencia = (mensaje) => {
        setIsSubmitting(false);
        Swal.fire('Advertencia', mensaje, 'warning');
      };

    const emailVerificationApiKey = 'at_31YSS1nYeaG46WNuxbyCdeU34WxxX'; 
    

    const handleSubmitLogin = async (e) => {
        e.preventDefault();
      
        try {
          if (isSubmitting || isLoading) {
            return;
        }
        setIsSubmitting(true);
        setIsLoading(true);
      
          if (!email || !password) {
            mostrarAdvertencia('Por favor complete todos los campos requeridos antes de iniciar sesión');
            return;
          }
      
          if (!validator.isEmail(email)) {
            mostrarAdvertencia('El correo electrónico no es válido.');
            return;
          }
      
          if (!recaptchaValue) {
            mostrarAdvertencia('Completa el reCAPTCHA para continuar');
            return;
          }
      
          const formData = { email, password, recaptchaValue };
      
          const response = await fetch('https://q2gmqq0k-3000.usw3.devtunnels.ms/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!response.ok) {
            const data = await response.json();
            mostrarAdvertencia(data.error);
            return;
          }
      
          const data = await response.json();
      
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', data.username);
      
          Swal.fire('Éxito', data.message, 'success');
      
          setEmail('');
          setPassword('');
          navigate('/');
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          mostrarAdvertencia('Ocurrió un error al enviar los datos');
        } finally {
          setIsSubmitting(false);
          setIsLoading(false);
        }
      };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          if (isSubmitting || isLoading) {
              return;
          }
          setIsSubmitting(true);
          setIsLoading(true);
      
          if (!email || !username || !password || !confirmPassword) {
            return mostrarAdvertencia('Por favor complete todos los campos requeridos antes de registrarse');
          }
      
          if (!validator.isEmail(email)) {
            return mostrarAdvertencia('El correo electrónico no es válido.');
          }
      
          if (!isStrongPassword(password)) {
            return mostrarAdvertencia('La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
          }
      
          if (password !== confirmPassword) {
            return mostrarAdvertencia('Las contraseñas no coinciden');
          }
      
          const responseEmailVerification = await fetch(
            `https://emailverification.whoisxmlapi.com/api/v2?apiKey=${emailVerificationApiKey}&emailAddress=${email}`
          );
          const dataEmailVerification = await responseEmailVerification.json();
      
          if (dataEmailVerification.smtpCheck === 'false') {
            return mostrarAdvertencia('El correo electrónico no existe.');
          }
      
          const formData = { email, username, password };
      
          const responseRegister = await fetch('https://q2gmqq0k-3000.usw3.devtunnels.ms/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
      
          if (!responseRegister.ok) {
            const dataRegister = await responseRegister.json();
            return mostrarAdvertencia(dataRegister.error);
          }
      
          Swal.fire('Éxito', 'Por favor revise su correo electrónico y siga las instrucciones para su verificación.', 'success');
          setEmail('');
          setUsername('');
          setPassword('');
          setConfirmPassword('');
          setSignUpMode(false);
        } catch (error) {
          console.error('Error al enviar los datos:', error);
          mostrarAdvertencia('Ocurrió un error al enviar los datos');
        } finally {
          setIsSubmitting(false);
          setIsLoading(false);
      }
      };


    const handleRecaptchaChange = (value) => {
        setRecaptchaValue(value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    const toggleMode = () => {
        setSignUpMode(!isSignUpMode);
        setEmail('');
        setUsername('');
        setPassword('');
        setConfirmPassword('');
        setShowPassword('');
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
          {isLoading && (
            <div className="loader-container">
              <div class="loader"></div>
            </div>
          )}
            <div className="forms-container">
                <div className="signin-signup">

                    <form onSubmit={handleSubmitLogin} className="sign-in-form">
                        <h2 className="title">Inicio de sesión</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={handlePasswordChange} />
                            <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <Link to="/forgot" className="ya">¿Olvidaste tu contraseña?</Link>
                        <div className="captcha">
                            <ReCAPTCHA sitekey={config.REACT_APP_RECAPTCHA_SITEKEY} onChange={handleRecaptchaChange} />
                        </div>

                        <input type="submit" className="btn" value={isLoading ? 'Procesando...' : 'Iniciar Sesión'} disabled={isSubmitting || isLoading} />
                    </form>


                    <form onSubmit={handleSubmit} className="sign-up-form">
                        <h2 className="title">Registro</h2>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input type="email" placeholder="Correo electrónico" value={email} onChange={handleEmailChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input type="text" placeholder="Nombre de usuario" value={username} onChange={handleUsernameChange} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} placeholder="Contraseña" value={password} onChange={handlePasswordChange}/>
                            <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input type={showPassword ? "text" : "password"} placeholder="Confirmar contraseña" value={confirmPassword} onChange={handleConfirmPasswordChange}/>
                            <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="captcha"></div>
                          <input type="submit" className="btn" value={isLoading ? 'Procesando...' : 'Registrarse'} disabled={isSubmitting || isLoading} />
                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>Aún no eres miembro de GreenRoof?</h3>
                        <p className="parrafo">
                            Aún no eres miembro en GreenRoof? puedes ir a registrarte desde aquí.
                        </p>
                        <button className="btn transparent" onClick={toggleMode}>
                            Registrarte
                        </button>
                    </div>
                    <img src={log} className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>Ya eres miembro de GreenRoof?</h3>
                        <p className="parrafo">
                            Ya eres miembro de GreenRoof? puedes iniciar sesión desde aquí
                        </p>
                        <button className="btn transparent" onClick={toggleMode}>
                            Inicia sesión
                        </button>
                    </div>
                    <img src={register} className="image" alt="" />
                </div>
            </div>
        </div>
    );
};
export default AuthForm;
