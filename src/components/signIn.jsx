import React, { useState } from 'react';
import axios from 'axios';
import Contact from './addContact';
import Logout from './logout';

function SignInForm() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [loggedIn, setLoggedIn] = useState(false); // État pour gérer la connexion réussie

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
      console.log(response);
      // Vérification de la réponse
      if (response.status === 200) {
        // Marquer l'utilisateur comme connecté
        setLoggedIn(true);
        alert('Connexion réussie !');
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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email :</label>
        <input type="email" name="email" id="email" value={loginData.email} onChange={handleChange} />

        <label htmlFor="password">Mot de passe :</label>
        <input type="password" name="password" id="password" value={loginData.password} onChange={handleChange} />

        <button type="submit">Se connecter</button>
      </form>
    );
  }

  // Si l'utilisateur est connecté, afficher le contenu de la page d'accueil
  return (
    <div>
      <Logout />
      <h1>Bienvenue sur la page d'accueil !</h1>
      < Contact />
    </div>
  );
}

export default SignInForm;