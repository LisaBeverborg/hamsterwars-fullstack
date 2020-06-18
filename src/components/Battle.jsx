import React, { useState, useEffect } from 'react';
import './Battle.css';
import { NavLink, useHistory} from 'react-router-dom';



function App() {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    // const [newGame, setNewGame] =useState(false);
    //const [winner, setWinner] = useState('');
    
    
    useEffect(()=>{
        getRandomHamster(setHamster1);
        getRandomHamster(setHamster2);
      
        
    }, [])
    
  
    
    
    return (
        <div>
        <h1  className="battle-title"> Battle </h1>
        <div  className="battle">
        <section  className="hamster-info">
        {hamster1
            ?<>
            <h2>{hamster1.name}</h2>
            <button onClick={() => handleClick(hamster1, hamster2)}>Choose this hamster</button>  
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
            <button onClick={() => handleClick(hamster2, hamster1)}>Choose this hamster</button>
            <br/>
            <img src={`/assets/${hamster2.imgName}`} alt={hamster2.imgName}/>
            </>
            : 'no data'} 
            </section>

            </div>
            <NavLink to= "/matchup" activeClassName="active" className="switchView"> Matchup </NavLink>
            </div>
            )     
        }
        //<p>Winner of this battle is: </p>
        



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
        
        
//Get specific hamster
        
        //const getHamsterId = async(setState)=>{
        
        //try{
        //      const resp = await fetch('/api/hamsters/:id');
        //  const json = await resp.json();
        // setState(json);     
        //}catch(e){
        //  console.log('Fetch failed because', e );
        // return null;
        //}
        //}
        
    
        
// Update winner, loser and game result  
        function handleClick(winner, loser, ) {
            console.log(winner.id);
            console.log(loser.id);
            //setWinner(winner);
            //newGame ? setNewGame(false) : setNewGame(true);
            updateWinner(winner.id);
            updateLoser(loser.id)
            updateGame(winner.id, loser.id);
            //history.push({
           // pathname: `/matchup/${winner.id}/${loser.id}/`,
           // state: { winner: winner, loser: loser },
       // })
        }
        
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