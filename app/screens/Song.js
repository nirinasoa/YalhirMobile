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

const db = openDatabase({
    name:'yalhir',
})
const Song = ({ route, navigation }) =>{
    const [search, setSearch] = useState('');
    const { itemId, idSong } = route.params;
    const [songs, setSong] = useState([]);
    const [arrayOrder, setArrayOrder] = useState([]);
    const [title, setTitle] = useState('');
const [yearProduction, setYearProduction] = useState('');
const [order, setOrder] = useState('');
const [refrain, setRefrain] = useState('');
const [photolink, setPhotolink] = useState('');
const [paragraph1, setParagraph1] = useState('');
const [paragraph2, setParagraph2] = useState('');
const [paragraph3, setParagraph3] = useState('');
const [paragraph4, setParagraph4] = useState('');
const [paragraph5, setParagraph5] = useState('');
const [paragraph6, setParagraph6] = useState('');
const [_id, set_id] = useState('');
    const getSongs =(id) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Song where id=${id} order by id desc 
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
                     const arrayOrder = item.orderSong.split(",");
                     for(var j=0; j < arrayOrder.length; j++) {
                         arrayOrder[j] = arrayOrder[j].replace('P1', item.refrain === 'P1' ? '[Ref] '+ item.paragraph1 : item.paragraph1)
                                                      .replace('P2',item.refrain === 'P2' ? '[Ref] '+ item.paragraph2 : item.paragraph2)
                                                      .replace('P3',item.refrain === 'P3' ? '[Ref] '+ item.paragraph3 : item.paragraph3)
                                                      .replace('P4', item.refrain === 'P4' ? '[Ref] '+ item.paragraph4 :item.paragraph4)
                                                      .replace('P5', item.refrain === 'P5' ? '[Ref] '+ item.paragraph5 :item.paragraph5)
                                                      .replace('P6', item.refrain === 'P6' ? '[Ref] '+ item.paragraph6 :item.paragraph6)
                         
         
                        }
                        setTitle(item.title)
                        setPhotolink(photolink)
                        setYearProduction(item.yearProduction)
                        setOrder(item.orderSong)
                        setRefrain(item.refrain)
                        setParagraph1(item.paragraph1)
                        setParagraph2(item.paragraph2)
                        setParagraph3(item.paragraph3)
                        setParagraph4(item.paragraph4)
                        setParagraph5(item.paragraph5)
                        setParagraph6(item.paragraph6)
                        set_id(item.id)
                        setArrayOrder(arrayOrder)
                }
               
                
              }
            },
            error =>{
              console.log('error on dropping table' + error.message)
            }
          )
        })
        }
    useEffect(() => {
        getSongs(idSong)
        
      }, [])
    let list = [];
    if(itemId == 1){
        list = [
            {
              id:'1',
              title: 'Hanao ny sitrakao',
              image: require("../assets/images/poopy.jpg"),
              lyrix: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. {"\n"}{"\n"}Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.'
            },
           
          ];
    }else{
        list = [{
            id:'2',
            title: 'Fitondranao ahy',
            image:  require("../assets/images/yael.jpg"),
            lyrix: ' Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. {"\n"}{"\n"}Nunc viverra imperdiet enim. Fusce est. Vivamus a tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin pharetra nonummy pede. Mauris et orci. Aenean nec lorem. In porttitor. Donec laoreet nonummy augue. Suspendisse dui purus, scelerisque at, vulputate vitae, pretium mattis, nunc. Mauris eget neque at sem venenatis eleifend. Ut nonummy.'
          }];
    }
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style ={{flex:1, backgroundColor:'black',height: Dimensions.get('window').height}} 
        showsHorizontalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        vertical={true}
        >
            <ImageBackground
             source={photolink}
             style={{height:Dimensions.get('window').height/5, resizeMode: 'fill',}}
             
             >
                 <View style={styles.containerTitle}>
                    <Text style={{ ...FONTS.h2,fontSize:27,color: COLORS.white,padding:8,}}>{title}</Text>
                    <Text style={{color: COLORS.white}}> ────────<Ionicons style={styles.icon} testID="nextButton" name="heart" color="black" size={20}
                    />  ─────────</Text>
                </View>
                  </ImageBackground>
                
                <View style={styles.containerSong} >
                    <View style={styles.containerLyrix} opacity={0.8}>
                    {arrayOrder.map((value, index) => (
                        <Text hey={index} style={styles.lyrix} >
                           {value.includes("[Ref]") ? <Text style={{color:'#ffe282'}}>{value}</Text> : value}
                         
                         </Text>
                    ))}
                    <Text style={{color: COLORS.white}}> ─────────────────</Text>
                    </View>
                </View>
            

             
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    containerTitle: {
        color:COLORS.white,
        left:'20%',
      padding:10
    },
    containerSong: {
        color:COLORS.white,
        top:-50
    },
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        color:COLORS.white
    },
    icon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height:62,
        textAlign:'center',
        paddingTop:22,
        color:COLORS.white,
    },
    inputContainer:{
        opacity:0.7,
        alignItems:'center',
        justifyContent:'center',
        padding:50,
        flex: 1,
        flexDirection: 'row',
    },
    lyrix:{
        fontSize:16,
         color: COLORS.white,
         padding:10,
         fontWeight:'900',
         fontFamily:'Comic sans MS'
    },
    containerLyrix:{
        backgroundColor: COLORS.black,
        padding:10,
        marginLeft:5,
        marginRight:5,
        borderBottomEndRadius:30,
        borderTopStartRadius:10,
        borderBottomLeftRadius:10,
        borderTopRightRadius:30,
       
    },
    nav: {
        padding: 0,
        marginTop: 30,
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#000000'
      }
   
})
export default Song;