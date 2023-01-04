import React, { useEffect, useState } from 'react'
import styles from './Pipe.module.css'

const Pipe = ({x, h, maxWidth, offset, top=true, speed=5}) => {
    const [xCords, setXCords] = useState(x)
    useEffect(()=>{

        const timeout = setInterval(()=>setXCords(prev=>{
            console.log('prev', prev, "maxWidth", maxWidth)
            if(prev < maxWidth){
                return prev+speed;
            }else{
                return offset;
            }
        }), 17)
        return ()=>{
            clearInterval(timeout)
            setXCords(offset)
        }
    }, [maxWidth])

    if(top){
        return (
            <div className={styles.pipe} style={{right:xCords, height:h}} ></div>
          )
    }else{
        <div className={styles.pipe} style={{right:xCords, height:h, top:0}} ></div>
    }

}

export default Pipe