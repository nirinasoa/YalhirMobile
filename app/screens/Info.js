import React, {useState,useEffect} from "react";
import LinearGradient from 'react-native-linear-gradient';
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
    Alert,
     Modal, Pressable
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

const team1 = [
    {
        username: "Ny Antsa",
        img:require("../assets/images/nyantsa.jpg")
    },
    {
        username: "Yael",
        img:require("../assets/images/yael.jpg")
    },
    {
        username: "Ny Toky",
        img:require("../assets/images/nytoky.jpg")
    },

];
const team2 = [
    {
        username: "Miora",
        img:require("../assets/images/miora.jpg")
    },
    {
        username: "Andrianina",
        img:require("../assets/images/andrianina.jpg")
    },
    {
        username: "Lianasoa",
        img:require("../assets/images/lianasoa.jpg")
    },
    
];
const Info = ({ route, navigation }) =>{
    const [defaultRating, setdefaultRating] = useState(1);
    const [maxRating, setmaxRating] = useState([1,2,3,4,5]);   
    const starImgFiled ='md-star';
    const starImgCorner ='star-outline';
    function rateUs(){
        db.transaction(txn => {
            txn.executeSql(
             `
               Update RateUs set star='${defaultRating}' where id=1
                `,[],
                (sqlTxn, res)=>{
                    Alert.alert("🎼Yalhir","Voray. Todah oh!!! (｡♥‿♥｡)")
                },
                error =>{
                  console.log('error on updating table' + error.message)
                }
              )
        })   
    }
    function getValueRateUs(){
        db.transaction(txn => {
            txn.executeSql(
             `
               select * from RateUs
                `,[],
                (sqlTxn, res)=>{
                    let len = res.rows.length;
                    if(len>0){
                        let item = res.rows.item(0);
                        console.log("rate="+item.id)
                        setdefaultRating(item.star)
                    }
                },
                error =>{
                  console.log('error on displaying table' + error.message)
                }
              )
        })   
    }
    const CustomRatingBar = () =>{
        return (
            <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',padding:15}}>
                {
                    maxRating.map((item,key)=>{
                        return(
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={key}
                            onPress={()=>setdefaultRating(item)}
                            >
                                  <Ionicons name={item <= defaultRating? starImgFiled:starImgCorner} color="#f7bd36" size={30}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    function listTeam1(){
        return team1.map((item, index)=>{ 
            return (
            <Avatar 
            rounded 
            key={index}
            size={70}
            source={item.img}/>
            )
        })
    }
    function listTeam2(){
        return team2.map((item, index)=>{ 
            return (
            <Avatar 
            rounded 
            key={index}
            size={70}
            source={item.img}/>
            )
        })
    }
useEffect(() => {
    getValueRateUs()
}, [])
    return (
        <ScrollView style ={{flex:1, backgroundColor:'black'}} 
        showsHorizontalScrollIndicator={false}>
          
          <LinearGradient colors={['black','black', 'black']}>

            <View  style={{alignItems: "center",padding:5,flex:1,justifyContent:'center',marginTop:50}}>
           
              <Text style={{ ...FONTS.h2,fontSize:30,color: COLORS.white,padding:10}}>Team Yaldot</Text>
              <Text style={{ fontSize:16,color: COLORS.white,padding:20}}>
                  Raha misy fanotaniana tianao apetraka aminay, dia afaka alefa amin'ny:
                  <Text>➤ yaldot-team@gmail.com</Text>
              </Text>
              <View style={styles.menuListContainer}>
          {listTeam1()}
          </View>
          <View style={styles.menuListContainer}>
          {listTeam2()}
            </View>
             <CustomRatingBar/>
             <Text style={{color:'white',fontSize:30,...FONTS.h2}}>
                 {defaultRating + '/'+ maxRating.length}
             </Text>
             <TouchableOpacity
               activeOpacity={0.7}
               style={{justifyContent:'center',alignItems:'center',backgroundColor:'#f7bd36',width:100,padding:15}}
               onPress={()=>rateUs()}
             >
                 <Text style={{color:'black',...FONTS.h3}}>➤ Send</Text>
             </TouchableOpacity>
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
      borderColor: '#ddd',
      borderBottomWidth: 0,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 1,
      marginLeft: 5,
      marginRight: 5,
      marginTop: 10,
    },
    listItemContainer:{
      backgroundColor:'red'
    },
    linearGradient: {
      flex: 1,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 18,
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      margin: 10,
      paddingTop:10,
      color: '#ffffff',
      backgroundColor: 'transparent',
    },
    menuListContainer:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5,
        padding:10
   
        
      },
   
})
export default Info;