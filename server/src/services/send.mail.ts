import nodemailer from 'nodemailer'

// sendGrid 

interface IMailInformation{
    to : string, 
    subject : string, 
    text : string
}

const sendMail = async (mailInformation:IMailInformation)=>{
// nodemailer setup
 const transporter = nodemailer.createTransport({
    service : "gmail",  // yahoo, hotmail 
    auth : {
        user : process.env.NODEMAILER_GMAIL,
        pass : process.env.NODEMAILER_GMAIL_APP_PASSWORD// real password hainw --> app password ho (GOOGLE account --> search app password -- create -- remove space of app password)
    }
 })

 const mailFormatObject = {
    from : "Learning Platform <bhupendrachand749@gmail.com>",
    to : mailInformation.to, 
    subject : mailInformation.subject, 
    html : mailInformation.text
 }

try {
    await transporter.sendMail(mailFormatObject)
} catch (error) {
    console.log(error)
}

}


export default sendMail 