import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listenToTasks, createTask, updateTaskStatus } from '../../store/taskSlice';
import { db } from '../../utils/firebase.utils';
import { doc, getDoc } from 'firebase/firestore';
import TaskModal from '../project-modal/ProjectModal.component';

const TasksSection = () => {
    const dispatch = useDispatch();
    const { tasks, loading, error } = useSelector((state) => state.tasks);
    const [assignedUserNames, setAssignedUserNames] = useState({});
    const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    console.log('TASKSSS', tasks)

    // Fetch tasks and set up real-time updates
    useEffect(() => {
        const unsubscribe = dispatch(listenToTasks());
        return () => {
            if (typeof unsubscribe === 'function') {
                unsubscribe();
            }
        };
    }, [dispatch]);

    // Fetch and store assigned user names
    useEffect(() => {
        const fetchAssignedUserNames = async () => {
            const userNames = {};
            for (const task of tasks) {
                if (task.assignedUser && !userNames[task.assignedUser]) {
                    const userRef = doc(db, 'users', task.assignedUser);

                    const userSnap = await getDoc(userRef);

                    console.log('USER SNAP', userSnap)
                    if (userSnap.exists()) {
                        userNames[task.assignedUser] = `${userSnap.data().firstName} ${userSnap.data().lastName}`;
                    } else {
                        userNames[task.assignedUser] = 'Unknown User';
                    }
                }
            }
            setAssignedUserNames(userNames);
        };
        if (tasks.length > 0) {
            fetchAssignedUserNames();
        }
    }, [tasks]);

    const handleSaveTask = (taskData) => {
        dispatch(createTask(taskData));
        setShowCreateTaskModal(false);
    };

    const handleEditTask = (taskData) => {
        dispatch(updateTaskStatus({ taskId: taskData.id, status: taskData.status, userRole: taskData.userRole }));
        setSelectedTask(null);
    };

    return (
        <div className="tasks-section">
            <h2>Tasks</h2>
            <button onClick={() => setShowCreateTaskModal(true)}>Create Task</button>
            {loading && <p>Loading tasks...</p>}
            {error && <p>Error: {error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id}>
                            <td>{task.title}</td>
                            <td>{task.description}</td>
                            <td>{task.status}</td>
                            <td>{assignedUserNames[task.assignedUser] || 'Loading...'}</td>
                            <td>
                                <button onClick={() => setSelectedTask(task)}>Edit</button>
                                <button onClick={() => dispatch(updateTaskStatus({ taskId: task.id, status: "Deleted", userRole: "admin" }))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showCreateTaskModal && (
                <TaskModal
                    onClose={() => setShowCreateTaskModal(false)}
                    onSave={handleSaveTask}
                />
            )}

            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={handleEditTask}
                />
            )}
        </div>
    );
};

export default TasksSection;
