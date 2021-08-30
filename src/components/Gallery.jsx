import React from 'react';
import leftArrow from '../assets/left-arrow.png'
import rightArrow from '../assets/right-arrow.png';


const Gallery = () => {
 

    return (
        <section>
            <h2>Gallery</h2> 
                <section>
                <button><img src={leftArrow} alt="arrow left"/></button>
                    <div >
                    <img src="https://via.placeholder.com/150" alt="hamster" />
                        <div >
                            <h3>Name</h3>

                            <p>age years</p>
                            <p>loves</p>
                            <p>Favourite food</p>

                            <h4>Statistics</h4>
                            <ul>
                                <li>Games: </li>
                                <li>Wins: </li>
                                <li>Defeats: </li>
                            </ul>
                        </div>
                    </div>
                    <button><img src={rightArrow}  alt="arrow right"/></button>
                </section>
            
        </section>
    );
};

export default Gallery;