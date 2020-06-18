import React, { useState } from 'react';
import './Upload.css'; 



const Upload = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [favFood, setFood] = useState('');
    const [loves, setLoves] = useState('');
    const [uploadSuccess, setUploadSuccess] = useState('');


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
        ? isValidFood(favFood)
        : ['', ''];

    let [lovesClass, lovesError] = lovesTouched
        ? isValidLoves(loves)
        : ['', ''];

        let formIsValid = nameTouched && ageTouched && foodTouched && lovesTouched && (nameError === '') && (ageError === '') && (foodError === '') && (lovesError === '')
           
    const clickHandler = (e)=>{
        e.preventDefault()

      
        uploadHamster(name, age, favFood, loves)
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
                        <button className="uploadButton" disabled ={!formIsValid} onClick={e=>clickHandler(e), () => setUploadSuccess(`Hamster ${name} was upload and can be used in battle`)}>Register a new hamster</button>
                    </div>
                    <p className={uploadSuccess ? '' : 'hide' }>{uploadSuccess}</p>
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
  
    function isValidFood(favFood) {
        if( String(favFood) !== '' ) {
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
    const uploadHamster = async (name, age, favFood, loves)=>{
        let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
       
            let data = JSON.stringify({'name': name,'age': age,'favFood': favFood,'loves': loves});
      
      
    
        try{
    
            let resp = await fetch('/api/hamsters/', {
                method: 'POST',
                headers: myHeaders,
                body: data
            })
            let json = await resp.json();
            console.log(json.msg);
            
           
    
        }catch(err){
            console.log(err);
            return err;
        }
    }

export default Upload;