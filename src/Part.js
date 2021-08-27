

export default class Part {
    #hidden;

    constructor(name, elementClass, attributes) {
        this.name = name;
        this.vm = elementClass;

        this._attributes = attributes;
        // this.attributes = parseGetters(attributes);
        //We are only supporting attributes that are either value (standard entry) or get (like a getter function)


        this.#hidden = 'hi there';
        this.compose = null;
    }

    toJSON() {
        //TODO: Properly get the getters and setters and their original functions
        let parsedAttributes = {};
        for (let attribute in this._attributes) {
            let attrDesc = Object.getOwnPropertyDescriptor(this._attributes, attribute);
            if (typeof attrDesc?.value === 'function') {
                attrDesc.value = {
                    get: attrDesc.value.toString().replace(/\r?\n|\r/g, " ") //Remove any special chars from the string
                };
            }
            parsedAttributes[attribute] = attrDesc.value;
        }
        return {
            name: this.name,
            type: this.vm.name,
            attributes: parsedAttributes
        }
    }

    get attributes() {
        return parseGetters(this._attributes);
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


function parseGetters(obj) {
    let newObj = {};

    //Go through the object and any functions turn into getters
    for (let key in obj) {
        let attrDesc = Object.getOwnPropertyDescriptor(obj, key);
        if (typeof attrDesc.value === 'function') {
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    return attrDesc.value();
                }
            });
        } else if (typeof attrDesc.value === 'object') { //We've likely received an object which defines a getter (from JSON)
            //We're going to expect a 'get' property
            // newObj[key] = eval(attrDesc.value.get); //TODO: can we make this safer without eval?
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    //Need to execute this in the context of the parent... How can we do that?
                    return eval(attrDesc.value.get)();//TODO: can we make this safer without eval?
                }
            });
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
