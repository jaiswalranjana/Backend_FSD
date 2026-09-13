//simulate DOM-like events handling in node.js using events
//dispatchEvent
// const event=new EventEmitter=require('events');
// const event=new EventEmitter();
// EventEmitterAsyncResource();
// emitter.on();
// emitter.emit('click');
// emitter.emit('mouseover');


//simulate DOM-like events handling in node.js using events
//dispatchEvent
// const event=new EventEmitter=require('events');
// const event=new EventEmitter();
// EventEmitterAsyncResource();
// emitter.on();
// emitter.on("mouseover",()=>{
//     console.log("mouseover event triggered");
// });
// EventEmitterAsyncResource.emit('click',(name)=>{
//     console.log("click event triggered ");
//     console.log(`hello cse 24 ${name}`);
//     })

// emitter.emit('click');
// emitter.emit('mouseover');


//simulate DOM like event handling in nodejs using events
//addEventListener-.on()
//dispatchEvent- .emit()
//one event at a time

import { EventEmitter } from "events";


const emitter = new EventEmitter();

emitter.on("click", (name)=>{
    console.log("click event triggered");
    console.log(`hello cse 24 ${name}`);
});

emitter.on("mouseover", (name)=>{
    console.log("mouseover event triggered");
    console.log(`hello cse 24 ${name}`);
});

emitter.emit('click', 'Ranjana');
emitter.emit('mouseover', 'Ranjana' )