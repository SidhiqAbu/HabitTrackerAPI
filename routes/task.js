
{


    // IMPORTING OF EXPRESS ......
    const express = require('express');

    //  CREATION OF ROUTE OF EXPRESS.......
    const route = express.Router();

    //  USEING OF MIDDLE WARE .....
    route.use(express.urlencoded());

    //  IMPORTING OF THE TASK PAGE OF CONTROLLERS.....
    const homeController= require('../controllers/task');

    //  CALLING OF REQUESTS TO CREAT AND DELETE Tasks....
    route.post('/creat',homeController.creat);
    route.get('/delete',homeController.delete);
    route.post('/status',homeController.status);

    // EXPORTING OF ROUT OF EXPRESS.........
    module.exports=route;

}
