import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import MentorDashboard from './pages/MentorDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthenticated = Boolean(user);
  const userRole = user?.role || '';

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} userRole={userRole} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/student-dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="student" userRole={userRole}>
                <StudentDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mentor-dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated} requiredRole="mentor" userRole={userRole}>
                <MentorDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
