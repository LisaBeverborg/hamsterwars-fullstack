import React, { useState } from 'react';
import './Upload.css'; 


const Upload = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [food, setFood] = useState('');
    const [loves, setLoves] = useState('');


    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);
    const [foodTouched, setFoodTouched] = useState(false);
    const [lovesTouched, setLovesTouched] = useState(false);

    

    let [nameClass, nameError] = nameTouched
        ? isValidName(name)
        : ['', ''];

    let [ageClass, ageError] = ageTouched
        ? isValidAge(age)
        : ['', ''];

    let [foodClass, foodError] = foodTouched
        ? isValidFood(food)
        : ['', ''];

    let [lovesClass, lovesError] = lovesTouched
        ? isValidLoves(loves)
        : ['', ''];


           
    const clickHandler = (e)=>{
        e.preventDefault()

      
        uploadHamster(name, age, food, loves)
    }

        return (
            <div>
                <h3>Please enter data to add a new hamster to the game!</h3>
                <form>
                <div className= "form-group">
                    <label> Hamster Name </label>
                    <input type="text" placeholder="The hamsters name"
                        className={nameClass}
                        onChange={e => setName(e.target.value)} 
                        onBlur={() => setNameTouched(true)} />
                    
                    <div className= "error"> {nameError}</div>

                    <label> Hamster Age </label>
                        <input type="text" placeholder="The hamsters age"
                        className={ageClass}
                        onChange={e => setAge(e.target.value)} 
                        onBlur={() => setAgeTouched(true)} />
                    <div className= "error"> {ageError}</div>

                    <label> Favourite Food </label>
                        <input type="text" placeholder="The hamsters favourite food"
                        className={foodClass}
                        onChange={e => setFood(e.target.value)} 
                        onBlur={() => setFoodTouched(true)} />
                    <div className= "error"> {foodError}</div>

                    <label> Loves </label>
                        <input type="text" placeholder="The hamsters loves"
                        className={lovesClass}
                        onChange={e => setLoves(e.target.value)} 
                        onBlur={() => setLovesTouched(true)} />
                    <div className= "error"> {lovesError}</div>

                    <div>
                        <button onClick={e=>clickHandler(e)}>Register a new hamster</button>
                    </div>

                </div>
       
                    </form>

            </div>
        )
    }
    //<div>If you click, "{name}", "{age}", "{food}" and "{loves}" will be added.</div>



    ///Validation
    function isValidName(name) {
        if( String(name) !== '' ) {
            return ['valid', ''];
        } else {
            return ['invalid', 'Please enter a name']
        }
    }


    function isValidAge(age) {
        let ageAsNumber = Number(age);
        if( isNaN(ageAsNumber) || age === '' ) {
            return ['invalid', 'Please enter a number']
        } else {
            return ['valid', '']
        }
    }
  
    function isValidFood(food) {
        if( String(food) !== '' ) {
            return ['valid', ''];
        } else {
            return ['invalid', 'Please enter a favourite food']
        }
    }

    
    function isValidLoves(loves) {
        if( String(loves) !== '' ) {
            return ['valid', ''];
        } else {
            return ['invalid', 'Please enter the hamsters favourite activity']
        }
    }


    //upload Hamster
    const uploadHamster = async (name, age, food, loves)=>{

        let body = {
            name,
            age,
            food,
            loves,
            games : 0,
            wins : 0,
            defeats: 0,
            id: Date.now()
        }
        console.log(body)
    
        try{
    
            let resp = await fetch('/api/hamsters', {
                method: 'POST',
                body: JSON.stringify(body)
            })
            let json = await resp.json();
            console.log(json.msg);
           
    
        }catch(err){
            console.log(err);
            return err;
        }
    }

export default Upload;