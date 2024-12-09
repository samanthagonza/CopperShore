import React, { useState, useEffect } from 'react';
import './Forum.css';

function Forum() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const initialCategories = JSON.parse(localStorage.getItem('categories')) || [
    {
      id: 1,
      name: '3D Printing',
      description: 'Discuss all things 3D printing.',
      topics: [],
    },
    {
      id: 2,
      name: 'Software',
      description: 'Share software tips and tools.',
      topics: [],
    },
    {
      id: 3,
      name: 'Engineering',
      description: 'Explore engineering solutions.',
      topics: [],
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [newTopic, setNewTopic] = useState({ title: '', description: '', image: null });
  const [drafts, setDrafts] = useState(JSON.parse(localStorage.getItem('drafts')) || []);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('drafts', JSON.stringify(drafts));
  }, [drafts]);

  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleBackClick = () => setSelectedCategory(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewTopic((prevTopic) => ({ ...prevTopic, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTopic = () => {
    if (newTopic.title && newTopic.description) {
      const updatedCategories = categories.map((category) => {
        if (category.id === selectedCategory.id) {
          return {
            ...category,
            topics: [
              ...category.topics,
              {
                id: category.topics.length + 1,
                title: newTopic.title,
                description: newTopic.description,
                date: new Date().toLocaleDateString(),
                author: 'New User',
                image: newTopic.image,
                likes: 0,
                dislikes: 0, // Initialize likes and dislikes
              },
            ],
          };
        }
        return category;
      });
      setCategories(updatedCategories);
      setNewTopic({ title: '', description: '', image: null });
    }
  };

  const handleDeleteTopic = (categoryId, topicId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          topics: category.topics.filter((topic) => topic.id !== topicId),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleSaveDraft = () => {
    if (newTopic.title || newTopic.description || newTopic.image) {
      setDrafts([...drafts, { ...newTopic, id: drafts.length + 1 }]);
      setNewTopic({ title: '', description: '', image: null });
    }
  };

  const handleLoadDraft = (draft) => {
    setNewTopic(draft);
    setDrafts(drafts.filter((d) => d.id !== draft.id));
  };

  const handleDeleteDraft = (draftId) => {
    setDrafts(drafts.filter((draft) => draft.id !== draftId));
  };

  const handleLike = (categoryId, topicId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          topics: category.topics.map((topic) =>
            topic.id === topicId ? { ...topic, likes: topic.likes + 1 } : topic
          ),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  const handleDislike = (categoryId, topicId) => {
    const updatedCategories = categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          topics: category.topics.map((topic) =>
            topic.id === topicId ? { ...topic, dislikes: topic.dislikes + 1 } : topic
          ),
        };
      }
      return category;
    });
    setCategories(updatedCategories);
  };

  return (
    <div className="forum-container">
      <h1 className="forum-title">Forum</h1>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search forum..."
        className="search-input"
      />

      {!selectedCategory ? (
        <div className="forum-categories">
          {categories.map((category) => (
            <div
              key={category.id}
              className="forum-category"
              onClick={() => handleCategoryClick(category)}
            >
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="forum-topics">
          <button className="back-button" onClick={handleBackClick}>
            Back to Categories
          </button>
          <h2 className="topics-title">{selectedCategory.name}</h2>

          {selectedCategory.topics.map((topic) => (
            <div key={topic.id} className="forum-topic">
              <div className="topic-content">
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <p>Posted by {topic.author} on {topic.date}</p>
                <div className="like-dislike-buttons">
                  <button
                    className="like-button"
                    onClick={() => handleLike(selectedCategory.id, topic.id)}
                  >
                    👍 Like {topic.likes}
                  </button>
                  <button
                    className="dislike-button"
                    onClick={() => handleDislike(selectedCategory.id, topic.id)}
                  >
                    👎 Dislike {topic.dislikes}
                  </button>
                </div>
                <button
                  className="delete-topic-button"
                  onClick={() => handleDeleteTopic(selectedCategory.id, topic.id)}
                >
                  Delete Post
                </button>
              </div>
              {topic.image && (
                <div className="topic-image-container">
                  <img src={topic.image} alt={topic.title} className="topic-image" />
                </div>
              )}
            </div>
          ))}

          <div className="add-topic-form">
            <h3>Add a New Topic</h3>
            <input
              type="text"
              placeholder="Topic Title"
              value={newTopic.title}
              onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              className="form-input"
            />
            <textarea
              placeholder="Topic Description"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              className="form-textarea"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-input"
            />
            <button onClick={handleAddTopic} className="add-topic-button">
              Add Topic
            </button>
            <button onClick={handleSaveDraft} className="save-draft-button">
              Save Draft
            </button>
          </div>

          <div className="drafts-section">
            <h3>Saved Drafts</h3>
            {drafts.length > 0 ? (
              drafts.map((draft) => (
                <div key={draft.id} className="draft-item">
                  <div className="draft-content">
                    <h4>{draft.title || 'Untitled Draft'}</h4>
                    <p>{draft.description || 'No description provided.'}</p>
                  </div>
                  <button onClick={() => handleLoadDraft(draft)} className="edit-draft-button">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteDraft(draft.id)} className="delete-draft-button">
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p>No drafts saved.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Forum;
