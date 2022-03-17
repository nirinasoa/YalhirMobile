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
import { View, ScrollView} from 'react-native';
import Axios from 'axios';

//Screens
import { OnBoarding } from './app/screens';
import Login from './app/screens/Login';
import Home from './app/screens/Home';
import FicheItem from './app/screens/FicheItem';
import Song from './app/screens/Song';
import Menu from './app/screens/Menu';
import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase({
  name:'yalhir',
})
const Stack = createStackNavigator();

const App = () =>{
  const [songs, setSong] = useState("")
  const createTables =() =>{
  db.transaction(txn => {
    txn.executeSql(
      `
      CREATE TABLE IF NOT EXISTS Artist (
        idArtist INTEGER PRIMARY KEY,
        username varchar(100),
        belongsTo varchar(50),
        photo varchar(100));
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
        console.log('table Artist created successfully')
      },
      error =>{
        console.log('error on creating table' + error.message)
      }
    )
  })
  }
  const dropTables =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        DROP TABLE Artist
        `,[],
        (sqlTxn, res)=>{
          console.log('table Artist droped successfully')
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
                console.log(res.rows.item(i))
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
            console.log('error on dropping table' + error.message)
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
              console.log('error on dropping table' + error.message)
            }
          )
        })
        }
  useEffect(() => {
    //  dropTables();
    //  createTables();
    //  addSong();
    //  getListSong();
    //  getSong();

      // dropTables();
      //createTables();
      //getListArtist();
      getArtist();
    
    
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
                    addSong(arraySong)}
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
                  // console.log(arrayArtist)
                   addArtist(arrayArtist)
                }
                ) 
      })
};
  return (
    <NavigationContainer>
      <Stack.Navigator>
       <Stack.Screen  name="DrawerHome" component={Menu}options={{ headerShown: false }}/>
        <Stack.Screen name="OnBoarding" component={OnBoarding} options={{headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FicheItem" component={FicheItem} />
        <Stack.Screen name="Song" component={Song} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}


export default () =>{
  return <App/>;
};
