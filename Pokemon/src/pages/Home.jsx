import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.container}>
            <h1>Comparador de Pokémons</h1>
            <Link to="/comparar" className="btn btn-primary mt-3">Comparar Pokémons</Link>
        </div>
    );
};

export default Home;
