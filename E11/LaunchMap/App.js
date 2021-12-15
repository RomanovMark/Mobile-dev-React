import React from "react";
import { SafeAreaView, StyleSheet, TextInput, Text,Button, Platform, Linking } from "react-native";



const App: () => Node = () => {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);

  const launchMap = () => {
    const location = `${latitude},${longitude}`
    const url = Platform.select({
      ios: `maps:${location}`,
      android: `geo:${location}?center=${location}&q=${location}&z=16`,
    });
    Linking.openURL(url);
  }

  return (
    <SafeAreaView>
      <Text>Give latitude value:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLatitude}
        value={latitude}
        placeholder="Latitude"
        keyboardType="numeric"
        onChangeText={text => setLatitude(text)}
      />
      <Text>Give longitude value:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setLongitude}
        value={longitude}
        placeholder="Longitude"
        keyboardType="numeric"
        onChangeText={text => setLongitude(text)}
      />
      <Button title="Launch a Map" onPress={launchMap}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;
