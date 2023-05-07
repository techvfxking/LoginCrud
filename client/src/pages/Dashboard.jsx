import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Dashboard = () => {
    const { user } = useContext(UserContext);
    console.log(user);
    return (
        <>
            <h1>Dashboard</h1>
            {!!user && (<h2>Hi {user.name}!</h2>)}
        </>

    )
}

export default Dashboard