import { IContainer } from 'aurelia';
import style from './Input.scss';

export class Input {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    static template = `<style>${style}</style>` + '<label for="input">${attributes.label}</label><input id="input" placeholder.bind="attributes.placeholder" value.bind="attributes.value" />';
    
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
        // console.log('Attached input!');
    }

}