import logo from './logo.svg';
import './App.css';
import SignInForm from './components/signIn';
import { useDispatch } from "react-redux";
import { getUser } from "./actions/user.actions";
import { UidContext } from './routes/AppContext';
import { useSelector } from 'react-redux';
import AppRouter from "./router";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/esm/Container';


function App() {
  
    
  return (
     <div>
      <Container>      
      <AppRouter />
      </Container>
        
      </div>
  );
}

export default App;
