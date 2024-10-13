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
        console.log(this.objectMonth)
        this.makeLi(this.amountSpentPage, this.objectMonth.arrayReceiveds, 'receiveds');
        this.makeLi(this.amountSpentPage, this.objectMonth.arraySpents, 'spents');
        this.makeLi(this.amountReceivedPage, this.objectMonth.arrayReceiveds, 'receiveds');
        this.makeLi(this.amountSpentPageValue, this.objectMonth.arraySpents, 'spents');
    }

    makeLi(element: HTMLElement | null, array?: ObjectValues[], classLi?: string) {
        if(!array) return;
        for(const i of array) {
            const h3Name = document.createElement('h3');
            const input = document.createElement('input');
            const div = document.createElement('div')
            const li = document.createElement('li');

            h3Name.innerText = i.name;
            input.value = `${i.value}`;
            input.readOnly = true
            input.classList.add('value');
            if(classLi) li.classList.add(classLi);
            div.appendChild(h3Name);
            div.appendChild(input);
            li.appendChild(div);
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
        if(this.amountReceived) this.amountReceived.value = `${this.objectMonth.totalReceived}`;
        if(this.amountSpent) this.amountSpent.value = `${this.objectMonth.totalSpent}`;
        if(this.profit) this.profit.value = `${this.objectMonth.profit}`;
    }

    takeElements() {
        this.amountReceived = document.querySelector('#totalReceived');
        this.amountSpent = document.querySelector('#totalSpent');
        this.profit = document.querySelector('#totalProfit');
        this.amountSpentPage = document.querySelector('.amountSpent ul');
        this.amountReceivedPage = document.querySelector('.amountReceivedPage ul');
        this.amountSpentPageValue = document.querySelector('.amoutSpentValuePage ul');
    }
}