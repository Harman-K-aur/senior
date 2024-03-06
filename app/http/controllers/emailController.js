const nodemailer=require('nodemailer')
const User=require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function emailController(){
    return{
        async  postregister(req,res){
            const { name, email, role , password }   = req.body
         // Validate request 
         if(!name || !email || !password) {
             req.flash('error', 'All fields are required')
             req.flash('name', name)
             req.flash('email', email)
            return res.redirect('/register')
         }

         // Check if email exists 
        

         const existingUser = await User.findOne({ email });
         if (existingUser) {
             // Render the registration page with an error message
             req.flash('error', 'Email already taken')
             return res.render('auth/register');
         }
         const Password = req.body.password;
         const error = checkPasswordStrength(Password);
         if (error) {
            req.flash('error', error)
            return res.render('auth/register');
        } 

         const hashedPassword = await bcrypt.hash(password, 10)
         const user =await User.create({
             name,
             email,
             role,
             password:hashedPassword
            
         })
        
            sendVerifyEmail(name,email,user._id)
            req.flash('error', 'Registration successful.Please Verify your Email Id')
            return res.redirect('/login')

        },

        async verifyEmail(req,res){
            try {
             const updateInfo=await  User.updateOne({_id:req.query.id},{$set:{verified:true}})
             console.log(updateInfo)
             return res.redirect('/login')
              } catch (error) {
                console.error(error);
                res.status(500).json({ message: "Internal server error" });
              }
            }
        }

    }




async function sendVerifyEmail(name,email,user_id){
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.HOST,
            service:process.env.SERVICE,
            port:process.env.EMAIL_PORT,
            auth:{
                user:process.env.USER,
                pass:process.env.PASS
            },
        });
        await transporter.sendMail({
            from:'Helping Senior Citizen Platform',
            to:email,
            subject:'Verify Email to confirm your identity',
            html:`Hiii `+name+ `!! Hope you are well <p>Please click <a href="https://senior-production.up.railway.app`+process.env.PORT+`/verify?id=`+ user_id +`">here</a> to verify your email.</p>`
        })
        console.log("Email Sent Successfully")
    }catch{
        console.log("Email not sent successfully")
    }
}


function checkPasswordStrength(password) {
    // Minimum length requirement
    if (password.length < 8) {
        return "Password is too short. It must be at least 8 characters long.";
    }
    // Regular expression to check for alphanumeric characters
    const alphanumericRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;
    if (!alphanumericRegex.test(password)) {
        return "Password must contain both letters and numbers.";
    }
    // If password passes all checks, return null
    return null;
}




module.exports=emailController;
