import { ObjectMonth, DeleteBody } from "../types";
import { updateRequisition, postRequisition, deleteRequisitionReceived, deleteRequisitionSpent } from "./requisitions"; 

export default class DataColector {
    elementMonth: HTMLInputElement | null;
    elementNameReceived: HTMLInputElement | null;
    elementValueReceived: HTMLInputElement | null;
    elementNameSpent: HTMLInputElement | null;
    elementValueSpent: HTMLInputElement | null;
    amountSpentPage: HTMLInputElement[] | null;
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
            arrayReceiveds: [],
            arraySpents: []
        };
        this.elementNameReceived = null;
        this.elementValueReceived = null;
        this.elementNameSpent = null;
        this.elementValueSpent = null;
        this.amountSpentPage = null;
    }

    async addListener() {
        await this.addListenerButtonMonth();
        await this.addListenerButtonEntries();
        await this.addListenerDelete();
    }

    async addListenerButtonEntries() {
        const button = document.querySelector('.amountReceivedPage button');
        if(button !== null) {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                this.takeElements();
                this.takeValueElements();
                this.getResultValues();
                await updateRequisition([this.objectMonth]);
                window.location.reload();
            })
        }
        const button2 = document.querySelector('.amoutSpentValuePage button');
        if(button2 !== null) {
            button2.addEventListener('click', async (event) => {
                event.preventDefault();
                this.takeElements();
                this.takeValueElements();
                this.getResultValues();
                await updateRequisition([this.objectMonth]);
                window.location.reload();
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
                try {
                    await postRequisition([this.objectMonth]);
                } catch {
                    window.location.reload();
                }
            })
        }
    }

    async addListenerDelete() {
        document.addEventListener('click', async (ev) => {
            const event = ev.target as HTMLElement;
            if(event && event.classList.contains('delete')) {
                const bodyArray: string[] = event.id.split('_');
                let body: DeleteBody;
                const elementBrother: HTMLInputElement | null = event.parentElement?.firstChild?.lastChild as HTMLInputElement;
                if(bodyArray[0] === 'received') {
                    body = {
                        idReceived: parseFloat(bodyArray[1]),
                    }
                    const elementBrotherValue: number | null = parseFloat(elementBrother.value.split(' ')[1]);
                    await deleteRequisitionReceived([body]);
                    this.takeElements();
                    this.takeValueElements();
                    this.getResultValues();
                    if(elementBrotherValue) {
                        this.objectMonth.totalReceived -= elementBrotherValue;
                        this.objectMonth.profit -= elementBrotherValue;
                    }
                    await updateRequisition([this.objectMonth]);
                } else {
                    body = {
                        idSpent: parseFloat(bodyArray[1]),
                    }
                    const elementBrotherValue: number | null = parseFloat(elementBrother.value.split('-')[1]);
                    await deleteRequisitionSpent([body]);
                    this.takeElements();
                    this.takeValueElements();
                    this.getResultValues();
                    if(elementBrotherValue) {
                        this.objectMonth.totalSpent -= elementBrotherValue;
                        this.objectMonth.profit += elementBrotherValue;
                    }
                    console.log(elementBrother)
                    await updateRequisition([this.objectMonth]);
                }
              window.location.reload()
            }
            
        })
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
    }

    takeValuesReceivedAndSpent() {
        if (this.elementNameReceived && this.elementValueReceived && 
            this.elementNameReceived.value && this.elementValueReceived.value) {
            this.objectMonth.arrayReceiveds?.push({
                name: this.elementNameReceived.value,
                value: parseFloat(this.elementValueReceived.value),
            });
        } else console.log('temporary message');
        if (this.elementNameSpent && this.elementValueSpent &&
            this.elementNameSpent.value && this.elementValueSpent.value) {
            this.objectMonth.arraySpents?.push({
                name: this.elementNameSpent.value,
                value: parseFloat(this.elementValueSpent.value),
            });
        } else console.log('temporary message');
    }

    getResultValues() {
        this.amountSpentPage = Array.from(document.querySelectorAll('.amountSpent ul .receiveds .value'));
        if(!this.amountSpentPage) return;
        for(const i of this.amountSpentPage) {
            const iArray: string[] = i.value.split(' ');
            if (typeof parseFloat(iArray[1]) === 'number') this.objectMonth.totalReceived += parseFloat(iArray[1]);
        }
        this.amountSpentPage = Array.from(document.querySelectorAll('.amountSpent ul .spents .value'));
        if(!this.amountSpentPage) return;
        for(const i of this.amountSpentPage) {
            const iArray: string[] = i.value.split('-');
            if (typeof parseFloat(iArray[1]) === 'number') this.objectMonth.totalSpent += parseFloat(iArray[1]);
        }
        if(this.objectMonth.arrayReceiveds && this.objectMonth.arrayReceiveds.length > 0) {
            this.objectMonth.totalReceived += this.objectMonth.arrayReceiveds[0].value;
        }
        if(this.objectMonth.arraySpents && this.objectMonth.arraySpents?.length > 0) {
            this.objectMonth.totalSpent += this.objectMonth.arraySpents[0].value;
        }
        this.objectMonth.profit = this.objectMonth.totalReceived - this.objectMonth.totalSpent;
    }

    takeValueElements() {
        if(this.elementMonth) this.objectMonth.month = this.elementMonth.value + '-01';
        this.takeValuesReceivedAndSpent();
    }
}