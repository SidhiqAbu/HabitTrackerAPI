  
{


  //   IMPORTING OF TASKS FILE OF MONGOOS OF MONGO DB .............. 
  const task = require('../modules/taskList');
  const dayStatus = require('../modules/everyDayStatus');


  // CREATION OF LAST WEEK HABIT STATUS ARRAY WITH DEFULT NON REACTION TO TOTAL WEEK............
  let lastWeekList = async function(){
    let d = new Date();
    let Dates=[];
    let i=6;
    while(i>-1){
      let newDate= new Date(d.getFullYear(),d.getMonth(),d.getDate()-i);
      let newDay = await dayStatus.create({
        Date : newDate.toDateString(),
        Status:'Non'
      });
      Dates.push({id:newDay._id});
      i--;
    }
  return Dates;
  };



  //  CREATION OF NEW TASKS IN MONGO DB DATA BASE AND REDIRECTING BACK TO HOME PAGE........
  module.exports.creat= async function(req,res){
    try {

      let findHabit = await task.find({TaskName:req.body.TaskName});
      if(findHabit.length === 0){
        let Dates = await lastWeekList();
        let newHabit = await task.create({
          TaskName:req.body.TaskName,
          targetTask:req.body.targetTask,
          taskStatus:Dates,
          catogiry:req.body.taskCatogiry,
          Days:0,
          time:req.body.time
        });

        if(req.xhr){
          return res.status(200).json({
            data:{
              habitNew:newHabit
            },
            message:"New Habit created successfully..!"
          });
        }
      };
      return res.redirect('back');
    } catch (error) {
      console.log(error);
      return res.redirect('back');
    }

  };









  //  DELETION OF TASKS IN MONGO DB DATA BASE AND REDIRECTING BACK TO HOME PAGE.........
  module.exports.delete= async function(req,res){
      console.log(req.query.id);
      try {
        let deteleHabit = await task.findByIdAndDelete(req.query.id);
        let data = deteleHabit.taskStatus;
        for(let elm of data){
          let val = await dayStatus.findByIdAndDelete(elm.id);
        };
        if(req.xhr){
          return res.status(200).json({
            data:deteleHabit
          });
        }
        return res.redirect('/');
      } catch (error) {
        console.log(error);
        return res.redirect('/');
      }
  };







  // CHANGING THE HABIT STATUS IN ALL DAYS.......
  module.exports.status = async function(req,res){
    try {
      let dateHabit= await dayStatus.findById(req.body.id);
      dateHabit.Status = req.body.value;
      dateHabit.save();
      let val = await updateDays(req.body);
      // console.log(val);
      if(req.xhr){
        return res.status(200).json({
          data:{
            info:val.Days,
            target:val.targetTask
          },message:"successfully done"
        });
      };
      return res.redirect('/');
    } catch (error) {
      console.log(error);
      return res.redirect('/');
    }
  };

  // update task done days.............
  let updateDays = async function(elem){
    let val = await task.find({});
    for(let vals of val){
      let count=0;
      let flag='false';
      for(let id of vals.taskStatus){
              let data = await dayStatus.findById(id.id);
              if(data.Status==="Done"){
                count++;
              }
              if(id.id == elem.id){
                flag='true';
              }
          };
          vals.Days = count;
          vals.save();
          if(flag ==='true'){
             return vals;
          }
      }
    };



}
