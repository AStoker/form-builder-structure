
import { createElement } from '../custom-elements/custom-element-factory.js';

export default class Part {
    name = 'Part';
    type = this.name;
    element;
    attributes = {};
    events = {}; //TODO: We should add some standard events here
    //TODO: sync attributes with elements

    constructor(name, {type, attributes, events}) {
        this.name = name;
        this.type = type;
        this.attributes = attributes;
        this.events = Object.assign(this.events, events);

    }

    toView() {
        //TODO: have some kind of lookup to determine inputs or text
        this.element = createElement(this.name, this.type);

        //Set attributes
        for (let attribute in this.attributes) {
            this.element[attribute] = this.attributes[attribute];
        }

        this.attachEventsToElement(this.element)

        return this.element.host;
    }

    attachEventsToElement(element) {
        //Add events
        // for (let event in this.events) {
        //     console.log('Adding event: ' + event);
        //     element.addEventListener(event, this.events[event]);
        // }
        // return element;
        
    }

    get value() {
        return this.element?.value;
    }

}