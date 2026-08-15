//Event
//EventEmitter - on(emit event para , callback)-register event or event listeners
//  ,emit()-trigger every/create event /fire event

// const EventEmitter=require('events');
// const event=new EventEmitter();
// event.on("greet",()=>{
//     console.log("this is event emitter ");
// });  
// event.emit("greet");const EventEmitter= require('events');
// class MyEvent extends EventEmitter{}
// const events = new EventEmitter();
// events.on("greet", (name)=>{
//     console.log(`Hello, ${name}! This is event emitter`);  //template literal ${variable}

// })
// events.on("exit", ()=>{
//     console.log("This is exit event");
// });
// events.emit("greet","Ranjana");
// events.emit("exit");


// day 5
// Full stack development workshop program 1
//Program 1 
//emit() on()
// const EventEmitter=require("events");
// const event=new EventEmitter();
// // event.on("greet",()=>{
// //     console.log("this is event emitter");
    
// // })
// event.once("greet",()=>{
//     console.log("event trigger only one time");
    
// })
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
// event.emit("greet");
//Program 1:create custom EventEmitter that trigger "greet" or "exit"
class MyEmitter extends EventEmitter{}
const event=new MyEmitter()
event.on("greet",(name)=>{
console.log(`hello ${name}`);//template literals`${}`

})
event.on("exit",()=>{
    console.log("exits mycustom event emitter..");
    
})
event.emit("greet","cse24");
event.emit("exit");
