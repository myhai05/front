import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Contacts from './contacts';
import Home from '../pages/home';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NewContactForm from './addContact';



function SignInForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loggedIn, setLoggedIn] = useState(false); // État pour gérer la connexion réussie
  const [responseState, setResponseState] = useState();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Envoi des données du formulaire au backend
      const response = await axios.post('http://localhost:3031/api/user/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true // Ajout de withCredentials
      });
     // console.log(response);

      // Vérification de la réponse
      if (response.status === 200) {
        // Marquer l'utilisateur comme connecté
        setLoggedIn(true);
        setResponseState(response); // Stocker la réponse dans l'état responseState
        alert('Connexion réussie !');

        if (response) {
          
          return <Contacts responseData={response} />;
        }
      } else {
        throw new Error('Erreur lors de la connexion');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de la connexion.');
    }
  };

 
  // Afficher le formulaire de connexion si l'utilisateur n'est pas connecté
  if (!loggedIn) {
    return (
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Adresse email</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" value={loginData.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" value={loginData.password} onChange={handleChange} />
      </Form.Group>
      <div className="d-grid gap-2">
      <Button variant="primary" type="submit" size="lg">
        Se connecter
      </Button>
      </div>
    </Form>
    );
  }

  // Si l'utilisateur est connecté, afficher le contenu de la page d'accueil
  return (
    <div>
      < Home />
     
      < Contacts contact={responseState}/>
    </div>
  );
}

export default SignInForm;