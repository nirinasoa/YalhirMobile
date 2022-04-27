import React, {useState,useEffect, BackHandler } from "react";
import LinearGradient from 'react-native-linear-gradient';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Dimensions,
    TouchableHighlight,
    ScrollView,
    
    } from 'react-native';
    import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images, theme } from "../constants/";
import {openDatabase} from 'react-native-sqlite-storage';
//theme
const {COLORS, FONTS, SIZES} = theme;
const db = openDatabase({
    name:'yalhir',
})
const FicheItem = ({ route, navigation }) =>{
    const [search, setSearch] = useState('');
    const [songs, setSong] = useState([]);
    const [artist, setArtist] = useState([]);
    const [photo, setPhoto] = useState([]);
    const [group, setGroup] = useState([]);
    const [isLoggedIn, setisLoggedIn] = useState('');
    
    const { itemId } = route.params;
    const [modalVisible, setModalVisible] = useState(false);
   
    function displaySong(idSong){
        navigation.navigate('Song', {itemId: itemId, idSong:idSong});
    }
    function isFavorite(id,idArtist,value){
      db.transaction(txn => {
        txn.executeSql(
          `
          update Song set isFavorite='${value}' where id=${id}
          `,[],
          (sqlTxn, res)=>{
            getSongs(idArtist)
          },
          error =>{
            console.log('error on updating table' + error.message)
          }
        )
      })
    }
    const getArtistName =(id) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Artist where idArtist=${id}
            `,[],
            (sqlTxn, res)=>{

              let len = res.rows.length;
              if(len>0){
                let results = [];
                for (let i = 0; i < len; i++) {
                 let item = res.rows.item(i);
                 const photolink = require(`../assets/images/artist/noname.jpg`);
                
                 if(item.idArtist ==  "3")
                     photolink = require(`../assets/images/artist/poopy.jpg`)
                 if(item.idArtist ==  "2")
                     photolink = require(`../assets/images/artist/ndriana.jpg`)
                 if(item.idArtist ==  "1")
                         photolink = require(`../assets/images/artist/ryvkah.jpg`)
                 if(item.idArtist ==  "5")
                         photolink = require(`../assets/images/artist/petoela.jpg`)
                 if(item.idArtist ==  "4")
                         photolink = require(`../assets/images/artist/kefa.jpg`)
                 if(item.idArtist ==  "7")
                         photolink = require(`../assets/images/artist/yaldot.jpg`) 
                 if(item.idArtist ==  "6")
                     photolink = require(`../assets/images/artist/toliara.jpg`)    
                 if(item.idArtist ==  "8")
                     photolink = require(`../assets/images/artist/iaakov.jpg`)                         
                   
                 results.push({
                    username:item.username,
                    belongsTo:item.belongsTo,
                    photo:photolink
                    
                 })
                 
                
                }
                setArtist(results[0].username)
                setPhoto(results[0].photo)
                setGroup(results[0].belongsTo)
          
               
              }
            },
            error =>{
              console.log('error on dropping table' + error.message)
            }
          )
        })
        }
        const searchSong =(e) =>{
          console.log(e)
          db.transaction(txn => {
            txn.executeSql(
              `
              SELECT * from Song where title like '%${e}%' and idArtist = ${itemId}
              `,[],
              (sqlTxn, res)=>{
  
                let len = res.rows.length;
                if(len>0){
                  let results = [];
                  for (let i = 0; i < len; i++) {
                   let item = res.rows.item(i);
              
                   results.push({
                      id:item.id,
                      title:item.title,
                      idArtist:item.idArtist,
                      isFavorite:item.isFavorite,
                      yearProduction:item.yearProduction,
                      paragraph1:item.paragraph1,
                   })
                    
                  }
                 
                  setSong(results)
                }
              },
              error =>{
                console.log('error on dropping table' + error.message)
              }
            )
          })
          }
    const getSongs =(id) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Song where idArtist=${id} order by title asc 
            `,[],
            (sqlTxn, res)=>{

              let len = res.rows.length;
              if(len>0){
                let results = [];
                for (let i = 0; i < len; i++) {
                 let item = res.rows.item(i);
            
                 results.push({
                    id:item.id,
                    idArtist:item.idArtist,
                    title:item.title,
                    isFavorite:item.isFavorite,
                    yearProduction:item.yearProduction,
                    paragraph1:item.paragraph1,
                 })
                  
                }
               
                setSong(results)
              }
            },
            error =>{
              console.log('error on dropping table' + error.message)
            }
          )
        })
        }
    useEffect(() => {
      AsyncStorage.getItem('@isAdmin').then((value) =>{
        setisLoggedIn(value)
         console.log('UseEffect:>@isAdmin : '+value)
       })
        getSongs(itemId)
        getArtistName(itemId)
        
      }, [])
      function goToFavoris(){
        navigation.navigate('Favoris')
      }
      function synchronize(){
        navigation.navigate('Admin')
      }
      function home(){
        navigation.navigate('Home')
      }
      function logout(){
        AsyncStorage.removeItem('@isAdmin')
        navigation.navigate('Login')
      }
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#f7bd36'}} 
        showsHorizontalScrollIndicator={false}>
          <LinearGradient colors={['black', '#262525', '#f7bd36','#f7bd36','#f7bd36']}>
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
                   
               :<View >
               <TouchableHighlight
               onPress={()=>home()} activeOpacity={0.8}
               underlayColor='#f7bd36'>
               <View
                 style={styles.menuBtn}>
                    <View  style={styles.menuBtnImgIcon}>
                    <Ionicons
                  testID="nextButton"
                  name="home"
                  color='black'
                  size={24}
                  />
                  </View>
                 <Text style={styles.btnText}>Artist</Text>
                    
               </View>
             </TouchableHighlight>
             </View>}
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
                 onPress={()=>logout()} activeOpacity={0.8}
                 underlayColor='#f7bd36'>
                 <View
                   style={styles.menuBtn}>
                      <View  style={styles.menuBtnImgIcon}>
                      <Ionicons
                    testID="nextButton"
                    name="md-log-out"
                    color='black'
                    size={24}
                    />
                    </View>
                   <Text style={styles.btnText}>Hiala</Text>
                 </View>
               </TouchableHighlight>
               </View> 
               </View>

            <View  style={{alignItems: "center",padding:5}}>
            <Avatar 
                 rounded 
                 size={170}
                 source={photo}
                
             />
              <Text style={{ ...FONTS.h2,fontSize:20,color: COLORS.white}}>{artist} </Text>
              <Text style={{ ...FONTS.h2,fontSize:13,color: COLORS.white}}>Group:{group} </Text>
             </View>
             <View style={styles.inputContainer}>
                  <TextInput
                 
                    style={styles.input}
                    placeholder="Hitady hira ..."
                    placeholderTextColor={'#eee'}
                    theme={{
                      colors: {
                            text: 'white',
                         }
                   }}
                    defaultValue={search}
                    onChangeText={(e) =>searchSong(e)}
                    />
                    <Ionicons
                    style={styles.searchIcon}
                    testID="nextButton"
                    name="search"
                    color="black"
                    size={24}
                    />
                 </View>
             <View style={styles.bottomView}> 
                <View style={{paddingLeft:20, paddingRight:20}}>
                    {
                        songs.map((l, i) => (
                        <TouchableOpacity
                         key={i}
                         onPress={()=>displaySong(l.id)}
                        
                         >
                            <ListItem  
                              containerStyle={styles.button}
                              bottomDivider  
                              > 
                             
                                <Ionicons
                                testID="nextButton"
                                name="md-musical-notes"
                                color="#f50a4c"
                                size={24}
                                />
                                
                                <ListItem.Content >
                                <ListItem.Title style={{  fontWeight: 'bold',fontSize:16,color:'#eee' }}>{l.title}</ListItem.Title>
                                <ListItem.Subtitle  numberOfLines={1} style={{ fontSize:15, color:'#eee' ,textTransform: 'lowercase'}}>{l.paragraph1}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>
                                  {l.isFavorite=='0'? <Ionicons
                                  style={styles.icon}
                                  testID="nextButton"
                                  name="md-heart-outline"
                                  color="black"
                                  size={22}
                                  onPress={()=>isFavorite(l.id,l.idArtist,'1')}
                                  />:<Ionicons
                                  style={styles.icon}
                                  testID="nextButton"
                                  name="md-heart"
                                  color="black"
                                  size={22}
                                  onPress={()=>isFavorite(l.id,l.idArtist,'0')}
                                  />}
                                </Text>  
                            </ListItem>
                        </TouchableOpacity>
                        ))
                    }
                     <Text style={{padding:10, fontSize:10}}>© Copyright to Yaldot</Text>
                </View>
            </View>
            </LinearGradient>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:COLORS.white,
    },
    input:{
      color: 'white',
        width:275,
        paddingLeft:10,
        height:50,
         backgroundColor:'black',
    },
    icon: {
        flex: 1,
        color:'#f50a4c',
    },
    searchIcon: {
        backgroundColor: '#fccf03',
        padding:12,
        alignItems:'center',
        justifyContent:'center',
    },
    inputContainer:{
        alignItems:'center',
        justifyContent:'center',
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
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
      backgroundColor:'black'
    },
    listItemContainer:{
      backgroundColor:'red'
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    buttonText: {
      fontSize: 17,
      fontFamily: 'Arial',
      textAlign: 'center',
      fontWeight:'bold',
      margin: 10,
      paddingTop:0,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    btnText: {
      fontSize: 16,
      color: 'black',
      marginLeft: 10,
      marginTop: 2,
      fontWeight:'bold'
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
     
      
    },
    menuBtn:{
      height:40,
      width:110,
      borderRadius:30,
      marginRight:7,
      backgroundColor:'#ffc75e',
      justifyContent:'center',
      alignItems:'center',
      paddingHorizontal:5,
      flexDirection:'row',
      elevation:10
    },
    menuBtnImgIcon:{
      height:25,
      width:25,
      backgroundColor:'#ffc75e',
      borderRadius:20,
      justifyContent:'center',
      alignItems:'center',

    }
   
})
export default FicheItem;