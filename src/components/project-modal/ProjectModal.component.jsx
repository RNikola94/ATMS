import { useState } from 'react';
import { useSelector } from 'react-redux';

const TaskModal = ({ onClose, onSave, task = {} }) => {
    const [title, setTitle] = useState(task.title || '');
    const [description, setDescription] = useState(task.description || '');
    const [status, setStatus] = useState(task.status || 'Not Started');
    const [assignedUser, setAssignedUser] = useState(task.assignedUser || '');
    const { users, loading, error } = useSelector((state) => state.users);


    const handleSave = () => {
        const taskData = { title, description, status, assignedUser };
        onSave(taskData);
        onClose();
    };

    return (
        <div className="task-modal-overlay">
            <div className="task-modal">
                <h2>{task.id ? 'Edit Task' : 'Create Task'}</h2>
                
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task Title"
                    required
                />
                
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    required
                />
                
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <select value={assignedUser} onChange={(e) => setAssignedUser(e.target.value)} required>
                    <option value="">Assign to User</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstName}
                            {user.lastName}
                        </option>
                    ))}
                </select>

                <button onClick={handleSave}>Save</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default TaskModal;
