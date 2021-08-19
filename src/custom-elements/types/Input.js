import { IContainer } from 'aurelia';

export class Input {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    static template = '<label for="input">${label}</label><input id="input" placeholder.bind="placeholder" value.bind="value" />';
    
    static inject = [IContainer];

    constructor(container) {
        this.container = container;
        this.attributes = {
            label: 'Input',
            placeholder: 'Type something...',
            value: null
        };
    }

    activate(attributes) {
        this.attributes = attributes;
    }

    attached() {
        console.log('Attached input!');
    }

    get label() {
        return this.attributes.label;
    }
    set label(value) {
        this.attributes.label = value;
    }
    get placeholder() {
        return this.attributes.placeholder;
    }
    set placeholder(value) {
        this.attributes.placeholder = value;
    }
    get value() {
        return this.attributes.value;
    }
    set value(value) {
        this.attributes.value = value;
    }
}