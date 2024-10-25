import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTask } from '../../store/taskSlice';
import { motion } from 'framer-motion';

const CreateTaskModal = ({ isOpen, closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState('To Do');
  const dispatch = useDispatch();

  const handleCreateTask = (e) => {
    e.preventDefault();
    const taskData = { title, description, priority, deadline, status };
    dispatch(createTask(taskData));
    closeModal();
  };

  return isOpen ? (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="modal"
    >
      <div className="modal-content">
        <h2>Create New Task</h2>
        <form onSubmit={handleCreateTask}>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          
          {/* Status Dropdown */}
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <button type="submit">Create Task</button>
        </form>
        <button onClick={closeModal}>Close</button>
      </div>
    </motion.div>
  ) : null;
};

export default CreateTaskModal;
