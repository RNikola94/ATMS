import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './landing-page.styles.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <motion.section
        className="hero-section"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <h1>Supercharge Your Productivity</h1>
        <p>Take control of your projects and streamline your workflow with our powerful platform.</p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Link to="/register">
            <button className="cta-button">Get Started</button>
          </Link>
        </motion.div>
      </motion.section>

      <section className="features-section">
        <motion.div
          className="feature-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h3>Intuitive Dashboard</h3>
          <p>Manage all your projects and tasks with ease through a beautifully designed interface.</p>
        </motion.div>

        <motion.div
          className="feature-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <h3>Real-time Collaboration</h3>
          <p>Work together seamlessly with your team and stay in sync across all devices.</p>
        </motion.div>

        <motion.div
          className="feature-item"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <h3>Advanced Analytics</h3>
          <p>Gain actionable insights and track progress with detailed reports and visual data.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default LandingPage;
