// src/Blog.js
import React, { useState } from 'react';
import './Blog.css';

function Blog({ searchQuery }) {
  const [query, setQuery] = useState(''); // State to handle search input

  const posts = [
    {
      id: 1,
      title: 'KNIGHT ARMOR: BLOG #3',
      content: `KNIGHT ARMOR: HELLO MY NAME IS COPPERSHORE! I AM MAKING KNIGHT ARMOR:
      This armor is probably the best armor you have ever seen!
      I have put blood, sweat, and tears into this project, and these are the steps I did to make it.`,
      image: 'path_to_knight_armor_image.jpg',
      date: 'OCTOBER-4-2024',
    },
    {
      id: 2,
      title: 'XENOMORPH',
      content: 'Details about the Xenomorph project...',
      image: 'path_to_xenomorph_image.jpg',
      date: 'OCTOBER-5-2024',
    },
  ];

  // Filter posts based on the search query
  const filteredPosts = posts.filter((post) =>
    `${post.title} ${post.content}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="blog-container">
      <h1 className="blog-title">Blog</h1>

      {/* Search Bar */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog posts..."
        className="search-input"
      />

      {/* Blog Posts */}
      <div className="blog-posts">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <div className="blog-content">
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </div>
              <div className="blog-image-container">
                <img
                  src={post.image}
                  alt={post.title}
                  className="blog-image"
                />
                <p className="blog-date">{post.date}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No posts match your search.</p>
        )}
      </div>
    </div>
  );
}

export default Blog;
