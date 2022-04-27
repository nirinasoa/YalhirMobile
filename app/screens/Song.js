import React, {useState,useEffect} from "react";
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
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
    const [copiedText, setCopiedText] = useState('');


  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };
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
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style ={{flex:1, backgroundColor:'#302c30',height: Dimensions.get('window').height}} 
        showsHorizontalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        vertical={true}
        >
            <ImageBackground
             source={photolink}
             style={{resizeMode: 'cover',}}
             
             >
                 <View style={styles.containerTitle}>
                    <Text style={{ ...FONTS.h2,color: COLORS.white,padding:8}}>{title}</Text>
                    <Text style={{color: COLORS.white}}> ────────<Ionicons style={styles.icon} testID="nextButton" name="heart" color="black" size={20}
                    />  ─────────</Text>
                </View>
                 
                
                <View style={styles.containerSong} >
                    <View style={styles.containerLyrix} >
                    {arrayOrder.map((value, index) => (
                        <Text  key={index} style={styles.lyrix} >
                            {value.includes("[Ref]") ? <Text style={{color:'#ffe282'}}>{value}</Text> : value}
                        </Text>
                    ))}
                    <Text style={{color: COLORS.white}}> </Text>
                    </View>
                </View>
            
                </ImageBackground>
                <Text style={{padding:40, fontSize:11,color:'white'}}>© Copyright to Yaldot-Miezaka hanatsara hatrany-Elohim anie hitahy antsika rehetra </Text>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    containerTitle: {
        color:'brown',
        left:'2%',
      top:0
    },
    containerSong: {
        color:COLORS.white,
     
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
         fontFamily:'Comic sans MS',
         textTransform:'uppercase'
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