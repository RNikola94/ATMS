import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateTaskModal from '../../components/create-task-modal/CreateTaskModal.component';
import TaskList from '../../components/task-list/TaskList.component';
import TaskProgressChart from '../../components/task-progress-chart/TaskProgressChart.component';
import TaskNotifications from '../../components/task-notifications/TaskNotifications.component';

const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div className="dashboard">
      <TaskNotifications />
      <button onClick={() => setIsModalOpen(true)}>Create New Task</button>
      <CreateTaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <TaskList />
      <TaskProgressChart tasks={tasks} />
    </div>
  );
};

export default UserDashboard;
