import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToUsers, deleteUser, updateUser } from '../../store/userSlice';
import UserDetailsModal from '../../components/user-details-modal/UserDetailsModal.component';
import TasksSection from '../../components/tasks-section/TasksSection';
import './AdminDashboard.styles.css';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  console.log('UZZERSSS', users);

  useEffect(() => {
    const unsubscribe = dispatch(listenToUsers());
    return () => unsubscribe();
  }, [dispatch]);

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsEditMode(false);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUser(userId));
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>

      {loading && <p>Loading users...</p>}
      {error && <p>Error: {error}</p>}

      <div className="user-list">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button onClick={() => handleViewDetails(user)}>View</button>
                  <button onClick={() => handleEditUser(user)}>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <UserDetailsModal 
          user={selectedUser} 
          isEditMode={isEditMode} 
          onClose={handleCloseModal} 
          onSave={(updatedUser) => dispatch(updateUser(updatedUser))} 
        />
      )}

      <TasksSection />
    </div>
  );
};

export default AdminDashboard;
