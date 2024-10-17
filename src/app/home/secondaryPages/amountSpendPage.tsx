import React from "react";
import styles from "../page.module.css";

interface DivComponent {
    className: string,
}

const amountSpendPage: React.FC<DivComponent> = ({className}) => {
    return <div className={className}>
        <div className="block">
            <form>
                <div>
                    <label htmlFor="spentName">Nome da despesa</label>
                    <input type="text" id="spentName"/>
                </div>
                <div>
                    <label htmlFor="spentValue">Valor da despesa</label>
                    <input type="number" placeholder={"R$0,00"} step={0.01} id="spentValue"/>
                </div>
                <button type="submit" className={`${styles.buttonReceivedAndSpent}`} id="buttonReceivedAndSpent">Gravar</button>
            </form>
        </div>
       <ul></ul>
   </div>
}
export default amountSpendPage;