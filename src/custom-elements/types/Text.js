import { IContainer } from 'aurelia';

export class Text {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    static template = '<label>${labelText}</label>';
    
    static inject = [IContainer];

    constructor(container) {
        this.container = container;
        this.attributes = {
            text: 'Hello world'
        };
    }

    activate(attributes) {
        this.attributes = attributes;
    }

    attached() {
        console.log('Attached text!');
    }

    get labelText() {
        return this.attributes.text;
    }
    set labelText(value) {
        this.attributes.text = value;
    }
}