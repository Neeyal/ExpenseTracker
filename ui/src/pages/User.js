import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';

const User = () => {
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchUsers();
    fetchCities();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:3000/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };
  
  const fetchCities = () => {
    axios.get('http://localhost:3000/cities')
      .then(response => {
        console.log(response)
        setCities(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  };

  const handleEdit = (userId) => {
    setShowModal(true)
    setEditingUserId(userId);
  };

  const handleDelete = (userId) => {
    axios.delete(`http://localhost:3000/user/${userId}`)
      .then(response => {
        fetchUsers();
      })
      .catch(error => console.error('Error fetching users:', error));
  }

  const handleSave = () => {
    setEditingUserId(null);
    fetchUsers(); // Fetch the updated list of users
  };

  return (
    <div>
      <nav class="navbar bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
          <a class="navbar-brand">User Management</a>
          <button class="btn btn-outline-success"  onClick={() => setShowModal(true)}>Add User</button>
        </div>
      </nav>
      <UserForm userId={editingUserId} onSave={handleSave} cities={cities} show={showModal}
        handleClose={() => { setShowModal(false); setEditingUserId(null);}}/>
      <UserList users={users} onEdit={handleEdit} onDelete={handleDelete}/>
    </div>
  );
};

export default User;
