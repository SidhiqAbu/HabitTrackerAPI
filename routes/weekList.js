
{


    const express = require('express');
    const route = express.Router();
    route.use(express.urlencoded());
    const homeController= require('../controllers/weekList');
    route.get('/weeklist',homeController.weeklist);

    module.exports=route;


}