import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Button
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';




export default class App extends React.Component {
 
  constructor(props){
    super(props);
    this.state = {
      gameBoard: [
       [0,0,0],
       [0,0,0],
       [0,0,0]
       ],
      currentPlayer: 1,
      p1Wins: 0,
      p2Wins:0,
    }
  }
 
  componentDidMount(){
    this.initializeGame();
  }
  
  initializeGame = () => {
    this.setState({gameBoard:
     [
       [0,0,0],
       [0,0,0],
       [0,0,0]
     ]
    });
  }
 
  renderFont=(row,col) => {
    var val= this.state.gameBoard[row][col];
 
    switch(val)
    {
      case 1: return <Icon name="close" style={styles.squareX}/>;
      case -1: return <Icon name="circle-o" style={styles.squareO}/>;
      default: return <View/>;
    }
  }
 
  //return 1 for player 1 win
  //return -1 for player 2 win
  //return 0 if no winner
 checkWinner = () => {
    var total;
    var arr=this.state.gameBoard;
    //check row for winner
    for (let i=0; i<3 ; i++){
      total=arr[i][0] +arr[i][1]+arr[i][2];
      if (total==3){ return 1;}
      else if (total== -3){return -1;}
    }
      //check collumn for winner
    for (let i=0; i<3 ; i++){
      total=arr[0][i] +arr[1][i]+arr[2][i];
      if (total==3){ return 1;}
      else if (total== -3){return -1;}
    }
  
        //check dagnols for winner
    total=arr[0][0] +arr[1][1]+arr[2][2];
    if (total==3){ return 1;}
    else if (total== -3){return -1;}
      
    total=arr[0][2] +arr[1][1]+arr[2][0];
    if (total==3){ return 1;}
    else if (total== -3){return -1;}
  
      //if no winner
    return 0;
  }
 
 takeSquare=(row,col) =>{
     //if space is taken, do nothing
    var val = this.state.gameBoard[row][col];
    if (val !==0) {return;}
    
    //pull in previous state variables
    var currentPlayer = this.state.currentPlayer;
    var arr=[...this.state.gameBoard];
      
      //set the stile in gameBoard
    arr[row][col] =currentPlayer;
    this.setState({gameBoard: arr});
    
    //switch player
    this.setState({currentPlayer: this.state.currentPlayer * -1});
    
    //check for win
    var champ=this.checkWinner();
    if (champ==1){
      Alert.alert("Player 1 has won the round!")
      this.setState({p1Wins: this.state.p1Wins+1});
      this.newGame();
    }
    else if (champ==-1){
      Alert.alert("Player 2 has won the round!")
      this.setState({p2Wins: this.state.p2Wins+1});
      this.newGame();
    }
  }
 
  newGame= () => {
    this.initializeGame();
  }
 
  resetScore=() => {
    this.initializeGame();
    this.setState({ 
      p1Wins: 0,
      p2Wins: 0,
      currentPlayer: 1 
    });
  }
 
  renderPlayer(){
   if (this.state.currentPlayer==1)
     return (
       <View style={{alignItems:"center"}}>
         <Text style={{fontSize:30, color:"blue", paddingBottom:20}} >
           Player 1's turn. (X)
         </Text>
       </View>);
   else
     return(
        <View style={{alignItems:"center"}}>
         <Text style={{fontSize:30, color:"red", paddingBottom:20}} >
           Player 2's turn. (X)
         </Text>
       </View>);
 }
 
 
 
  renderGame(){
    return(
      <View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.takeSquare(0,0)} style={[styles.square, styles.btop,styles.bleft]} >
            {this.renderFont(0,0)}
          </TouchableOpacity>
          <TouchableOpacity  onPress={() => this.takeSquare(0,1)} style={[styles.square, styles.btop]} >
            {this.renderFont(0,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takeSquare(0,2)} style={[styles.square, styles.btop, styles.bright]} >
            {this.renderFont(0,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.takeSquare(1,0)} style={[styles.square, styles.bleft]} >
            {this.renderFont(1,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takeSquare(1,1)} style={styles.square} >
            {this.renderFont(1,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takeSquare(1,2)} style={[styles.square, styles.bright]} >
            {this.renderFont(1,2)}
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: "row"}}>
          <TouchableOpacity onPress={() => this.takeSquare(2,0)} style={[styles.square, styles.bbottom,styles.bleft]} >
            {this.renderFont(2,0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takeSquare(2,1)} style={[styles.square, styles.bbottom]} >
            {this.renderFont(2,1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.takeSquare(2,2)} style={[styles.square, styles.bbottom, styles.bright]} >
            {this.renderFont(2,2)}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 renderScore(){
   return(
   <View >  
     <Text style={{justifyContent:'center', alignItems: 'center', fontSize:30, paddingTop:15}} >
      Player 1: {this.state.p1Wins} wins
     </Text>
     <Text style={{fontSize:30, alignItems: 'center'}} >
      Player 2: {this.state.p2Wins} wins
     </Text>
   </View>
   );
 }
 
   render() {
     return (
        <View style={styles.container}>
          <View>
            {this.renderPlayer()}
            {this.renderGame()} 
          </View>
          <View style={{flexDirection:"column"}}>
            <View style={{padding:15}}>     
              <Button title="New Game" onPress={this.newGame}/>
            </View>
            <View>
              {this.renderScore()}
              </View>
            <View style={{padding:30}} >     
              <Button title="Reset Score Board" onPress={this.resetScore}/>
            </View>
          </View>
        </View>
 
   
     );
   }
 }
 
 const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#ecf0f1',
   },
   square: {
     borderWidth: 8,
     width: 100,
     height: 100,
     justifyContent: "center",
     alignItems: "center",
   },
   squareX:{
     color: "blue",
     fontSize:60,
   },
   squareO:{
     color: "red",
     fontSize:60,
   },
   btop:{
     borderTopWidth:0,
   },
   bleft:{
     borderLeftWidth: 0,
   },
   bright:{
     borderRightWidth: 0,
   },
   bbottom:{
     borderBottomWidth: 0,
   }
 });