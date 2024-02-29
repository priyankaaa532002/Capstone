import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../global-styles.css';

const Home = () => {
  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling on unmount
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div style={{ background:'#eff0f3', minHeight: '100vh', paddingTop: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h1 className="oxygen-bold" style={{ fontSize: '40px', color: '#000', marginBottom: '20px' }}>Welcome to our Blockchain Health Platform</h1>
        <p className="oxygen-regular" style={{ fontSize: '18px',color: '#000', lineHeight: '1.6', marginBottom: '30px', paddingTop: '30px' }}>
          Our platform leverages blockchain technology to ensure data integrity and security in the healthcare industry.
          With blockchain, we guarantee tamper-proof records, secure data sharing, and enhanced patient privacy.
        </p>
        <Link to="/login">
          <button className="oxygen-bold btn btn-primary" style={{ borderRadius: '1px', padding: '10px 30px', fontSize: '18px', backgroundColor: '#f9bc60',color: "#001e1d", border: 'none', transition: 'background-color 0.3s', ':hover': { backgroundColor: '#f9bc60' } }}>Get Started</button>
        </Link>
      </div>
      <footer style={{ background: '#abd1c6', color: '#001e1d', position: 'fixed', bottom: '0', left: '0', width: '100%', padding: '0px', textAlign: 'center'}}>
        <p>&copy; 2024 Blockchain Health Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
