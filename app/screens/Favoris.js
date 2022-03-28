import React, {useState,useEffect} from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ScrollView,

    } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images, theme } from "../constants";
import {openDatabase} from 'react-native-sqlite-storage';

//theme
const {COLORS, FONTS, SIZES} = theme;
const db = openDatabase({
    name:'yalhir',
  })
const Favoris = ({ navigation }) =>{
    const [search, setSearch] = useState('');
    const [artist, setArtist] = useState([]);
    function displayLyrics(id){
        navigation.navigate('Song', {idSong: id});
    }
    const getArtist =(e="") =>{ 
      let where =""
      if(e!=""){
          where = ` and title like '%${e}%'`
      }
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Song where  isFavorite='1'  ${where} order by title desc
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
                    id:item.id,
                    idArtist:item.idArtist,
                    title:item.title,
                    photo:photolink,
                    paragraph1:item.paragraph1,
                    yearOfProduction:item.yearOfProduction,
                    
                   
                 })
                  
                }
                setArtist(results)
              }
            },
            error =>{
              console.log('error on displaying table' + error.message)
            }
          )
        })
        }
        useEffect(() => {
            getArtist();
          }, [])
          getArtist();
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/homeBackground.jpg")}
             style={{height:Dimensions.get('window').height/3.8,}}
             
             >
                  <View style={styles.inputContainer}>
                  <TextInput
                    label="Hitady"
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
             <View style={styles.bottomView}>
                <View style={{paddingLeft:20, paddingRight:20}}>
                    {
                        artist.map((l, i) => (
                        <TouchableOpacity
                         key={i}
                         onPress={()=>displayLyrics(l.id)}
                         >
                            <ListItem  bottomDivider>
                                <Avatar 
                                rounded 
                                size={50}
                                source={l.photo}
                                />
                                <ListItem.Content>
                                <ListItem.Title style={{  fontWeight: 'bold', ...FONTS.h5 }}>{l.title}</ListItem.Title>
                                <ListItem.Subtitle numberOfLines={2} style={{ textTransform: 'lowercase'}}>{l.paragraph1}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>{l.yearOfProduction}</Text>
                            </ListItem>
                        </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
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
        color:COLORS.black,
        width:275,
        paddingLeft:10
      
 
    },
    searchIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:62,
        textAlign:'center',
        paddingTop:22
    },
    inputContainer:{
        opacity:0.7,
        alignItems:'center',
        justifyContent:'center',
        padding:50,
        flex: 1,
        flexDirection: 'row',
    }
   
})
export default Favoris;