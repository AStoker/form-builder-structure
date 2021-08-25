

export default class Part {
    #hidden;

    constructor(name, elementClass, attributes) {
        this.name = name;
        this.vm = elementClass;
        this.attributes = attributes;
        this.#hidden = 'hi there';
        this.compose = null;
    }

    toJSON() {
        //TODO: Properly get the getters and setters and their original functions
        let parsedAttributes = {};
        for (let attribute in this.attributes) {
            let attrDesc = Object.getOwnPropertyDescriptor(this.attributes, attribute);
            parsedAttributes[attribute] = attrDesc;
        }
        return {
            name: this.name,
            type: this.vm.name,
            attributes: parsedAttributes
        }
    }

    get value() {
        return this.attributes?.value;
    }
    set value(value) {
        if (this.attributes) {
            this.attributes.value = value;
        } else {
            this.attributes = { value };
        }
    }

}