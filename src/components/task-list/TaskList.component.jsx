import { useDispatch, useSelector } from 'react-redux';
import { updateTask, listenToTasks } from '../../store/taskSlice';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(listenToTasks());
  }, [dispatch]);

  const handleStatusChange = (taskId, status) => {
    dispatch(updateTask(taskId, status));
  };

  return (
    <div className="task-list">
      {tasks.map((task) => (
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
          <button onClick={() => handleStatusChange(task.id, 'In Progress')}>Mark In Progress</button>
          <button onClick={() => handleStatusChange(task.id, 'Completed')}>Mark Completed</button>
        </motion.div>
      ))}
    </div>
  );
};

export default TaskList;
