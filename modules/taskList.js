
{

    const mongoose=require('mongoose');
    // const {  } = require('../routes/task');


    const newTaskShema= new mongoose.Schema({
        TaskName:{
            type:String,
            require:true
        },
        targetTask:{
            type:Number,
            require:true
        },
        taskStatus:[
        ],
        catogiry:{
            type:String,
            require:true
        },
        Days:{
            type:Number,
            require:true
        },
        time:{
            type:String,
        }
        
    },{
        timestamps:true
    });


    const newTask=mongoose.model('newTask',newTaskShema);
    module.exports=newTask;

}