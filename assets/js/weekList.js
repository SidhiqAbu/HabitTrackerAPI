

{


    //  Identifing the changes in Habit status and changing it................  
    $('.weekListTable').change( function(e){
        let val={
            id:e.target.id,
            value:e.target.value,
        }
        $.ajax({
            type: 'post',
            url: '/task/status/',
            data:val,
            success: function(data){},
            error: function(error){
                console.log(error.responseText);
            }
        });
    });


}

