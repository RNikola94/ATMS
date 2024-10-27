import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { clearNewTaskFlags } from '../../store/taskSlice';
import './task-notification.styles.css';

const TaskNotifications = () => {
  const { tasks } = useSelector((state) => state.tasks);
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const newNotifications = [];

    tasks.forEach((task) => {
      const deadline = new Date(task.deadline);
      const now = new Date();

      // Notify if deadline is within 24 hours
      if (deadline - now < 24 * 60 * 60 * 1000 && task.status !== 'Completed') {
        newNotifications.push(`Task "${task.title}" is due soon!`);
      }

      // Notify about newly added tasks
      if (task.isNew) {
        newNotifications.push(`New task "${task.title}" has been created!`);
      }
    });

    setNotifications(newNotifications);
    dispatch(clearNewTaskFlags());
  }, [tasks, dispatch]);

  const dismissNotifications = () => setNotifications([]);

  return (
    <div className="notifications-container">
      {notifications.length > 0 && (
        <button onClick={dismissNotifications} className="dismiss-btn">Dismiss All</button>
      )}
      <AnimatePresence>
        {notifications.map((notification, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="notification"
          >
            {notification}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TaskNotifications;
