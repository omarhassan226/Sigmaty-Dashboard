import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Teachers from './pages/teachers/Teachers';
import ControlPanel from './pages/control-panel/ControlPanel';
import Home from './pages/Home/Home';
import Students from './pages/students/Students';
import Packages from './pages/packages/Packages';
import Parents from './pages/parents/Parents';
import Permissions from './pages/permissons/Permissions';
import Notifications from './pages/notifications/Notifications';
import Login from './auth/Login';
import { useAuth } from './contexts/AuthContext';
import Profile from './pages/profile/Profile';
import Signup from './auth/Signup';

const ProtectedRoute = ({ element: Element }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return <Element />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<ProtectedRoute element={Home} />} >
          <Route index element={<Navigate to="/control-panel" />} />
          <Route path="/control-panel" element={<ProtectedRoute element={ControlPanel} />} />
          <Route path="/teachers" element={<ProtectedRoute element={Teachers} />} />
          <Route path="/students" element={<ProtectedRoute element={Students} />} />
          <Route path="/packages" element={<ProtectedRoute element={Packages} />} />
          <Route path="/parents" element={<ProtectedRoute element={Parents} />} />
          <Route path="/permissions" element={<ProtectedRoute element={Permissions} />} />
          <Route path="/notifications" element={<ProtectedRoute element={Notifications} />} />
          <Route path="/profile" element={<ProtectedRoute element={Profile} />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
