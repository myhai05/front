import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function DeleteContact({ userId, contactId }) {

    const handleDelete = async () => {
        const confirmed = window.confirm("Êtes-vous sûr de vouloir supprimer ce contact ?");
        if (confirmed) {
            try {
                const response = await axios.delete(`http://localhost:3031/api/user/delete-contact/${userId}/${contactId}`, {
                    data: { userId: userId, contactId: contactId } // Envoyer les IDs dans le corps de la requête
                });
                console.log('Contact supprimé:', response.data);
                // Traitez la réponse ou mettez à jour l'état de votre application si nécessaire
            } catch (error) {
                console.error('Erreur lors de la suppression du contact:', error);
                // Traitez l'erreur ou affichez un message d'erreur à l'utilisateur
            }
        }
    };

    return (
        <div>
            <Button variant="warning" onClick={handleDelete}>Supprimer</Button>
        </div>
    );
}

export default DeleteContact;