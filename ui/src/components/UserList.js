import React from 'react';

const UserList = ({ onEdit, onDelete, users }) => {
  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Mobile</th>
            <th>Media URL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className={user.id}>
              <td>{user.name}</td>
              <td>{user.city}</td>
              <td>{user.mobile}</td>
              <td>{user.mediaUrl}</td>
              <td>
                <button onClick={() => onEdit(user.id)}>Edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
