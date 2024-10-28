import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../store/userSlice';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { users, loading, error } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard - {user?.firstName} {user?.lastName}</h1>
      <p>Email: {user?.email}</p>

      <div className="admin-actions">
        <h2>Manage Users</h2>
        
        {loading && <p>Loading users...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button onClick={() => handleViewUser(user.id)}>View</button>
                    <button onClick={() => handleEditUser(user.id)}>Edit</button>
                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const handleViewUser = (userId) => {
  console.log(`View details for user: ${userId}`);
};

const handleEditUser = (userId) => {
  console.log(`Edit user: ${userId}`);
};

const handleDeleteUser = (userId) => {
  console.log(`Delete user: ${userId}`);
};

export default AdminDashboard;
