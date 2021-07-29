

export default class Part {
    name = 'Part';
    type = this.name;
    attributes = {};

    constructor(name, {type, attributes}) {
        this.name = name;
        this.type = type;
        this.attributes = attributes;
    }

}