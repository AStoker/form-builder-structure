

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
        return {
            name: this.name,
            type: this.vm.name,
            attributes: this.attributes
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