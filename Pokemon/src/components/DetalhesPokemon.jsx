import { useEffect, useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';

const DetalhesPokemon = ({ pokemon1, pokemon2 }) => {
    const [efetividade, setEfetividade] = useState(null);

    const efetividadeTipos = useMemo(() => ({
        normal: { double_damage_from: ['fighting'], half_damage_from: ['ghost'], no_damage_from: [] },
        fighting: { double_damage_from: ['flying', 'psychic', 'fairy'], half_damage_from: ['rock', 'bug', 'dark'], no_damage_from: [] },
        flying: { double_damage_from: ['rock', 'electric', 'ice'], half_damage_from: ['fighting', 'bug', 'grass'], no_damage_from: ['ground'] },
        poison: { double_damage_from: ['ground', 'psychic'], half_damage_from: ['fighting', 'poison', 'bug', 'grass', 'fairy'], no_damage_from: [] },
        ground: { double_damage_from: ['water', 'grass', 'ice'], half_damage_from: ['poison', 'rock'], no_damage_from: ['electric'] },
        rock: { double_damage_from: ['water', 'grass', 'fighting', 'ground', 'steel'], half_damage_from: ['normal', 'flying', 'poison', 'fire'], no_damage_from: [] },
        bug: { double_damage_from: ['flying', 'rock', 'fire'], half_damage_from: ['fighting', 'ground', 'grass'], no_damage_from: [] },
        ghost: { double_damage_from: ['ghost', 'dark'], half_damage_from: ['poison', 'bug'], no_damage_from: ['normal', 'fighting'] },
        steel: { double_damage_from: ['fighting', 'ground', 'fire'], half_damage_from: ['normal', 'flying', 'rock', 'bug', 'steel', 'grass', 'psychic', 'ice', 'dragon', 'fairy'], no_damage_from: ['poison'] },
        fire: { double_damage_from: ['water', 'ground', 'rock'], half_damage_from: ['bug', 'steel', 'fire', 'grass', 'ice', 'fairy'], no_damage_from: [] },
        water: { double_damage_from: ['electric', 'grass'], half_damage_from: ['steel', 'fire', 'water', 'ice'], no_damage_from: [] },
        grass: { double_damage_from: ['flying', 'poison', 'bug', 'fire', 'ice'], half_damage_from: ['ground', 'water', 'grass', 'electric'], no_damage_from: [] },
        electric: { double_damage_from: ['ground'], half_damage_from: ['flying', 'steel', 'electric'], no_damage_from: [] },
        psychic: { double_damage_from: ['bug', 'ghost', 'dark'], half_damage_from: ['fighting', 'psychic'], no_damage_from: [] },
        ice: { double_damage_from: ['fighting', 'rock', 'steel', 'fire'], half_damage_from: ['ice'], no_damage_from: [] },
        dragon: { double_damage_from: ['ice', 'dragon', 'fairy'], half_damage_from: ['fire', 'water', 'grass', 'electric'], no_damage_from: [] },
        dark: { double_damage_from: ['fighting', 'bug', 'fairy'], half_damage_from: ['ghost', 'dark'], no_damage_from: ['psychic'] },
        fairy: { double_damage_from: ['poison', 'steel'], half_damage_from: ['fighting', 'bug', 'dark'], no_damage_from: ['dragon'] },
    }), []);

    const getEfetividade = useCallback((tipoAtacante, tipoDefensor) => {
        const infoAtaque = efetividadeTipos[tipoAtacante] || {};
        const { double_damage_from = [], half_damage_from = [], no_damage_from = [] } = infoAtaque;

        if (double_damage_from.includes(tipoDefensor)) return 'super efetivo';
        if (half_damage_from.includes(tipoDefensor)) return 'não muito efetivo';
        if (no_damage_from.includes(tipoDefensor)) return 'sem efeito';
        return 'normalmente efetivo';
    }, [efetividadeTipos]);

    useEffect(() => {
        if (pokemon1 && pokemon2) {
            const tipo1 = pokemon1.types[0].type.name;
            const tipo2 = pokemon2.types[0].type.name;

            setEfetividade({
                pokemon1: getEfetividade(tipo1, tipo2),
                pokemon2: getEfetividade(tipo2, tipo1),
            });
        }
    }, [pokemon1, pokemon2, getEfetividade]);

    if (!efetividade) return null;

    return (
        <div className="mt-4">
            <h2 className="text-center" style={{ marginTop: '4cm' }}>Efetividade</h2>
            <div className="d-flex justify-content-between">
                <div className="text-center">
                    <img src={pokemon1.sprites.front_default} alt={pokemon1.name} style={{ maxWidth: '100px' }} />
                    <h4>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</h4>
                    <p>{pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)} é {efetividade.pokemon1} contra {pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</p>
                </div>
                <div className="text-center">
                    <img src={pokemon2.sprites.front_default} alt={pokemon2.name} style={{ maxWidth: '100px' }} />
                    <h4>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)}</h4>
                    <p>{pokemon2.name.charAt(0).toUpperCase() + pokemon2.name.slice(1)} é {efetividade.pokemon2} contra {pokemon1.name.charAt(0).toUpperCase() + pokemon1.name.slice(1)}</p>
                </div>
            </div>
        </div>
    );
};

DetalhesPokemon.propTypes = {
    pokemon1: PropTypes.object.isRequired,
    pokemon2: PropTypes.object.isRequired,
};

export default DetalhesPokemon;
