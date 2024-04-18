import React, { useState } from 'react';
import axios from 'axios';

const NewContactForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        contactName: '',
        contactPrenom: '',
        contactTel: ''
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
        console.log(formData);
        try {
            // Envoi des données du formulaire au backend
            const response = await axios.post('http://localhost:3031/api/user/contact', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Vérification de la réponse
            if (response.status !== 200) {
                throw new Error('Erreur lors de l\'ajout du contact');
            }

            // Réinitialiser les champs du formulaire après une inscription réussie
            setFormData({
                contactName: '',
                contactPrenom: '',
                contactTel: ''
            });

            alert('Contact ajouté avec succès !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'ajout du contact.');
        }
    };

    return (
        <div>
            <button onClick={() => setShowForm(true)}>Nouveau contact</button>
            {showForm && (
                <div>
                    <h2>Ajout de contact</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="contactName">Nom :</label>
                            <input type="text" name="contactName" id="contactName" value={formData.contactName} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="contactPrenom">Prénom :</label>
                            <input type="text" name="contactPrenom" id="contactPrenom" value={formData.contactPrenom} onChange={handleChange} required />
                        </div>
                        <div>
                            <label htmlFor="contactTel">Téléphone :</label>
                            <input type="text" name="contactTel" id="contactTel" value={formData.contactTel} onChange={handleChange} required />
                        </div>
                        <button type="submit">Ajouter le contact</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default NewContactForm;
  
  
