import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const UpdateContact = () => {
    const { contactId } = useParams();
    const [contact, setContact] = useState({
        firstName: '',
        lastName: '',
        tel: ''
    });

    useEffect(() => {
        const fetchContact = async () => {
            try {
                const response = await axios.get(`http://localhost:3031/api/contacts/${contactId}`);
                const fetchedContact = response.data;
                setContact(fetchedContact);
            } catch (error) {
                console.error('Erreur lors de la récupération du contact :', error);
            }
        };

        fetchContact();
    }, [contactId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact({ ...contact, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3031/api/contacts/${contactId}`, contact);
            alert('Contact mis à jour avec succès !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour du contact :', error);
        }
    };

    return (
        <div>
            <h2>Modifier le contact</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>Prénom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le prénom"
                        name="firstName"
                        value={contact.firstName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Entrez le nom"
                        name="lastName"
                        value={contact.lastName}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTel">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Entrez le téléphone"
                        name="tel"
                        value={contact.tel}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Mettre à jour
                </Button>
            </Form>
        </div>
    );
};

export default UpdateContact;