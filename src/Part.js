

export default class Part {
    #hidden;

    constructor(id, name, elementClass, attributes, formVersion) {
        this.id = id; //This does not correlate to the DOM id
        this.name = name;
        this.vm = elementClass;
        //TODO: We need to get the ID to the element somehow. Doing it on the prototype won't work because it'll overwrite all parts
        //this.vm.prototype.id = this.id;

        this._attributes = attributes;
        // this.attributes = parseGetters(attributes, formVersion);
        //We are only supporting attributes that are either value (standard entry) or get (like a getter function)
        this.executingContext = formVersion;

        this.#hidden = 'hi there';
        this.compose = null;

    }

    toJSON() {
        let parsedAttributes = {};
        for (let attribute in this._attributes) {
            let attrDesc = Object.getOwnPropertyDescriptor(this._attributes, attribute);
            if (typeof attrDesc?.value === 'function') {
                attrDesc.value = {
                    get: attrDesc.value.toString()
                };
            } else if (typeof attrDesc?.get === 'function') {
                attrDesc.value = {
                    get: attrDesc.get.toString()
                };
            }
            parsedAttributes[attribute] = attrDesc.value;
        }
        return {
            id: this.id,
            name: this.name,
            type: this.vm.name,
            attributes: parsedAttributes
        }
    }

    get data() {
        return {
            id: this.id,
            attributes: this.attributes
        }
    }

    get attributes() {
        return parseGetters(this._attributes, this.executingContext);
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
            // let getterFunc = new Function('formVersion', `return (${attrDesc.value.get})(formVersion)`);
            Object.defineProperty(newObj, key, {
                enumerable: true,
                get() {
                    //Need to execute this in the context of the parent... How can we do that?
                    // return eval(attrDesc.value.get).bind(callingContext)(callingContext);//TODO: can we make this safer without eval?
                    let getterFunc = new Function('formVersion', `return (${attrDesc.value.get})(formVersion)`);
                    return getterFunc(callingContext);
                }
            });
        } else {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
