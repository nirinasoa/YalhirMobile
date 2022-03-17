import React, {useState,useEffect} from "react";
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
    Button,
    Alert
    } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images, theme } from "../constants/";
import {openDatabase} from 'react-native-sqlite-storage';
//theme
const {COLORS, FONTS, SIZES} = theme;
const list = [
    {
      id:'1',
      name: 'Hanao ny sitrakao',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: '2015'
    },
    {
      id:'2',
      name: 'Tia anao aho Ieshua',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: '2018'
    },
  ];
const db = openDatabase({
    name:'yalhir',
})
const FicheItem = ({ route, navigation }) =>{
    const [search, setSearch] = useState('');
    const [songs, setSong] = useState([]);
    const [artist, setArtist] = useState([]);
    const { itemId } = route.params;
    function displaySong(idSong){
        navigation.navigate('Song', {itemId: itemId, idSong:idSong});
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
                 results.push({
                    username:item.username,
                    belongsTo:item.belongsTo,
                    
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
    const getSongs =(id) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Song where idArtist=${id} order by id desc 
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

        getSongs(itemId)
        getArtistName(itemId)
        
      }, [])
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/homeBackground.jpg")}
             style={{height:Dimensions.get('window').height/5.8,}}
             
             >
                  <View style={styles.inputContainer}>
                  <TextInput
                    label="Hitady"
                    style={styles.input}
                    placeholder="Hitady mpihira 734"
                    secureTextEntry={true}
                    defaultValue={search}
                    onChangeText={search => setSearch(search)}
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
                <Text style={{ ...FONTS.h2,fontSize:20,color: COLORS.gray,padding:10}}>Ireo hiran' i {artist[0].username} </Text>
                    {
                        songs.map((l, i) => (
                        <TouchableOpacity
                         key={l.id}
                         onPress={()=>displaySong(l.id)}
                         style={styles.button}
                         >
                            <ListItem  bottomDivider > 
                                <Ionicons
                                testID="nextButton"
                                name="md-musical-notes"
                                color="black"
                                size={24}
                                />
                                <ListItem.Content >
                                <ListItem.Title style={{  fontWeight: 'bold', ...FONTS.h3 }}>{l.title}</ListItem.Title>
                                <ListItem.Subtitle numberOfLines={1} style={{ textTransform: 'lowercase'}}>{l.paragraph1}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>
                                <Ionicons
                                style={styles.icon}
                                testID="nextButton"
                                name="md-heart-outline"
                                color="black"
                                size={22}
                                />
                                </Text>
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
    icon: {
        flex: 1,
        color:'#f50a4c'
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
    },
    button: {
        borderBottomColor: "red",
 
      },
   
})
export default FicheItem;