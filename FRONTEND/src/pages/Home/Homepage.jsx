import React from 'react';
import Header from '../../components/Homepage/Header/Header.jsx';
import Main from '../../components/Homepage/Main/Main.jsx';
import Footer from '../../components/Footer/Footer.jsx';

function Homepage() {
  return (
    <div className="homepage-container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default Homepage;
