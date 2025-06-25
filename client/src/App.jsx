import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import DisplayLinks from './components/DisplayLinks';

const App = () => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [customSlug, setCustomSlug] = useState('');
  const [links, setLinks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedUrl, setEditedUrl] = useState('');
  const [editedSlug, setEditedSlug] = useState('');

  const fetchLinks = async () => {
    const res = await axios.get('http://localhost:5000/api/links');
    setLinks(res.data);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/links', {
        originalUrl,
        customSlug
      });
      setOriginalUrl('');
      setCustomSlug('');
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.error || 'Something went wrong');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/links/${id}`);
    fetchLinks();
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
      });
      setEditingId(null);
      fetchLinks();
    } catch (error) {
      alert(error.response?.data?.error || 'Update failed');
    }
  };

  return (
    <div className="app">
      <h1>URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter the Original URL : </label>
        <input
          type="text"
          placeholder="Enter original URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
        />
        <br /><br />
        <label>Enter the Custom URL : </label>
        <input
          type="text"
          placeholder="Custom slug (optional)"
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
        />
        <br /><br />
        <div className='shorten'>
          <button style={{ backgroundColor: 'green' }} type="submit">Shorten</button>
        </div>
      </form>
      <br />
      <DisplayLinks links={links} handleDelete={handleDelete} handleEdit={handleEdit} handleSave={handleSave} handleCancel={handleCancel}editingId={editingId} editedUrl={editedUrl} editedSlug={editedSlug} setEditedUrl={setEditedUrl} setEditedSlug={setEditedSlug}
/>
    </div>
  );
};

export default App;
