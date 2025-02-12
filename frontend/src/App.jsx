import './App.css'
import {Route , Routes} from 'react-router-dom'
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/login/LoginPage';
import SignUpPage from './pages/auth/signup/SignUpPage';
import HandleLogout from './pages/auth/logout/LogOut';
function App() {

  return (
    <>
      <div>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/logout" element={<HandleLogout />} />
        </Routes>
      </div>
    </>
  )
}

export default App;
