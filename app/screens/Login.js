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
    Button,
    Alert
    } from 'react-native';
import { TextInput } from 'react-native-paper';
import { images, theme } from "../constants/";
import {openDatabase} from 'react-native-sqlite-storage';

//theme
const {COLORS, FONTS, SIZES} = theme;

const db = openDatabase({
    name:'yalhir',
})
const Login = ({ navigation }) =>{
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [info, setInfoapp] = useState("")
    useEffect(() => {
      getInfoapp()
        AsyncStorage.getItem('@login').then((value) =>{

            console.log(value)
          })
    }, [])
    const updateConnexion =() =>{
        db.transaction(txn => {
          txn.executeSql(
            `
           Update Connexion set isconnected='1' where id=1
            `,[],
            (sqlTxn, res)=>{
              console.log(`table updated successfully`)
            },
            error =>{
              console.log('error on updating table' + error.message)
            }
          )
        })
    }
    const checkLogin =(password) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
           SELECT  * FROM User where password='${password}'
            `,[],
            (sqlTxn, res)=>{
                let len = res.rows.length;
                if(len>0){
                    return 1
                }else{
                   return 0
                }
            },
            error =>{
               return 0
            }
          )
        })
        }
        function getInfoapp(){
          db.transaction(txn => {
            txn.executeSql(
              `
             SELECT  * FROM Infoapp
              `,[],
              (sqlTxn, res)=>{
                  let len = res.rows.length;
                  
                  if(len>0){
                    let results = [];
                    for (let i = 0; i < len; i++) {
                     let item = res.rows.item(i);
                     console.log(item)
                     results.push({
                       id:item.id,
                       datefinApp:item.datefinApp,
                     })            
                    }
                    setInfoapp(results)
                  }
                                       
              },
              error =>{ console.log(error.message)}
            )
          })  
         }
    function home(){
        db.transaction(txn => {
            txn.executeSql(
              `
             SELECT  * FROM User where password='${password}'
              `,[],
              (sqlTxn, res)=>{
                  let len = res.rows.length;
                  var today = new Date();
                  var dd = String(today.getDate()).padStart(2, '0');
                  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                  var yyyy = today.getFullYear();

                  current_date = yyyy + '-' + mm + '-' + dd
                  last_date_app = info[0].datefinApp;
                  isAdmin = res.rows.item(0).isAdmin;
                  console.log('Is Admin='+isAdmin);
                  console.log('Date app = '+last_date_app);
                  console.log('Current Date  = '+current_date);

                  var date2 = new Date('2022-03-28');
                  console.log('date2  = '+date2);
                  if(len>0 && current_date<=last_date_app && isAdmin==0){
                     AsyncStorage.setItem('@isAdmin',isAdmin)
                     console.log('user tsotra');
                     navigation.navigate('DrawerHome');
                  }
                  else if(len>0 && isAdmin==1){
                    AsyncStorage.setItem('@isAdmin',isAdmin)
                    console.log('is Admin logged in');
                    navigation.navigate('DrawerHome');
                  }
                  else{
                    Alert.alert(
                      "🎼Yalhir","Diso ny code izay nosoratanao (҂◡_◡). Manotania ny tomponandraikitra raha misy olana.Todah!"
                      );
                      navigation.navigate('Login');
                  }
              },
              error =>{
                Alert.alert(
                  "🎼Yalhir","Diso ny code izay nosoratanao"
                  );
              }
            )
          })
      
  
    }
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#f2c750'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/loginBackground2.jpg")}
             style={{height:Dimensions.get('window').height/2.5}}
             
             />
             <View style={styles.bottomView}>
                <View style={{padding:50}}>
                    <Text style={{ ...FONTS.h2,fontSize:27,color: COLORS.black}}>Welcome to Yalhir </Text>
                    <Text style={{ ...FONTS.body3,color: COLORS.gray}}>Hodu la Adonai ki tov   <Text style={{fontSize:18}}>הודו לה יהוהכי טוב </Text></Text>
                    <Text style={{ ...FONTS.body3,color: COLORS.gray}}>Ki leolam hasdo      <Text style={{fontSize:18}}>כִּי לְעוֹלָם חַסְדּוֹ</Text></Text>
                </View> 
                <View style={{left:50}}>
                    <Text style={{ ...FONTS.h3,color: COLORS.gray}}>Ampidiro eto ny code</Text>
                </View> 
                <View style={{padding:10}}>
                    <TextInput
                    label="Password"
                    style={styles.input}
                    placeholder="password"
                    secureTextEntry={true}
                    defaultValue={password}
                    onChangeText={password => setPassword(password)}
                    />
                    <View style={styles.button}>
                    <TouchableOpacity
                    shadowOpacity
                    shadowRadius
                  
                    style={{
                    left:110,
                    right:0,
                    width:150,
                    height:50,
                    justifyContent:'center',
                    borderTopStartRadius:10,
                    paddingLeft:50,
                    borderBottomEndRadius:10,
                    backgroundColor:'black',
                    }}
                onPress={()=>home()}
                >
                <Text style={{...FONTS.h3,color: COLORS.white}}>LOGIN</Text>
                </TouchableOpacity>
                    </View>
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
    input: {
        width:300,
        left:35,
        backgroundColor:'transparent',
        borderStartWidth : 2,
        borderEndWidth : 3,
        borderTopWidth : 1,
        boderLeftWidth: 2,
        borderRightWidth: 3,
        borderBottomWidth : 2,
        borderColor:'black'
        
    },
    bottomView:{
        flex:1.5,
        backgroundColor:'#f2c750',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60,
        
    },
    button:{
      padding:10,
    
 
    }
})
export default Login;