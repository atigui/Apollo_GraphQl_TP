import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_TRANSACTION_STATS = gql`
query {
  transactionStats {
    count
    sumDepots
    sumRetraits
  }
}
`;

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_TRANSACTION_STATS);

  if (loading) return <p style={styles.loading}>Loading...</p>;
  if (error) return <p style={styles.error}>Error: {error.message}</p>;

  const { count, sumDepots, sumRetraits } = data.transactionStats;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Statistiques des Transactions</h2>
      <div style={styles.cards}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Transactions</h3>
          <p style={styles.cardValue}>{count}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Depots</h3>
          <p style={styles.cardValue}>DH {sumDepots.toFixed(2)}</p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Total Retraits</h3>
          <p style={styles.cardValue}>DH {sumRetraits.toFixed(2)}</p>
        </div>
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
    backgroundColor: '#121212', // Fond sombre
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#e0e0e0', // Texte clair
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#1e1e1e', // Fond des cartes en mode sombre
    borderRadius: '8px',
    padding: '15px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
  },
  cardTitle: {
    fontSize: '1.5rem',
    color: '#61dafb', // Titre bleu clair
    marginBottom: '10px',
  },
  cardValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#246741', // Valeur en vert
  },
  loading: {
    color: '#888',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  error: {
    color: '#dc3545', // Texte rouge pour les erreurs
    textAlign: 'center',
    fontSize: '1.2rem',
  },
};

export default Dashboard;
