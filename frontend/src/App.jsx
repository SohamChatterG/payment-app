import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import History from "./pages/History";
import AuthRoute from "./components/AuthRoute";
import { UserProvider } from "./components/UserContext";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/" element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route path="/send" element={<AuthRoute><SendMoney /></AuthRoute>} />
          <Route path="/history" element={<AuthRoute><History /></AuthRoute>} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
