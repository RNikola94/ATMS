import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/authSlice';

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [role, setRole] = useState('Contributor');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      return alert('Passwords do not match!');
    }

    if (role === 'admin' && adminKey !== 'SECRET_ADMIN_KEY') {
      alert('Invalid Admin Key');
      return;
    }

    const userData = { firstName, lastName, email, role };
    dispatch(registerUser(email, password, userData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        placeholder="Repeat Password"
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="admin">Admin</option>
        <option value="manager">Manager</option>
        <option value="contributor">Contributor</option>
      </select>

      {role === 'admin' && (
        <input
          type="password"
          placeholder="Enter Admin Key"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          required
        />
      )}
      <button type="submit" disabled={loading}>Sign Up</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SignupPage;
