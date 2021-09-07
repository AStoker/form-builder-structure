import { IContainer } from 'aurelia';
// import { DirtyCheckSettings } from '@aurelia/runtime'; //If the dirty checking becomes too expensive, we can adjust the timeouts per check

import Template from './Text.html';
import style from './Text.scss';

const TextTemplate = `<style>${style}</style>${Template}`;

class Text {
    //Something nice about shadow dom is that we can use id's and not care if they're used elsewhere
    //TODO: Allow different types of text types

    static inject = [IContainer];

    constructor(container) {
        this.container = container;
        this.attributes = {};

        // DirtyCheckSettings.timeoutsPerCheck = 1000;
        // console.log(DirtyCheckSettings);
    }

    activate({id, attributes}) {
        this.id = id;
        this.attributes = attributes;
    }

    attached() {
        // console.log('Attached text!');
    }

}

export { TextTemplate, Text };
