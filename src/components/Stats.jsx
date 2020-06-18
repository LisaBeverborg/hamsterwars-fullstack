import React, { useState, useEffect } from 'react';
import './Stats.css';

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
            const resp = await fetch('/api/stats/total');
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
    
    console.log(totalGames)
    
    return(
        <div>
            <div className="stats-header">
            <h1>Battle statistics</h1>
            <h3>Here you can find an overview of all game statistics</h3>
            </div>
        <section className="stats-main">
    
        {
            topHamsters
            ?<article className="stats-info">
            <h2>Winners</h2>
            <ol>
            {topHamsters.map(hamster => (
                <li key={hamster.id}>
                <p> <strong>{hamster.name} </strong> games: {hamster.games} wins: {hamster.wins}</p>
              
                </li>
                ))}
                </ol>
                </article>
                : null
            }
            {
                bottomHamsters
                ?<article className="stats-info">
                <h2>Losers</h2>
                <ol>
                {bottomHamsters.map(hamster => (
                    <li key={hamster.id}>
                    <p> <strong>{hamster.name}</strong> games: {hamster.games} defeats: {hamster.defeats}</p>
                    </li>
                    ))}
                    </ol>
                    </article>
                    : null
                } 
                </section>
                <section className="stats-total">
                {
                    totalGames
                    ?<article>
                    <h2>Total Games</h2>
                    <p>{totalGames.totalGames} games were played</p>
                    </article>
                    : null
                }
                </section>
               
                </div>
                )
            }
            export default Stats;