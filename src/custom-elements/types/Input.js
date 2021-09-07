import { IContainer } from 'aurelia';

import { FormEventManager } from '../../FormEventManager.js';

import Template from './Input.html';
import style from './Input.scss';

const InputTemplate = `<style>${style}</style>${Template}`;

class Input {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    //Debounce is set by default to 200ms
    
    static inject = [IContainer, FormEventManager];
    /**
     * 
     * @param {*} container 
     * @param {*} eventManager 
     */

    constructor(container, eventManager) {
        this.container = container;
        this.eventManager = eventManager;


        this.attributes = {
            label: 'Input',
            placeholder: 'Type something...',
            value: null,
            type: "text"
        };
    }

    activate({id, attributes}) {
        this.id = id;
        this.attributes = attributes;

        //TODO: Be able to register events before the element is attached. We rely on the Id for this.
        this.registerEvents();
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