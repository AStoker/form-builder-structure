

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
        this.element = document.createElement(this.type);

        //Set attributes
        for (let attribute in this.attributes) {
            this.element[attribute] = this.attributes[attribute];
        }

        this.attachEventsToElement(this.element)

        return this.element;
    }

    attachEventsToElement(element) {
        //Add events
        for (let event in this.events) {
            console.log('Adding event: ' + event);
            element.addEventListener(event, this.events[event]);
        }
        return element;
        
    }

    get value() {
        return this.element?.value;
    }

}