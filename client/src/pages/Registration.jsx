import React, { useState } from 'react';
import axios from 'axios';
import toast, { Toaster }  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  let navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    console.log({ ...data });
    const { name, email, password } = data;
    try {
      const { data } = await axios.post('/register', {
        name, email, password
      })
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({})
        toast.success('Login Successfull. Welcome')
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <section className="registration-container">
        <form onSubmit={registerUser}>
          <input type="text" placeholder="Enter your name" value={data.name} onChange={(e) => setData({
            ...data, name: e.target.value
          })
          } />
          <input type="email" placeholder="Enter your email" value={data.email} onChange={(e) => setData({
            ...data, email: e.target.value
          })
          } />
          <input type="password" placeholder="Enter your password" value={data.password} onChange={(e) => setData({
            ...data, password: e.target.value
          })
          } />
          <button type="submit">Submit</button>
        </form>
      </section>
    </>
  )
}

export default Registration