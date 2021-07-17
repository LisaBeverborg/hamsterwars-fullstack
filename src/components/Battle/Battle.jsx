import React, { useState, useEffect } from 'react';
import './Battle.css';
import { NavLink} from 'react-router-dom';
import MatchResult from "./MatchResult";


function App() {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    const [newGame, setNewGame] =useState(false);
    const [winner, setWinner] = useState('');
    
    
    useEffect(() => {

            async function getRandomHamster() {  
                let response = await fetch("/api/hamsters/random");
                const randomHamsterOne = await response.json();

                response = await fetch("/api/hamsters/random");
                const randomHamsterTwo = await response.json();

                if(randomHamsterOne.id === randomHamsterTwo.id) {
                    console.log("FOUND SAME!")
                    newGame ? setNewGame(false) : setNewGame(true);

                }else {
                    setHamster1(randomHamsterOne)
                    setHamster2(randomHamsterTwo);
                }
            }
            getRandomHamster();
    

    }, [newGame])

    const handleClick = async (winner, looser) => {
        console.log(winner.id);
        console.log(looser.id);
        setWinner(winner);
        newGame ? setNewGame(false) : setNewGame(true);
        await updateWinner(winner.id);
        await updateLoser(looser.id);
        await updateGame(winner.id, looser.id);
    }
    
    return (
        <div>
        <h1  className="battle-title"> Battle </h1>
        <div  className="battle">
        <section  className="hamster-info">
        {hamster1
            ?<>
            <h2>{hamster1.name}</h2>
            <button className="switchView" onClick={() => handleClick(hamster1, hamster2)}>Choose this hamster</button>  
            <br/>
            <img src={`assets/${hamster1.imgName}`} alt={hamster1.imgName}/>
            </>
            : 'no data'
            
        }
        </section>
        <section  className="hamster-info">
        {hamster2
            ?<>
            <h2>{hamster2.name}</h2>
            <button className="switchView" onClick={() => handleClick(hamster2, hamster1)}>Choose this hamster</button>
            <br/>
            <img src={`/assets/${hamster2.imgName}`} alt={hamster2.imgName}/>
            </>
            : 'no data'} 
            </section>
            {winner !== "" ? <MatchResult winner={winner}/> : ""}
            </div>
            <NavLink to= "/matchup" activeClassName="active" className="switchView"> Matchup </NavLink>
            </div>
            )     
        }
     
        



//GET random hamster
        const getRandomHamster = async(setState)=>{
            
            try{
                const resp = await fetch('/api/hamsters/random');
                const json = await resp.json();
                setState(json);     
            }catch(e){
                console.log('Fetch failed because', e );
                return null;
            }
        }
        
    

        
    
        
// Update winner, loser and game result  
        
        function updateWinner(id) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            var data = JSON.stringify({"wins":1,"defeats":0, "games":1});
            
            var requestOptions = {
                method: 'PUT',
                body: data,
                headers: myHeaders,   
            };
            console.log(data)
            
            fetch(`/api/hamsters/${id}/results/`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
            
        }
        
        function updateLoser(id){
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            let data = JSON.stringify({"wins":0,"defeats":1, "games":1});
            
            const requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: data
            };
            
            fetch(`api/hamsters/${id}/results`, requestOptions)
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.log('error', error));
            
        }
        
        function updateGame(winner, looser) {
            let myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
    
            let data = JSON.stringify({"contestants":{"id1": winner,"id2": looser}, "winner":{"id": winner}});
    
            let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: data,
            };
    
            fetch("/api/games", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        }
        
        
        export default App;