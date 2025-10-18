import React from "react";
import Footer from "../components/Footer";
import "../Styling/About.css";

const About = () => {
    return (
        <div className="container">
            <div className="ABG">

                <main className="content">

                    {/* Mission Section */}
                    <div className="about-section">
                        <div className="about-content">
                            {/* <h2>Our Mission</h2> */}
                            <p style={{color:'black',marginTop:'50px',marginBottom:'10px'}}>
                                At ClassMate, we believe in transforming educational administration through
                                cutting-edge technology. Our mission is to provide institutions with a
                                comprehensive, user-friendly platform that simplifies student management,
                                enhances communication, and empowers educators to focus on what matters most - teaching.
                            </p>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="about-section features-section">
                        <h2>Why Choose ClassMate?</h2>
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">🚀</div>
                                <h3>Efficient Management</h3>
                                <p>
                                    Streamline student records, attendance, and academic tracking
                                    with our intuitive interface designed for maximum productivity.
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <h3>Secure & Reliable</h3>
                                <p>
                                    Your data's security is our top priority. We employ enterprise-grade
                                    security measures to protect sensitive information.
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Real-time Analytics</h3>
                                <p>
                                    Make data-driven decisions with comprehensive analytics and
                                    reporting tools that provide valuable insights.
                                </p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">👥</div>
                                <h3>Collaborative Platform</h3>
                                <p>
                                    Foster better communication between students, teachers, and
                                    administrators with our integrated collaboration tools.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Team Section */}
                    <div className="about-section team-section">
                        <h2>Our Vision</h2>
                        <div className="vision-content">
                            <p>
                                We envision a future where educational institutions can operate seamlessly,
                                where administrative tasks are automated, and where educators have more time
                                to inspire the next generation of innovators, thinkers, and leaders.
                            </p>
                            <p>
                                ClassMate is more than just a management system - it's a commitment to
                                educational excellence and technological advancement in the academic sector.
                            </p>
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="about-cta">
                        <h2>Ready to Transform Your Institution?</h2>
                        <p>
                            Join hundreds of educational institutions already using ClassMate to
                            streamline their operations and enhance student success.
                        </p>
                        <div className="cta-buttons">
                            <a href="/contact" className="btn btn-primary">Get In Touch</a>
                            <a href="/services" className="btn btn-secondary">View Services</a>
                        </div>
                    </div>
                </main>
                <Footer />

            </div>

        </div>
    );
};

export default About;