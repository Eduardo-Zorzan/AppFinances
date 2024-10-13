'use client';

import { ArrowRight01Icon, CircleArrowDown01Icon } from 'hugeicons-react'
import styles from "./page.module.css";
import React from 'react';
import { useEffect } from "react";

import AmountSpend from './secondaryPages/amountSpendPage';
import AmountReceivedPage from './secondaryPages/amountReceivedPage';

import DataColector from '../frontModules/dataColector';
import HiddenMenu from '../frontModules/animationHiddenMenu';
import PutData from '../frontModules/putData';

export default function Home() {
  
  useEffect(() => {
    const putData = new PutData();
    const dataColector = new DataColector();
    async function test() {
      //console.log(await getRequisition())
      await dataColector.addListener();
      await putData.catchData();
    }
    test()
    const hiddenSpent = new HiddenMenu(false, 'amoutSpentValuePage', ['amountSpent', 'valueReceived', 'amountReceivedPage']);
    const hiddenReceived = new HiddenMenu(true, 'amountReceivedPage', ['amountSpent', 'inputAmountSpent', 'amoutSpentValuePage']);
    
    hiddenSpent.eventListener();
    hiddenReceived.eventListener();
  }, []);
  return (
    <div className={styles.page}>
      <section className={`${styles.month} month`}>
        <input type="month"/>
        <ArrowRight01Icon className={styles.arrowRight}/>
      </section>
      <section className={`${styles.valueReceived} valueReceived`}>
        <h1>Entradas</h1>
        <CircleArrowDown01Icon className={`${styles.arrowDown} amountReceivedPageSymbol`}/>
      </section>
      <AmountReceivedPage className={`${styles.AmountReceivedPage} amountReceivedPage`} />
      <section className={`${styles.inputAmountSpent} inputAmountSpent`}>
        <h1>Gastos</h1>
        <CircleArrowDown01Icon className={`${styles.arrowDown} amoutSpentValuePageSymbol`}/>
      </section>
      <AmountSpend className={`${styles.amoutSpentValuePage} amoutSpentValuePage`}/>
      <section className={`${styles.amountSpent} amountSpent`}>
        <ul></ul>
        <form action="">
          <div>
            <label htmlFor="totalSpent">Gastos totais: </label>
            <input type="number" step={0.01}  placeholder={"R$0,00"} readOnly id={'totalSpent'} />
          </div>
          <div>
            <label htmlFor="receivedMonth">Recebido no mês: </label>
            <input type="number" step={0.01}  placeholder={"R$0,00"} readOnly id={'totalReceived'} />
          </div>
          <div> 
            <label htmlFor="investments">Restante para <p></p> investimentos: </label>
            <input type="number" step={0.01}  placeholder={"R$0,00"} readOnly id="totalProfit" />
          </div>
        </form>
      </section>
      <section className={styles.buttonInvestments}>
          <button>INVESTIR</button>
      </section>
    </div>
  );
}
