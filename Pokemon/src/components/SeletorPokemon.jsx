import { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const SeletorPokemon = ({ setPokemon }) => {
    const [selectedPokemon, setSelectedPokemon] = useState('');
    const [pokemons, setPokemons] = useState([]);
    const [erro, setErro] = useState(null);

    const pokemonsLista = useMemo(() => [
        'bulbasaur',   // Grass
        'charmander',  // Fire
        'squirtle',    // Water
        'geodude',     // Rock
        'gastly',      // Ghost
        'pikachu',     // Electric
        'jigglypuff',  // Normal
        'machop',      // Fighting
        'magnemite',   // Electric
        'mewtwo'       // Psychic
    ], []);

    useEffect(() => {
        const carregarPokemons = async () => {
            try {
                const promises = pokemonsLista.map(nome =>
                    axios.get(`https://pokeapi.co/api/v2/pokemon/${nome}`).then(res => res.data)
                );
                const pokemonsData = await Promise.all(promises);
                const pokemonsComImagem = pokemonsData.map(pokemon => ({
                    ...pokemon,
                    image: pokemon.sprites.front_default
                }));
                setPokemons(pokemonsComImagem);
                setErro(null);
            } catch (err) {
                setErro('Erro ao carregar Pokémons');
            }
        };

        carregarPokemons();
    }, [pokemonsLista]);

    const handlePokemonChange = (e) => {
        const nomePokemon = e.target.value;
        setSelectedPokemon(nomePokemon);
        const pokemon = pokemons.find(p => p.name === nomePokemon);
        setPokemon(pokemon);
    };

    return (
        <div className="mb-3">
            <select className="form-control" value={selectedPokemon} onChange={handlePokemonChange}>
                <option value="">Selecione um Pokémon</option>
                {pokemons.map((pokemon) => (
                    <option key={pokemon.name} value={pokemon.name}>
                        {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                    </option>
                ))}
            </select>
            {erro && <p className="text-danger mt-2">{erro}</p>}
        </div>
    );
};

SeletorPokemon.propTypes = {
    setPokemon: PropTypes.func.isRequired,
};

export default SeletorPokemon;
