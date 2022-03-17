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
      name: 'POOPY',
      avatar_url: require("../assets/images/poopy.jpg"),
      subtitle: 'Yeladim'
    },
    {
      id:'2',
      name: 'Ryvkah',
      avatar_url:  require("../assets/images/yael.jpg"),
      subtitle: 'Batim'
    },
  ];
  const db = openDatabase({
    name:'yalhir',
  })
const Home = ({ navigation }) =>{
    const [search, setSearch] = useState('');
    const [artist, setArtist] = useState([]);
    function ficheItem(id){
        navigation.navigate('FicheItem', {itemId: id});
    }
    const getArtist =() =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Artist
            `,[],
            (sqlTxn, res)=>{
              console.log('Artist retrieved successfully');
              let len = res.rows.length;
              if(len>0){
                let results = [];
                for (let i = 0; i < len; i++) {
                  console.log(res.rows.item(i))
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
        useEffect(() => {
            getArtist();
            
            
          }, [])
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
                    {
                        artist.map((l, i) => (
                        <TouchableOpacity
                         key={l.idArtist}
                         onPress={()=>ficheItem(l.idArtist)}
                         >
                            <ListItem  bottomDivider>
                                <Avatar 
                                rounded 
                                size={50}
                                source={l.photo}
                                />
                                <ListItem.Content>
                                <ListItem.Title style={{  fontWeight: 'bold', ...FONTS.h5 }}>{l.username}</ListItem.Title>
                                <ListItem.Subtitle>{l.belongsTo}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>2012</Text>
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
export default Home;