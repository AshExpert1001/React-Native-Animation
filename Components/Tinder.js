import React, { Component } from 'react';
import { View, PanResponder, Animated, Dimensions, StyleSheet, UIManager, LayoutAnimation} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_LIMIT = SCREEN_WIDTH / 2; 
class Tinder extends Component{
    constructor(props){
        super(props);
        this.state={
            index:0
        }
        const position = new Animated.ValueXY();
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponderCapture:()=>true,
            onPanResponderMove:(e,gesture)=>{
            //    console.log(gesture)
                position.setValue({x:gesture.dx,y:gesture.dy})
            },
            onPanResponderRelease:(e,gesture)=>{
                if(gesture.dx>SWIPE_LIMIT){
                    //console.log('right')   
                    this.swiped("right")
                }else if(gesture.dx < -SWIPE_LIMIT ){
                    //console.log('left')
                    this.swiped("left")
                }else{
                    this.resetPosition()
                }
            }
        })
        this.position = position
    }
    componentDidUpdate(){
        UIManager.setLayoutAnimationEnabledExperimental
        &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring();
    }
    swiped(direction){
        const x = direction === 'right' ? SCREEN_WIDTH*2 : -SCREEN_WIDTH*2
        Animated.timing(this.position,{
            toValue:{x:x,y:0}
        }).start(()=>{
            this.position.setValue({x:0,y:0}),
            this.setState({index:this.state.index+1})
        })
    }
    resetPosition(){
        Animated.spring(this.position,{
            toValue:{x:0,y:0},
            stiffness:200
        }).start()
    }
    mycardStyle(){
        const rotate = this.position.x.interpolate({
            inputRange:[-SCREEN_WIDTH,0,SCREEN_WIDTH],
            outputRange:['-120deg','0deg','120deg']
        })
        return{
            ...this.position.getLayout(),
            transform:[{rotate:rotate}]
        }
    }
    rendercard(){
        if(this.state.index>= this.props.data.length){
            return this.props.renderNoMoreCards()
        }
        return this.props.data.map((item, i)=>{
            if(i<this.state.index){
                return null
            }
            if(i===this.state.index){
                return(
                <Animated.View
                    key={item.id} 
                    style={[this.mycardStyle(),styles.cardStyle]} 
                    {...this.panResponder.panHandlers} >

                    {this.props.RenderCard(item)}
                 </Animated.View>
                )
            }
            return (
                <Animated.View key={item.id} style={[styles.cardStyle,{top:10*(i-this.state.index)}]}>    
                {this.props.RenderCard(item)}
                </Animated.View>
                );    

        }).reverse()
    }
    render(){
        return(
            <View>
                {this.rendercard()}
            </View>
        )
    }
}
export default Tinder;

const styles=StyleSheet.create({
    cardStyle:{
        position:"absolute",
        zIndex:1,
        width:SCREEN_WIDTH,
        marginTop:20,
    }
})