// import { List } from '@material-ui/core';
import React, { useState } from 'react';
import { StyleSheet,Button, Text, TextInput, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native';
import CustomButton from "./componenets/ButtonComponent";

import {todoItems} from './constants/DummyDotoList'
export default function App() {

const [getText,setText] = useState('');
const [getList,setList] = useState(todoItems);
const [editingItem,setEditingItem] = useState(0)

  const addItem = () => {
    console.log(getText);
    setList([
      ...getList,
       {key: Math.random().toString(), data:getText}
      ]);
    setText('');
    Keyboard.dismiss();
  }
  const removeItem = (itemKey) => {
// var list = getList.filter(item => item.key != itemKey);
// setList(list);
setList(list => getList.filter(item => item.key != itemKey));
  }  

  const editItem = (item) => {
setText(item.data);
setEditingItem(item.key);  
}
const updateItem = () => {
  setList(list => getList.map(item =>
     item.key === editingItem ?
     {key:item.key, data: getText} :
     item
     ));
     setText('');
     setEditingItem(0);
}

  const scrollView = (
    <ScrollView style={styles.Scrollview}>
  {getList.map((item,index)=> 

  <TouchableOpacity 
  key={item.key} 
  activeOpacity={0.5}
  onPress={() => editItem(item)}
  >
  <View style={styles.scrollviewItem}
  //  key={item.key}
   >
    <Text style={styles.scrollviewText}>{index + 1}# {item.data}</Text>
    <TouchableOpacity
    onPress={() => removeItem(item.key)}
    >
    <View style={styles.crossTextContaniner}>
      <Text style={styles.crossText}>x</Text>
    </View>
    </TouchableOpacity>
    </View>
    </TouchableOpacity>
    )}
</ScrollView>
  );

  const emptyScrollView = (
<View style={{padding: 30 }}>
  <Text style={{fontStyle:'italic', fontSize:20, color:'grey'}}>No ToDo Items! Hurry!</Text>
</View>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.title}>ToDo List</Text>
    <View style={styles.inputContainer}>

<TextInput
style={styles.textInput}
placeholder="Add an Items"
onChangeText={text => setText(text)}
value={getText}
/>
<CustomButton 
text={editingItem === 0 ? "ADD" : "UPDATE"} 
textSize={16}
 textColor="white"
 onPressEvent={editingItem === 0 ? addItem : updateItem}
 disabled={getText.length <=0}
 />

{/* <Button
title="Add" 
onPress={addItem}
disabled={getText.length <= 0 }
/> */}

</View>
{getList.length <= 0 ? emptyScrollView : scrollView}
    </View>
  );
}

const styles = StyleSheet.create({
  crossTextContaniner: {
    backgroundColor:'grey',
    borderRadius:50,
    padding:5,
    width:30,
    justifyContent:'center',
    alignItems:'center',
    
  },
  crossText: {
    fontSize:20,
    color:'crimson',
    fontWeight: 'bold',
  },
  scrollviewText:{
    fontSize:16,
    color:'white'
  },
  Scrollview: {
    width:'100%',
  },
  scrollviewItem: {
flexDirection:'row',
justifyContent:'space-between',
  backgroundColor:'#8566aa',
  width:'80%',
  alignSelf:'center',
  padding:10,
  margin:5,
  borderRadius:10,
  },
  
  title: {
fontSize:40,
color:'white',
backgroundColor:"#8566aa",
width:'100%',
textAlign:'center',
margin:20,
borderRadius:5,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop:50
    // justifyContent: 'center',
  },
  inputContainer: {
    flexDirection:'row',
    width: '70%',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  textInput: {
    borderColor:"#8566aa",
    width:'78%',
    // borderWidth:2,
    borderBottomWidth:3,
    // borderRadius:15,
    fontSize:20,
    padding:10,
    // textAlign:'center'
  },
});
