import { useState } from 'react';
import SeletorPokemon from '../components/SeletorPokemon';
import DetalhesPokemon from '../components/DetalhesPokemon';
import styles from './Comparar.module.css';

const Comparar = () => {
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);

    return (
        <div className={styles.container}>
            <h1 className="text-center mb-4">Comparador de Pokémons</h1>
            <div className="row">
                <div className="col-md-6">
                    <SeletorPokemon setPokemon={setPokemon1} />
                </div>
                <div className="col-md-6">
                    <SeletorPokemon setPokemon={setPokemon2} />
                </div>
            </div>
            {pokemon1 && pokemon2 && (
                <DetalhesPokemon pokemon1={pokemon1} pokemon2={pokemon2} />
            )}
        </div>
    );
};

export default Comparar;
