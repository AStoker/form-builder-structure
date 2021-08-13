import { IContainer } from 'aurelia';

export class Text {
    message = 'Let me text';

    static template = '<label>${message}</label>';
    
    static inject = [IContainer];

    constructor(container) {
        this.container = container;
    }

    attached() {
        console.log('Attached text!');
        console.log(this.container); //TODO: seems like injection isn't working
    }

}