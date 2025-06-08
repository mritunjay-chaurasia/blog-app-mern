import sgMail from '@sendgrid/mail';
import path from 'path';
import fs from 'fs/promises';
import { SENDGRID_API_KEY } from '../constant/index'

sgMail.setApiKey(SENDGRID_API_KEY);

export const emailSend = async (email, subject, template, context = {}) => {
    try {
        const templatePath = path.resolve(`./templates/${template}`);
        let temp = await fs.readFile(templatePath, 'utf-8');

        // Replace placeholders with actual values
        Object.keys(context).forEach(key => {
            const placeholder = `{{${key}}}`;
            temp = temp.replace(new RegExp(placeholder, 'g'), context[key]);
        });

        const msg = {
            to: email,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: subject,
            html: temp,
        };

        await sgMail.send(msg);
        console.log(`Email sent successfully to ${email}!`);
    } catch (error) {
        console.error(`Error sending email to ${email}:`, error.response ? error.response.body : error.message);
    }
};
