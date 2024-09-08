import React from 'react';
import './ContactUs.css';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import m1 from './../../assets/domain.png';
import m2 from './../../assets/twitter.png';
import m3 from './../../assets/mail.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const ContactUs = () => {
    const [result, setResult] = React.useState("");

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required'),
            message: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setResult("Sending....");
            const formData = new FormData();
            
            formData.append("access_key", "20be7354-30cc-4211-b361-47c6e8ded2f6");
            formData.append("name", values.username);
            formData.append("email", values.email);
            formData.append("message", values.message);
            
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                setResult("Message sent Successfully!");
                resetForm();
            } else {
                console.log("Failed to Send", data);
                setResult(data.message);
            }
        },
    });

    return (
        <div className='contact' id='contactus'>
            <div className="contact-col">
                <h3>Ask Anything about our LMS<div className='setalign'><WhatshotIcon /></div></h3>
                <p>The best Learning Management System in the World</p>
                <p>Our LMS provides a comprehensive platform for online learning and course management.</p>
                <ul>
                    <li><img src={m1} alt="" />www.chalkboard.com</li>
                    <li><img src={m3} alt="" />chalkboard@gmail.com</li>
                    <li><img src={m2} alt="" />Chalkboard</li>
                </ul>
            </div>
            <div className="contact-col">
                <form onSubmit={formik.handleSubmit}>
                    <label>Your Name
                        <input 
                            type='text' 
                            name='username' 
                            placeholder='Enter your name'
                            {...formik.getFieldProps('username')}
                            required
                        />
                    </label>
                    {formik.touched.username && formik.errors.username ? (
                        <div style={{color: 'red'}}>{formik.errors.username}</div>
                    ) : null}
                    <br />

                    <label>Email
                        <input 
                            type='text' 
                            name='email' 
                            placeholder='Email' 
                            {...formik.getFieldProps('email')}
                            required
                        />
                    </label>
                    {formik.touched.email && formik.errors.email ? (
                        <div style={{color: 'red'}}>{formik.errors.email}</div>
                    ) : null}
                    <br />

                    <label>Write your Message</label>
                    <textarea 
                        name="message" 
                        rows="6" 
                        placeholder='Enter your message' 
                        {...formik.getFieldProps('message')}
                        required
                    />
                    {formik.touched.message && formik.errors.message ? (
                        <div style={{color: 'red'}}>{formik.errors.message}</div>
                    ) : null}
                    <br />

                    <button type='submit' className='btn dark-btn'>Send</button>
                </form>
                <span>{result}</span>
            </div>
        </div>
    );
};

export default ContactUs;
