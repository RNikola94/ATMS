import { useSelector } from 'react-redux';

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard - {user?.firstName} {user?.lastName}</h1>
      <p>Email: {user?.email}</p>
      
      <div className="admin-actions">
        <h2>Manage Quizzes</h2>
        <button>Create New Quiz</button>

        <h2>Manage Users</h2>
        <button>View All Users</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
