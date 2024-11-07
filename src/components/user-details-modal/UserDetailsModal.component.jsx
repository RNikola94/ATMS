import { useState } from 'react';
import './UserDetailsModal.styles.css'

const UserDetailsModal = ({ user, isEditMode, onClose, onSave }) => {
  const [editData, setEditData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave({ ...user, ...editData });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{isEditMode ? "Edit User" : "User Details"}</h2>

        {isEditMode ? (
          <>
            <label>
              First Name:
              <input type="text" name="firstName" value={editData.firstName} onChange={handleChange} />
            </label>
            <label>
              Last Name:
              <input type="text" name="lastName" value={editData.lastName} onChange={handleChange} />
            </label>
            <label>
              Role:
              <input type="text" name="role" value={editData.role} onChange={handleChange} />
            </label>
            <button onClick={handleSave}>Save</button>
          </>
        ) : (
          <>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default UserDetailsModal;
