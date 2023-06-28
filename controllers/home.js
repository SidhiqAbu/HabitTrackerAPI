


{

    // IMPORTING OF MODULES TASK LIST MEANS.. HABITS LIST............
    const tasks = require('../modules/taskList');
    const dayStatus = require('../modules/everyDayStatus');



    //  CHECKING AND ADDING TODAY HABIT TASK STATUS........
    let todayHabitStatus = async function(datahabit){
        let statusArr =[];
        for(let data of datahabit){
            let status = data.taskStatus; 
            let index = status.length-1;
            let val= await dayStatus.findById(status[index].id);
            if(val.Date !== new Date().toDateString()){
                let newDay = await dayStatus.create({
                    Date : new Date().toDateString(),
                    Status:'Non'
                });
                checking({data:newDay,id:data._id});
                statusArr.push(newDay); 
            }else{
                statusArr.push(val);
            }
        }
        return statusArr;
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
            console.log(val.taskStatus);
            val.save();
        
    };

}
