import React, { useState } from "react";
import Footer from "../components/Footer";
import "../Styling/Contact.css";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [popup, setPopup] = useState({ show: false, message: "", type: "" });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const showPopup = (message, type) => {
        setPopup({ show: true, message, type });
        setTimeout(() => setPopup({ show: false, message: "", type: "" }), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, email, subject, message } = formData;

        if (!name || !email || !subject || !message) {
            showPopup("Please fill in all fields.", "error");
            return;
        }

        showPopup("Message sent successfully!", "success");
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    return (
        <>
            <div className="ABG">
                {/* Popup message */}
                {popup.show && (
                    <div className={`popup-message ${popup.type}`}>{popup.message}</div>
                )}

                <section className="contact-section">
                    <div className="contact-content">
                        <h2>Contact Us</h2>
                        <p>
                            We'd love to hear from you! Whether you have a question about our
                            platform, feedback, or need assistance, our team is ready to help.
                        </p>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="form-group">
                                <label>Subject</label>
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="Enter the subject"
                                />
                            </div>

                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Write your message..."
                                ></textarea>
                            </div>

                            <button type="submit" className="btn-primary send-btn">
                                Send Message
                            </button>
                        </form>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};

export default Contact;
