import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../api/userApi';
import styles from './Login.module.scss';
import Header from '../shared/Header/header/Header';
import Frame from '../../icons/frame.svg';
import Footer from '../shared/Header/footer/Footer';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [tipoDocumento, setTipoDocumento] = useState('DNI');
  const [documento, setDocumento] = useState('');
  const [celular, setCelular] = useState('');
  const [aceptoPolitica, setAceptoPolitica] = useState(false);
  const [aceptoComunicaciones, setAceptoComunicaciones] = useState(false);

  const validateFields = () => {
    if (!documento || !celular) {
      setError('Todos los campos son obligatorios');
      return false;
    }
    if (!aceptoPolitica || !aceptoComunicaciones) {
      setError('Debe aceptar todas las Políticas');
      return false;
    }
    setError('');
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const isValid = validateFields();
  
    if (isValid) {
      try {
        const data = await getUserData();
        const userData = { ...data, documento, celular };
        setUser(userData);
        navigate('/plans');
      } catch (error) {
        setError('Hubo un problema al obtener los datos del usuario.');
      }
    }
  };

  return (
    <div>
      <div className={styles['login-page']}>
        <Header></Header>
        <div className={styles['form-container']}>
        <div className={styles['form-image']}>
            <img
              loading="lazy"
              src={Frame}
              alt="Onboarding"
            />
        </div>
        <div className={styles['form-content']}>
          <div className={styles['form-wrapper']}>
            <div className={styles['title-content']}>
              <div className={styles['subtitle-content']}>
                <label className={styles['multi']}>Seguro Salud Flexible</label>
                <h2>Creado para ti y tu familia</h2>
              </div>
              <img
                loading="lazy"
                src={Frame}
                alt="Onboarding-mobile"
              />
            </div>
            <div className={styles['description']}>
              <label>Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.</label>
            </div>
            <form onSubmit={handleSubmit}>
              <div>
                <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Carné de extranjería">Carné de extranjería</option>
                </select>
                <div className={styles['floating-mid-input']}>
                  <input
                    className={styles['input-mid-border']}
                    type="number" 
                    value={documento}
                    onChange={(e) => setDocumento(e.target.value)}
                    required
                  />
                  <label>Nro. de documento</label>
                </div>
              </div>
              <div className={styles['floating-input']}>
                <input
                  type="number"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                />
                <label>Celular</label>
              </div>
              <label className={styles['check-input']}>
                <input
                  type="checkbox"
                  checked={aceptoPolitica}
                  onChange={(e) => setAceptoPolitica(e.target.checked)}
                  required
                />
                <span className={styles['checkmark']}></span>
                <label>Acepto la Política de Privacidad</label>
              </label>
              <label className={styles['check-input']}>
                <input
                  type="checkbox"
                  checked={aceptoComunicaciones}
                  onChange={(e) => setAceptoComunicaciones(e.target.checked)}
                  required
                />
                <span className={styles['checkmark']}></span>
                <label>Acepto la Política de Comunicaciones Comerciales</label>
              </label>
              {error && (
                <div>
                  <label className={styles['error-politique']}>{error}</label>
                </div>
              )}
              <div>
                <p className={styles['terms']}><strong>Aplican Términos y Condiciones.</strong></p>
              </div>
              <button type="submit">Cotiza aquí</button>
            </form>
          </div>
        </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;