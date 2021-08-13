import { IContainer } from 'aurelia';

export class Input {
    placeholder = 'Oh hi';

    static template = '<input placeholder.bind="placeholder" />';
    
    static inject = [IContainer];

    constructor(container) {
        this.container = container;
    }

    attached() {
        console.log('Attached input!');
        console.log(this.container); //TODO: seems like injection isn't working
    }

}