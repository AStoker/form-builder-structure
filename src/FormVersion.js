// import BasicElement from "./parts/element.js";
// import Component from "./parts/component.js";
import Part from './Part.js';

import { FormEventManager } from './FormEventManager.js';

import { Input, InputTemplate } from './custom-elements/types/Input.js';
import { Text, TextTemplate } from './custom-elements/types/Text.js';

import { createElementDefinition } from './custom-elements/custom-element-factory.js';

export default class FormVersion {
    version = '1.0.0';
    parts = [];

    constructor(form, container) {
        this.container = container;
        //If the form is a string, we'll try and parse from json
        if (typeof form === 'string') {
            try {
                this.setFromJSONString(form);
            } catch (e) {
                throw new Error(e);
            }
        } else if (form) { //The form is assumed to be a full form object
            this.version = form.version;
            this.parts = form.parts;
        }

        this.eventManager = container.get(FormEventManager);
        //TODO: We need some kind of event management here
    }

    /*
    * Parse the form version from JSON
    * @param {string} formJson - The form as a JSON string
    */
    setFromJSONString(formJson) {

        //Try and parse the json string
        let formVersion = {};
        try {
            formVersion = JSON.parse(formJson);
        } catch (e) {
            throw new Error('FormVersion: Invalid form JSON');
        }

        if (!formVersion.parts) {
            return; //Nothing to parse out
        }

        for (let {id, name, attributes} of formVersion.parts) {
            //TODO: Should we take into account index, or are we fine with knowing the order is correct?
            this.add(name, attributes, id);
        }

        this.version = formVersion.version || this.version;

        return this;
    }

    toJSON() {
        return JSON.stringify({
            version: this.version,
            parts: this.parts
        }, null, 4);
    }

    /*
    * Add an element to the form.
    * @param {string|object} element - The element to add
    * @param {object} attributes - Attributes to add to the element
    * @param {number} [index] - The location in the top level where to add the element
    * @returns object - The element added
    */
    add(element, attributes, id, index) {
        //TODO: accept an object rather than a whole list of arguments
        index = index && index > -1 ? index : this.parts.length;
        if (typeof element === 'string') {
            //Create an element based off the assumed ID given
            let elementClass = null;
            let elementName = element;
            switch (elementName) { //TODO: pull this out into an element resolver
                case 'et-input':
                    elementClass = createElementDefinition(elementName, Input, InputTemplate);
                    break;
                case 'et-date':
                    elementClass = createElementDefinition(elementName, Input, InputTemplate);
                    break;
                case 'et-label':
                    elementClass = createElementDefinition(elementName, Text, TextTemplate);
                    break;
                case 'et-text':
                    elementClass = createElementDefinition(elementName, Text, TextTemplate);
                    break;
                default:
                    throw new Error('FormVersion: Invalid element type');
            }

            //TODO: Figure some way to give unique ID's to all parts. This will be used for events and identifying the parts. Need to ensure that all ID's are unique
            id = id || createId(elementName, this.allIds);
            let parsedAttributes = parseGetters(attributes, this);
            let elementPart = new Part(id, elementName, elementClass, attributes, this);

            this.parts.splice(index, 0, elementPart);
            // console.log(this.parts);
            return elementPart;
        } else {
            //Assume it's an element ready for us to use
        }
    }

    /*
    * Get an element by ID
    * @param {string} id - The ID of the element to get
    * @returns object - The element
    */
    get(id) {
        return this.parts.find(part => part.id === id);
    }

    get allIds() {
        //TODO: When we support children, scan the children for IDs
        return this.parts.map(part => part.id);
    }
}

/*
 * Create an id for the element
 * @param {string} [elementName] - The name of the element we can use to create an ID
 * @param {array} [ids] - An array of IDs already in use
 * @returns {string} - The id for the element
 */
function createId(elementName, ids) {
    let index = 1;
    let id = `${elementName.toLowerCase()}-${index}`;
    while (ids.includes(id)) {
        index++;
        id = `${elementName.toLowerCase()}-${index}`;
    }
    return id;
}


function parseGetters(obj, callingContext) {
    let newObj = {};

    //Go through the object and any functions turn into getters
    for (let key in obj) {
        let attrDesc = Object.getOwnPropertyDescriptor(obj, key);
        if (typeof attrDesc.value === 'function') {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    return attrDesc.value.bind(callingContext)(callingContext);
                }
            });
        } else if (typeof attrDesc.value === 'object') { //We've likely received an object which defines a getter (from JSON)
            //We're going to expect a 'get' property
            // newObj[key] = eval(attrDesc.value.get); //TODO: can we make this safer without eval?
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    //Need to execute this in the context of the parent... How can we do that?
                    return eval(attrDesc.value.get).bind(callingContext)(callingContext);//TODO: can we make this safer without eval?
                }
            });
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
