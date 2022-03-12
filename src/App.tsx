import { useState } from 'react';
import styles from './App.module.css';
import powerImage from './assets/powered.png';
import { GridItem } from './components/GridItem';
import leftArrowImage from './assets/leftarrow.png'

import { levels, calculateImc, Level } from './helpers/imc';

const App  = () =>{
  const [heightField, setHieghtField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);

  const handleCalculateButton = () => {
    if(heightField && weightField){
      setToShow(calculateImc(heightField, weightField));
    }else{
      alert("Digite todos os campos.");
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHieghtField(0);
    setWeightField(0);
  }

  return (

    <div className={styles.main}>
      <header>
        <div>
          <header>
            <div className={styles.headerContainer}>
              <img src={powerImage} alt="" width={150} />
            </div>
          </header>

          <div className={styles.container}>
            <div className={styles.leftSide}>
                <h1>Calcule o seu IMC</h1>
                <p>Calcule o seu IMC - Índice de Maça Corpórea, e tenha controle da sua saúde. Esteja no seu peso ideal</p>

                <input 
                  type="number" 
                  placeholder="Digite a sua altura. Ex. 1.5 (em métros)"
                  value={heightField > 0 ? heightField : ''} 
                  onChange={e => setHieghtField(parseFloat(e.target.value))}
                  disabled={toShow ? true : false}
                />

                <input 
                  type="number" 
                  placeholder="Digite a sua peso. Ex. 75.3 (em kg)"
                  value={weightField > 0 ? weightField : ''} 
                  onChange={e => setWeightField(parseFloat(e.target.value))}
                  disabled={toShow ? true : false}
                />
                <button onClick={handleCalculateButton} disabled={toShow ? true : false}>Calcular</button>
            </div>

            <div className={styles.rightSide}>
              { !toShow &&
                <div className={styles.grid}>
                  {levels.map((item, key) => (
                    <GridItem key={key} item={item} />
                  ))}
                </div>
              }
              { toShow &&
                <div className={styles.rightBig}>
                  <div className={styles.rightArrow} onClick={handleBackButton}>
                    <img src={leftArrowImage} alt="" width={25} />
                  </div>
                  <GridItem item={toShow} />
                </div>
              }
            </div>
          </div>
        </div>
      </header>
      
    </div>
  );

}

export default App