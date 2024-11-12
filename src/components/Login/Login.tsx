import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../api/userApi';
import styles from './Login.module.scss';
import Header from '../shared/Header/Header';
import Frame from '../../icons/frame.svg';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const isValid = validateFields();
    
    if (isValid) {
      try {
        const data = await getUserData();
        const userData = { ...data, documento };
        navigate('/plans', { state: { userData } });
      } catch (error) {
        setError('Hubo un problema al obtener los datos del usuario.');
      }
    }
  };

  return (
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
                  <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} >
                  <option value="DNI">DNI</option>
                  <option value="Pasaporte">Pasaporte</option>
                  <option value="Carné de extranjería">Carné de extranjería</option>
                  </select>
                  <input
                  type="text"
                  value={documento}
                  onChange={(e) => setDocumento(e.target.value)}
                  required
                  placeholder='Número de Documento'
                  />
              </div>
              <div>
                  <input
                  type="text"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                  placeholder='Celular'
                  />
              </div>
              <div>
                  <input
                  type="checkbox"
                  checked={aceptoPolitica}
                  onChange={(e) => setAceptoPolitica(e.target.checked)}
                  required
                  />
                  <label>Acepto la Política de Privacidad</label>
              </div>
              <div>
                  <input
                  type="checkbox"
                  checked={aceptoComunicaciones}
                  onChange={(e) => setAceptoComunicaciones(e.target.checked)}
                  required
                  />
                  <label>Acepto la Política de Comunicaciones Comerciales</label>
              </div>
              <div>
                <p className={styles['terms']}><strong>Aplican Términos y Condiciones</strong></p>
              </div>
              {error && <p className={styles.error}>{error}</p>}
              <button type="submit">Cotiza aquí</button>
            </form>
        </div>
        </div>
    </div>
  );
};

export default Login;