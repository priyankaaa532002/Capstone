import React, { useEffect } from 'react';

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
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', paddingTop: '60px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Arial, sans-serif', fontSize: '40px', color: '#000', marginBottom: '20px' }}>Welcome to our Blockchain Health Platform</h1>
        <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', lineHeight: '1.6', color: '#333', marginBottom: '30px', paddingTop: '30px' }}>
          Our platform leverages blockchain technology to ensure data integrity and security in the healthcare industry.
          With blockchain, we guarantee tamper-proof records, secure data sharing, and enhanced patient privacy.
        </p>
        <button className="btn btn-primary" style={{ borderRadius: '25px', padding: '10px 30px', fontSize: '18px' }}>Get Started</button>
      </div>
      <footer style={{ background: 'linear-gradient(135deg, #007bff, #007bff, #17a2b8)', color: '#fff', position: 'fixed', bottom: '0', left: '0', width: '100%', padding: '5px 0', textAlign: 'center', boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.1)' }}>
        <p>&copy; 2024 Blockchain Health Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
