import React from 'react';
import { UserProvider } from './UserContext'; // Import the provider
import { Users } from './User';
import { Dashboard } from '../pages/Dashboard';
const Main = () => {
    return (
        <UserProvider>
            <Dashboard />
            <Users />
        </UserProvider>
    );
};

export default Main;
