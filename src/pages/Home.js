import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Parallax } from "react-parallax";
import "../css/Home";

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1 }}
        >
          <h1>The Ultimate Tech Conference</h1>
          <p>Connect. Learn. Innovate. Join industry leaders and tech pioneers.</p>
          <Link to="/ticket">
            <motion.button 
              className="cta-button"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Ticket
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Event Highlights */}
      <section className="event-highlights">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Event Highlights
        </motion.h2>
        <div className="highlights-grid">
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
          >
            <h3>🌍 Global Speakers</h3>
            <p>Hear from top tech leaders & visionaries.</p>
          </motion.div>
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>💡 Cutting-Edge Topics</h3>
            <p>AI, Blockchain, Web3, and more.</p>
          </motion.div>
          <motion.div 
            className="highlight-card"
            initial={{ opacity: 0, scale: 0.9 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>🤝 Networking</h3>
            <p>Meet top professionals & build your network.</p>
          </motion.div>
        </div>
      </section>

      {/* Why Attend Section */}
      <section className="why-attend">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Why Attend?
        </motion.h2>
        <p>Gain insights, explore innovations, and connect with top professionals in tech.</p>
      </section>

      {/* Speakers Preview */}
      <section className="speakers-section">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          Featured Speakers
        </motion.h2>
        <div className="speakers-grid">
          <motion.div 
            className="speaker-card"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8 }}
          >
            <img src="/assets/speaker1.jpg" alt="Speaker 1" />
            <h3>John Doe</h3>
            <p>AI Specialist, Google</p>
          </motion.div>
          <motion.div 
            className="speaker-card"
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/assets/speaker2.jpg" alt="Speaker 2" />
            <h3>Jane Smith</h3>
            <p>Blockchain Developer, Microsoft</p>
          </motion.div>
        </div>
      </section>

      {/* Footer with Parallax Effect */}
      <Parallax bgImage="/assets/footer-bg.jpg" strength={200} className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Tech Conference. All rights reserved.</p>
        </div>
      </Parallax>
    </div>
  );
};

export default Home;
