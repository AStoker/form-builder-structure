

export class FormEventManager {

    constructor(formVersion) {
        this.formVersion = formVersion;

        this.registry = new Map();

        this.event = new PubSub();
    }

    registerElement(elementInstance) {
        //Do we really need this?
        this.setRegistryElement(elementInstance);

        return {
            publish: (eventName, eventData) => {
                this.event.publish(`${elementInstance.id}:${eventName}`, eventData);
            }
        }
    }

    /*
    * Add the element to the registry map if it doesn't already exist, otherwise add the element to the array of elements
    *   @param {ElementInstance} elementInstance
    */
    setRegistryElement(elementInstance) {
        if (!this.registry.has(elementInstance)) {
            this.registry.set(elementInstance, [elementInstance]);
        } else {
            this.registry.get(elementInstance).push(elementInstance);
        }
    }

}

/*
* Basic PubSub class
*/
export class PubSub {
    
    constructor() {
        this.subscribers = {};
    }

    subscribe(eventName, callback) {
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }
        this.subscribers[eventName].push(callback);
    }

    publish(eventName, data) {
        if (this.subscribers[eventName]) {
            this.subscribers[eventName].forEach(callback => callback(data));
        }
    }

}