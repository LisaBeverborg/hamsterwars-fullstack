import React, {useState, useEffect} from 'react';

const Catalogue = () => {
    let [hamsters, setHamsters]= useState(null)

    useEffect(() => {
        async function getHamsters() {
            let response = await fetch("/api/hamsters");
            const hamsters = await response.json();            
            setHamsters(hamsters);
        }
        getHamsters()
    }, [])
  
    return(
        <article>
            { hamsters
                ? hamsters.map(hamster => (
                    <div key={hamster.id}>          
                        <h1>{hamster.name}</h1>
                        <img src={`/assets/${hamster.imgName}`} alt={hamster.imgName}/>
                    </div>
                ))
            : null }
        </article>
    )
}

export default Catalogue;