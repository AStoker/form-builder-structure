import { customElement } from '@aurelia/runtime-html';
import { Input } from './types/Input.js';
import { Text } from './types/Text.js';


/*
* Creates a custom element class.
*/

export function createElement(name) {

    var newClass = @customElement({
        name,
        template: '<input />'
    }) class Test extends Input {
        
    };
    
    return newClass;
}