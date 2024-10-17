import React from "react";
import styles from "../page.module.css";

interface DivComponent {
    className: string,
}

const amountReceivedPage: React.FC<DivComponent> = ({className}) => {
    return <div className={className}>
       <div className="block">
            <form>
                <div>
                    <label htmlFor="receivedName">Fonte do recebimento</label>
                    <input type="text" id="receivedName"/>
                </div>
                <div>
                    <label htmlFor="receivedValue">Valor recebido</label>
                    <input type="number" placeholder={"R$0,00"} step={0.01} id="receivedValue"/>
                </div>
                <button type="submit" className={`${styles.buttonReceivedAndSpent}`} id="buttonReceivedAndSpent">Gravar</button>
            </form>
        </div>
       <ul></ul>
   </div>
}
export default amountReceivedPage;