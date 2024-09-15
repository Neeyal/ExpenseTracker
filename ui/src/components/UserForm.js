import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';


const UserForm = ({ userId, onSave, cities, handleClose, show }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setMobile] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:3000/user/${userId}`)
        .then(response => {
          setName(response.data.name);
          setCity(response.data.city);
          setMobile(response.data.mobile);
          setMediaUrl(response.data.mediaUrl);
        })
        .catch(error => console.error('Error fetching user:', error));
    } else {
      // Clear the form if not editing
      setName('');
      setCity('');
      setMobile('');
      setMediaUrl('');
    }
  }, [userId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = { name, city, mobile, mediaUrl };

    if (userId) {
      axios.patch(`http://localhost:3000/user/${userId}`, user)
        .then(response => {
          onSave();
        })
        .catch(error => console.error('Error updating user:', error));
    } else {
      axios.post('http://localhost:3000/user', user)
        .then(response => {
          onSave();
        })
        .catch(error => console.error('Error adding user:', error));
    }
    handleClose();
  };

  return (
    <Modal show={show}>
      <Modal.Header className="custom-modal-header">
        <Modal.Title className="modal-title-center">{userId ? 'Update User' : 'Add User'}</Modal.Title>
        <button type="button" className="close" onClick={handleClose}>
          <span>&times;</span>
        </button>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Media URL:</label>
        <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} />
      </div>
      <button type="submit" className="submit-button">{userId ? 'Update' : 'Add'} User</button>
    </form>
      </Modal.Body>
    </Modal>
  );
};

export default UserForm;



{/* 
    <form onSubmit={handleSubmit} className="user-form">
      <div className="form-group">
        <label>Name:</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </div>
      <div className="form-group">
        <label>City:</label>
        <input type="text" value={city} onChange={e => setCity(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Mobile:</label>
        <input type="text" value={mobile} onChange={e => setMobile(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Media URL:</label>
        <input type="url" value={mediaUrl} onChange={e => setMediaUrl(e.target.value)} />
      </div>
      <button type="submit" className="submit-button">{userId ? 'Update' : 'Add'} User</button>
    </form> */}