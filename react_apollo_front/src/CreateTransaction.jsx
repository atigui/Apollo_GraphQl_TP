import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const ADD_TRANSACTION = gql`
  mutation AddTransaction($compteId: ID!, $montant: Float!, $type: String!) {
    addTransaction(compteId: $compteId, montant: $montant, type: $type) {
      id
      montant
      type
      compte {
        id
        solde
      }
    }
  }
`;


const CreateTransaction = () => {
  const [formData, setFormData] = useState({ compteId: '', montant: '', type: 'DEPOT' });
  const [addTransaction, { data, loading, error }] = useMutation(ADD_TRANSACTION);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addTransaction({
      variables: {
        compteId: parseInt(formData.compteId),
        montant: parseFloat(formData.montant),
        type: formData.type,
      },
    });
    
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Ajouter une Transaction</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Compte ID</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Entrez l'ID du Compte"
            value={formData.compteId}
            onChange={(e) => setFormData({ ...formData, compteId: e.target.value })}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Montant</label>
          <input
            type="number"
            style={styles.input}
            placeholder="Entrez le Montant"
            value={formData.montant}
            onChange={(e) => setFormData({ ...formData, montant: e.target.value })}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Type</label>
          <select
            style={styles.select}
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <option value="DEPOT">DEPOT</option>
            <option value="RETRAIT">RETRAIT</option>
          </select>
        </div>
        <button style={styles.button} type="submit" disabled={loading}>
          {loading ? 'En cours...' : 'Ajouter la Transaction'}
        </button>
      </form>
      {data && <p style={styles.success}>Transaction ajoutée avec succès !</p>}
      {error && <p style={styles.error}>Erreur : {error.message}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Inter, sans-serif',
     // Fond adapté au thème sombre
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    // Texte clair
    marginTop:'60px',
  },
  heading: {
    textAlign: 'center',
    fontSize: '1.8rem',
    marginBottom: '20px',
    color: '#a39a17', // Couleur principale (vert foncé)
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1rem',
    fontWeight: 'bold',
    
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid var(--border-color)',
    
   
  },
  select: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid var(--border-color)',
  
   
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#a39a17', // Bouton avec la couleur principale
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#1e5836', // Survol du bouton (vert plus foncé)
  },
  success: {
    marginTop: '20px',
    color: '#28a745', // Vert pour le succès
    fontWeight: 'bold',
  },
  error: {
    marginTop: '20px',
    color: '#dc3545', // Rouge pour les erreurs
    fontWeight: 'bold',
  },
};

export default CreateTransaction;
