import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import Header from './pages/header';
import SignUpForm from './components/signUp';
import SignInForm from './components/signIn';



 
 
 
function AppRouter() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<SignUpForm />}/>
        <Route path="/login" element={<SignInForm />}/>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  );
}
 
export default AppRouter;