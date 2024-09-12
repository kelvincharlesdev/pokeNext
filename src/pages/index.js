import styles from "@/styles/Home.module.css";

import Image from "next/image";

import { Card } from "../components/Card";

export async function getStaticProps() {
  const maxPokemons = 251
  const api = 'https://pokeapi.co/api/v2/pokemon/'

  const res = await fetch(`${api}?limit=${maxPokemons}`)
  const data = await res.json()

  const pokemons = await Promise.all(
    data.results.map(async (pokemon, index) => {
      const res = await fetch(pokemon.url);
      const details = await res.json();

      return {
        ...pokemon,
        id: index + 1,
        sprite: details.sprites.other['official-artwork'].front_default
      };
    })
  );

  return {
    props : {
      pokemons
    }
  }

}


export default function Home({pokemons}) {
  return (
    <>
      <div className={styles.title_container}>
        <h1 className={styles.title}>Poke<span>Next</span></h1>
        <Image src={'/images/pokeball.png'} alt="PokeNext" width={50} height={50} />
      </div>

      <div className={styles.pokemon_container}>
        {pokemons.map(pokemon => (
          <Card key={pokemon.id} pokemon={pokemon}/>
        ))}
      </div>

    </>
  );
}
