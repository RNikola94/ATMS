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

      // Check for upcoming deadlines and add notifications
      if (deadline - now < 24 * 60 * 60 * 1000 && task.status !== 'Completed') {
        newNotifications.push(`Task "${task.title}" is due soon!`);
      }

      // Check for newly created tasks
      if (task.isNew) {
        newNotifications.push(`New task "${task.title}" has been created!`);
      }
    });

    // Update notifications only if they differ from the current state
    if (newNotifications.length !== notifications.length || 
        !newNotifications.every((item, index) => item === notifications[index])) {
      setNotifications(newNotifications);
    }

    // Dispatch clearNewTaskFlags only if there are new tasks
    const hasNewTasks = tasks.some(task => task.isNew);
    if (hasNewTasks) {
      dispatch(clearNewTaskFlags());
    }
    
  }, [tasks, dispatch, notifications.length]);

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
