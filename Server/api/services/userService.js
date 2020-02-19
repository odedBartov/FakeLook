const userRepo = require('../../dal/repositories/userRepo');
const modelsFactory = require('../services/modelsFactory');
const hashServ = require('./hashService');
const authServ = require('./authService');
const SendEmail = require('./emailService');

//sign up new user
async function SignUp(res, req, body) {

    response = {};
    console.log(body.mail);
    //check if mail is already exists
    foundUser = await userRepo.FindByMail(body.mail);
    console.log(foundUser);
    if (foundUser) {
        response.status = 200;
        response.resJson = {
            result: false,
            errorCode: 346,
            errorDesc: "The mail is already exists"
        };

    }
    else {
        //create new user and add it to db
        newUser = modelsFactory.CreateUser(body, false);
        await userRepo.AddUser(newUser);

        //create url with verify token and sending this to user email in order to confirm account
        let tokenURL = `${req.headers.origin}/confirm/${newUser.mail}`;
        let message = `to verify your account please click  <a href='${tokenURL}'>Click Me</a>\n\nTHANK YOU!!!`;
        const options = { email: newUser.mail, subject: "Confirmation From Track Hours System", message: message };

        try {
            await SendEmail(options);
        }
        catch (err) {
            console.log(err);
        }

        response.status = 200;
        response.resJson = {
            result: true,
            msg: "Create User Succcesfully"
        };

    }
    res.status(response.status).json(response.resJson);
}

//sign in, by password and email
async function SignIn(password, mail, res) {

    foundUser = await userRepo.FindByMail(mail);
    console.log(foundUser);
    resData = {};

    if (foundUser) {
        if (!foundUser.isConfirmed) {
            resData.status = 200;
            resData.resJson = {
                result: false,
                errorCode: 365,
                errorDesc: "You didnt confirm your account"
            }
        }
        else if (hashServ.ComparePasswords(password, foundUser.password)) {
            const token = authServ.CreateValidationToken({ mail: foundUser.mail, isManager: foundUser.isManager });
            resData.status = 200;
            resData.resJson = {
                result: true,
                isManager: foundUser.isManager,
                token: token
            }
        }
        else {
            resData.status = 200;
            resData.resJson = {
                result: false,
                errorCode: 340,
                errorDesc: "Password is incorrect"
            };
        }
    }
    else {
        resData.status = 200;
        resData.resJson = {
            result: false,
            errorCode: 348,
            errorDesc: "Email are not exists"
        };
    }
    res.status(resData.status).json(resData.resJson);
}

async function CheckEmailExists(mail) {
    user = await userRepo.FindByMail(mail);
    response = {
        status: 200
    };

    if (user) {
        response.resJson = {
            result: true
        };
    }
    else {
        response.resJson = {
            result: false,
            errorCode: 356,
            errorDesc: "This email isn't exists"
        };
    }
    console.log(response);
    return response;
}

async function IsEmployeeNameExist(firstName, lastName) {
    user = await userRepo.FindByName(firstName, lastName);
    response = { status: 200 };
    if (user) {
        response.resJson = {
            result: true
        }
    }
    else {
        response.resJson = {
            result: false,
            errorCode: 360,
            errorDesc: "This emloyee name is not exist"
        }
    }
    return response;
}

async function verifyUser(mail) {
    await userRepo.UpdateConfirmation(mail);
    response = {
        status: 200,
        resJson: {
            messgae: "Your Account Is Comfirmed Successfully"
        }
    };
    return response;
}


module.exports = {
    SignUp: SignUp,
    SignIn: SignIn,
    CheckEmailExists: CheckEmailExists,
    IsEmployeeNameExist: IsEmployeeNameExist,
    verifyUser: verifyUser
}
