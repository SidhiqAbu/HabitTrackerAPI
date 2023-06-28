

{


    // CREATION OF NEW HABIT BY SUMITTING THE FORM DATA AND USING AJAX POST REQUEST............
    let newHabitForm = $("#HabitCF");
    newHabitForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type: 'post',
                url: '/task/creat',
                data: newHabitForm.serialize(),
                success: function(data){
                let newHabit=newHabitDOM(data.data.habitNew);
                $('#HabitContainer').append(newHabit);
                $(".habitStatus").change(function(e){
                    e.preventDefault();
                        changStatus(e);
                        if(e.target.value==="Done"){
                            $('.days').html(`Days:1/${data.data.habitNew.targetTask}`);
                        }else{
                            $('.days').html(`Days:0/${data.data.habitNew.targetTask}`);
                        };
                        
                    });        
                $(".deleteHF").click(function(e){
                        e.preventDefault();
                        deleteHabitDB(e.currentTarget.id);
                    });
            }, error: function(error){
                    console.log(error.responseText);
                }
            });
        });

    

    // CREATION OF DOM ELEMENT USING SUBMITTED FORM DATA........
        let newHabitDOM = function(task){
            return $(`
            <div class="habitInfo" id="habit-${task._id}">
                    <p>${task.TaskName}</p>
                    <p class="days">Days :${task.Days}/${task.targetTask}</p>
                    <p>${task.catogiry}</p>
                    <p>${task.time}</p>
                    <p>
                            <label for="taskStatus">Status:</label>
                            <select name="taskStatus" id="${task.taskStatus[task.taskStatus.length-1].id}" class="habitStatus">
                            <option value="none" selected disabled hidden>None</option>
                            <option value="Done">Done</option>
                            <option value="Not Done">Not Done</option>
                            </select>
                    </p>
                    <p class="deleteHF" id="${task._id}">Delete</p>
            </div>
            `);
        };


      


    //  IDENFIFICATION OF CLICK OF DELETE BUTTON......
    $(".deleteHF").click(function(e){
            e.preventDefault();
            deleteHabitDB(e.currentTarget.id);
        });


    //  DELETING OF HABIT USING AJAX CALL ...............
        let deleteHabitDB = function(val){
            $.ajax({
                type: 'get',
                url: `/task/delete/?id=${val}`,
                success: function(data){
                $(`#habit-${data.data._id}`).remove();
            }, error: function(error){
                    console.log(error.responseText);
                }
            });

        };

    // IDENTIFING AND CHANGING CURRENT  STATUS OF HABIT .............
        $('.habitStatus').change(function(e){
            e.preventDefault();
            changStatus(e);
        });

        let changStatus = function(e){
            let val={
                id:e.target.id,
                value:e.target.value,
            }
            $.ajax({
                type: 'post',
                url: '/task/status/',
                data:val,
                success:function(data){
                    $(`#days-${e.target.id}`).text(`Days:${data.data.info}/${data.data.target}`);
            }, error: function(error){
                    console.log(error.responseText);
                }
            });
        };




}