


{

    // IMPORTING OF MODULES TASK LIST MEANS.. HABITS LIST............
    const tasks = require('../modules/taskList');
    const dayStatus = require('../modules/everyDayStatus');
    const datesBetween = require('dates-between');



    //  CHECKING AND ADDING TODAY HABIT TASK STATUS........
    let todayHabitStatus = async function(datahabit){
        let statusArr =[];
        for(let data of datahabit){
            let status = data.taskStatus; 
            let index = status.length-1;
            let val= await dayStatus.findById(status[index].id);
            if(val.Date !== new Date().toDateString()){
                console.log(val.Date,new Date());
                let indicator = {
                    Date:val.Date,
                    id:data._id
                };
                let newDay = await newDays(indicator);
                statusArr.push(newDay); 
            }else{
                statusArr.push(val);
            }
        }
        return statusArr;
    };



    // ADDING OF unchecked days of habit........
    let newDays = async function(elem){
        let currentDate = new Date(elem.Date);
        currentDate.setDate(currentDate.getDate() + 1);
        let newDay;
        while (currentDate <= new Date()) {
            console.log(currentDate);
            newDay = await dayStatus.create({
                Date : currentDate.toDateString(),
                Status:'Non'
            });
            await checking({data:newDay,id:elem.id});
            currentDate.setDate(currentDate.getDate() + 1);
          }
      
        return newDays;
    };







    //  RENDERING OF HOME PAGE ..........
    module.exports.home= async function(req,res){
        let result= await tasks.find({});
        let val= await todayHabitStatus(result);
        return  res.render('home',{
                title:'Home',
                tasks:result,
                currentSt:val
            });
    };


    //  Increment of next day in habit..........
    let checking= async function(elem){
        console.log(elem);
    let val =await tasks.findById(elem.id);
            console.log(val.taskStatus);
            val.taskStatus.push({
                id:elem.data._id
            });
            // console.log(val.taskStatus);
            val.save();
        
    };

}
