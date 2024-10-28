import { ObjectMonth, ObjectValues } from "../types";
import { getRequisition } from "./requisitions";

export default class PutData {
    elementMonth: HTMLInputElement | null;
    amountSpentPage: HTMLInputElement | null;
    amountSpentPageValue: HTMLInputElement | null;
    amountReceivedPage: HTMLInputElement | null;
    elementValueSpent: HTMLInputElement | null;
    amountSpent: HTMLInputElement | null;
    amountReceived: HTMLInputElement | null;
    profit: HTMLInputElement | null;
    lastMonth: string;
    objectMonthArray: ObjectMonth[];
    objectMonth: ObjectMonth;

    constructor() {
        this.elementMonth = null;
        this.lastMonth = '';
        this.objectMonthArray = [{
            month: 'IGNORE',
            profit: 0,
            totalReceived: 0,
            totalSpent: 0,
        }];
        this.amountSpentPage = null;
        this.amountSpentPageValue = null;
        this.amountReceivedPage = null;
        this.elementValueSpent = null;
        this.amountReceived = null;
        this.amountSpent = null;
        this.profit = null;
        this.objectMonth = {
            month: 'IGNORE',
            profit: 0,
            totalReceived: 0,
            totalSpent: 0,
        };
    };

    async catchData() {
        this.objectMonthArray = await getRequisition();
        this.verifyMonth();
        this.putValuesInElements();
        this.makeLi(this.amountSpentPage, this.objectMonth.arrayReceiveds, 'receiveds', false);
        this.makeLi(this.amountSpentPage, this.objectMonth.arraySpents, 'spents', true);
        this.makeLi(this.amountReceivedPage, this.objectMonth.arrayReceiveds, 'receiveds', false, true);
        this.makeLi(this.amountSpentPageValue, this.objectMonth.arraySpents, 'spents', true, true);
    }

    makeLi(element: HTMLElement | null, array?: ObjectValues[], classLi?: string, negative?: boolean, deleteP?: boolean) {
        if(!array) return;
        for(const i of array) {
            const h3Name = document.createElement('h3');
            const input = document.createElement('input');
            const div = document.createElement('div')
            const li = document.createElement('li');
            const button = document.createElement('button');

            if(deleteP) {
                button.innerText = 'Excluir';
                button.classList.add(`delete`);
            }
            h3Name.innerText = i.name;
            if(negative) {
                input.value = `R$ -${i.value}`;
                if(deleteP) button.id = `spent_${i.idOther}`;
                input.style.backgroundColor = 'rgb(139, 0, 0)';
                input.style.border = 'none'
            } else {
                input.value = `R$ ${i.value}`;
                if(deleteP) button.id = `received_${i.idOther}`;
                input.style.backgroundColor = 'green';
                input.style.border = 'none'
            }
            input.readOnly = true;
            input.classList.add('value');
            if(classLi) li.classList.add(classLi);
            div.appendChild(h3Name);
            div.appendChild(input);
            li.appendChild(div);
            if(deleteP) li.appendChild(button);
            if(element) element.appendChild(li);
        }
    }

    verifyMonth() {
        this.elementMonth = document.querySelector('.month input');
        for (const i of this.objectMonthArray) {
            if(i.month.slice(0, 7) === this.elementMonth?.value) this.objectMonth = i;
        };
    }

    putValuesInElements() {
        this.takeElements();
        if(this.amountReceived) this.amountReceived.value = `R$ ${this.objectMonth.totalReceived}`;
        if(this.amountSpent) this.amountSpent.value = `R$ ${0 - this.objectMonth.totalSpent}`;
        if(this.profit) {
            this.profit.value = `R$ ${this.objectMonth.profit.toFixed(2)}`;
            this.profit.style.border = 'none';
            if(this.objectMonth.profit > 0) this.profit.style.backgroundColor = 'green';
            if(this.objectMonth.profit < 0) this.profit.style.backgroundColor = 'rgb(139, 0, 0)';
        }
    }

    takeElements() {
        this.amountReceived = document.querySelector('.resultReceived');
        this.amountSpent = document.querySelector('.resultSpent');
        this.profit = document.querySelector('.resultProfit');
        this.amountSpentPage = document.querySelector('.amountSpent ul');
        this.amountReceivedPage = document.querySelector('.amountReceivedPage ul');
        this.amountSpentPageValue = document.querySelector('.amoutSpentValuePage ul');
    }
}