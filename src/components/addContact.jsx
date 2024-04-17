    import React, { useState } from 'react';
    import axios from 'axios';
    
    const NewContactForm = () => {
        const [showForm, setShowForm] = useState(false);
        const [contactName, setContactName] = useState('');
        const [contactPrenom, setContactPrenom] = useState('');
        const [contactTel, setContactTel] = useState('');
    
        const handleSubmit = async (event) => {
            event.preventDefault();
    
            try {
                const response = await axios.post('http://localhost:3031/api/user/create', {
                    contactName,
                    contactPrenom,
                    contactTel
                });
                console.log('New contact added:', response.data);
                // Ajouter ici des actions en cas de succès, comme afficher un message de succès à l'utilisateur
            } catch (error) {
                console.error('Error adding contact:', error.message);
                // Ajouter ici des actions en cas d'erreur, comme afficher un message d'erreur à l'utilisateur
            }
        };
    
        return (
            <div>
                <button onClick={() => setShowForm(true)}>Add New Contact</button>
                {showForm && (
                    <div>
                        <h2>Add New Contact</h2>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Contact Name:</label>
                                <input type="text" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
                            </div>
                            <div>
                                <label>Contact First Name:</label>
                                <input type="text" value={contactPrenom} onChange={(e) => setContactPrenom(e.target.value)} required />
                            </div>
                            <div>
                                <label>Contact Tel:</label>
                                <input type="text" value={contactTel} onChange={(e) => setContactTel(e.target.value)} required />
                            </div>
                            <button type="submit">Add Contact</button>
                        </form>
                    </div>
                )}
            </div>
        );
    };
    
    export default NewContactForm;

  
  
