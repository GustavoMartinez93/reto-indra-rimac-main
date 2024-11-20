import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPlansData } from '../../api/plansApi';
import { ReactComponent as MyIcon } from '../../icons/Icon-button.svg';
import { ReactComponent as BackIcon } from '../../icons/Ic-back.svg';
import { ReactComponent as AddUserIcon } from '../../icons/Ic-add-user-light.svg';
import { ReactComponent as ProtectionIcon } from '../../icons/Ic-protection-light.svg';
import { ReactComponent as LineIcon } from '../../icons/Icon-line.svg';
import { ReactComponent as SelectedIcon } from '../../icons/Ic-atoms-radio.svg';
import { calculateAge } from '../../utils/calculate';
import Header from '../shared/Header/header/Header';
import styles from './Plans.module.scss';
import { UserContext } from '../../contexts/UserContext';

interface Plan {
  name: string;
  price: number;
  description: string[];
  age: string;
  priceBefore: number;
}

const Plans = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (selectedPlan) {
          navigate('/summary', { state: { selectedPlan } });
        }
      }, [selectedPlan, navigate]);

  const handleSelection = async (option: number) => {
    setSelectedOption(option);
    setLoading(true);
    setError(null);

    try {
      const plansData = await getPlansData();
      let plansDataFilter = [];

      const age = calculateAge(user.birthDay);

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
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : plans.length - 1));
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < plans.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className={styles['plans-page']}>
      <div className={styles['plans-header-content']}>
        <Header />
      </div>
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
      <div className={styles['plans-content']}>
        <button className={styles['back-button']} onClick={() => navigate(-1)}>
          <div className={styles['content-back']}>
            <MyIcon/>
            <span className={styles['back-text']}>Volver</span>
          </div>
          <div className={styles['content-back-mobile']}>
            <BackIcon/>
            <span className={styles['step-text']}><strong>PASO 1 DE 2</strong></span>
            <div className={styles['step-bar']}>
              <div className={styles['step-bar-fill']}>
              </div>
            </div>
          </div>
        </button>
        <div className={styles['plans-detail-content']}>
          <h2>{user?.name}, ¿Para quién deseas cotizar?</h2>
          <p className={styles['plans-page-text']}>Selecciona la opción que se ajuste más a tus necesidades.</p>

          <div className={styles['plan-selection']}>
            <div
              className={`${styles['plan-option']} ${selectedOption === 1 ? styles['plan-option-selected'] : ''}`}
              onClick={() => handleSelection(1)}
            >
              {selectedOption === 1 ? 
                <div className={styles['check-buttom-selected']}><SelectedIcon/> </div> : 
                <div className={styles['check-buttom-option']}></div>}
              <div className={styles['plan-who-option']}>
                <ProtectionIcon></ProtectionIcon>
                <h3>Para mí</h3>
              </div>
              <p>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</p>
            </div>
            <div
              className={`${styles['plan-option']} ${selectedOption === 2 ? styles['plan-option-selected'] : ''}`}
              onClick={() => handleSelection(2)}
            >
                {selectedOption === 2 ? 
                  <div className={styles['check-buttom-selected']}><SelectedIcon/> </div> : 
                  <div className={styles['check-buttom-option']}></div> }
                <div className={styles['plan-who-option']}>
                  <AddUserIcon></AddUserIcon>
                  <h3>Para alguien más</h3>
                </div>
                <p>Realiza una cotización para uno de tus familiares o cualquier persona.</p>
            </div>
          </div>
        </div>

        <div className={styles['plan-content-cards']}>
          {loading && <p>Cargando planes...</p>}
          {error && <p>{error}</p>}

          {selectedOption && plans.length > 0 && (
            <div className={styles['plan-wrapper']}>

              <div className={styles['plan-cards']}>
                {plans.map((plan, index) => (
                  <div
                    className={`${styles['plan-card']} ${
                      index === currentIndex ? styles['active'] : ''
                    }`}
                    key={index}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                  >
                    <div className={styles['title']}>
                      <h3>{plan.name}</h3>
                    </div>
                    <p className={styles['title-cost']}>
                      <strong>COSTO DEL PLAN</strong>
                    </p>
                    {plan.priceBefore && (
                      <p className={styles['text-before']}> ${plan.priceBefore} antes</p>
                    )}
                    <p className={styles['text-cost']}>
                      <strong> ${plan.price} al mes</strong>
                    </p>
                    <ul>
                      {plan.description.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                    <div className={styles['button-content']}>
                      <button
                        className={styles['select-plan-button']}
                        onClick={() => handlePlanSelection(plan)}
                      >
                        Seleccionar Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles['nav-pagination']}>

                <button className={styles['nav-button']} onClick={handlePrev}>
                  {`<`}
                </button>

                {selectedOption && plans.length > 0 && (
                  <div className={styles['pagination']}>
                    {`${currentIndex + 1} / ` + plans.length} 
                  </div>
                )}

                <button className={styles['nav-button']} onClick={handleNext}>
                  {`>`}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plans;