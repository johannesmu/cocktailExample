import logo from './logo.svg';
import { Switch, Route } from 'react-router-dom'
import { firebaseConfig } from './config/config'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import { useState,useEffect } from 'react';

import './App.css';
import {Cocktails} from './components/Cocktails'
import {Detail} from './components/Detail'

function App() {
  const [cocktails,setCocktails] = useState()

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const db = firebase.firestore()

  useEffect( () => {
    if( !cocktails ) {
      getCocktails()
    }
  })

  const getCocktails = () => {
    db.collection('Cocktails').get()
      .then( (response) => {
        let items = []
        response.forEach((doc) => {
          let cocktail = doc.data()
          cocktail.id = doc.id
          items.push( cocktail )
        })
        setCocktails( items )
      })
  }

  const getSingleCocktail = (id) => {
    return new Promise( (resolve,reject) => {
      const ref = db.collection('Cocktails').doc(id)
      // get the cocktail
      ref.get()
      .then( (response) => {
        let cocktail = response.data()
        // get all the ingredients
        ref.collection( 'Ingredients' ).get()
          .then( (items) => {
            let ingredients = []
            items.forEach( (item) => {
              ingredients.push( item.data() )
            })
            // add ingredients array as cocktail.ingredients
            cocktail.ingredients = ingredients
            resolve(cocktail)
          })
        
      })
      .catch( (error) => {
        reject( error )
      })
    })
    
  }

  return(
    <div id="app-root">
      <Switch>
        <Route exact path="/">
          <Cocktails data={cocktails} />
        </Route>
        <Route path="/cocktail/:cocktailId">
          <Detail get={getSingleCocktail} />
        </Route>
      </Switch>
      
    </div>
  )
}

export default App;
