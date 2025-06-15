import React from 'react';

const Sidebar = ({ users, onUserSelect }) => {
  return (
    <div style={{ width: '250px', borderRight: '1px solid #ccc', padding: '10px' }}>
      <h3>Users</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {users.map((user) => (
          <li
            key={user._id}
            onClick={() => onUserSelect(user)}
            style={{
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: '#f5f5f5',
              cursor: 'pointer',
              borderRadius: '5px'
            }}
          >
            <strong>{user.fullName}</strong>
            <div style={{ fontSize: '12px', color: user.userStatus === 'active' ? 'green' : 'gray' }}>
              {user.userStatus === 'active' ? "Online" : "Offline"}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
