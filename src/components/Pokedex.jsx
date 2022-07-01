import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pokemon from './Pokemon'
import { useDispatch } from 'react-redux'
import { setTypeSelected } from '../store/slices/typeQuery.slice'
import { useNavigate } from "react-router-dom";



const Pokedex = () => {

    const [pokemons, setPokemons] = useState()
    const [types, settypes] = useState()

    const typeSelected = useSelector(state => state.typeSelected)
    const dispath = useDispatch()
    
    useEffect(() => {
        if(typeSelected === 'ALLPOKEMON') {
            axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=100')
            .then(res => setPokemons(res.data.results))
            .catch(err => console.log(err))
            
        }else{
            axios.get(`https://pokeapi.co/api/v2/type/${typeSelected}`)
            .then(res => {
                const array = res.data.pokemon.map(e => e.pokemon)
                setPokemons(array)
            })
            .catch(err => console.log(err))

        }

        axios.get('https://pokeapi.co/api/v2/type/')
            .then(res => settypes(res.data.results))
            .catch(err => console.log(err))
    },[typeSelected])

    const nameUser = useSelector(state => state.nameUser)

    const navigate = useNavigate()

    if(nameUser.trim() === '') {
        navigate('/')
    }

    const selectOption = e => {
        dispath(setTypeSelected(e.target.value))
    }
    
    const [searchElement, setSearchElement] = useState()
    const valueSearch = e => {
        const value = e.target.value.toLowerCase()
        const filter = pokemons.filter(element => element.name.includes(value))
        setSearchElement(filter)
    }

  return (
    <div>
        <h2 className='pokedex-title'><span className='pokedex-name'>Bienvenido {nameUser}</span>, aquí podrás encontrar tu pokemón favorito</h2>
        <aside className='pokedex-nav'>
            <form className='home-form' onSubmit={e => e.preventDefault()}>
                <input className='home-input'  type="text" placeholder='Busca un pokemón' onChange={valueSearch} />
                <button className='btn'><i className='bx bx-filter-alt'></i></button>
            </form>
            <select className='pokedex-select' onChange={selectOption} name="class">
                <option value='ALLPOKEMON' >ALL POKEMONS</option>
                {
                  types?.map(optionType => (
                    <option key={optionType.url} value={optionType.name}>{optionType.name.toUpperCase()}</option>
                  ))
                }
            </select>
        </aside>
       <section className={`pokemons-card`}>
            {
                searchElement ?
                searchElement?.map(pokemon => (
                    <Pokemon url={pokemon.url} key={pokemon?.url} />
                ))
                :
                pokemons?.map(pokemon => (
                    <Pokemon url={pokemon.url} key={pokemon?.url} />
                ))
                
            }
       </section>
    </div>
  )
}

export default Pokedex