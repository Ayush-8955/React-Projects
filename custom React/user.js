import { makingReactElement, creatingRootByClass, elementRender } from './customReact.js';

// import 'customReact.js'

let rootEl=creatingRootByClass('root')

let reactEl=makingReactElement('p',{id:'ayush'},"Namaste ,mera name hai Ayush ")
elementRender(rootEl,reactEl)