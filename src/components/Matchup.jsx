import React from 'react';
import { NavLink} from 'react-router-dom';

const Matchup = () => {


        return (
           
                <section>
                        <p>The Battle between "" and "" was won by</p>
                        <h4>winnerhamster</h4>
                        <NavLink to= "/battle" activeClassName="active"> Battle </NavLink>
                </section>
        


        )
    }


export default Matchup;