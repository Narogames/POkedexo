import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import styled from 'styled-components';
import '../App.css';

function Pokedex() {
    const [id, setId] = useState(1);
    const [pokemon, setPokemon] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const nextPokemon = () => {
        setId(id + 1);
    };

    const previousPokemon = () => {
        setId(id - 1);
    };

    const transitionVariants = {
        initial: { opacity: 0, x: 300 },
        animate: { opacity: 1, x: 0 },
    
    };

    return (
        <div className="Pokedex">
            <h1 className="poketitulo">Pokédex</h1>
            {pokemon && (
                <motion.div
                    className="Pokenome"
                    key={pokemon.id}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={transitionVariants}
                    transition={{ duration: 1 }}
                >
                    <h2>{pokemon.name}</h2>
                    <motion.img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                    <p>Peso: {pokemon.weight}g</p>
                </motion.div>
            )}
            <button onClick={previousPokemon} className="voltbutton">Anterior</button>
            <button onClick={nextPokemon} className="proxbutton">Próximo</button>
        </div>
    );
}

export default Pokedex;
