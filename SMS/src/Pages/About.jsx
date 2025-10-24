import React from "react";
import Footer from "../components/Footer";
import "../Styling/About.css";

const About = () => {
    return (
        <div className="container">
            <div className="ABG">
                <main className="content">

                    {/* Mission Section */}
                    <section className="about-section">
                        <h2 style={{color:'navy',textAlign:'center'}}>About ClassMate</h2>
                        <p style={{ color: 'black', marginTop: '20px' }}>
                            ClassMate is built to simplify educational management through smart,
                            efficient, and secure digital solutions. We help institutions manage
                            student data, streamline communication, and focus more on learning.ClassMate is designed to make education 
                            smarter, faster, and more connected — helping institutions embrace digital transformation with ease.
                        </p>
                    </section>

                    {/* Features Section */}
                    <section className="about-section features-section">
                        <h2>Why Choose Us?</h2>
                        <div className="features-grid">

                            <div className="feature-card">
                                <div className="feature-icon">🚀</div>
                                <h3>Efficient Management</h3>
                                <p>Track student progress and records easily with our intuitive tools.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <h3>Data Security</h3>
                                <p>Your data stays protected with enterprise-level encryption.</p>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📊</div>
                                <h3>Smart Insights</h3>
                                <p>Use real-time analytics to make better academic decisions.</p>
                            </div>

                        </div>
                    </section>

                    {/* Vision Section */}
                    {/* <section className="about-section">
                        <h2>Our Vision</h2>
                        <p>
                            We aim to create a world where technology empowers education —
                            making learning smoother, management smarter, and collaboration effortless.
                        </p>
                    </section> */}

                    {/* CTA Section */}
                    <section className="about-cta">
                        <h2>Ready to Elevate Your Institution?</h2>
                        <p>Join schools and universities using ClassMate to transform education.</p>
                        <div className="cta-buttons">
                            <a href="/contact" className="btn btn-primary">Contact Us</a>
                            <a href="/services" className="btn btn-secondary">Our Services</a>
                        </div>
                    </section>

                </main>

            </div>
                <Footer />

        </div>
    );
};

export default About;
