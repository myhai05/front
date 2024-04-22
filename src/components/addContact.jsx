import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const NewContactForm = (props) => {
    const [showForm, setShowForm] = useState(false);
    const [userId, setUserId] = useState();
    const [formData, setFormData] = useState({
        userId:'',
        contactName: '',
        contactPrenom: '',
        contactTel: ''
    });
    
    useEffect(() => {
        if (props.contact && props.contact.data && props.contact.data.responseData) {
            setUserId(props.contact.data.responseData.userId);
            setFormData(prevState => ({
                ...prevState,
                userId: props.contact.data.responseData.userId
            }));
        }
    }, [props.contact]);

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
            const response = await axios.post('http://localhost:3031/api/user/create-contact', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status !== 200) {
                throw new Error('Erreur lors de l\'ajout du contact');
            }

            setFormData({
                contactName: '',
                contactPrenom: '',
                contactTel: '',
                userId: userId
            });

            setShowForm(false);

            alert('Contact ajouté avec succès !');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'ajout du contact.');
        }
    };

    const handleButtonClick = () => {
        setShowForm(prevState => !prevState); // Toggle the showForm state
    };

    return (
        <div>
            <Button variant="success" onClick={handleButtonClick}>
                {showForm ? 'Fermer le formulaire' : 'Nouveau contact'}
            </Button>
            {showForm && (
                <div>
                    <h2>Ajouter un contact</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="contactName">
                            <Form.Label>Nom :</Form.Label>
                            <Form.Control type="text" name="contactName" value={formData.contactName} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="contactPrenom">
                            <Form.Label>Prénom :</Form.Label>
                            <Form.Control type="text" name="contactPrenom" value={formData.contactPrenom} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group controlId="contactTel">
                            <Form.Label>Téléphone :</Form.Label>
                            <Form.Control type="text" name="contactTel" value={formData.contactTel} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Ajouter le contact</Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default NewContactForm;
  
