import React, { useLayoutEffect, useRef, useState } from 'react'
import styles from './Game.module.css'
import Pipe from './Pipe'
const Game = () => {
    const gameRef = useRef(null)
    const gameHeight = 500
    const [gameWidth, setGameWith] = useState(0)

    
    useLayoutEffect(() => {
        setGameWith(gameRef.current.offsetWidth);
    }, []);

  return (
    <div className={styles.world} ref={gameRef} style={{height:gameHeight}}>
        <Pipe offset={-100} x={-100} h={80} maxWidth={gameWidth} />
        <Pipe offset={-150} x={-300} h={400} maxWidth={gameWidth} />
        <Pipe offset={-200} x={-450} h={120} top={false} maxWidth={gameWidth} />
    </div>
  )
}

export default Game