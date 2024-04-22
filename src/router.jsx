import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './pages/header';
import SignUpForm from './components/signUp';
import SignInForm from './components/signIn';



 
 
 
function AppRouter() {
  return (
    <Router>
  
      <Routes>
        <Route path="/register" element={<SignUpForm />}/>
        <Route path="/login" element={<SignInForm />}/>
     
      </Routes>
    </Router>
  );
}
 
export default AppRouter;