import Image from "next/image"
import Link from "next/link"

import styles from '../styles/Card.module.css'

export const Card = ({pokemon}) => {
    return (
        <div className={styles.card}>
            <Image 
           src={pokemon.sprite}
            alt={pokemon.name}
            width={120}
            height={120}
           
            />
            <p className={styles.id}>#{pokemon.id}</p>
            <h3 className={styles.title}>{pokemon.name}</h3>
            <Link className={styles.btn} href={`/pokemon/${pokemon.id}`}>Detalhes</Link>
        </div>
    )
}