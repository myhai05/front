import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import DeleteContact from './deleteContact';
import Pagination from 'react-bootstrap/Pagination';
import axios from 'axios';




const Contacts = (props) => {

  
    const { firstName, lastName, userId } = props.contact.data.responseData;



    const [contacts, setContacts] = useState([]);
    const [contactDeleted, setContactDeleted] = useState(false); // Variable d'état pour suivre les suppressions de contact
    const [addContactOperation, setAddContactOperation] = useState(false);
    
  useEffect(() => {
    // Fonction pour récupérer les contacts de l'utilisateur depuis l'API
    const fetchContacts = async () => {
      try {
        // Faire une requête GET à votre endpoint pour récupérer les contacts de l'utilisateur
        const response = await axios.get(`http://localhost:3031/api/user/contacts/${userId}`);
        // Mettre à jour l'état des contacts avec les données reçues de l'API
        setContacts(response.data.contacts);
        setContactDeleted(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des contacts :', error);
      }
    };

    // Appeler la fonction pour récupérer les contacts lorsque le composant est monté
    fetchContacts();
  }, [userId, contactDeleted, addContactOperation]); // Utiliser userId comme dépendance pour que useEffect soit exécuté à chaque fois que userId change

  const handleContactDelete = () => {
    setContactDeleted(true); // Met à jour la variable d'état après la suppression d'un contact
};

const handleContactOperation = () => {
    // Mettre à jour la variable d'état pour signaler un changement dans les opérations d'ajout/suppression de contact
    setAddContactOperation(true);
};


    const [page, setPage] = useState(1); // État pour le numéro de page

    // Calculer l'index de début et de fin pour afficher les cartes de la page actuelle
    const pageSize = 3;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Fonction pour passer à une page spécifique
    const goToPage = (pageNumber) => {
        setPage(pageNumber);
    };

    // Générer les numéros de page
    const totalPages = Math.ceil(contacts.length / pageSize);
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
            <Pagination.Item key={i} active={i === page} onClick={() => goToPage(i)}>
                {i}
            </Pagination.Item>
        );
    }

   

    return (
        <Container>
            <h2>Bonjour {firstName}</h2>
            <p>{lastName}</p>
            <h3>Voici la liste de tes contacts:</h3>
            <div className="row">
                {contacts.slice(startIndex, endIndex).map((contact, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src="holder.js/100px180" />
                            <Card.Body>
                                <Card.Title>Contact {startIndex + index + 1}</Card.Title>
                                <Card.Text>Contact ID: {contact.contactId}</Card.Text>
                                <Card.Text>Name: {contact.contactName}</Card.Text>
                                <Card.Text>First Name: {contact.contactPrenom}</Card.Text>
                                <Card.Text>Contact Tel: {contact.contactTel}</Card.Text>
                                <div className="d-flex justify-content-between">
                                    <DeleteContact userId={userId} contactId={contact._id} onDelete={handleContactDelete} />
                                    <Button variant="primary">Editer</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            <Pagination size="sm">{pageNumbers}</Pagination>
        </Container>
    );
}

export default Contacts;