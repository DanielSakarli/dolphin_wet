const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const User = require('../models/User');

class PasswordService {

/**
* @param {String} email Reset the password of the user with the given email
*/
static async sendNewPassword(email, userName) {
try {
	if (userName) {

    // Change the password in the database before sending the email:
    // Random hash password
    const randomPassword = Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
    console.log('Random pw: ', randomPassword);
    let newPasswordHash = await bcrypt.hash(randomPassword, 12)
    // Change password
    await User.query().patch({
      password_hash: newPasswordHash
    }).where('email', email);
    console.log('user name: ', userName.name);

    // User password has been resetted with a random number
	// Email configuration:
	const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASSWORD
	}
	});
	
	    // Send email with the new password
	    let mailOptions = {
			from: `"Dolphin WET App" <${process.env.EMAIL}>`, // sender address
			to: email, // list of receivers
			subject: 'Dolphin WET App: Your new password.', // Subject line
			text: `Hello ${userName.name},\n\nhere is the new password that you requested:\n
               ${randomPassword}\n\nWe strongly encourage you to change your password, since the content of this e-mail might be accessible to third-partys!\nIf you did not request this new password, contact your administrator immediatly!\n\nYour Dolphin-WET-App`, // plain text body
	    };
			  
	    // Sends the mail
		await new Promise((resolve, reject) => {
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
			  console.error(error);
		      reject(error); 
			  } else {
			  console.log('Email sent: ' + info.response);
			  resolve(info);
            }
		});
		});
		
        return;    
    } else {
        throw new Error("EMAIL_DOES_NOT_EXIST")
    }

		} catch (error) {
			console.error(error);
		}
	}
}

module.exports = PasswordService;
