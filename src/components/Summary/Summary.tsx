import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'; 
import { ReactComponent as MyIcon } from '../../icons/Icon-button.svg';
import { ReactComponent as FamIcon } from '../../icons/gl_family.svg';
import { ReactComponent as LineIcon } from '../../icons/Icon-line.svg';
import Header from '../shared/Header/Header';
import styles from './Summary.module.scss';

const Summary = () => {
    const location = useLocation();
    const { userData, selectedPlan } = location.state || {};
    const navigate = useNavigate();

  if (!userData) {
    return <p>No hay información del usuario disponible.</p>;
  }

  return (
    <div className={styles['summary']}>
        <Header />
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
        <button className={styles['back-button']} onClick={() => navigate(-1)}>
            <MyIcon className="my-icon" />
            <span>Volver</span>
        </button>
        <h2>Resumen del seguro</h2>
        <div className={styles['summary__container']}>
            <div className={styles['summary__user-info']}>
                <p><strong>PRECIOS CALCULADOS PARA:</strong></p>
                <div className={styles['summary__name']}>
                    <FamIcon></FamIcon>
                    <span>{`${userData.name} ${userData.lastName}`}</span>
                </div>
                <div className={styles['summary__payment-info']}>
                <p><strong>Responsable de pago:</strong></p>
                <p>DNI:{`${userData.documento}`} </p>
                <p>Celular: </p>
                </div>

                <div className={styles['summary__plan-info']}>
                <p><strong>Plan elegido:</strong></p>
                <p>{`${selectedPlan.name}`}</p>
                <p>Costo del Plan: {`${selectedPlan.price}`} al mes</p>
                </div>
            </div>
        </div>

    </div>
  );
};

export default Summary;