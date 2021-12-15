import './App.css';
import React, { useEffect, useState } from 'react';
import { Button, Card, TextField, Select } from '@material-ui/core';
import firebase from 'firebase';
import firestore from 'firebase/firestore'

function App() {
  // loading state
  const[loading, setLoading] = useState(true);
  // shopping list items state
  const[items, setItems] = useState([]);

  const[item, setItem] = useState("");
  const[count, setCount] = useState(1);
  

  // load shopping list items
  useEffect(()=> {
    const fetchData = async () => {
      // database
      const db = firebase.firestore();
      // data
      const data = await db.collection("items").get();
      // shopping list items: name, count and id
      const items = data.docs.map(doc => {
        return  { 
          name: doc.data().name, 
          count: doc.data().count, 
          id: doc.id 
        };
      });
      // set states
      setItems(items);
      setLoading(false);
    }
    // start loading data
    fetchData();
  },[]); // called only once

  // render loading... text
  if (loading) return (<p>Loading...</p>);

  // create shopping list items
  const sh_items = items.map( (item, index) => {
    return (
      <>
        <p key={index}>{item.name} {item.count}<Button  color="primary" onClick={() => deleteItem(item)}>&#9003;</Button></p>
      </>
    );
  });
  // add a new item to data base and shopping list items
  const addItem = async () => {
    // create a new shopping list item
    let newItem =  { name: item, count: count, id: '' };
    // add to database
    const db = firebase.firestore();
    let doc = await db.collection('items').add(newItem);
    // get added doc id and set id to newItem
    newItem.id = doc.id;
    // update states
    setItems( [...items,newItem]);
    setItem("");
    setCount(count + 1);
  }
    // delete item from database and UI
  const deleteItem = async (item) => {
    // remove from db
    const db = firebase.firestore();
    db.collection('items').doc(item.id).delete();
    // delete from items state and update state
    let filteredArray = items.filter(collectionItem => collectionItem.id !== item.id);
    setItems(filteredArray);  
  }
  // render shopping list
  return (
    <div className="App">
      <h1>Shopping List</h1>
        {sh_items}
        <TextField onChange={e => setItem(e.target.value)}></TextField>
        <Button onClick={() => addItem()}>ADD IN LIST </Button>
    </div>
    
  );
}
export default App;
