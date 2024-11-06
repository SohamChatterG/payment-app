import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { Dashboard } from './pages/Dashboard';
import { SendMoney } from './pages/SendMoney';
import History from './pages/History';
import AuthRoute from './components/AuthRoute';
import { UserProvider } from './components/UserContext'; // Import UserProvider

function App() {
  return (
    <UserProvider>  {/* Wrap everything inside the UserProvider */}
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
          <Route
            path="/send"
            element={
              <AuthRoute>
                <SendMoney />
              </AuthRoute>
            }
          />
          <Route
            path="/history"
            element={
              <AuthRoute>
                <History />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>  
  );
}

export default App;
