import BasicElement from "./parts/element.js";
import Component from "./parts/component.js";

export default class FormBuilderParser {

    constructor(json) {
        if (!json) {
            throw new Error("FormBuilderParser: json is required");
        }
        //Need to parse json and figure out what "type" of element it is
        //Rather than checking for a "type" property, we'll infer it from the attributes
        //This means we may not need element, component, and block to be separate classes
        //Lets try and make it work with just elements and components, sans blocks

        /*
            If a "children" property is present, it means it's a component
        */
        try {
            this.json = JSON.parse(json);
        } catch (e) {
            throw new Error("FormBuilderParser: invalid json");
        }
    }

    /*
    * This method will return the DOM result of the json
    */
    parseDOM() {
        // Loop through the json and create the DOM
        let parts = this.json.parts;
        if (!parts) {
            throw new Error("FormBuilderParser: parts is expected in order to parse");
        }
        let container = document.createElement("div");

        for (let part of parts) {
            if (part.children) {
                container.appendChild(this.parseJSONComponent(part));
            } else {
                //This is an unlikely scenario, but it's possible
                container.appendChild(this.parseJSONElement(part));
            }
        }
        return container;
    }

    parseJSONComponent({name, type, attributes, children}) {
        let component = new Component(name, {type, attributes}, children);
        return component.toView();
    }

    parseJSONElement({name, type, attributes}) {
        let element = new BasicElement(name, {type, attributes});
        return element.toView();
    }

}