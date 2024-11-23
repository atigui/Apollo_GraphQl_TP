import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <div style={styles.navContainer}>
      <h1 style={styles.logo}>Gestion des comptes </h1>
      <div style={styles.links}>
      <Link to="/compte" style={styles.link}>Créer Compte</Link>
        <Link to="/transactions" style={styles.link}>Créer Transaction</Link>
        <Link to="/" style={styles.link}>Comptes</Link>
      </div>
    </div>
  );
};

const styles = {
  navContainer: {
    backgroundColor: '#a39a17', // Couleur de fond bleu
    color: 'white',
    padding: '15px 30px', // Ajout de marge intérieure
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Ombre pour le relief
  },
  logo: {
    fontSize: '1.8rem', // Taille plus grande pour le logo
    fontWeight: 'bold',
  },
  links: {
    display: 'flex',
    gap: '25px', // Espacement ajusté entre les liens
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: '500',
    transition: 'color 0.3s ease', // Transition pour un effet fluide
  },
  linkHover: {
    color: '#246741', // Couleur plus claire au survol
  }
};

export default Navigation;
