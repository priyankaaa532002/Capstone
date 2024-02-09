import React from 'react';

const Home = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <h2>Welcome to Our Blockchain-Enabled Healthcare Platform</h2>
          <p style={{ fontSize: '16px' }}>Improving medical data security and integrity with blockchain technology.</p>
        </div>
        <div style={{ flex: 1 }}>
          <img src="bgimg.png" alt="Medical Data Security" style={{ width: '100%', height: 'auto', display: 'block' }} />
        </div>
      </div>
      <footer style={{ textAlign: 'center', marginTop: '20px' }}>
        <p>&copy; 2024 Your Healthcare Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;
