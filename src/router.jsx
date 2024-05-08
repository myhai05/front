import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Header from './pages/header';
import SignUpForm from './components/signUp';
import SignInForm from './components/signIn';
import UpdateContact from './components/editContact';



 
 
 
function AppRouter() {
  return (
    <Router>
  
      <Routes>
        <Route path="/register" element={<SignUpForm />}/>
        <Route path="/login" element={<SignInForm />}/>
        <Route path="/update-contact/:contactId" element={<UpdateContact />}/>
      </Routes>
    </Router>
  );
}
 
export default AppRouter;