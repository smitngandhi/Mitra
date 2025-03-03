import React, { useState } from 'react';
import './App.css';

function App() {
  // 6 Testimonials
  const testimonialsData = [
    {
      text: "Thank you for your service. I am very pleased with the result. I have seen exponential growth in my business, and it's all thanks to your amazing service.",
      name: "Emily Stones",
      position: "CEO, Marketing Guru",
      image: "/images/User.png"
    },
    {
      text: "Amazing experience! The best service I have ever used. It completely changed my business strategy.",
      name: "John Doe",
      position: "Founder, Tech Hub",
      image: "/images/User.png"
    },
    {
      text: "Their service is outstanding! I highly recommend it to anyone looking for real business growth.",
      name: "Sarah Lee",
      position: "CMO, Creative Studio",
      image: "/images/User.png"
    },
    {
      text: "I've never been happier with a partnership. Truly transformative for our workflow and results!",
      name: "Ava Smith",
      position: "Operations Lead",
      image: "/images/User.png"
    },
    {
      text: "We achieved record sales in just a few months. The team is fantastic, always ready to help!",
      name: "Michael Green",
      position: "Head of Sales, FinCorp",
      image: "/images/User.png"
    },
    {
      text: "Our collaboration felt seamless, and the results speak for themselves. Highly recommended!",
      name: "Rachel Brown",
      position: "Project Manager, Innovations Inc.",
      image: "/images/User.png"
    }
  ];

  // Track which set of 3 testimonials is visible (0 or 3)
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const showNextTestimonials = () => {
    // Move from 0 to 3, or from 3 back to 0
    setTestimonialIndex((prev) => (prev + 3) % 6);
  };

  const showPrevTestimonials = () => {
    // Move from 0 to 3, or from 3 back to 0
    setTestimonialIndex((prev) => (prev - 3 + 6) % 6);
  };

  // Only show 3 testimonials based on the current index
  const visibleTestimonials = testimonialsData.slice(testimonialIndex, testimonialIndex + 3);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <h1>MITRA</h1>
        </div>
        <nav className="navigation">
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About Us</a>
            <a href="#contact">Contact Us</a>
          </div>
          <div className="auth-buttons">
            <button className="login-btn">Login</button>
            <button className="register-btn">Register</button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-text">
            <h2>Guiding You from Struggles to Strength, One Conversation at a Time</h2>
            <p>Mitra: A Gentle Whisper in the Storm, A Light in Your Darkest Hour</p>
            <button className="get-started-btn">Get Started</button>
          </div>
          <div className="hero-image">
            <img
              src="/images/image1.jpg"
              alt="Therapy session illustration"
            />
          </div>
        </div>

        {/* Partner Logos Section */}
        <div className="partners-section">
          <div className="partner-logos">
            <img 
              src="/images/Google.png" 
              alt="Google logo" 
              className="partner-logo" 
            />
            <img 
              src="/images/Trello.png" 
              alt="Trello logo" 
              className="partner-logo" 
            />
            <img 
              src="/images/Monday.png" 
              alt="Monday.com logo" 
              className="partner-logo" 
            />
            <img 
              src="/images/Monday.png" 
              alt="Notion logo" 
              className="partner-logo" 
            />
            <img 
              src="/images/Slack.png" 
              alt="Slack logo" 
              className="partner-logo" 
            />
          </div>
        </div>

        {/* Services Section */}
        <div className="services-section" id="services">
          <div className="services-header">
            <h3>WHAT WE DO</h3>
            <h2>We provide you a variety of services</h2>
          </div>

          <div className="services-cards">
            <div className="service-card">
              <div className="service-icon">
                <img
                  src="/images/bing.svg"
                  alt="Mind icon"
                />
              </div>
              <h3 class="Service-content">Know Your MIND</h3>
              <p>The 'Know Your Mind' test explores your psychological profile.</p>
              <button className="learn-more-btn">Learn More →</button>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <img
                  src="/images/bing.svg"
                  alt="Self-care icon"
                />
              </div>
              <h3 class="Service-content1">SELFCARE</h3>
              <p>A structured self-care plan fosters balance through healthy habits, mindfulness, and growth.</p>
              <button className="learn-more-btn">Learn More →</button>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <img
                  src="/images/bing.svg"
                  alt="Chat icon"
                />
              </div>
              <h3 class="Service-content2">MINDchat</h3>
              <p>MindChat: Your Intelligent Companion for Mental Well-being & Self-Care.</p>
              <button className="learn-more-btn">Learn More →</button>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-header">
            <div className="title-group">
                <h3>TESTIMONIALS</h3>
                <h2>See What Our Customers Say About Us</h2>
            </div>
            <div className="testimonial-arrows">
              <button onClick={showPrevTestimonials} className="arrow-btn">‹</button>
              <button onClick={showNextTestimonials} className="arrow-btn">›</button>
            </div>
        </div>
          
        <div className="testimonials-container">
          {visibleTestimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <p className="testimonial-text">"{testimonial.text}"</p>
            <div className="testimonial-author">
                <img
                src={testimonial.image}
                alt={testimonial.name}
                className="author-image"
                />
              <div className="author-info">
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
              </div>
            </div>
          </div>
        ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-company">
            <h2>MITRA</h2>
            <p>
              Some footer text about the Agency. Just a little description to
              help people understand you better.
            </p>
            <div className="social-icons">
              <a href="#" className="social-icon facebook">
                <img src="/images/facebook.svg" alt="Facebook" />
              </a>
              <a href="#" className="social-icon twitter">
                <img src="/images/twitter.svg" alt="Twitter" />
              </a>
              <a href="#" className="social-icon linkedin">
                <img src="/images/linkedin.svg" alt="LinkedIn" />
              </a>
              <a href="#" className="social-icon instagram">
                <img src="/images/instagram.svg" alt="Instagram" />
              </a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="footer-address">
            <h3>Address</h3>
            <p>Design Agency Head Office.</p>
            <p>Airport Road</p>
            <p>United Arab Emirates</p>
          </div>
        </div>

        <div className="footer-copyright">
          <p>Copyright Design Agency 2022</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
