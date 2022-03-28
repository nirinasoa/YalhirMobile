import React, {useState,useEffect} from "react";
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import {openDatabase} from 'react-native-sqlite-storage';
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    ImageBackground,
    Dimensions,
    ScrollView,
    Button,
    Alert,
     Modal, Pressable
    } from 'react-native';
import Axios from 'axios';
import { TextInput } from 'react-native-paper';
import { images, theme } from "../constants/";
import Ionicons from 'react-native-vector-icons/Ionicons';
//theme
const {COLORS, FONTS, SIZES} = theme;

const db = openDatabase({
    name:'yalhir',
})
const Admin = ({navigation}) =>{
  const [dateFin, setdateFin] = useState("")
  const [info, setInfoapp] = useState("")
const createTableUser =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS User (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username varchar(100),
          password varchar(100),
          isAdmin varchar(5)
        );
        `,[],
        (sqlTxn, res)=>{
          console.log('tables created successfully')
          Alert.alert("🎼Yalhir",`Tables User created successfully`)   
        },
        error =>{
          console.log('error on creating table' + error.message)
        }
      )
    })
    }
    const createTableArtist =() =>{
      db.transaction(txn => {
        txn.executeSql(
          `
          CREATE TABLE IF NOT EXISTS Artist (
            idArtist INTEGER PRIMARY KEY,
            username varchar(100),
            belongsTo varchar(50),
            photo varchar(100));
          `,[],
          (sqlTxn, res)=>{
            console.log('table Artist created successfully')
            Alert.alert("🎼Yalhir",`Tables Artist created successfully`)   
          },
          error =>{
            console.log('error on creating table' + error.message)
          }
        )
      })
      }
      const createTableSong =() =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            CREATE TABLE IF NOT EXISTS Song (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              idArtist INTEGER,
              title varchar(100),
              isFavorite varchar(10),
              link varchar (50),
              yearProduction varchar(10),
              refrain varchar(10),
              orderSong varchar(50),
              paragraph1 TEXT,
              paragraph2 TEXT,
              paragraph3 TEXT,
              paragraph4 TEXT,
              paragraph5 TEXT,
              paragraph6 TEXT);
            `,[],
            (sqlTxn, res)=>{
              console.log('table Song created successfully')
              Alert.alert("🎼Yalhir",`Tables Song created successfully`)   
            },
            error =>{
              console.log('error on creating table' + error.message)
            }
          )
        })
        }
    const dropTables =(nomTable) =>{
      db.transaction(txn => {
        txn.executeSql(
          `
          DROP TABLE ${nomTable}
          `,[],
          (sqlTxn, res)=>{
            console.log(`table ${nomTable} droped successfully`)
            Alert.alert("🎼Yalhir",`All ${nomTable} droped successfully`)   
          },
          error =>{
            console.log('error on dropping table' + error.message)
          }
        )
      })
    }
    const getSong =() =>{
        db.transaction(txn => {
          txn.executeSql(
            `
            SELECT * from Song ORDER BY id desc
            `,[],
            (sqlTxn, res)=>{
              console.log('Song retrieved successfully');
              let len = res.rows.length;
              if(len>0){
                let results = [];
                for (let i = 0; i < len; i++) {
                  // console.log(res.rows.item(i))
                 let item = res.rows.item(i);
                 results.push({
                   id:item.id,
                   title:item.title
                 })
                  
                }
              }
            },
            error =>{
              console.log('error on displaying table ' + error.message)
            }
          )
        })
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
                    // console.log(res.rows.item(i))
                   let item = res.rows.item(i);
                   results.push({
                     id:item.id,
                     title:item.title
                   }) 
                  } 
                }
              },
              error =>{
                console.log('error on displaying table ' + error.message)
              }
            )
          })
    }
    const getUser =() =>{
      db.transaction(txn => {
        txn.executeSql(
          `
          SELECT * from User
          `,[],
          (sqlTxn, res)=>{
         
            let len = res.rows.length;
            if(len>0){
              let results = [];
              for (let i = 0; i < len; i++) {
               let item = res.rows.item(i);
               results.push({
                 id:item.id,
                 username:item.username,
                 password:item.password,
                 isAdmin:item.isAdmin
               })            
              }
            }
          },
          error =>{
            console.log('error on displaying table' + error.message)
          }
        )
      })
    }
    useEffect(() => {
           getInfoapp();
      }, [])
      const addArtist =(array) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
              INSERT INTO Artist (
                idArtist,
                username,
                belongsTo,
                photo
                )
                VALUES (?,?,?,?)
            `,array,
            (sqlTxn, res)=>{
              console.log(`${array} artist added successfully`)
            },
            error =>{
              console.log('error on creating table' + error.message)
            }
          )})
      }
      const addUser =(array) =>{
        //check if username, password exist, if yes ignore insert else insert it
        db.transaction(txn => {
          txn.executeSql(
            `
              INSERT INTO User (
                username,
                password,
                isAdmin
                )
                VALUES (?,?,?)
            `,array,
            (sqlTxn, res)=>{
              console.log(`${array} User added successfully`)
            },
            error =>{
              console.log('error on creating table' + error.message)
            }
          )})
      }
      const addConnexion =(array) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
              INSERT INTO Connexion (
                isconnected
                )
                VALUES (?)
            `,array,
            (sqlTxn, res)=>{
              console.log(`${array} Connexion added successfully`)
            },
            error =>{
              console.log('error on creating table' + error.message)
            }
          )})
      }
      const addSong =(arraySong) =>{
        db.transaction(txn => {
          txn.executeSql(
            `
              INSERT INTO Song (
                idArtist,
                title,
                isFavorite,
                link,
                yearProduction,
                refrain,
                orderSong,
                paragraph1,
                paragraph2,
                paragraph3,
                paragraph4,
                paragraph5,
                paragraph6
                )
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)
            `,arraySong,
            (sqlTxn, res)=>{
              console.log(`${arraySong} song added successfully`)
            },
            error =>{
              console.log('error on creating table' + error.message)
            }
          )})
      }
      const getListSong = (e) => {
        Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/songs')
                    .then(response=>{
                      const list = response.data;
                     
                      list.map(item =>
                         {const arraySong = [
                          item.idArtist,
                          item.title,
                          item.isFavorite,
                          item.link,
                          item.yearProduction,
                          item.refrain,
                          item.orderSong,
                          item.paragraph1,
                          item.paragraph2,
                          item.paragraph3,
                          item.paragraph4,
                          item.paragraph5, 
                          item.paragraph6 
                        ]
                        db.transaction(txn => {
                        txn.executeSql(
                          `
                         SELECT  * FROM Song where title="${item.title}" and idArtist='${item.idArtist}' and orderSong='${item.orderSong}'
                          `,[],
                          (sqlTxn, res)=>{
                              let len = res.rows.length;
                              if(len == 0){
                                console.log('adding Song...')
                                addSong(arraySong)
                              }   
                              Alert.alert("🎼Yalhir","M à j Ok")                       
                          },
                          error =>{ console.log(error.message)}
                        )
                      })
                       }
                      )
                     
                     
            })
    };
    const getListArtist = () => {
      Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/artists')
                  .then(response=>{
                    const list = response.data;
                   
                    list.map(item =>
                       {const arrayArtist = [
                        item.idArtist,
                        item.username,
                        item.belongsTo,
                        item.photo
                      ]
                      db.transaction(txn => {
                        txn.executeSql(
                          `
                         SELECT  * FROM Artist where belongsTo='${item.belongsTo}' and username='${item.username}'
                          `,[],
                          (sqlTxn, res)=>{
                              let len = res.rows.length;
                              if(len == 0){
                                console.log('adding Artist...')
                                addArtist(arrayArtist)
                              }     
                              Alert.alert("🎼Yalhir","M à j Ok")                     
                          },
                          error =>{ console.log(error.message)}
                        )
                      })
                      
                    }
                    ) 
          })
    };
    const createTableInfoapp =() =>{
      db.transaction(txn => {
        txn.executeSql(
          `
          CREATE TABLE IF NOT EXISTS Infoapp (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            datefinApp DATETIME,
            info varchar(100)
          );
          `,[],
          (sqlTxn, res)=>{
            console.log('table Infoapp created successfully')
          },
          error =>{
            console.log('error on creating table' + error.message)
          }
        )
        })
    }
    const addInfoapp =(array) =>{
      db.transaction(txn => {
        txn.executeSql(
          `
            INSERT INTO Infoapp (
              datefinApp,
              info
              )
              VALUES (?,?)
          `,array,
          (sqlTxn, res)=>{
            console.log(`${array} Infoapp added successfully`)
          },
          error =>{
            console.log('error on creating table' + error.message)
          }
        )})
    }
    function updateInfoapp(datefinApp){
      db.transaction(txn => {
          txn.executeSql(
           `
             Update Infoapp set datefinApp='${datefinApp}' where id=1
              `,[],
              (sqlTxn, res)=>{
                  Alert.alert("M à J, ok")
              },
              error =>{
                console.log('error on updating table' + error.message)
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
                 results.push({
                   id:item.id,
                   datefinApp:item.datefinApp,
                 })            
                }
                console.log(results)
                setInfoapp(results)
              }
                                   
          },
          error =>{ console.log(error.message)}
        )
      })  
     }
    function save(){
      updateInfoapp(dateFin)
      getInfoapp()
    }
    const getListUserAPI = () => {
      Axios.get('https://yalhir-nodejs-mongodb.herokuapp.com/users')
                  .then(response=>{
                    const list = response.data;
                   
                    list.map(item =>
                       {const arrayArtist = [
                        item.username,
                        item.password,
                        item.isAdmin
                      ]
                      //  console.log(arrayArtist)
                      db.transaction(txn => {
                        txn.executeSql(
                          `
                         SELECT  * FROM User where password='${item.password}' and username='${item.username}'
                          `,[],
                          (sqlTxn, res)=>{
                              let len = res.rows.length;
                              if(len == 0){
                                console.log('adding User...')
                                addUser(arrayArtist)
                              } 
                              Alert.alert("🎼Yalhir","M à j Ok")                      
                          },
                          error =>{ console.log(error.message)}
                        )
                      })
                    }
                    ) 
          })
    };
    return (
       <SafeAreaView style={{flex:1,backgroundColor:'#ffffff'}}>
           <Text style={{marginLeft:100,marginTop:2,fontSize:25,justifyContent:'center',fontWeight:'bold'}}>Page for Yaldot team:</Text>
           {info? info.map((l, i) => (
                   <View  key={i}  style={styles.ViewDate}>
                     <Text style={{ fontSize:16,}}>Farany fampiasana ity App ity:</Text>
                     <Text style={{ fontWeight:'bold',}} > {l.datefinApp}</Text> 
                  </View>
                 )):<></>}
           <TextInput
                    label="Date Fin"
                    style={styles.input}
                    placeholder="Date"
                    defaultValue={dateFin}
                    onChangeText={dateFin => setdateFin(dateFin)}
                    />
            <TouchableOpacity
                    shadowOpacity
                    shadowRadius
                    style={{
                    left:110,
                    right:0,
                    width:150,
                    height:40,
                    justifyContent:'center',
                    paddingLeft:50,
                   borderRadius:10,
                    backgroundColor:'#2f72ed',
                    padding:10
                    }}
                  onPress={()=>save()}>
                   <Text style={{...FONTS.h3,color: COLORS.white}}>Save</Text>
                </TouchableOpacity>
                <Text style={{...FONTS.h3,color: COLORS.black,marginLeft:50}}>Artist</Text>
                <Text style={{color:'#b9bcbd',marginLeft:50}}> ──────────────────────────────</Text>
                <View style={styles.menuListContainer}>
                    <TouchableHighlight  activeOpacity={0.8}
                      underlayColor='#f7bd36'
                      onPress={()=>getListArtist()}>
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
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                    
                      onPress={()=>dropTables('Artist')}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="trash"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Delete all</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                      onPress={()=>createTableArtist()}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="add"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Create</Text>
                    </View>
                    </TouchableHighlight>
                </View>
                <Text style={{...FONTS.h3,color: COLORS.black,marginLeft:50}}>Lyrics</Text>
                <Text style={{color:'#b9bcbd',marginLeft:50}}> ──────────────────────────────</Text>
                <View style={styles.menuListContainer}>
                    <TouchableHighlight  activeOpacity={0.8}
                      underlayColor='#f7bd36'
                      onPress={()=>getListSong()}>
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
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                    
                      onPress={()=>dropTables('Song')}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="trash"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Delete all</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                      onPress={()=>createTableSong()}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="add"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Create</Text>
                    </View>
                    </TouchableHighlight>
                </View>
                <Text style={{...FONTS.h3,color: COLORS.black,marginLeft:50}}>User</Text>
                <Text style={{color:'#b9bcbd',marginLeft:50}}> ──────────────────────────────</Text>
                <View style={styles.menuListContainer}>
                    <TouchableHighlight  activeOpacity={0.8}
                      underlayColor='#f7bd36'
                      onPress={()=>getListUserAPI()}>
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
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                    
                      onPress={()=>dropTables('User')}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="trash"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Delete all</Text>
                    </View>
                    </TouchableHighlight>
                    <TouchableHighlight  activeOpacity={0.8}
                    underlayColor='#f7bd36'
                      onPress={()=>createTableUser()}>
                      <View
                      style={styles.menuBtn}>
                          <View  style={styles.menuBtnImgIcon}>
                            <Ionicons
                              testID="nextButton"
                              name="add"
                              color='black'
                              size={24}
                            />
                        </View>
                      <Text style={styles.btnText}>Create</Text>
                    </View>
                    </TouchableHighlight>
                </View>
               
       </SafeAreaView>
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
      height:32,
      padding:10
      
  },
  ViewDate:{
      alignItems:'center',
      justifyContent:'center',
     padding:20,
      backgroundColor:'#ffffff',
  },
  button:{
    padding:5,
    height:35,

  },
  menuListContainer:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    borderBottomLeftRadius:30,
    borderBottomRightRadius:30,
    backgroundColor:'#ffffff',
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

  },
  btnText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
    marginTop: 2,
    fontWeight:'bold'
  },
})
export default Admin;