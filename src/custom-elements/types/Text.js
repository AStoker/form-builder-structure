import { IContainer } from 'aurelia';

import style from './Text.scss';

export class Text {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    static template = `<style>${style}</style>` + '<label>${attributes.text}</label>';
    
    static inject = [IContainer];

    constructor(container) {
        this.container = container;
        this.attributes = {};
    }

    activate(attributes) {
        this.attributes = attributes;
    }

    attached() {
        // console.log('Attached text!');
    }

}