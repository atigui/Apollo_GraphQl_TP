import { useState } from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

const GET_ALL_COMPTES = gql`
  query {
    allComptes {
      id
      solde
      dateCreation
      type
    }
  }
`;

const DELETE_COMPTE = gql`
  mutation  DeleteCompte($id: ID!) {
     deleteById(id: $id) 
  }
`;


const ComptesList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_COMPTES);
  const [deleteCompte] = useMutation(DELETE_COMPTE);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCompte, setSelectedCompte] = useState(null);

  const openModal = (compte) => {
    setSelectedCompte(compte);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCompte(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteCompte({ variables: { id: selectedCompte.id } });
      if (data.deleteById) { // Vérifiez simplement si c'est "true"
        refetch(); // Rafraîchir les données
        closeModal();
      } else {
        console.error("Échec de la suppression du compte.");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression du compte :", err);
    }
  };
  
  

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error.message}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Liste des comptes </h2>
      <div style={styles.grid}>
        {data.allComptes.map((compte) => (
          <div key={compte.id} style={styles.card}>
            <h3 style={styles.cardHeading}>Compte ID: {compte.id}</h3>
            <p><strong>Solde:</strong>{compte.solde.toFixed(2)} DH</p>
            <p><strong>Date:</strong> {new Date(compte.dateCreation).toLocaleDateString()}</p>
            <p><strong>Type:</strong> {compte.type}</p>
            <div style={styles.buttonContainer}>
              <Link to={`/transactions/${compte.id}`} style={styles.viewButton}>
                Voir Transactions
              </Link>
              <button
                style={styles.deleteButton}
                onClick={() => openModal(compte)}
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {isModalOpen && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h3>Confirmation</h3>
            <p>Êtes-vous sûr de vouloir supprimer le compte ID: {selectedCompte.id} ?</p>
            <div style={styles.modalActions}>
              <button style={styles.cancelButton} onClick={closeModal}>
                Annuler
              </button>
              <button style={styles.confirmButton} onClick={handleDelete}>
                Confirmer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#a39a17', // Fond sombre
    color: '#e6e6e6', // Texte clair
    marginTop:'60px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#e6e6e6', // Titre clair
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#2e2e2e', // Carte sombre
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)', // Ombre plus sombre
    transition: 'transform 0.2s ease-in-out',
  },
  cardHeading: {
    fontSize: '1.5rem',
    color: '#a39a17', // Titre de la carte en vert
    marginBottom: '10px',
  },
  deleteButton: {
    marginTop: '10px',
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#a39a17', // Rouge pour supprimer
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  viewButton: {
    marginTop: '10px',
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#a39a17', // Vert personnalisé
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Overlay plus sombre
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#2e2e2e', // Modal sombre
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    color: '#e6e6e6', // Texte clair
  },
  modalActions: {
    marginTop: '15px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cancelButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#6c757d', // Gris pour annuler
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  confirmButton: {
    padding: '10px 15px',
    color: '#fff',
    backgroundColor: '#28a745', // Vert pour confirmer
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


export default ComptesList;
