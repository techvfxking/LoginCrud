import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      })
      if (data.error) {
        toast.error(data.error);
      }
      else {
        toast.success("Logged In")
        setData({});
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <section className="login-container">
        <form onSubmit={loginUser}>
          <input type="email" placeholder="Enter your email" value={data.name} onChange={(e) => setData({
            ...data, email: e.target.value
          })
          } />
          <input type="password" placeholder="Enter your password" value={data.name} onChange={(e) => setData({
            ...data, password: e.target.value
          })
          } />
          <button type="submit">Login</button>
        </form>
      </section>
    </>
  )
}

export default Login