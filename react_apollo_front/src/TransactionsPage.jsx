import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

const GET_COMPTE_TRANSACTIONS = gql`
  query GetCompteTransactions($compteId: ID!) {
    transactionsByCompteId(compteId: $compteId) {
      id
      montant
      type
      dateTransaction
    }
  }
`;

const TransactionsPage = () => {
  const { compteId } = useParams();

  const { loading, error, data } = useQuery(GET_COMPTE_TRANSACTIONS, {
    variables: { compteId },
  });

  if (loading) return <p style={styles.loading}>Chargement des transactions...</p>;
  if (error) return <p style={styles.error}>Erreur: {error.message}</p>;

  const transactions = data.transactionsByCompteId;

  if (!transactions || transactions.length === 0) {
    return <p style={styles.noTransactions}>Aucune transaction trouvée pour ce compte.</p>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Transactions pour le compte ID: {compteId}</h2>
      <div style={styles.grid}>
        {transactions.map((transaction) => (
          <div key={transaction.id} style={styles.card}>
            <h3 style={styles.cardHeading}>Transaction ID: {transaction.id}</h3>
            <p><strong>Montant:</strong> {transaction.montant.toFixed(2)} DH</p>
            <p><strong>Type:</strong> {transaction.type}</p>
            <p><strong>Date:</strong> {new Date(transaction.dateTransaction).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#e6e6e6',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#e6e6e6',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', // auto-fill avec des tailles minimales pour chaque carte
    gap: '20px',
    padding: '20px', // Ajouter de l'espace entre les cartes
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.5)',
    transition: 'transform 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column', // Flexbox pour aligner le contenu verticalement
    justifyContent: 'space-between',
    height: '100%', // S'assure que la carte occupe toute la hauteur disponible dans la grille
  },
  cardHeading: {
    fontSize: '1.5rem',
    color: '#246741',
    marginBottom: '10px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#666',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#D32F2F',
  },
  noTransactions: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#555',
  },
};

export default TransactionsPage;
