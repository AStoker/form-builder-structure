import { IContainer } from 'aurelia';

import { FormEventManager } from '../../FormEventManager.js';

import Template from './Input.html';
import style from './Input.scss';

const InputTemplate = `<style>${style}</style>${Template}`;

class Input {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    //Debounce is set by default to 200ms
    
    static inject = [IContainer, FormEventManager];

    constructor(container, eventManager) {
        this.container = container;
        this.eventManager = eventManager;

        //this.id is on the prototype, given from the Part

        this.registerEvents();

        this.attributes = {
            label: 'Input',
            placeholder: 'Type something...',
            value: null,
            type: "text"
        };
    }

    activate(attributes) {
        this.attributes = attributes;
    }

    attached() {
        // console.log('Attached input!');
    }

    registerEvents() {
        this.eventPublisher = this.eventManager.registerElement(this);
    }

    get value() {
        return this.attributes.value;
    }
    set value(val) {
        //TODO: Fire change event
        console.log('Firing change event: ' + val);
        this.eventPublisher.publish('change', val);

        this.attributes.value = val;
    }

}

export { Input, InputTemplate };