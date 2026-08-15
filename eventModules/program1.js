//Event
//EventEmitter - on(emit event para , callback)-register event or event listeners
//  ,emit()-trigger every/create event /fire event

// const EventEmitter=require('events');
// const event=new EventEmitter();
// event.on("greet",()=>{
//     console.log("this is event emitter ");
// });  
// event.emit("greet");const EventEmitter= require('events');
class MyEvent extends EventEmitter{}
const events = new EventEmitter();
events.on("greet", (name)=>{
    console.log(`Hello, ${name}! This is event emitter`);  //template literal ${variable}

})
events.on("exit", ()=>{
    console.log("This is exit event");
});
events.emit("greet","Ranjana");
events.emit("exit");


