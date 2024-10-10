import { ObjectMonth } from "../types";
import { updateRequisition, postRequisition } from "./requisitions"; 

export default class DataColector {
    elementMonth: HTMLInputElement | null;
    elementNameReceived: HTMLInputElement | null;
    elementValueReceived: HTMLInputElement | null;
    elementNameSpent: HTMLInputElement | null;
    elementValueSpent: HTMLInputElement | null;
    amountSpent: HTMLInputElement | null;
    amountReceived: HTMLInputElement | null;
    profit: HTMLInputElement | null;
    lastMonth: string;
    objectMonth: ObjectMonth;

    constructor() {
        this.elementMonth = null;
        this.lastMonth = '';
        this.objectMonth = {
            month: '',
            profit: 0,
            totalReceived: 0,
            totalSpent: 0,
        };
        this.elementNameReceived = null;
        this.elementValueReceived = null;
        this.elementNameSpent = null;
        this.elementValueSpent = null;
        this.amountReceived = null;
        this.amountSpent = null;
        this.profit = null;
    }

    async addListener() {
        await this.addListenerButtonMonth();
        await this.addListenerButtonEntries();
    }

    async addListenerButtonEntries() {
        const button = document.querySelector('.amountReceivedPage button');
        if(button !== null) {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                this.takeElements();
                this.takeValueElements();
                console.log(await updateRequisition([this.objectMonth]));
            })
        }
        const button2 = document.querySelector('.amoutSpentValuePage button');
        if(button2 !== null) {
            button2.addEventListener('click', async (event) => {
                event.preventDefault();
                this.takeElements();
                this.takeValueElements();
                await updateRequisition([this.objectMonth]);
            })
        }
    }

    async addListenerButtonMonth() {
        this.checkMonth();
        const button = document.querySelector('.month svg');
        if (button !== null) {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                this.putLocalstorage();
                this.takeElements();
                this.takeValueElements();
                await postRequisition([this.objectMonth]);
            })
        }
    }

    checkMonth() {
        this.elementMonth = document.querySelector('.month input');
        const storagedMonth = localStorage.getItem('month');
        if(this.elementMonth !== null && storagedMonth) {
            this.elementMonth.value = storagedMonth;
        };
    }

    putLocalstorage() {
        this.elementMonth = document.querySelector('.month input');
        if (this.elementMonth !== null && this.elementMonth.value !== '') localStorage.setItem('month', this.elementMonth.value);
    }
    
    takeElements() {
        this.elementNameReceived = document.querySelector('#receivedName');
        this.elementValueReceived = document.querySelector('#receivedValue');
        this.elementNameSpent = document.querySelector('#spentName');
        this.elementValueSpent = document.querySelector('#spentValue');
        this.amountReceived = document.querySelector('#totalReceived');
        this.amountSpent = document.querySelector('#totalSpent');
        this.profit = document.querySelector('#totalProfit');
    }

    takeValuesReceivedAndSpent() {
        if(this.elementNameReceived && this.elementValueReceived) {
            this.objectMonth.arrayReceiveds?.push({
                name: this.elementNameReceived.value,
                value: parseFloat(this.elementValueReceived.value),
            });
        } else console.log('temporary message');
        if(this.elementNameSpent && this.elementValueSpent) {
            this.objectMonth.arraySpents?.push({
                name: this.elementNameSpent.value,
                value: parseFloat(this.elementValueSpent.value),
            });
        } else console.log('temporary message')

    }

    takeValueElements() {
        if(this.elementMonth) this.objectMonth.month = this.elementMonth.value + '-01';
        if(this.amountReceived) this.objectMonth.totalReceived = parseFloat(this.amountReceived.value);
        if(this.amountSpent) this.objectMonth.totalSpent = parseFloat(this.amountSpent.value);
        if(this.profit) this.objectMonth.profit = parseFloat(this.profit.value);
        this.takeValuesReceivedAndSpent();
    }
}