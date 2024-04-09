import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import dog from '../../assets/img/register.svg';
import dog2 from '../../assets/img/log.svg';
import dog3 from '../../assets/img/person5.svg';
import '../../assets/styles/ForgotPassword.css';

const ForgotPasswordForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password) => {
    const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleNext = () => {
    setStep(step + 1);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handlePrevious = () => {
    setStep(step - 1);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleCancel = () => {
    navigate('/auth');
  };

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (callbackFunction) => {
    if (isSubmitting || isLoading) {
      return;
    }

    setIsSubmitting(true);
    setIsLoading(true);
    clearMessages();

    try {
      await callbackFunction();
    } finally {
      setIsSubmitting(false);
      setIsLoading(false);
    }
  };

  const mostrarMensaje = (tipo, mensaje) => {
    Swal.fire({ icon: tipo, title: tipo === 'error' ? 'Error' : 'Éxito', text: mensaje });
  };

  const handleRequestCode = async () => {
    if (!email) {
      mostrarMensaje('warning', 'El campo de correo electrónico es obligatorio.');
      return;
    }

    if (!isValidEmail(email)) {
      mostrarMensaje('error', 'El correo electrónico no es válido.');
      return;
    }

    await handleSubmit(async () => {
      try {
        const response = await axios.post('http://localhost:3000/solicitar-cambio-contrasena', { email });

        if (response.data && response.data.error === 'Correo no verificado') {
          mostrarMensaje('error', 'El correo electrónico no está verificado. Verifica tu correo electrónico antes de solicitar un cambio de contraseña.');
          return;
        }

        if (response.data && response.data.error === 'El correo electrónico no está registrado') {
          mostrarMensaje('error', 'El correo electrónico no está registrado en nuestra plataforma.');
          return;
        }

        mostrarMensaje('success', 'Solicitud de cambio de contraseña enviada con éxito.');
        handleNext();
      } catch (error) {
        if (error.response && error.response.data) {
          mostrarMensaje('error', error.response.data.error);
        } else {
          mostrarMensaje('error', 'Hubo un error al solicitar el cambio de contraseña. Inténtalo de nuevo.');
        }
        console.error('Error requesting verification code:', error);
      }
    });
  };

  const handleVerifyCode = async () => {
    if (!email || !verificationCode) {
      mostrarMensaje('warning', 'El campo de Código de verificación es obligatorio.');
      return;
    }

    await handleSubmit(async () => {
      try {
        const response = await axios.post('http://localhost:3000/verificar-codigo', { email, verificationCode });

        if (response.data && response.data.message === 'Código de verificación válido') {
          mostrarMensaje('success', 'Código de verificación válido.');
          handleNext();
        } else {
          mostrarMensaje('error', 'El código de verificación no es válido.');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          mostrarMensaje('error', error.response.data.error);
        } else {
          mostrarMensaje('error', 'Hubo un error al verificar el código. Inténtalo de nuevo.');
        }
        console.error('Error verifying code:', error);
      }
    });
  };

  const handleChangePassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      mostrarMensaje('error', 'Todos los campos son obligatorios');
      return;
    }

    if (!isStrongPassword(newPassword)) {
      mostrarMensaje('error', 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula y un número');
      return;
    }

    if (newPassword !== confirmPassword) {
      mostrarMensaje('error', 'Las contraseñas no coinciden');
      return;
    }

    const data = {
      email,
      newPassword,
      confirmPassword,
    };

    await handleSubmit(async () => {
      try {
        const response = await axios.post('http://localhost:3000/cambiar-contrasena', data);

        Swal.fire('Éxito', 'Se cambió su contraseña con éxito', 'success').then(() => {
          window.location.href = '/auth';
        });
      } catch (error) {
        if (error.response && error.response.data) {
          mostrarMensaje('error', error.response.data.error);
        } else {
          mostrarMensaje('error', 'Hubo un error al cambiar la contraseña. Inténtalo de nuevo.');
        }
        console.error('Error changing password:', error);
      }
    });
  };

  return (
    <div className="forgot-container">
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}

      {step === 1 && (
        <div className="container-form-forgot">
          <form className="form-main" key={step}>
            <h2 className="title-forgot">Solicitar cambio de contraseña</h2>
            <div className="input-field-email">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={clearMessages} />
            </div>
            <div className="relleno"></div>
            <div className="button-container">
              <button className="btn-cancel solid" type="button" onClick={handleCancel}>Cancelar</button>
              <button className="btn-next solid" type="button" onClick={handleRequestCode} disabled={isSubmitting || isLoading}>
                {isSubmitting ? 'Procesando...' : 'Enviar'}
              </button>
            </div>
          </form>
          <div className="imagen-content">
            <div>
              <p className="nota-par">Se le enviará un código de verificación a su correo electrónico, para que pueda continuar con el proceso de cambio de contraseña.</p>
            </div>
            <img className="noneimg" src={dog} alt="" />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="container-form-forgot">
          <form className="form-main" key={step}>
            <h2 className="title-forgot">Confirmar código de verificación</h2>
            <div className="input-field-email">
              <i className="fas fa-key"></i>
              <input type="text" placeholder="Código de verificación" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
            </div>
            <div className="relleno"></div>
            <div className="button-container">
              <button className="btn-cancel solid" type="button" onClick={handleCancel}>Cancelar</button>
              <button className="btn-next solid" type="button" onClick={handleVerifyCode} disabled={isSubmitting || isLoading}>
                {isSubmitting ? 'Procesando...' : 'Confirmar'}
              </button>
            </div>
          </form>
          <div className="imagen-content">
            <div>
              <p className="parrafito">El código de verificación se envió al correo: {email}</p>
            </div>
            <img className="noneimg" src={dog2} alt="" />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="container-form-forgot">
          <form className="form-main" key={step}>
            <h2 className="title-forgot">Realizar cambio de contraseña</h2>
            <div className="input-field-email">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                value={newPassword}
                onFocus={() => setErrorMessage('')}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="input-field-email">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onFocus={() => setErrorMessage('')}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" onClick={togglePasswordVisibility} className="password-toggle">
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            <div className="relleno"></div>
            <div className="button-container">
              <button className="btn-cancel solid" type="button" onClick={handleCancel}>
                Cancelar
              </button>
              <button className="btn-next solid" type="button" onClick={handleChangePassword} disabled={isSubmitting || isLoading}>
                {isSubmitting ? 'Cambiando...' : 'Cambiar'}
              </button>
            </div>
          </form>
          <div className="imagen-content">
            <div>
              <p className="parrafito">Está a punto de cambiar la contraseña de: {email}</p>
            </div>
            <img className="noneimg" src={dog3} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgotPasswordForm;