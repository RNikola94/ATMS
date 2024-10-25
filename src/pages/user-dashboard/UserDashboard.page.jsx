import { useState } from 'react';
import { useSelector } from 'react-redux';
import CreateTaskModal from '../../components/create-task-modal/CreateTaskModal.component';
import TaskList from '../../components/task-list/TaskList.component';
import TaskProgressChart from '../../components/task-progress-chart/TaskProgressChart.component';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <div className="dashboard">
      <button onClick={() => setIsModalOpen(true)}>Create New Task</button>
      <CreateTaskModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
      <TaskList />
      <TaskProgressChart tasks={tasks} />
    </div>
  );
};

export default Dashboard;
