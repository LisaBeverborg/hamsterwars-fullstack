import React, { useState, useEffect } from 'react';

const Stats = ()=>{
    
    const [topHamsters, setTopHamsters] = useState(null);
    const [bottomHamsters, setbottomHamsters] = useState(null);
    const [totalGames, setTotalGames] = useState(null);
    
    
    const fetchWinners = async(setState)=>{
        
        try{
            const resp = await fetch('/api/charts/top');
            const json = await resp.json();
            setState(json);     
        }catch(err){
            console.log(err);
            return null;
        }
    }
    
    const fetchLosers = async(setState)=>{
        
        try{
            const resp = await fetch('/api/charts/bottom');
            const json = await resp.json();
            setState(json);      
        }catch(err){
            console.log(err);
            return null;
        }
    }
    
    const fetchTotalGames = async(setState)=>{
        
        try{
            const resp = await fetch('/api/games');
            const json = await resp.json();
            setState(json);     
        }catch(err){
            console.log(err);
            return null;
        }
    }
 
    
    useEffect(()=>{
        fetchTotalGames(setTotalGames);
        fetchWinners(setTopHamsters);
        fetchLosers(setbottomHamsters);    
    }, [])
    
    
    return(
        <div>
        <h1>Battle statistics</h1>
        <h3>Here you can find an overview of all game statistics</h3>
        <section>
        
        {
            topHamsters
            ?<article>
            <h2>Winners</h2>
            <ol>
            {topHamsters.map(hamster => (
                <li key={hamster.id}>
                <p>{hamster.name}</p>
                <p>games: {hamster.games} wins: {hamster.wins}</p>
                </li>
                ))}
                </ol>
                </article>
                : null
            }
            {
                bottomHamsters
                ?<article>
                <h2>Losers</h2>
                <ol>
                {bottomHamsters.map(hamster => (
                    <li key={hamster.id}>
                    <p>{hamster.name}</p>
                    <p>games: {hamster.games} defeats: {hamster.defeats}</p>
                    </li>
                    ))}
                    </ol>
                    </article>
                    : null
                } 
                </section>
                <section>
                {
                    totalGames
                    ?<article>
                    <h2>Total Games</h2>
                    <p>{totalGames.total} games were played</p>
                    </article>
                    : null
                }
                </section>
                </div>
                )
            }
            export default Stats;