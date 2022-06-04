import React, {useState,useEffect,useRef } from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
    FlatList,

    } from 'react-native';
import { TextInput } from 'react-native-paper';
import {  Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images, theme } from "../constants/";
import {openDatabase} from 'react-native-sqlite-storage';



//theme
const {COLORS, FONTS, SIZES} = theme;
const {width} = Dimensions.get("screen")
const cardWith = width/2 -20
const db = openDatabase({
    name:'yalhir',
})
const Home = ({ navigation }) =>{
    const [search, setSearch] = useState('');
    const [artist, setArtist] = useState([]);
    const [isLoggedIn, setisLoggedIn] = useState('');
    const opacity = useState(new Animated.Value(0))[0]
   
    function ficheItem(id){
        navigation.navigate('FicheItem', {itemId: id});
    }
    const getArtist =(e="") =>{ 
      let where =""
      if(e!=""){
          where = ` where username like '%${e}%'`
      }
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Artist ${where} order by username asc
            `,[],
            (sqlTxn, res)=>{
              let len = res.rows.length;
              if(len>0){
                let results = [];
                for (let i = 0; i < len; i++) {
                 let item = res.rows.item(i);
                 const photolink = require(`../assets/images/artist/noname.jpg`);
                
                    if(item.username ==  "Poopy")
                        photolink = require(`../assets/images/artist/poopy.jpg`)
                    if(item.username ==  "Ndriana")
                        photolink = require(`../assets/images/artist/ndriana.jpg`)
                    if(item.username ==  "Ryvkah")
                            photolink = require(`../assets/images/artist/ryvkah.jpg`)
                    if(item.username ==  "Petoela")
                            photolink = require(`../assets/images/artist/petoela.jpg`)
                    if(item.username ==  "Kefa")
                            photolink = require(`../assets/images/artist/kefa.jpg`)
                    if(item.username ==  "Yaldot")
                            photolink = require(`../assets/images/artist/yaldot.jpg`) 
                    if(item.username ==  "Toliara")
                        photolink = require(`../assets/images/artist/toliara.jpg`)    
                    if(item.username ==  "Iaakov")
                        photolink = require(`../assets/images/artist/iaakov.jpg`)                          
                 results.push({
                    idArtist:item.idArtist,
                    username:item.username,
                    belongsTo:item.belongsTo,
                    photo:photolink
                 })
                  
                }
               
                setArtist(results)
              }
            },
            error =>{
              console.log('error on dropping table' + error.message)
            }
          )
        })
        }
        function synchronize(){
          navigation.navigate('Admin')
        }
        function logout(){
          AsyncStorage.removeItem('@isAdmin')
          navigation.navigate('Login')
        }
        function searchSong(){
          navigation.navigate('Recherche')
        }
        useEffect(() => {
          Animated.timing(opacity, {
            toValue:1,
            duration:1000,
            useNativeDriver:true
          }).start();
          AsyncStorage.getItem('@isAdmin').then((value) =>{
            setisLoggedIn(value)
             console.log('UseEffect:>@isAdmin : '+value)
           })
            getArtist();
            console.log('isLoggedIn'+isLoggedIn)           
          }, [])

    const Card = ({artist}) =>{
      return (
        <TouchableHighlight
                          key={artist.item.idArtist}
                          onPress={()=>ficheItem(artist.item.idArtist)}
                          underlayColor='transparent'
                          activeOpacity={0.9}
                          >
        <View style={styles.card}>
          
          <View style={{alignItems:'center',top:-20}}>
              <Avatar source={artist.item.photo} rounded size={120}/>
          </View>
          <View style={{marginHorizontal:20}}>
            <Text style={{fontSize:18, fontWeight:'bold',color:'black'}}>{artist.item.username}</Text>
            <Text style={{fontSize:14, color:'gray',marginTop:2}}>Group: {artist.item.belongsTo}</Text>
          </View>
         <View style={styles.btnView}>
            <Ionicons
                style={styles.icon}
                testID="nextButton"
                name="arrow-forward-outline"
                color="gray"
                size={22}
            />
         </View>
        </View>
        </TouchableHighlight>
      )
    }
    function goToFavoris(){
      navigation.navigate('Favoris')
    }
    return (
        <SafeAreaView style={{flex:1,backgroundColor:'#f2c750'}}>
             <ImageBackground
             source={require("../assets/images/homeBackground.jpg")}
             style={{height:Dimensions.get('window').height/8,}}
             
             >
                  <View style={styles.inputContainer}>
                  <TextInput
                    label="Hitady mpamoron-kira"
                    style={styles.input}
                    placeholder="Hitady mpihira 734"
                    defaultValue={search}
                    onChangeText={(e) => getArtist(e)}
                    />
                    <Ionicons
                    style={styles.searchIcon}
                    testID="nextButton"
                    name="search"
                    color="black"
                    size={24}
                    />
                   
                 </View>
             </ImageBackground>
             <View style={styles.menuListContainer}>
                 {isLoggedIn == 1 ?
                  <View >
                 <TouchableHighlight
                 onPress={()=>synchronize()} activeOpacity={0.8}
                 underlayColor='#f7bd36'>
                 <View
                   style={styles.menuBtn}>
                      <View  style={styles.menuBtnImgIcon}>
                      <Ionicons
                    testID="nextButton"
                    name="md-refresh-circle"
                    color='black'
                    size={24}
                    />
                    </View>
                   <Text style={styles.btnText}>M à J</Text>
                      
                 </View>
               </TouchableHighlight>
               </View>
                   
               :<></>}
               <Text>&nbsp;</Text>
               <View>
               <TouchableHighlight
                onPress={goToFavoris} activeOpacity={0.8}
                 underlayColor='#f7bd36'>
                 <View
                   style={styles.menuBtn}>
                      <View  style={styles.menuBtnImgIcon}>
                      <Ionicons
                    testID="nextButton"
                    name="md-heart"
                    color='#f50a4c'
                    size={24}
                    />
                    </View>
                   <Text style={{...styles.btnText}}>Likes</Text>
                 </View>
               </TouchableHighlight>
               </View> 
              
               <View>
               <TouchableHighlight
                 onPress={()=>searchSong()} activeOpacity={0.8}
                 underlayColor='#f7bd36'>
                 <View
                   style={styles.menuBtn}>
                      <View  style={styles.menuBtnImgIcon}>
                      <Ionicons
                    testID="nextButton"
                    name="search"
                    color='black'
                    size={24}
                    />
                    </View>
                   <Text style={styles.btnText}>Hitady</Text>
                 </View>
                 
               </TouchableHighlight>
               </View> 
               </View>
                    <FlatList
                   
                          showsVerticalScrollIndicator={false}
                          numColumns={2}
                          data={artist}
                          renderItem={(item)=><Card artist={item}/>}
                  />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue"
  },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
    },
    input:{
        color:COLORS.black,
        width:Dimensions.get('window').width/1.5,
        paddingLeft:10,
        height:50,
      
 
    },
    searchIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:49,
        textAlign:'center',
        paddingTop:15
    },
    inputContainer:{
        opacity:0.7,
        alignItems:'center',
        justifyContent:'center',
        padding:30,
        flex: 1,
        flexDirection: 'row',

    },
    button: {
      borderWidth: 1,
      borderRadius: 2,
      borderColor: 'transparent',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      backgroundColor:'black'
    },
    btnClickContain: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#3b3b3d',
      borderRadius: 3,
      padding: 5,
      marginTop: 1,
      marginBottom: 1,
      height:50,
      width:150
    },
    btnContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'stretch',
      alignSelf: 'stretch',
      borderRadius: 10,
    },
    btnIcon: {
      height: 25,
      width: 25,
    },
    btnText: {
      fontSize: 16,
      color: 'black',
      marginLeft: 10,
      marginTop: 2,
      fontWeight:'bold'
    },
    card:{
      height:220,
      width:cardWith,
      marginHorizontal:10,
      marginBottom:5,
      marginTop:40,
      borderRadius:15,
      elevation:13,
      backgroundColor:'white'
    },
    btnView:{
      height:30,
      width:30,
      borderRadius:20,
      backgroundColor:'transparent',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:130
    },
    menuListContainer:{
      alignItems:'center',
      flexDirection:'row',
      justifyContent:'center',
      borderBottomLeftRadius:30,
      borderBottomRightRadius:30,
      backgroundColor:'#fccf03',
      paddingHorizontal:5,
      paddingVertical:5,
      elevation:5
      
    },
    menuBtn:{
      height:40,
      width:120,
      borderRadius:30,
      marginRight:7,
      backgroundColor:'#fcd281',
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:5,
      flexDirection:'row',
      elevation:10
    },
    menuBtnImgIcon:{
      height:25,
      width:25,
      backgroundColor:'#fcd281',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',

    }
   
})
export default Home;