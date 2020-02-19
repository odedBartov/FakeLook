const express = require('express');
const router = express.Router();
const reportServ = require('../services/reportService');
const authService = require('../services/authService');
const userRepo = require('../../dal/repositories/userRepo');

router.post('/addReport', authService.ValidateTokenMiddleware, async (req, res, next) => {
   response = await reportServ.addReport(req.userToken.mail, req.body);
   return res.status(response.status).json(response.resJson);
});


router.post('/getMonthReport', authService.ValidateTokenMiddleware, async (req, res, next) => {
   let mail;
   if (req.body.firstName) {
      const user = await userRepo.FindByName(req.body.firstName, req.body.lastName);
      mail = user.mail;
   }
   else {
      mail = req.userToken.mail;
   }
   response = await reportServ.GenerateMonthlyReport(mail, req.body.month);
   return res.status(response.status).json(response.resJson);
});


router.post('/getManagerMonthReport', authService.ValidateTokenMiddleware, async (req, res, next) => {
   response = await reportServ.ManagerMonthlyReport(req.body.month);
   return res.status(response.status).json(response.resJson);
});





module.exports = router;