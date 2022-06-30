import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux/es/exports'
import Pokemon from './Pokemon'
import { useDispatch } from 'react-redux'
import { typeSelected } from '../store/slices/typeQuery.slice'

const Pokedex = () => {

    const [pokemons, setPokemons] = useState()
    const [types, settypes] = useState()

    const typeSelecte = useSelector(state => state.typeSelected)
    const dispath = useDispatch()
    
    useEffect(() => {
        if(typeSelecte) {
            axios.get(`https://pokeapi.co/api/v2/type/${typeSelected}`)
            .then(res => settypes(res.data.results))
            .catch(err => console.log(err))
        }else{
            axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10')
            .then(res => setPokemons(res.data.results))
            .catch(err => console.log(err))
        }

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => settypes(res.data.results))
            .catch(err => console.log(err))
    },[typeSelected])

    const nameUser = useSelector(state => state.nameUser)

    const selectOption = e => {
        dispath(typeSelected(e.target.value))
    }

  return (
    <div>
        <h2 className='pokedex-title'><span className='pokedex-name'>Bienvenido {nameUser}</span>, aquí podrás encontrar tu pokemón favorito</h2>
        <aside className='pokedex-nav'>
            <form className='home-form' action="">
                <input className='home-input' type="text" placeholder='Busca un pokemón' />
                <button className='btn'>Buscar</button>
            </form>
            <select className='pokedex-select' onChange={selectOption} name="class">
                {
                  types?.map(optionType => (
                    <option key={optionType.url} value={optionType.name}>{optionType.name.toUpperCase()}</option>
                  ))
                }
            </select>
        </aside>
       <section className={`pokemons-card`}>
            {
                pokemons?.map(pokemon => (
                    <Pokemon url={pokemon.url} key={pokemon?.url} />
                ))
            }
       </section>
    </div>
  )
}

export default Pokedex