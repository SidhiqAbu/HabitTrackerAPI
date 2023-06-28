
{
    const mongoose=require('mongoose');


    const newDayShema= new mongoose.Schema({
        Date:{
            type:String,
            require:true
        },
        Status:{
            type:String,
            require:true
        }
    },{
        timestamps:true
    });

    const newDay = mongoose.model('newDay',newDayShema);
    module.exports= newDay;

}