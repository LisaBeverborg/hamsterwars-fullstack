import React from 'react';
import styled from "styled-components";

const Start = () => {


        return (
            <div>
                <Title>Welcome to Hamsterwars</Title>
                <Text> Set up hamsters for Battle. In the end only <em>one</em> hamster can win the title <strong>Cutest Craziest Hamster</strong>. <br></br>
                You can have look at all Hamsters in the gallery and let them battle for the title cutest Hamster.</Text>
                <Text>This project is part of the course Effective Frontend Development which is part of the education Frontend Development 
                at the IT University in Gothenburg / Stockholm. <br></br>In the project, frontend and backend have been combined with React on 
                the frontend side and Node.js, Express and cloud database Google Firestore on the backend side.</Text>
            </div>


        )
    }

    const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
  `;

  const Text = styled.p`
  font-size: 1em;
  text-align: center;
`;
export default Start;