import React, { useState, useEffect } from 'react';
import './Battle.css';
import { NavLink} from 'react-router-dom';


function App() {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
    const [winner, setWinner] = useState('');
    
    
    useEffect(()=>{
        getRandomHamster(setHamster1);
        getRandomHamster(setHamster2);
        
    }, [])
    
    
 //let baseUrl;
   // if( process.env.NODE_ENV === 'production' ) {
     //  baseUrl = '/';
   // }
   // else { 
   //    baseUrl = 'http://localhost:2048/';
   // }
    
    return (
        <div  className="hamsterBattle">
        <h1> Battle </h1>
            <section  className="contestant">
        {hamster1
            ?<>
            <h2>{hamster1.name}</h2>
            <button onClick={() => handleClick(hamster1, hamster2)}>Choose this hamster</button>
            
            <br/>
            <img src={`assets/${hamster1.imgName}`} alt={hamster1.imgName}
             style={ {  width: '15em'
            } }/>
            
            </>
            : 'no data'
            
        }
        </section>
        <section  className="contestant">
        {hamster2
            ?<>
            <h2>{hamster2.name}</h2>
            <button onClick={() => handleClick(hamster2, hamster1)}>Choose this hamster</button>
            <br/>
            <img src={`/assets/${hamster2.imgName}`} alt={hamster2.imgName}
             style={ {  width: '15em'
            } }/>
            </>
            : 'no data'} 
            </section>
            <section>
            <p>Winner of this battle is: </p>
            </section>
            <NavLink to= "/matchup" activeClassName="active"> Matchup </NavLink>
            </div>
            
            )
            
        }
        
        
        
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
        
        
        function handleClick(winner, loser, setWinner) {
            setWinner(winner);
            updateWinner(winner.id);
           // updateLoser(loser)
          //  updateGame()
        }
        
        function updateWinner(id) {
            var raw = JSON.stringify({"wins":1,"defeats":0});
        
            var requestOptions = {
                method: 'PUT',
                body: raw,
                redirect: 'follow'
            };
        
            fetch(`/hamsters/${id}/results`, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        
            }
        
        
        
        
        export default App;