// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Blog from './Blog';
import Forum from './Forum';
import Account from './Account';
import Contact from './Contact';
import './app.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Global Header */}
        <header>
          <h1>CopperShore</h1>
          <nav>
            <a href="/blog">Blog</a>
            <a href="/forum">Forum</a>
            <a href="/account">Account</a>
            <a href="/contact">Contact</a>
          </nav>
        </header>

        {/* Routes for Pages */}
        <Routes>
          <Route path="/blog" element={<Blog />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/account" element={<Account />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
