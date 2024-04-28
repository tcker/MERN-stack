import { useState } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast'; // Import toast from react-hot-toast
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const response = await axios.post('/register', { name, email, password });
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error); // Use toast here
      } else {
        // Update state without clearing all fields
        setData(prevData => ({ ...prevData, name: '', email: '', password: '' }));
        toast.success('Login Successful! Welcome');
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster /> {/* Place Toaster component outside of the form */}
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type='text' placeholder='enter name...' value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
        <label>Email</label>
        <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
        <label>Password</label>
        <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}
