import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableHighlight
} from 'react-native';
import axios from 'axios';
import { YouTubeStandaloneAndroid } from 'react-native-youtube';

export default function MovieDetailScreen(props) {
  const { route } = props;
  const { movie } = route.params; 
  let IMAGEPATH = 'http://image.tmdb.org/t/p/w500';
  let imageurl = IMAGEPATH + movie.backdrop_path;
  let movieId = movie.id
  
  const [trailers, setTrailers] = React.useState([]); 

  React.useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/' + movieId + '/videos?api_key=3a5aac9136c68cb93c5f74228683f2cc&language=en-US')
      .then(response => {
        // check console - a movie data should be visible there
        console.log(response.data.results);
        setTrailers(response.data.results);
      })
  }, [])

  const itemPressed = (key) => {
    YouTubeStandaloneAndroid.playVideo({
      apiKey: '3a5aac9136c68cb93c5f74228683f2cc', // Your YouTube Developer API Key
      videoId: key, // YouTube video ID
      autoplay: true, // Autoplay the video
      startTime: 0, // Starting point of video (in seconds)
    })
      .then(() => console.log('Standalone Player Exited'))
      .catch(errorMessage => console.error(errorMessage));
  }

  let trailerItems = trailers.map(function(trailer,index){
    return (
      <TouchableHighlight onPress={_ => itemPressed(trailer.key)} 
         key={index}>
        <Text>{trailer.name}</Text>            
      </TouchableHighlight>
    )
  })

  return (
    <View>
      <Image source={{uri: imageurl}} style={styles.image}  />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.text}>{movie.release_date}</Text>
      <Text style={styles.text}>{movie.overview}</Text>
      <Text style={styles.text}>VIDEOS:</Text>
      {trailerItems}
    </View>
  )
}
const styles = StyleSheet.create({
  image: {
    aspectRatio: 670/250
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15
  },
  text: {
    fontSize: 12,
    flexWrap: 'wrap'
  }
});