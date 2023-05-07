import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = (e) => {
    e.preventDefault();
    axios.get('/');
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