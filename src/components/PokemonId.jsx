import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const PokemonId = () => {
  const navigate = useNavigate();

  const toReturn = () => {
    navigate("/pokedex");
  };

  const {id} = useParams()
  const [pokemonId, setPokemonId] = useState()

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(res => setPokemonId(res.data))
      .catch(err => console.log(err))
  },[])

  console.log(pokemonId)

  return (
    <section className="poke-id">
      <aside className="poke-head">
        <div className={`${pokemonId?.types[0].type.name} border`}>
          <img className="pokemon-img-id" src={pokemonId?.sprites.other['official-artwork'].front_default} alt="pokemon" />
          <h1 className="poke-id-text">#{pokemonId?.id} </h1>
          <h2 className="poke-id-text">{pokemonId?.name} </h2>
        </div>
        <div className="poke-info-id">
          <p>peso </p>
          <p>altura</p>
          <span>40</span>
          <span>34</span>
        </div>
        <div className="poke-info-id-2">
          <p>tipo</p>
          <p>Habilidades</p>
          <p>Info</p>
          <p>Info</p>
          <p>Info</p>
          <p>Info</p>
        </div>
        <div className="stats">
          <h2>Stats</h2>
          <div className="head">
            <p>HP:</p>
            <p>30/150</p>
          </div>
            <div className="color-info"></div>
          <div className="head">
          <p>{pokemonId?.stats[1].stat.name}</p>
          <p>45/150</p>
          </div>
            <div className="color-info"></div>
          <div className="head">
          <p>Defensa</p>
          <p>37/150</p>
          </div>
            <div className="color-info"></div>
          <div className="head">
          <p>Velocidad</p>
          <p>49/150</p>
          </div>
            <div className="color-info"></div>
        </div>
      </aside>
      <aside className="movements">
        <h2 className="movements-title">Movements</h2>
        <div className="info">
            {
              pokemonId?.moves.map(e => (
                <button className="btn-info">{e.move.name}</button>
              ))
            }
        </div>

      </aside>
      <button className="btn" onClick={toReturn}>
        To Return
      </button>
    </section>
  );
};

export default PokemonId;
