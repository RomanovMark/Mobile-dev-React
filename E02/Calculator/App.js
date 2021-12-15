import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View,TextInput,  Button, Keyboard } from 'react-native';



export default function App() {
  // use hooks to change number values
  const [number1, setNumber1] = useState('0');
  const [number2, setNumber2] = useState('0');
  const [result, setResult] = useState('0');

  // button pressed - calculate
  const buttonPressed = (calc) => {
    if  (calc === '+')
      setResult(parseInt(number1) + parseInt(number2)+"");
    else if (calc === '-') 
      setResult(parseInt(number1) - parseInt(number2)+"");
    else if (calc === '/') 
      setResult(parseInt(number1) / parseInt(number2)+"");
    else if (calc === '*') 
      setResult(parseInt(number1) * parseInt(number2)+"");
    Keyboard.dismiss();
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'lightgrey',
      alignItems: 'center',
      justifyContent: 'center',
    },
    calculator: {
      fontSize: 50,
      fontWeight: 'bold',
      marginBottom: 20
    },
    row: {
      flexDirection: 'row',
      marginTop: 5
    },
    text: {
      backgroundColor: 'grey',
      justifyContent: 'center',
      padding: 5,
      width:100,
    },
    textInput: {
      justifyContent: 'center',
      padding: 5,
      borderBottomWidth: 1.0,
      width: 100,
      marginLeft: 5,
    }, 
    buttonRow: {
      flexDirection: 'row',
      marginTop: 20,
      marginBottom: 20,
      justifyContent: 'space-around',
      width: 220
    }
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.calculator}>Calculator</Text>
      
      <View style={styles.row}>
        <View style={styles.text}>
          <Text>Number 1:</Text>
        </View>
        <View style={styles.textInput}>
          <TextInput placeholder="0" 
            value={number1} 
            onChangeText={text => setNumber1(text)} 
            style={{textAlign:'right'}} 
            keyboardType={'numeric'}></TextInput>
        </View>
      </View>

    <View style={styles.row}>
      <View style={styles.text}>
        <Text>Number 2:</Text>
      </View>
      <View style={styles.textInput}>
      <TextInput 
            placeholder="0"
            value={number2} 
            onChangeText={text => setNumber2(text)} 
            style={{textAlign:'right'}} 
            keyboardType={'numeric'}></TextInput>
    </View> 
    </View>

    <View style={styles.buttonRow}>
      <Button title="  +  " onPress={() => buttonPressed('+', setResult)}/>
      <Button title="  -  " onPress={() => buttonPressed('-', setResult)}/>
      <Button title="  *  " onPress={() => buttonPressed('*', setResult)}/>
      <Button title="  /  " onPress={() => buttonPressed('/', setResult)}/>
    </View> 
    
    <View style={styles.row}>
      <View style={styles.text}>
        <Text>Result:</Text>
      </View>
      <View style={styles.textInput}>
        <TextInput placeholder="0" value={result} style={{textAlign:'right'}} editable={false}></TextInput>
      </View>
    </View>
    <StatusBar style="auto" />
 
  </View>
  );
}
