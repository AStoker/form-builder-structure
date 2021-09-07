
/*
* Right now we aren't registering events until after the part is rendered. Might be nice to register at construction time of the part.
*/

/*
* This is a singleton class that manages the event handlers for the form.
* @param {Object} form - the form object
*/
export class FormEventManager {

    constructor(formVersion) {
        this.formVersion = formVersion;

        this.registry = new Map();

        this.event = new PubSub();
    }

    /*
    * Register an event handler for a given part. Returns a function that can be used to publish events.
    * @param {Object} element - The element
    * @return {Object} - An object which contains the publish function to publish events
    */
    registerElement(elementInstance) {
        //Do we really need this?
        // this.setRegistryElement(elementInstance);
        const elementId = elementInstance.id;
        return {
            publish: (eventName, eventData) => {
                this.event.publish(`${elementId}:${eventName}`, eventData);
            }
        }
    }

    /*
    * Add the element to the registry map if it doesn't already exist, otherwise add the element to the array of elements
    *   @param {ElementInstance} elementInstance
    */
    // setRegistryElement(elementInstance) {
    //     if (!this.registry.has(elementInstance)) {
    //         this.registry.set(elementInstance, [elementInstance]);
    //     } else {
    //         this.registry.get(elementInstance).push(elementInstance);
    //     }
    // }

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