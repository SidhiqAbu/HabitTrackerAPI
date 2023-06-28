


{
    // Home button navigating into Home Page..........
    let homeButton = $("#home");
    homeButton.click(function(){
        $.ajax({
            type:'get',
            url:'/',
            data:homeButton.serialaize(),
            success:function(data){
                console.log("success");
            },error:function(error){
                console.log(error.responceText);
            }
        });
    });


    //  Week List button navigating into WeekList Page............
    let weeklistButton = $("#weeklist");
    weeklistButton.click(function(){
        $.ajax({
            type:'get',
            url:'/home/weeklist',
            data:"",
            success:function(data){
                console.log("success");
            },error:function(error){
                console.log(error.responceText);
            }
        });
    });


}
