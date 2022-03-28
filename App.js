/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Axios from 'axios';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import { OnBoarding } from './app/screens';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import FicheItem from './app/screens/FicheItem';
import Song from './app/screens/Song';
import Menu from './app/screens/Menu';
import {openDatabase} from 'react-native-sqlite-storage';
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
import Admin from './app/screens/Admin';
const db = openDatabase({
  name:'yalhir',
})
const Stack = createStackNavigator();

const App = ({navigation}) =>{
  const [songs, setSong] = useState("")
  const [users, setUser] = useState("")
  const [session, setSession] = useState("")
  const [isConnected, setConnexion] = useState("")
  const [modalVisible, setModalVisible] = useState(false);
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
      },
      error =>{
        console.log('error on creating table' + error.message)
      }
    )
  })
  }
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
           Update Infoapp set star='${datefinApp}' where id=1
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
  const createTableRateUs =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS RateUs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          star varchar(10)
        );
        `,[],
        (sqlTxn, res)=>{
          console.log('tables Rateus created successfully')
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
             
              setSong(results)
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
                setSong(results)
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
            setUser(results)
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
  const getRateUs =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        SELECT * from RateUs
        `,[],
        (sqlTxn, res)=>{
       
          let len = res.rows.length;
          if(len <=0){
                addRateUs('1')
                console.log('created')             
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
  const getInfoapp =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        SELECT * from Infoapp
        `,[],
        (sqlTxn, res)=>{
       
          let len = res.rows.length;
          if(len <=0){
                addInfoapp('2022-05-05')
                console.log('created')             
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
       
  useEffect(() => {
    //  dropTables();
     
    //  addSong();
    //  getListSong();
    //  getSong();

      // dropTables();
      //  dropTables('User');
       createTableUser();
       createTableInfoapp();
      /* createTableArtist();
       createTableSong();*/
       getListUserAPI();
       getUser();
       getInfoapp();
       
      /* getListArtist();
         getArtist();
         getListSong();
         getSong();*/
        
         /*dropTables('RateUs');
          createTableRateUs();
          getRateUs()*/
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
  const addRateUs =(array) =>{
    db.transaction(txn => {
      txn.executeSql(
        `
          INSERT INTO RateUs (
            star
            )
            VALUES ('1')
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
                      },
                      error =>{ console.log(error.message)}
                    )
                  })
                  
                }
                ) 
      })
};
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
                      },
                      error =>{ console.log(error.message)}
                    )
                  })
                }
                ) 
      })
};
  return ( 
    <NavigationContainer>
        <Modal
        style={styles.modalContainer}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable  onPress={() => {
          navigation.navigate({ routeName: "Login" });
        }}>
              <Text style={styles.modalText}>Mpamorona</Text>
            </Pressable>
          
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}><Ionicons
           style={[styles.button, styles.buttonOpen]}
           name="close"
           color="black"
           size={20}></Ionicons></Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Stack.Navigator initialRouteName="OnBoarding" >
         <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />

        <Stack.Screen  name="DrawerHome" component={Menu} options={{ headerShown: false }}/>   
        <Stack.Screen name="FicheItem" component={FicheItem} 
        options={{
          title: 'Hira', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          },
          headerRight: () =>   <Ionicons
          style={[styles.button, styles.buttonOpen]}
          testID="nextButton"
          name="keypad"
          color="black"
          onPress={() => setModalVisible(true)}
          size={24}
           />,
        }}
        />
        <Stack.Screen name="Song" component={Song}
         options={{
          title: 'Hira', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          },
           headerRight: () =>   <Ionicons
           style={[styles.button, styles.buttonOpen]}
           testID="nextButton"
           name="keypad"
           color="black"
           onPress={() => setModalVisible(true)}
           size={24}
           />,
        }}
        /> 
         <Stack.Screen name="Admin" options={{
          headerStyle: {
            backgroundColor: '#2f72ed', //Set Header color
          },
          headerRight: () =>   <Ionicons
          style={[styles.button, styles.buttonOpen]}
          testID="nextButton"
          name="keypad"
          color="black"
          onPress={() => setModalVisible(true)}
          size={24}
           />,
        }} component={Admin}/>
      </Stack.Navigator>
    </NavigationContainer>

  )
}

const styles = StyleSheet.create({
  icon: {
      flex:1,
      justifyContent: 'center',
      alignItems:'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
  },
  buttonOpen: {
   
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalContainer: {
    alignItems: "flex-end",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    width:200,
    marginLeft:200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
})
export default () =>{
  return <App/>;
};
