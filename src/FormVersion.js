import BasicElement from "./parts/element.js";
import Component from "./parts/component.js";

export default class FormVersion {
    version = '1.0.0';
    parts = [];

    constructor(form) {
        //If the form is a string, we'll try and parse from json
        if (typeof form === 'string') {
            try {
                this.setFromJson(form);
            } catch (e) {
                throw new Error(e);
            }
        } else { //The form is assumed to be a full form object
            this.version = form.version;
            this.parts = form.parts;
        }
    }

    /*
    * Parse the form version from JSON
    * @param {string} formJson - The form as a JSON string
    */
    setFromJson(formJson) {
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

        for (let part of formVersion.parts) {
            if (part.children) {
                this.parts.push(this.parseJSONComponent(part));
            } else {
                //This is an unlikely scenario, but it's possible
                this.parts.push(this.parseJSONElement(part));
            }
        }

        this.version = formVersion.version || this.version;

        return this;
    }

    parseJSONComponent({name, type, attributes, children}) {
        let parsedChildren = children.map(child => {
            if (child.children) {
                return this.parseJSONComponent(child);
            } else {
                return this.parseJSONElement(child);
            }
        });
        let component = new Component(name, {type, attributes}, parsedChildren);
        return component;
    }

    parseJSONElement({name, type, attributes}) {
        let element = new BasicElement(name, {type, attributes});
        return element;
    }

}