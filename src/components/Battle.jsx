import React, { useState, useEffect } from 'react';

function App() {
    const [hamster1, setHamster1] = useState(null);
    const [hamster2, setHamster2] = useState(null);
 

    

    
    useEffect(()=>{
        getRandomHamster(setHamster1);
        getRandomHamster(setHamster2);
        
    }, [])
    
    return (
        <div >
        <h1> Battle </h1>
        <section>
            {hamster1
                ?<>
                <h2>{hamster1.name}</h2>
                <button onClick={() => handleClick(hamster1, hamster2)}>Choose this hamster</button>
               
                <br/>
                <img src={`/api/assets/${hamster1.imgName}`} alt={hamster1.imgName}/>
                
                </>
                : 'no data'
                
                }
        </section>
        <section>
            {hamster2
                ?<>
                <h2>{hamster2.name}</h2>
                <button onClick={() => handleClick(hamster2, hamster1)}>Choose this hamster</button>
                <br/>
                <img src={`/api/assets/${hamster2.imgName}`} alt={hamster2.imgName}/>
                </>
                : 'no data'} 
            </section>
            <section>
                <p>Winner of this battle is: </p>
            </section>
            <button>New Battle</button>
            </div>
            
            )
            
        }
        

        
        const getRandomHamster = async(setState)=>{
            
            try{
                const resp = await fetch('/api/hamsters/random');
                const json = await resp.json();
                setState(json);     
            }catch(err){
                console.log(err);
                return null;
            }
        }
        
        
//Get specific hamster

//const getHamsterId = async(setState)=>{
            
    //try{
  //      const resp = await fetch('/api/hamsters/:id');
      //  const json = await resp.json();
       // setState(json);     
    //}catch(err){
      //  console.log(err);
       // return null;
    //}
//}

function handleClick() {
   
}
        
        export default App;