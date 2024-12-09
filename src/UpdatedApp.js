// import React, { useState } from 'react';

// function App() {
//   // State for blog posts
//   const [posts, setPosts] = useState([
//     { id: 1, title: 'KNIGHT ARMOR: BLOG #3', date: 'October 4, 2024', content: 'This armor is probably the best armor you have ever seen...' },
//     { id: 2, title: 'Xenomorph', date: 'October 5, 2024', content: 'Details about the Xenomorph project go here...' },
//   ]);

//   // State for saved posts and tags
//   const [savedPosts, setSavedPosts] = useState([]);
//   const [tags, setTags] = useState({});

//   // Save a post
//   const savePost = (title) => {
//     if (!savedPosts.includes(title)) {
//       setSavedPosts((prev) => [...prev, title]);
//       alert(`Saved: ${title}`);
//     } else {
//       alert(`${title} is already saved.`);
//     }
//   };

//   // Add a tag to a post
//   const addTag = (title) => {
//     const newTag = prompt(`Enter a tag for "${title}":`);
//     if (newTag) {
//       setTags((prev) => ({
//         ...prev,
//         [title]: [...(prev[title] || []), newTag],
//       }));
//       alert(`Added tag "${newTag}" to "${title}".`);
//     }
//   };

//   // Remove a post
//   const removePost = (id) => {
//     const confirmRemoval = window.confirm('Are you sure you want to remove this post?');
//     if (confirmRemoval) {
//       setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
//     }
//   };

//   return (
//     <div className="App">
//       {/* Header Section */}
//       <header>
//         <h1>CopperShore</h1>
//         <nav>
//           <a href="#blog">Blog</a>
//           <a href="#forum">Forum</a>
//           <a href="#account">Account</a>
//           <a href="#contact">Contact</a>
//         </nav>
//       </header>

//       {/* Main Content */}
//       <main>
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <section key={post.id} className="fade-in">
//               <h2>{post.title}</h2>
//               <p>{post.date}</p>
//               <p>{post.content}</p>
//               <div>
//                 <button onClick={() => savePost(post.title)}>Save Post</button>
//                 <button onClick={() => addTag(post.title)}>Add Tag</button>
//                 <button onClick={() => removePost(post.id)}>Remove Post</button>
//               </div>
//               {/* Display Tags for Each Post */}
//               {tags[post.title] && tags[post.title].length > 0 && (
//                 <p>
//                   <strong>Tags:</strong> {tags[post.title].join(', ')}
//                 </p>
//               )}
//             </section>
//           ))
//         ) : (
//           <p>No posts available.</p>
//         )}
//       </main>

//       <footer>
//         <p>&copy; 2024 CopperShore. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// }

// export default App;