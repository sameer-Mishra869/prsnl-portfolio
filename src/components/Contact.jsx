import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "../data/data";
import { FiMail, FiMapPin, FiPhone, FiGithub, FiLinkedin, FiCheckCircle, FiSend } from "react-icons/fi";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = "Name is required";
    if (!form.email.trim()) err.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Enter a valid email";
    if (!form.message.trim()) err.message = "Message is required";
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  return (
    <section id="contact">
      <div className="container">
        <motion.div className="section-header" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Connect</h2>
          <p className="section-subtitle">Have a question or want to collaborate? Drop me a message!</p>
        </motion.div>
        <div className="contact-grid">
          <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <h3>Let's talk about everything!</h3>
            <p>I'm always excited to connect with fellow developers, mentors, and anyone who shares a passion for tech. Feel free to reach out!</p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMail /></div>
                <div className="contact-detail-text">
                  <div className="label">Email</div>
                  <div className="value">{personalInfo.email}</div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiPhone /></div>
                <div className="contact-detail-text">
                  <div className="label">Phone</div>
                  <div className="value">{personalInfo.phone}</div>
                </div>
              </div>
              <div className="contact-detail">
                <div className="contact-detail-icon"><FiMapPin /></div>
                <div className="contact-detail-text">
                  <div className="label">Location</div>
                  <div className="value">{personalInfo.location}</div>
                </div>
              </div>
            </div>
            <div className="social-links">
              <a href={personalInfo.socialLinks.github} target="_blank" rel="noreferrer" className="social-link" aria-label="GitHub"><FiGithub /></a>
              <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn"><FiLinkedin /></a>
            </div>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2}>
            {submitted ? (
              <div className="contact-form">
                <div className="form-success">
                  <FiCheckCircle size={48} />
                  <h3>Message Sent!</h3>
                  <p>Thanks for reaching out. I'll get back to you soon!</p>
                  <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => setSubmitted(false)}>Send Another</button>
                </div>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input type="email" id="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea id="message" name="message" placeholder="Hi Sameer, I'd love to..." value={form.message} onChange={handleChange} />
                  {errors.message && <p className="form-error">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>
                  <FiSend /> Send Message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
