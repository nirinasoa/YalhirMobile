import React, {useState,useEffect} from "react";
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
    } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { images, theme } from "../constants/";
import {openDatabase} from 'react-native-sqlite-storage';
import SliderA from '@react-native-community/slider';
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
    const [fontSize, setFontSize] = useState(16);
    const [interligne, setInterligne] = useState(25);
    const [opacity, setOpacity] = useState(0.8);
    const [copiedText, setCopiedText] = useState('');
    const [parameter, setParameter] = useState(false);

    function configure(){
       setParameter(parameter => !parameter)
    }
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
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} style ={{flex:1, backgroundColor:'#f7bd36',height: Dimensions.get('window').height}} 
        showsHorizontalScrollIndicator={true}
        automaticallyAdjustContentInsets={false}
        vertical={true}
        >
            {parameter ? <View style={{backgroundColor:'black', width:350, borderBottomEndRadius:30, padding:8}}>
                <TouchableHighlight style={{alignItems:'flex-end'}} onPress={()=>configure()}>
                    <Ionicons
                    testID="nextButton"
                    name="md-close-sharp"
                    color='white'
                    size={24}
                    />
                </TouchableHighlight>
                <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:25,fontWeight:'bold',paddingLeft:10, color:'white'}}>Aa</Text>
                <SliderA
                    style={{width: 250, height: 40}}
                    minimumValue={16}
                    maximumValue={25}
                    value={17}
                    minimumTrackTintColor="#943610"
                    maximumTrackTintColor="white"
                    thumbTintColor='#943610'
                    onValueChange={(low) => {
                        console.log(`font size is ${low}`);
                        setFontSize(low)
                    }}
        
            />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:25,fontWeight:'bold',paddingLeft:10, color:'white'}}>↨☰</Text>
                <SliderA
                    style={{width: 250, height: 40}}
                    minimumValue={22}
                    maximumValue={35}
                    value={25}
                    minimumTrackTintColor="#943610"
                    maximumTrackTintColor="white"
                    thumbTintColor='#943610'
                    onValueChange={(value) => {
                        console.log(`The low value is ${value}`);
                    setInterligne(value)
                        }}
        
                />  
             </View>
             <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:25,fontWeight:'bold',paddingLeft:10, color:'white'}}>⬛</Text>
                <SliderA
                    style={{width: 250, height: 40}}
                    minimumValue={0.8}
                    maximumValue={1}
                    value={0.9}
                    minimumTrackTintColor="#943610"
                    maximumTrackTintColor="white"
                    thumbTintColor='#943610'
                    onValueChange={(value) => {
                        console.log(`Opacity is ${value}`);
                    setOpacity(value)
                        }}
        
                />  
             </View>
            </View> : <View></View>}
            <ImageBackground
             source={photolink}
             style={{resizeMode: 'cover'}}
             
             >
                 <TouchableHighlight
                 onPress={()=>configure()} activeOpacity={0.8}
                 underlayColor='#f7bd36'>
                 <View
                   style={styles.menuBtn}>
                      <View  style={styles.menuBtnImgIcon}>
                        <View style={[styles.containerTitle]}>
                            <View style={styles.icon3dot}>
                                <Ionicons
                                testID="nextButton"
                                name="md-ellipsis-vertical-sharp"
                                color='white'
                                size={30}
                                />
                            </View>
                            <Text style={{ ...FONTS.h2,color: COLORS.white,padding:8}}>{title}</Text>
                            <Text style={{color: COLORS.white}}> ────────<Ionicons style={styles.icon} testID="nextButton" name="heart" color="black" size={20}
                            />  ─────────</Text>
                </View>
                      
                    </View>
                      
                 </View>
               </TouchableHighlight>
                 
                 
                 
                
                <View style={styles.containerSong} >
                    <View style={[styles.containerLyrix, {  opacity:opacity}]} >
                    {arrayOrder.map((value, index) => (
                        <Text  key={index} style={[styles.lyrix, {fontSize:fontSize,  lineHeight: interligne}]} >
                            {value.includes("[Ref]") ? <Text style={{color:'#ffe282'}}>{value}</Text> : value}
                        </Text>
                    ))}
                    <Text style={{color: COLORS.white}}> </Text>
                    </View>
                </View>
                
                </ImageBackground>
                <Text style={{padding:23, fontSize:11,color:'black'}}>© Copyright by Yaldot - Elohim anie hitahy antsika Rakdelet rehetra </Text>
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
    icon3dot: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        paddingTop:6,
        color:COLORS.white,
        backgroundColor:'#943610',
        width:30,
        borderRadius:5

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
         color: COLORS.white,
         padding:12,
         fontWeight:'900',
         fontFamily:'Comic sans MS',
         textAlign:'center',
         textTransform:'uppercase',
         width:320,
         left:'3%',
        
         
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
      },
      menuBtn:{
        
        borderRadius:30,
        marginRight:7,
       
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal:5,
        flexDirection:'row',
        elevation:10
      },
     
   
})
export default Song;