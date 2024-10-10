class HiddenMenu {
    localstorageValue: string | null;
    classElement: string;
    classElementToHide: string[];
    key: string;
    element: HTMLDivElement | null;
    isLast: boolean;
    elementToHide: HTMLDivElement | null;
    constructor (isLast: boolean, classElement: string, classElementToHide: string[]) {
        this.localstorageValue = '';
        this.classElement = classElement;
        this.classElementToHide = classElementToHide;
        this.key = `${this.classElement}Hidden`;
        this.element = null;
        this.isLast = isLast;
        this.elementToHide = null;
    }

    eventListener() {
        this.changeVisibility();
        if (this.isLast && parseInt(this.checkLocalStorage()) === 0
            && localStorage.getItem('amoutSpentValuePageHidden') === '1') {
             this.elementsToHide();
             this.showLastElement(2);
        }
        document.addEventListener('click', (ev) => {
            //eslint-disable-next-line
            const event: any | null | HTMLElement = ev.target;
            ev.preventDefault();
            if (event !== null) {
                if(event.classList.contains(`${this.classElement}Symbol`)) {
                    switch (this.localstorageValue) {
                        case '0': this.changeLocalStorage(1); break;
                        case '1': this.changeLocalStorage(0); break;
                    }
                    this.changeVisibility();
                }
            }
        })
    }

    changeVisibility() {
        const local: number = parseInt(this.checkLocalStorage());
        switch (local) {
            case 0: this.hidde(); break;
            case 1: this.show(); break;
        };
        this.hideLastElement();
    }

    changeLocalStorage(number: number) {
        localStorage.setItem(this.key, `${number}`);
    }

    checkLocalStorage() {
        this.localstorageValue = localStorage.getItem(this.key);
        if (this.localstorageValue === null) {
            localStorage.setItem(this.key, '0');
            this.localstorageValue = '0';
        }
        return this.localstorageValue
    }

    elementsToShow() {
        for(const element of this.classElementToHide) {
            const el: HTMLElement | null = document.querySelector(`.${element}`);
            if (el === null) throw new Error('element invalid');
            el.style.visibility = 'visible';
            el.style.position = 'static';
        }
    }

    hideLastElement() {
        const el: HTMLElement | null = document.querySelector(`.${this.classElementToHide[this.classElementToHide.length - 1]}`);
        if (el === null) throw new Error('element invalid');
        el.style.visibility = 'hidden';
        el.style.position = 'fixed';
    }

    showLastElement(acumulator: number) {
        for (let i = this.classElementToHide.length - 1; i > this.classElementToHide.length - 1 - acumulator; i--) {
            const el: HTMLElement | null = document.querySelector(`.${this.classElementToHide[i]}`);
            if (el === null) throw new Error('element invalid');
            el.style.visibility = 'visible';
            el.style.position = 'static';
        }
    }

    elementsToHide() { //definir ultima classe para nao voltar a ser visivel
        for (const element of this.classElementToHide) {
            const el: HTMLElement | null = document.querySelector(`.${element}`);
            if (el === null) throw new Error('element invalid');
            el.style.visibility = 'hidden';
            el.style.position = 'fixed';
        };
    }
    
    hidde() {
        this.elementsToShow();
        this.element = document.querySelector(`.${this.classElement}`);
        this.elementToHide = document.querySelector(`.${this.classElementToHide}`);
        if (this.element === null) throw new Error('element invalid');
        if (this.elementToHide === null) throw new Error('element invalid');
        this.element.style.visibility = 'hidden';
        this.element.style.position = 'fixed';
    }

    show() {
        this.elementsToHide();
        this.element = document.querySelector(`.${this.classElement}`);
        this.elementToHide = document.querySelector(`.${this.classElementToHide}`);
        if (this.element === null) throw new Error('element invalid');
        if (this.elementToHide === null) throw new Error('element invalid');
        this.element.style.visibility = 'visible';
        this.element.style.position = 'static';
        
    }
}

export default HiddenMenu;