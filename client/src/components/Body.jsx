import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/body.css';
import DisplayLinks from './DisplayLinks';

const Body = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?._id;

  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUrl, setEditedUrl] = useState('');
  const [editedSlug, setEditedSlug] = useState('');
  const [showForm, setShowForm] = useState(true);

const fetchLinks = async () => {
  if (!userId) {
    console.log('no user found');
    return;
  }
  try {
    const res = await axios.get('http://localhost:5000/api/links', {
      params: { userId }
    });
    console.log(res.data);
    setLinks(res.data);
  } catch (err) {
    console.error('failed to fetch links');
  }
};


  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchLinks();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/links', {
        originalUrl,
        customSlug,
        userId,
      });
      setOriginalUrl('');
      setCustomSlug('');
      fetchLinks();
    } catch (error) {
      alert('something went wrong');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/links/${id}`, {
        data: { userId },
      });
      fetchLinks();
    } catch (error) {
      alert('delete failed');
    }
  };

  const handleEdit = (link) => {
    setEditingId(link._id);
    setEditedUrl(link.originalUrl);
    setEditedSlug(link.slug);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditedUrl('');
    setEditedSlug('');
  };

  const handleSave = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/links/${id}`, {
        originalUrl: editedUrl,
        slug: editedSlug,
        userId,
      });
      setEditingId(null);
      fetchLinks();
    } catch (error) {
      alert('update failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <span className="nav-title">URL Shortener</span>
        <div className="nav-links">
          <button onClick={() => setShowForm(true)}>Add Link</button>
          <button onClick={() => setShowForm(false)}>My Links</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </nav>

      <div className='form-div'>
      {showForm && (
        <form className="link-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Custom slug (optional)"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
          />
          <button style={{ backgroundColor: 'green' }} type="submit">Shorten</button>
        </form>
      )}
      </div>
      {!showForm && (
        <DisplayLinks
          links={links}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleCancel={handleCancel}
          editingId={editingId}
          editedUrl={editedUrl}
          editedSlug={editedSlug}
          setEditedUrl={setEditedUrl}
          setEditedSlug={setEditedSlug}
        />
      )}
    </div>
  );
};

export default Body;
