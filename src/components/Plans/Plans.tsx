import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlansData } from '../../api/plansApi';
import { useLocation } from 'react-router-dom'; 
import { ReactComponent as MyIcon } from '../../icons/Icon-button.svg';
import { ReactComponent as AddUserIcon } from '../../icons/Ic-add-user-light.svg';
import { ReactComponent as ProtectionIcon } from '../../icons/Ic-protection-light.svg';
import { ReactComponent as HomeIcon } from '../../icons/Ic-home-light.svg';
import { ReactComponent as LineIcon } from '../../icons/Icon-line.svg';
import { calculateAge } from '../../utils/calculate';
import Header from '../shared/Header/Header';
import styles from './Plans.module.scss';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: string;
  priceBefore: number;
}

const Plans = () => {
    const location = useLocation();
    const { userData } = location.state || {};
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

    useEffect(() => {
        if (selectedPlan) {
          navigate('/summary', { state: { userData, selectedPlan } });
        }
      }, [selectedPlan, navigate, userData]);

  const handleSelection = async (option: number) => {
    setSelectedOption(option);
    setLoading(true);
    setError(null);

    try {
      const plansData = await getPlansData();
      let plansDataFilter = [];

      const age = calculateAge(userData.birthDay);

        if(option === 2){
            plansDataFilter = plansData.list.map((plan: Plan) => ({
                ...plan,
                priceBefore: plan.price,
                price: parseFloat((plan.price * 0.95).toFixed(2))
              }));
        }else{
            plansDataFilter = plansData.list;
        }


      setPlans(plansDataFilter.filter((obj: any) => {
        return obj.age >= age;
      }));

    } catch (error) {
      setError('Error al cargar los planes.');
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelection = (plan: Plan) => {
    setSelectedPlan(plan);
  };

  return (
    <div className={styles['plans-page']}>
        <Header />
        <div className={styles['navbar']}>
            <span className={styles['numberStepSelected']}><p>1</p></span>
            <p><strong>
              Planes y Coberturas
              </strong>
            </p>
            <LineIcon className={styles['line']}></LineIcon>
            <span className={styles['numberStep']}><p>2</p></span>
            <p>
              Resumen
            </p>
        </div>
        <button className={styles['back-button']} onClick={() => navigate(-1)}>
            <MyIcon className="my-icon" />
            <span className={styles['back-text']}>Volver</span>
            <span className={styles['step-text']}><strong>PASO 1 DE 2</strong></span>
        </button>
        <h2>{userData?.name}, ¿Para quién deseas cotizar?</h2>
        <p className={styles['plans-page-text']}>Selecciona la opción que se ajuste más a tus necesidades.</p>

      <div className={styles['plan-selection']}>
        <div
          className={styles['plan-option']}
          onClick={() => handleSelection(1)}
        >
            <ProtectionIcon></ProtectionIcon>
            <h3>Para mí</h3>
            <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
        </div>
        <div
          className={styles['plan-option']}
          onClick={() => handleSelection(2)}
        >
            <AddUserIcon></AddUserIcon>
            <h3>Para alguien más</h3>
            <p>Realiza una cotización para uno de tus familiares o cualquier persona.</p>
        </div>
      </div>

      {loading && <p>Cargando planes...</p>}
      {error && <p>{error}</p>}

      {selectedOption && plans.length > 0 && (
        <div className={styles['plan-cards']}>
          {plans.map((plan, index) => (
            <div className={styles['plan-card']} key={index}>
                <div className={styles['title']}>
                    <h3>{plan.name}</h3>
                    <HomeIcon></HomeIcon>
                </div>
                <p className={styles['title-cost']}><strong>COSTO DEL PLAN</strong></p>
                {plan.priceBefore && <p className={styles['text-before']}> ${plan.priceBefore} antes</p>}
                <p className={styles['text-cost']}><strong> ${plan.price} al mes</strong></p>
                <ul>
                    {plan.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                    ))}
                </ul>
                <div className={styles['button-content']}>
                    <button className={styles['select-plan-button']} onClick={() => handlePlanSelection(plan)}>
                    Seleccionar Plan
                    </button>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Plans;