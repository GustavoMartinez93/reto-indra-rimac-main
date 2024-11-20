import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { ReactComponent as MyIcon } from '../../icons/Icon-button.svg';
import { ReactComponent as BackIcon } from '../../icons/Ic-back.svg';
import { ReactComponent as FamIcon } from '../../icons/gl_family.svg';
import { ReactComponent as LineIcon } from '../../icons/Icon-line.svg';
import Header from '../shared/Header/header/Header';
import styles from './Summary.module.scss';
import { UserContext } from '../../contexts/UserContext';

const Summary = () => {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const { selectedPlan } = location.state || {};
    const navigate = useNavigate();

  if (!user) {
    return <p>No hay información del usuario disponible.</p>;
  }

  return (
    <div className={styles['summary']}>
      <div className={styles['summary-header-content']}>
        <Header />
      </div>
      <div className={styles['navbar']}>
          <span className={styles['numberStep']}><p>1</p></span>
          <p>
            Planes y Coberturas
          </p>
          <LineIcon className={styles['line']}></LineIcon>
          <span className={styles['numberStepSelected']}><p>2</p></span>
          <p><strong>
            Resumen
            </strong>
          </p>
      </div>
      <div className={styles['summary-content']}>
        <button className={styles['back-button']} onClick={() => navigate(-1)}>
          <div className={styles['content-back']}>
            <MyIcon/>
            <span className={styles['back-text']}>Volver</span>
          </div>
          <div className={styles['content-back-mobile']}>
            <BackIcon/>
            <span className={styles['step-text']}><strong>PASO 2 DE 2</strong></span>
            <div className={styles['step-bar']}>
              <div className={styles['step-bar-fill']}>
              </div>
            </div>
          </div>
        </button>
        <h2>Resumen del seguro</h2>
        <div className={styles['summary-container']}>
            <div className={styles['user-info']}>
                <p className={styles['subtitle']}><strong>PRECIOS CALCULADOS PARA:</strong></p>
                <div className={styles['summary-name']}>
                  <FamIcon></FamIcon>
                  <span className={styles['text-name']}>{`${user.name} ${user.lastName}`}</span>
                </div>
                <div className={styles['summary-content']}>
                  <p className={styles['summary-title']}>Responsable de pago:</p>
                  <p className={styles['summary-data']}>DNI: {`${user.documento}`} </p>
                  <p className={styles['summary-data']}>Celular: {`${user.celular}`} </p>
                </div>

                <div className={styles['summary-content']}>
                  <p className={styles['summary-title']}>Plan elegido:</p>
                  <p className={styles['summary-data']}>{`${selectedPlan.name}`}</p>
                  <p className={styles['summary-data']}>Costo del Plan: ${`${selectedPlan.price}`} al mes</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;