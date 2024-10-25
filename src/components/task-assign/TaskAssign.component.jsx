import { useDispatch } from 'react-redux';
import { updateTask } from '../../store/taskSlice';

const TaskAssign = ({ task }) => {
  const dispatch = useDispatch();

  const handleAssignUser = (userId) => {
    dispatch(updateTask(task.id, { ...task, assignedUser: userId }));
  };

  return (
    <div>
      <h3>Assign Task</h3>
      <select onChange={(e) => handleAssignUser(e.target.value)}>
        <option value="user1">User 1</option>
        <option value="user2">User 2</option>
      </select>
    </div>
  );
};

export default TaskAssign;
