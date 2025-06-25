import '../index.css';

const DisplayLinks = ({
  links,
  handleDelete,
  handleEdit,
  handleSave,
  handleCancel,
  editingId,
  editedUrl,
  editedSlug,
  setEditedUrl,
  setEditedSlug
}) => {
  return (
    <div className="display">
      <div style={{ margin: '50px' }}>
        <h2>My Links :</h2>
        <table>
          <thead>
            <tr>
              <th>Short URL</th>
              <th>Original URL</th>
              <th>Clicks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map(link => (
              <tr key={link._id}>
                <td>
                  {editingId === link._id ? (
                    <input
                      value={editedSlug}
                      onChange={(e) => setEditedSlug(e.target.value)}
                    />
                  ) : (
                    <a
                      href={`http://localhost:5000/r/${link.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      /r/{link.slug}
                    </a>
                  )}
                </td>
                <td>
                  {editingId === link._id ? (
                    <input
                      value={editedUrl}
                      onChange={(e) => setEditedUrl(e.target.value)}
                    />
                  ) : (
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.originalUrl}
                    </a>
                  )}
                </td>
                <td>{link.clickCount}</td>
                <td>
                  {editingId === link._id ? (
                    <>
                      <button onClick={() => handleSave(link._id)} style={{ backgroundColor: '#305b9b', marginRight:'10px'}}>Save</button>
                      <button onClick={handleCancel} style={{ backgroundColor: 'gray' }}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(link)} style={{ backgroundColor: 'green', marginRight:'10px'}}>Edit</button>
                      <button onClick={() => handleDelete(link._id)} style={{ backgroundColor: '#b31010' }}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisplayLinks;
