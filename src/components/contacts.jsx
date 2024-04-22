import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import DeleteContact from './deleteContact';
import Pagination from 'react-bootstrap/Pagination';



const Contacts = (props) => {
    const prenom = props.contact.data.responseData.firstName;
    const nom = props.contact.data.responseData.lastName;
    const contacts = props.contact.data.responseData.contacts;
    const userId = props.contact.data.responseData.userId;


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
            <h2>Bonjour {prenom}</h2>
            <p>{nom}</p>
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
                                    <DeleteContact userId={userId} contactId={contact.contactId} />
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