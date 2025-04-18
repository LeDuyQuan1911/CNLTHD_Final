
const User = require('../models/user');

const getCreateUser = (req, res) => {
    return res.render('createUser.ejs');
}

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.name;
    let city = req.body.city;
    console.log(`check dat ${email} ${name} ${city}`);
    await User.create({
        email: email,
        name: name,
        city: city
    });
    res.send('post create user success!');
}   

module.exports = { getCreateUser,postCreateUser };