import { useDispatch, useSelector } from 'react-redux';
import { updateTask, listenToTasks } from '../../store/taskSlice';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    dispatch(listenToTasks());
  }, [dispatch]);

  const getFilteredSortedTasks = () => {
    let filteredTasks = tasks;

    if (statusFilter) {
      filteredTasks = filteredTasks.filter(task => task.status === statusFilter);
    }

    if (priorityFilter) {
      filteredTasks = filteredTasks.filter(task => task.priority === priorityFilter);
    }

    if (sortOption === 'Due Date') {
      filteredTasks = filteredTasks.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortOption === 'Priority') {
      const priorityOrder = { Low: 1, Medium: 2, High: 3 };
      filteredTasks = filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    return filteredTasks;
  };

  const filteredSortedTasks = getFilteredSortedTasks();

  return (
    <div className="task-list">
      {/* Filter and Sort Controls */}
      <div className="filters">
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="">All Statuses</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
          <option value="">No Sorting</option>
          <option value="Due Date">Due Date</option>
          <option value="Priority">Priority</option>
        </select>
      </div>

      {/* Task Cards */}
      {filteredSortedTasks.map((task) => (
        <motion.div
          key={task.id}
          className="task-card"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Priority: {task.priority}</p>
          <p>Deadline: {task.deadline}</p>
          <p>Status: {task.status}</p>
          <button onClick={() => dispatch(updateTask({ ...task, status: 'In Progress' }))}>
            Mark In Progress
          </button>
          <button onClick={() => dispatch(updateTask({ ...task, status: 'Completed' }))}>
            Mark Completed
          </button>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
