const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/signIn/:password/:mail', async (req, res, next) => {

    await userService.SignIn(req.params.password, req.params.mail, res);
});

//add new user to mongoDB
router.post('/signUp', async (req, res, next) => {

    await userService.SignUp(res,req, req.body);
});

router.post('/checkEmailExists', async (req, res, next) => {
    response = await userService.CheckEmailExists(req.body.mail);
    console.log(res);
    res.status(response.status).json(response.resJson);
});

router.post('/isEmployeeNameExist', async (req, res, next) => {
    response = await userService.IsEmployeeNameExist(req.body.firstName, req.body.lastName);
    return res.status(response.status).json(response.resJson);
 });

 router.post('/verifyUser', async (req, res, next) => {
    response = await userService.verifyUser(req.body.mail);
    return res.status(response.status).json(response.resJson);
 });
 



module.exports = router;