import Image from "next/image"

import styles from '../../styles/Pokemon.module.css'

import { useRouter } from "next/router"

export const getStaticPaths = async () => {
    const maxPokemons = 251
    const api = 'https://pokeapi.co/api/v2/pokemon/'
  
    const res = await fetch(`${api}?limit=${maxPokemons}`)
    const data = await res.json()

    // params
    const paths = data.results.map((pokemon, index) => {
        return {
            params: {pokemonId: (index + 1).toString() }
        }
    })

    return {
        paths,
        //fallback: false, carrega apenas os pokemons que setamos no limite na linha 8
        fallback: true, // com useRouter nos permite carregar mais pokemos fazendo um callback pra esperar buscar na api igual fizemos na linha 43 a 46
    }

}

export const getStaticProps = async (context) => {
    const id = context.params.pokemonId

    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const data = await res.json()

    return {
        props: {pokemon: data}
    }
}

export default function Pokemon({pokemon}) {

    const router = useRouter()
    if(router.isFallback) {
        return <di>Carregando ...</di>
    }

    const sprite = pokemon.sprites.other['official-artwork'].front_default;


    return(
        <div className={styles.pokemon_container}> 
            <h1 className={styles.title}>{pokemon.name}</h1>

            <Image
             src={sprite}
             alt={pokemon.name}
             width={200}
             height={200}
            />

            <div>
                <h3>Número:</h3>
                <p>#{pokemon.id}</p>
            </div>
            <div className={styles.types_container}>
                <h3>Tipo:</h3>
                <div>
                    {pokemon.types.map((item, index) => (
                        <span key={index} className={`${styles.type} ${styles['type_' +  item.type.name]}`}>{item.type.name}</span>
                    ))}
                </div>
            </div>
            <div className={styles.data_container}>
                <div className={styles.data_height}>
                    <h4>Altura:</h4>
                    <p>{pokemon.height * 10} cm</p>
                </div>
                <div className={styles.data_weight}>
                    <h4>Peso:</h4>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
            </div>
        </div>
    )
}