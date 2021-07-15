const express = require('express');
const router = express.Router();
const { sequelize, Customer } = require('../models');


const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//register step 1
router.post('/register-step-one', async (req, res) => {
    const { idNumber, email, password, confirmPassword } = req.body;

    let registeredIdNumber;

    if (idNumber) {
        registeredIdNumber = await Customer.findOne({ where: { id: idNumber } })
    }

    if (!idNumber || !email || !password || !confirmPassword) {
        res.status(401).send({ error: 'נא למלא את כל השדות' })
    } else if (!validateEmail(email)) {
        res.status(401).send({ error: 'כתובת אימייל אינה תקינה' })
    } else if (registeredIdNumber) {
        res.status(401).send({ error: 'תעודת זהות קיימת במערכת' })
    } else if (password && password.length < 6) {
        res.status(401).send({ error: 'אורך סיסמה צריך להיות לפחות שישה תווים' })
    } else if (password !== confirmPassword) {
        res.status(401).send({ error: 'סיסמאות לא תואמות' })
    } else {
        res.send()
    }
})

//register step 2
router.post('/register-step-two', async (req, res) => {
    const { idNumber, email, password, firstName, lastName, city, street } = req.body;
    if (!firstName || !lastName || !city || !street) {
        res.send({ error: 'נא למלא את כל השדות' })
    } else {
        try {
            await sequelize.sync();
            await Customer.create({
                id: idNumber,
                first_name: firstName,
                last_name: lastName,
                email,
                password,
                city,
                street
            });
            res.send();
        } catch (e) {
            console.error(e)
            res.send(e)
        }
    }
})

//login
router.post('/login', async (req, res) => {
    const { idNumber, password } = req.body;

    const loggingInUser = await Customer.findOne({ where: { id: idNumber } });
    console.log(loggingInUser)

    if (!loggingInUser) {
        res.send({ error: 'משתמש לא נמצא' })
    } else if (loggingInUser.password !== password) {
        res.send({ error: 'סיסמה לא נכונה' })
    } else {
        res.send({ userId: loggingInUser.id });
    }
})

module.exports = router;
