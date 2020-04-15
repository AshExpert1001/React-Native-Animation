import React, { Component } from 'react';
import { StyleSheet, Image, View } from 'react-native';
// import BasicAnim from './Components/BasicAnim';
import Tinder from './Components/Tinder';
import { Avatar, Button, Card, Title, Paragraph , Appbar} from 'react-native-paper';

const mydata = [
  {
    id:1,
    text:'Title First',
    uri:'https://source.unsplash.com/user/erondu'
  },
  {
    id:2,
    text:'Title Second',
    uri:'https://source.unsplash.com/weekly?sun'
  },
  {
    id:3,
    text:'Title Third',
    uri:'https://source.unsplash.com/daily'
  },
  {
    id:4,
    text:'Title Four',
    uri:'https://source.unsplash.com/weekly?water'
  },
  {
    id:5,
    text:'Title Five',
    uri:'https://source.unsplash.com/weekly?rain'
  },
  {
    id:6,
    text:'Title Six',
    uri:'https://source.unsplash.com/weekly?home'
  },
  {
    id:7,
    text:'Title Seven',
    uri:'https://source.unsplash.com/weekly?beatch'
  },
  {
    id:8,
    text:'Title Eight',
    uri:'https://source.unsplash.com/weekly?hill'
  },
  {
    id:9,
    text:'Title Nine',
    uri:'https://source.unsplash.com/weekly?art'
  },
  {
    id:10,
    text:'Title Ten',
    uri:'https://source.unsplash.com/weekly?mountan'
  }
]

 class App extends Component{
   renderCard(item){
     return(
    
         <Card key={item.id} style={{margin:10}} >
          <Card.Title title={item.text} />
          <Image source={{ uri: item.uri }} style={{height:250}}  />
          <Card.Actions>
            <Button>Like</Button>
            <Button>Unlike</Button>
          </Card.Actions>
        </Card>
  
     )
   }
   renderNoMoreCards(){
     return(
       <Card style={{margin:20}}>
         <Card.Title title="No More Cards..." />
       </Card>
     );
   }
   render(){
    return (
      <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content
          title="Animation"
          style={{alignItems:'center'}}
        />
      </Appbar.Header>
        <Tinder
          data={mydata}
          RenderCard ={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCards}
        />
      </View>
    );
   }
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },
});
