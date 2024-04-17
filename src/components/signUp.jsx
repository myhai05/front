import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function SignUpForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Envoi des données du formulaire au backend
      const response = await axios.post('http://localhost:3031/api/user/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Vérification de la réponse
      if (!response.status === 200) {
        throw new Error('Erreur lors de l\'inscription');
      }
  
      // Réinitialiser les champs du formulaire après une inscription réussie
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
      });
  
      alert('Inscription réussie !');
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email :</label>
      <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} />

      <label htmlFor="password">Mot de passe :</label>
      <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} />

      <label htmlFor="firstName">Prénom :</label>
      <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} />

      <label htmlFor="lastName">Nom :</label>
      <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} />

      <button type="submit">S'inscrire</button>
      <Link to="/login">Sign IN</Link>
    </form>
  );
}

export default SignUpForm;