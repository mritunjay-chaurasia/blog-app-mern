const sgMail = require('@sendgrid/mail');


export const sendGridEmail = (email,subject ,template) => {
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        // Create an email object
        const msg = {
            to:    email,
            from:  'sender@example.com',  // Replace with your verified sender email
            subject: subject,
            text:  'This is a test email sent via SendGrid using Node.js!',
            html: template,
        };
        // Send the email
        sgMail
            .send(msg)
            .then(() => {
                console.log('Email sent successfully!');
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });

    }
    catch (error) {
        console.error(`Error during sending email to this ${email}`)
    }
}






