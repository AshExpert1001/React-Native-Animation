import React, { Component } from 'react';
import { View, StyleSheet, Animated, Easing} from 'react-native';
import {  } from 'react-native-reanimated';


class BasicAnim extends Component{
    constructor(props){
        super(props);
        this.position = new Animated.ValueXY({x:0,y:200});
        Animated.timing(this.position,{
            toValue:{x:300,y:200},
            duration:5000
         }).start()   
    }

    componentDidMount(){
        this.myAnimation()
    }
    myAnimation(){
        rotate = this.position.x.interpolate({
            inputRange:[0,100],
            outputRange:['0deg',"360deg"]
        })
        return{
            ...this.position.getLayout(),
            transform:[{rotate:rotate}]
        }
    }
    render(){
        return(
            <Animated.View style={this.myAnimation()}>
                <View style={styles.ball}/>
            </Animated.View>
        )
    }
} 

export default BasicAnim;

const styles = StyleSheet.create({
    ball:{
        width:60,
        height:60,
        borderRadius:30,
        backgroundColor:'orange'
    }
})