import React, {useState, useEffect} from 'react';
import styled from "styled-components";

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
            <StyledGrid>
            { hamsters
                ? hamsters.map(hamster => (
                    <div key={hamster.id}>          
                        <h1>{hamster.name}</h1>
                        <StyledImg src={`/assets/${hamster.imgName}`} alt={hamster.imgName}></StyledImg>
                    </div>
                ))
            : null }
            </StyledGrid>
        </article>
    )
}

const StyledImg= styled.img`
    width: 15em;
    height: 15em;
    border-radius: 5px;
`
const StyledGrid= styled.section`
        @media (min-width: 600px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 760px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr 1fr;
        }
        @media (min-width: 1120px){
        display: grid;
        grid-gap: 1.5em;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        }
`

export default Catalogue;