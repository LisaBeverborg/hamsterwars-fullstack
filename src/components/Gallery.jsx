import React, { useState, useEffect } from 'react';
import './Gallery.css';
import { FaArrowLeft } from 'react-icons/fa'
import { FaArrowRight } from 'react-icons/fa'

const Gallery = () => {

   
    

    return (
        <section>
            <h2 className="gallery-title">Gallery</h2>
            
                <section className="hamster-card">

                <FaArrowLeft  className="hamster-left"/>
                    <div className="imagebox">
                    <img src="https://via.placeholder.com/150" alt="hamster" />
                        <div className="infobox">
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
                    <FaArrowRight  className="hamster-right"/>
                </section>
            
        </section>
    );
};

export default Gallery;