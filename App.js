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
  const createTableConnexion =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        CREATE TABLE IF NOT EXISTS Connexion (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          isConnected varchar(10)
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
          datefinApp DATETIME
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
            datefinApp
            )
            VALUES (?)
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
  const addFirstUser = () =>{
    const arrayUser = [
     'yalhir',
      '1351',
      '0'
    ]
    //  console.log(arrayArtist)
    db.transaction(txn => {
      txn.executeSql(
        `
       SELECT  * FROM User where password='1351' and username='yalhir'
        `,[],
        (sqlTxn, res)=>{
            let len = res.rows.length;
            if(len == 0){
              console.log('adding User...')
              addUser(arrayUser)
            }                       
        },
        error =>{ console.log(error.message)}
      )
    })
    const arrayUser2 = [
      'yalhir',
       '115626',
       '1'
     ]
     //  console.log(arrayArtist)
     db.transaction(txn => {
       txn.executeSql(
         `
        SELECT  * FROM User where password='115626' and username='yalhir'
         `,[],
         (sqlTxn, res)=>{
             let len = res.rows.length;
             if(len == 0){
               console.log('adding User...')
               addUser(arrayUser2)
             }                       
         },
         error =>{ console.log(error.message)}
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
          const array = [
           '2022-05-05'
           ]
          if(len <=0){
                addInfoapp(array)
                console.log('created')             
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
    
  const getConnexion =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        SELECT * from Connexion
        `,[],
        (sqlTxn, res)=>{
       
          let len = res.rows.length;
          const array = [
           '1'
           ]
          if(len <=0){
                addConnexion(array)
                console.log('First use app created')             
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
  const addForTheFistTimeArtist =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        SELECT * from Artist
        `,[],
        (sqlTxn, res)=>{
       
          let len = res.rows.length;
          console.log('Taille Artist = '+len)
          const array = [
           '1'
           ]
          if(len <=0){
            db.transaction(txn => {
              txn.executeSql(
                `
                INSERT INTO Artist (idArtist,username,belongsTo,photo)VALUES
                (8,"Iaakov","Yeladim",""),
                (3,"Poopy","Yeladim","poopy.jpg"),
                (2,"Ndriana","Yeladim","ndriana.jpg"),
                (1,"Ryvkah","Batim/Solo","ryvkah.jpg"),
                (7,"Yaldot","Yaldot","yaldot.jpg"),
                (6,"Toliara","Toliara","toliara.jpg"),
                (5,"Petoela","Yeladim","petoela.jpg"),
                (4,"Kefa","Yeladim","kefa.jpg")
                `,[],
                (sqlTxn, res)=>{
                  console.log('Artist created')             
                },
                error =>{
                  console.log('error on displaying table' + error.message)
                }
              )
            })          
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
  const addForTheFistTimeSong =() =>{
    db.transaction(txn => {
      txn.executeSql(
        `
        SELECT * from Song
        `,[],
        (sqlTxn, res)=>{
       
          let len = res.rows.length;
          console.log('Taille song = '+len)
          const array = [
           '1'
           ]
          if(len <=0){
            db.transaction(txn => {
              txn.executeSql(
                `
                INSERT INTO Song ( idArtist, title, isFavorite, link, yearProduction, refrain, orderSong, paragraph1, paragraph2, paragraph3, paragraph4, paragraph5, paragraph6 ) VALUES
                (6,"KI LEOLAM HASDO","0","","" ,"","P1,P2,P3","FANEKENA MANDRAKIZAY NATAONAO T@IREO RAZANAY DIA TSODRANO SY FITAKIANA IZAY NO NOMENAO HO LOVANAY IANAO ADONAI NO FAHAZAVAN'IZAO TONTOLO IZAO TSY HO KIVY AHO TSY HO RERAKA AHO FA HIANTSO NY ANARANAO. ADONAI Ô KADOSH IANAO. ","HANANDRATRA HIRA FIDERANA ETO AM-BAVAKO AHO HANAKOAKO MANERANA NY TANY REHETRA IZAY ITOERAKO SY IZAY ALEHAKO FA IANAO ADONAI TSY MIOVA MANDRAKIZAY KI LEOLAM HASDO MIDERA AN'I ADONAI FA TSARA IZY (TSARA IZY E!) MIDERA AN'I ELOHIM AVO INDRINDRA (AVO INDRINDRA IZY E!) MIDERA AN'I EL-SHADDAI (EL-SHADDAI) IZY NO MPANAO FAHAGAGAN-DEHIBE (IZY IRERY IHANY E!) IZAY NANAO NY LANITRA T@ FAHENDRENA (FAHENDRENA LEHIBEI) SY NY TANY HO AMBONIN'NY RANO (DERAINA IZY E!)","TAO ANATIN'NY 3 ARIVO TAONA NO VERY NY FIAINANAY NIANTSOANTSO IREO ANARANA MARO IZAY TSY FANTATRAY TSY NAVELANAO HO LANY RINGANA ISRAEL ZANAKAO FA NATSANGANAO MBA HO VELONA KA NAHALALA NY ANARANAO INDRAY ADONAI Ô HALELOIA.","","",""),
                (6,"SAMBATRA","0","","" ,"","P1,P2,P3,P4","I-SAMBATRA IZAHAY ADONAI FA MANANA ANAO HO RAJNAY TSY NANDAO ANAY IANAO KA VELONA INDRAY IZAHAY AO AMINAO. ","IANAO NO IANKINAKO ADONAI TSY HANAN-TAHOTRA @ FIAINAKO AHO METEZA HANADIO NY OTANANAY ZANAKAO FIANAO NO HERIKO HATRIZAY KA TSY ATAKALOKO MANDRAKIZAY ZANY NO FANIRIN'ITY FOKO MITALAHO","II-AVOTRA IZAHAY HAMASHIAH FA NY RA-NAO NAROTSAKAO TETY KA NAMOIZANAO NY AINAO FANEKENA VAOVAO HO AN'NY FANAHINAY.","III-MISAOTRA IZAHAY ELOHIM FA NOMENAO HERY TSY HO KIVY KA N'INON'INONA MISEHO OMEO FAHAKADOSHINA NY ISRAEL","",""),
                (6,"TSY MIOVA ADONAI","0","","" ,"","P1,P2,P3","FA NY FITIAVANAO ADONAI Ô NO NAMONJENAO ANAY TOY IZAO TSY MISY MAHAFAKA AMIN'NY TANANAO ELOHIM O IZA MOA NO TAHAKA ANAO? ","IANAO ILAY TSY MIOVA HATRAMIZAY IANAO IRERY ADONAI ANIO KA HO MANDRAKIZAY TENA SAMBATR'IZAHAY FA RAHA TSY INAO IESHUA EFA VERY IZAHAY NY RA NALATSAKAO NO FAMONJENA HO ANAY TODAH IESHUA FA AVOTR'IZAHAY","FA NY FANAHINAO ADONAI O NO MITARIKA ANAY HANAO NY SITRAKAO FA TSISY MIAFINA AMINAO ZAY REHETRA ATAO ELOHIM Ô TSY MISY TOA ANAO","","",""),
                (6,"NOVELOMINAO","0","","" ,"","P1,P2,P3,P4","NOMENAO ANAY RY RAY NY FITIAVANAO EFA NATOLOTRAO ANAY IHANY KOA IESHUA NY TENANAO FA FITIAVANA MAHARITRA MANDRAKIZAY TODAH 386 FA TANTERAKA AMINAY IZANY","NOVELOMINAO INDRAY ZAHAY TSY NAVELANAO HO VERY KA NATSANGANAO INDRAY 386 SATRIA IANAO NO EFA NITENY ADONAI O MAHERY IANAO MIARO ANAY MAMPITOLAGAGA AN'IZAO TONTOLO IZAO","NASEHONAE ANAY RY RAY NY FAHALEHIBIAZANAO FA TSY MISY MAHASAKANA IZAY REHETRA ATAONAO SAMBATR'ISRAEL VOAFIDY KA MIVERINA AMINAO TODAH IESHUA NANOME ANAY NY IRAKAO","NAVERINAO HO ANAY RY RAY IREO MOADINAO NAMPAHAFANTARINAO ADONAI O FA IANAO NO ELSHADDAI KA NAMOHA VARAVARANA HIDIRANAY TODAH IESHUA AROVY TSY HO VERY MIANDRY ANAO ZAHAY.","",""),
                (6,"FEREGNESO","0","","" ,"","P1, P2, P3, P4 ,P5","ADONAI O FEREGNESO ZAHAYE. AMINDRAO FO TY ANAKE FA KA ENGA, RAMBESO ANDESO ADONAI VONJEO TY HASAVEREGNAÄO E FA LAFA IHA RO MISAFA SY MAGNAFATSE LA MATAHOTSE ZAHAY ","ZAHAY TSY MAHITA LALA KOMBA LAHA TSY EO IHA BABA FA TSY HIMPOLY AMY TY RATY TSY HITOLIKE AFARA TSY HO TAVELA","MIFONA AHO BABA MAMELA TY HELOKO SAROMBAHO HAZOLAVA MIKAIKE ANAREO LONGO TSY HO TROBO","ADONAI HANJAKE IHA MOA MELOKE E LA MANGITIKITIKE MARE TY AINTEGNA MISOLOHO AMIÄO ZAHAY BABA ADONAI Ô MIBABOKE MITSAOKE E TY TOMBOÄO RAGNANDRIA MANGATAKE TY LIOÄO ZAHAY IESHUA HAMASHIAH","ADONAI Ö MISINISINY ZAHAYE MANAGNANAO HAMASHIAH MISIMOSIMO AVAO MITANTEHE HIAKATSE AGNY AMY RAQIA",""),
                (6,"FANEKENA VAOVAO","0","","" ,"","P1,P2,P3,P4","NANAO FANEKENA VAOVAO TAMIN'ISRAEL 65 TSY ARAKA NY FANEKENA NATAONAO TAMIN'IREO RAZANAY FA NY RA-NAO KADOSH IESHUA NO NAMONJENAO ANAY MIHAINO NY ANTSONAO","IESHUA Ô HIANTSO ANAO MANDRAKIZAY AHO NY ANARANAO IRERY IHANY NO HO TONONIN'NY VAVAKO NY FIDERANA ANAO TSY HISARAKA NY MOLOTRO MISANDRATA ANY AMIN'NY AVO INDRINDRA IANAO IESHUA HAMASHIAH ELOHEINU","MELEKH ISRAEL IANAO IRERY IESHUA O MANDRAKIZAY DORIA IANAO IRERY IHANY","NOSOKAFANAO NY MASOKO NAHITA NY MARINA AHO 65 KA TSY AFAKA ATO AN-TSAINA INTSONY NY TORAH-NAO ADONAI ELOHEINU NOSORATANAO ATO AM-POKO IZANY ELOHI O MITOERA ATO ANATIKO","",""),
                (6,"TIAKO IANAO IESHUA","0","","" ,"","P1,P2,P3,P4","ATOLOTRAY IESHUA NY ANDROM-PIAINANAY HO ANAO AVOKOA HANOMPO ANAO HO DORIA VONJEO RE ZAHAY FA IANAO NO HAMASHIAH","TSY HISARAKA AMINAO MANDRAKIZAY IZANY NO EFA TANJONAY SATRIA FANTATRAY FA RAHA AO AMINAO DIA TSY HO VERY IZAHAY","TIAKO IANAO IESHUA FA TENA TSARA TOKOA TSY MISY AFA TSY LANAO NO FIAINAKO IANAO NO TOKIKO HERY FIAROVAKO TSY HATAHOTRA AHO F'IANAO NO ELOHI","ASANDRATRAY IESHUA NY HIRANAY HO AN'I ELOHEINU NAFOINAO HO ANAY NY AINAO NY FITIAVANAO TSY MANAM-PAHAROA","",""),
                (6,"DAVAR","0","","" ,"","P1,P2,P3,P4,P5","NY DAVAR FAMONJEANA ANAY NAVERINA TSY NAFENIN'I ADONAI TAMIN'NY LOVANY DIA TARANAK'I IAAKOV VAHOAKA VOAFIDINY","ADONAI O SAMBATRA IZAHAY IZAY NATAONAO MANANA ANJARA ANJARA FANOMPOANA AO AMINAO NATAONAO HO ANAY MANDRAKIZAY(ADONAI)","NOSOKAFANAO NY VARAVARANA KA NOMENAO ANAY NY FAMPIANARANA IZAY TSY AVY AMIN' OLONA TSY HITA NA AIZA NA AIZA RAHA TSY AMIN'NY ZANAK'OLONA","VELONA NY HOBY MIDOBODOBOKA NY APONGA TSOFINA NY ANJOMARA NY VALIHA KOA SY LOKANGA","MIDERA ANAO IZAHAY ADONAI AMIN'NY ZAVA-MANENO IZAY FANTATRAY FIFALIANA MANDRAKIZAY ADONAI SAMBATR'IZAHAY ADONAI MANANA ANAO ADONAI ",""),
                (6,"TODAH IESHUA","0","","" ,"","P1,P2,P3","MBA TSAROANAO TOKOA VE? NY FAMONJEN'I ADONAI ANAO IANAO ZAY TSINOTSINONA HATRIZAY NANDEHA TAMIN'NY NAHIMPONAO SY NY FOMBA FIAINAN'NY IZAO TONTOLO IZAO FA RAHATRIZAY DIA FIAINANA MANDRAKIZAY ","TODAH IESHUA NIFIDY ANAY TSY NANARY ANAY TODAH JESHUA MANITSY SY MAMPIANATRA ANAY TSY MAMALY ANAY ARAKA NY FAHARATSIANAY FA MAMINDRA FO MAMELA NY HELOKAY","MBA AZONAO AN-TSAINA VE ? IZAY NIARETAN'I IESHUA HAMASHIAH FANGIRIFIRIANA SY FAMPUALIANA NANAIKY HATRAMIN'NY FAHAFATESANA HO FAMONJENA ANTSIKA TARANAK'I IAAKOV HO MPANDOVA NY TENY FIKASANA","","",""),
                (6,"Mahery Elohim","0","","" ,"","P1,P2,P3","MAHERY E ELOHIM MPAMONJY SY MPANAVOTRA ANAY MIARO AMIN'IZAY ALEHANAY REHETRA TSY MAMALY ARAKY NY HELOKAY MANITSY SY MAMPIANATRA ANAY HIZORANAY AMIN'NY LALANY FAHAMARINANA","TODAH IESHUA HAMASHIAH BE FAMINDRAMPO SY FIANTRANA IANAO MAMELA NY HELOKAY REHETRA MAHAY MANASITRANA NY ARETINAY IANAO HANOMPO ANAO IZAHAY ADONAI","DERAINA ANIE ELOHEINU MIHAINO SY MAMALY VAVAKAY MANOME IZAY ANGATAHINAY REHETRA TSY MANDATSA FA MANANATRA ANAY MAMELOMBELONA NY FINOANA HANANANAY FANANTENANA NY AMIN'NY FARANY +","","",""),
                (6,"BERESHIT","0","","" ,"","P1,P2,P3,P4","TAMIN'NY VOALOHANY ELOHIM RAHA NAHARY NY LANITRA SY NY TANY SY IZAY REHETRA AO AMINY (IZAO TONTOLO IZAO) DIA EFA VOALAZANY TAMIN IZANY FA NY ANDRO 6 NATAO HIASANA NY FAHA 7 FITSAHARANA F'ZA ANEFA NO TSY MAHALALA F'IZANY ANDRO IZANY DIA EFA NAMBARA DIA NY ANDRO SABATA?","NAMPAHAFANTARINAO ANAY ADONAI NY LALANA MANKANY, ANY AMINAO ANY AN-DANITRA ANY DERAINA ANIE IANAO 86 ADONAI ZAY TENA TIA ANAY, SAMBATR'IZAHAY MANANA ANAO","ARY ISAN-TSABATA SY VOALOHAM-BOLANA DIA HO AVY NY NOFO REHETRA HIANKOHOKA EO ANATREHAKO (HOY ADONAI) DIA EFA VOASORATRA TAMIN'IZANY IREO DIDY SY FITSIKA REHETRA IZAY TSY MAINTSY HO TANDREMANA F'IZA ANEFA NO TSY NAHARE FIREO ANDRO IREO DIA ANDRO KADOSH FA TSY IZAY TIANA HALEHA?","FA HOY ADONAI TAMIN'I MOSHEH TENENO AMIN'IREO ZANAK'ISARAEL FOTOAM-PIVAVAHANA VOATENDRIKO (HOY ADONAI) DIA EFA NANOMBOKA TAMIN'IZANY IREO RAZANAY NO NANAO MOAD 7 NO ISANY FIZA ANEFA NO MANANTENA FA HAHAZO AN'ILAY FAMONJENA TSY VOAVIDIM-BOLA NA KOA HARENA ?","",""),
                (4,"THLH 22","0","","" ,"P2","P1,P2,P3,P2","ELOHI O, MIANTSO AHO NOHO NY ANDRO NEFA TSY MAMALY IANAO ELOHI O ARY NOHON'NY ALINA NEFA TSY NAHITA FIONONANA ","KANEFA KADOSH IANAO RY MIPETRAKA EO AMBONIN'NY FIDERAN'ISRAEL(X2) ","HIANAO NO NITOKIAN'NY RAZANAY NATOKY IZY,KA NAMONJY AZY IANAO HIANAO NO NITARAINANY,KA AFAKA IZY HIANAO NO NITOKIANY KA TSY MENATRA IZY,KA TSY MENATRA IZY ","","",""),
                (1,"Bonbon","0","","" ,"P1","P1,P1,P2,P1,P3,P4","Makarary nify ny Bonbon ","Indrindra fa ny siramamy ","Dia lasa misy carie Dia lasa tsy misy nify Dia lasa goka nify Dia lasa tsy misy nify, tsy misy nify, tsy misy nify","Banga!","",""),
                (4,"THLH 127","0","","" ,"P3","P1,P2,P3,P4","RAHA TSY ADONAI NO MIAMBINA NO MANAO NY TRANO DIA MIASA FOANA NY MPANAO AZY, RAHA TSY ADONAI NO MIAMBINA NY TANANA,DIA MIARI-TORY FOANA ","ZAVA-POANA HO ANAREO NY MIFOHA MARAINA SY NY ALIM-PANDRY KA HOMANA NY HANINA AZO AMIN'NY FAHASAHIRANANA IZANY ANEFA DIA OMENY HO AN'NY MALALANY,NA DIA MATORY AZA IZY; ","INDRO LOVA AVY AMIN'ADONAI NY ZANAKA M1ARO TAMBY NY ATERIKY NY KIBO TAHAKA NY ZANA-TSIPIKA EO AN-TANAN'NY MAHERY NY ZANAKY NY FAHATANORANA ","SAMBATRA IZAY MAMENO NY TRANON-JANA-TSIPIKANY AMIN'IRENY; TSY HO MENATRA IRENY;RAHA MIFAMALY AMIN'NY FAHAVALO EO AM-BAVAHADY","",""),
                (1,"Taom-bavao","0","","" ,"P2","P1,P2,P2,P3,P2","Ny taom-baovao malagasy dia taom-baovao tokoa","Na inona na inona hanjo Tsy maintsy mijoro fa malagasy","Tafavory avokoa indray isika Ka toy ny fahiny indray","","",""),
                (1,"Maro ny taona vavao","0","","" ,"P3","P1,P2,P3,P4,P3","Maro ny taona vavao (X2) Fa ny Abib an'Israel ihany no miavaka ","Maro ny firenena Andeha hiakatra ho an' Ierushaleim","Ka tratran'ny taona (X2) Ka miharaba anareo manatrika eto","Avy tamin'Iehovah, ity Abib antsika anio ity","",""),
                (6,"AMPIANARO IZAHAY","0","","" ,"","P1,P2,P3","Mamelà anay Adonai hiantso ny anaranao Henoy ny fangatahanay sy ny feon'ny fitarainanay Fantatrao koa ny eritreritray, na dia tsy miloaka @ vavanay","Adonai ô ampianaro izahay Hahaizanay manompo anao Tariho amin'ny fahamarinanao Ireto ondry nofidinao","Tsy mba manana ahiahy intsony izahay F'ianao no andrandrainay Ianao no antenainay Hitondra anay miaraka aminao Any amy 'lay fitoerana namboarinao.","","",""),
                (6,"NY ANARANAO KADOSH","0","","" ,"","P1,P2,P3,P4","IEHOVAH ô Ianao no Rainay Elohim ehad tena maminay Manitsy sy mampianatra anay Mpamonjy (sy) mpanavotra anay"," Nomeneo anay ny anaranao kadosh Miaro anay amin'izay alehanay rehetra Eny n'aiza n'aiza misy anay Na mandry na matory Na mifoha aza izahay","IESHUA ô Mpanavotra anay Ianao no tokinay manantena anao zahay Arovy tsy hisy very na dia iray Hidera Anao mandrakizay ","Ireo fahavalo manenjika anay De lasa mirifatra mitsoaka","",""),
                (4,"THLH 10","0","","" ,"","P1,P2,P3,P4","ADONAI,NAHOANA NO MIJANONA ENY LAVITRA ENY IANAO KA MIERY AMIN'NY ANDRO FAHORIANA ","NOHO NY FIREHAREHAN'NY RATSY FANAHY DIA ENJEHINA MAFY NY MALAELO AZON'NY FAHENDRENA NATAONY IZY IRENY","MITSANGANA ADONAI O ELOHIM O ATSANGANO NY TANANAO AZA MANADINO NY ORY ","ADONAI NO MPANJAKA MANDRAKIZAY DORIA (X2)","",""),
                (4,"VELOMY NY DIDY","0","","" ,"P4","P1,P2,P3,P4,P5,P4,P6","DERAO IESHUA DERAO NY ANARANY FAHASOAVANA NO AMBARANY NY FAMONJENA DIA EFA EO ANTANANY KA OMENY HO ANTSIKA SAKAIZANY HO LOVA MANDRAKIZAY","VELOMY NY DIDY,NY DIDIN'IEHOVAH MATSIRO NY DIDY MAZAVA AMINTSIKA VELOMY NY DIDY NY TENIN'IEHOVAH MATSIRO NY DIDY FANILON'NY TONGOTRAO IESHUA NO FAHAZAVAN'IZAO TONTOLO IZAO MIPOSAKA AMINAO ","TANDREMO NY DIDY,NY DIDIN'IEHOVAH FA AINA NY DIDY MAMELONA ANTSIKA ARAHO NY DIDY,NY TENIN'IEHOVAH FA AINA NY DIDY HIVELOMANTSIKA IESHUA NO LALANA IZY NO AINA SY FAHAMARINANA VELOMY NY DIDY,NY DIDIN'IEHOVAH KADOSH NY DIDY TSARA SY MARINA VELOMY NY DIDY,NY DIDIN'IEHOVAH NY ANTONY DIDY DIA FITIAVANA AMIN'NY FO MADIO SATRIA IEHOVAH FITIAVANA ","NY TENINAO IESHUA NO MANDAKO NY TENINAO IESHUA NO FIALOFAKO MIARO NY LALAKO NY TENINAO IEHOVAH KA MAMELONA NY FANAHIKO SY HERY FIAROVANA HO AHY ","BERESHIT AHAIA DAVAR TAMIN'NY VOALOHANY NY TENY TAO AMIN'ELOHIM NY TENY ARY NY TENY DIA ELOHIM ARY NY TENY TONGA NOFO ","NY ANARAN'IESHUA NO DERAINA (NY ANARAN'ADONAI IHANY NO ASANDRATRA AMBON'NY TANY SATRIA ADONAI,IZY ELOHIM AVO INDRINDRA)2 KADOSH IEHOVAH KA ASANDRATRA,AVO INDRINDRA NY ANARAN'IESHUA IHANY NO FAMONJENA AMBON'NY TANY KADOSH IEHOVAH,KADOSH IEHOVAH ADONAI AVO INDRINDRA DERAO IESHUA,DERAO FOANA ADONAI MPAMONJY ANTSIKA"),
                (1,"Mahavariana","0","","2022" ,"P1","P1,P2,P1,P3","Mahavarina ny nifidiananao anay Elshadai fahatokisana ahoana loatra eh ","Hay nahita olona ianao hanao ny sitraponao! Mapatsiaro ilay fanekena tamin'i Abrahama Dia hoy ianao hoe: Izaho no Elshadai","Hay nahita olona ianao hanao ny sitraponao! Ekeko ny sitrakao fa ianao no Elshadai Fantatrao izay mety aminay","","",""),
                (1,"Izaho tsy hivoaka ny trano!","0","","" ,"P2","P1,P2,P3,P2,P4,P5,P6,P2","Izaho tsy hivokan'ny trano raha tsy mametraka aminao "," Izaho tsy hivokan'ny trano Elshadai","Izaho tsy hivokan'ny trano raha tsy momba ahy ianao Ieshua","Aleoko mijanona ao an-trano, dia sambatra èry Oh tsy lasa mihitsy ny petipetin'izao tontolo izao (2)","Izao tontolo izao anie Ieshua be fahotana sy rendrarendra ",""),
                (4,"Thlh 134","0","","" ,"P1","P1","ANDEHA, MISAORA AN'YHWH , IANAREO REHETRA MPANOMPON'YHWH , IZAY MITOETRA ALINA AO AN-TRANON'YHWH .[*NA: MISAORA AN'YHWH AMIN'NY ALINA] MANANDRATA NY TANANAREO HO AMIN'NY FITOERANA KADOSH*, KA MISAORA AN'YHWH .[NA: AMIN'NY FAHAKADOSHINA] HITAHY ANAO AVY AO ZIONA ANIE YHWH MPANAO NY LANITRA SY NY TANY.","","","","",""),
                (4,"Thlh 29 ","0","","" ,"","P1,P2,P3","MANOMEZA AN'YHWH , RY ZANAK' ELOHIM, ENY, MANOMEZA VONINAHITRA SY HERY HO AN'YHWH . ","OMEO AN'YHWH NY VONINAHITRY NY ANARANY; MIANKOHOFA EO ANATREHAN'YHWH AMIN'NY FIHAINGOANA KADOSH.","YHWH HANOME HERY NY OLONY; YHWH HITAHY NY OLONY AMIN'NY FIADANANA.","","",""),
                (3,"Miandrandra izahay","0","","" ,"","P1, P2, P3, P4 ,P5","IEHOVAH O, TENA MIANDRANDRA ANAO IZAHAY IANAO NO ELOHIM MANDRAKIZAY IANAO NO ADONAI, IANAO NO EL SHADAI","IANAO IEHOVAH O, NO MANANA NY FIAINANA MANDRAKIZAY NANAO FANEKENA TAMIN'NY RAZANAY IANAO NO NANANGANA ANAY","ILAY FANAHY IZAY NOMENAO HO ANAY NO MITARIKA ANAY HO AMIN'ILAY FIAINANA MANDRAKIZAY NOMANINAO HO MANDRAKIZAY NO HIDERANAY ANAO RAINAY IANAO RAINAY, HO MANDRAKIZAY AO AMINAO NY FIAINANAY","IANAO ADONAI MANITSY SY MAMPIANATRA ANAY MBA HANKATOAVANAY NY TENINAO TENY VELONA AVY AMINAO ANDEHANANAY TENA MAHITSY SY TENA MADIO HO ARA-PANAHY, HO TENA KADOSH TSY HANANA AHIAHY NY FITIAVANAO SY FAMINDRAM-PONAO HO ANAY MANDRAKIZAY","NY RA-NAO KADOSH NANADIOVANAO NY OTANAY, NANAFAKA ANAY NY FAMINDRAM-PONAO SY FITIAVANAO ANAY MANDRAKIZAY HO MANDRAKIZAY NO ISAORANAY ANAO ADONAI HO MANDRAKIZAY NO HIDERANAY NY ANARANAO EL SHADAI HO MANDRAKIZAY NY VONINAHITRAO ADONAI MANDRAKIZAY (MANDRAKIZAY) NO HIDERANAY NY ANARANAO (NO HIDERANAY ANAO)",""),
                (3,"Ampianaro izahay","0","","" ,"","P1, P2, P3, P4 ,P5","IZA MOA NO NANAM-PO FA MBOLA HISY IZAY HIALA INDRAY AMIN'I ADONAI KANEFA ANIE EFA VOASORATRA IZANY FA IZAY RATSY TSY HO TAFATOETRA AO","OMEO HERY IZAHAY O ADONAI MBA HANDRESENAY NY FAKAM-PANAHY IZAY MAMANDRIKA ISANANDRO ARY NY SANDRINAO NO IANTEHERANAY HAZONY MAFY IZAHAY ; EL SHADAI NY SANDRINAO NO TOKINAY","TSISY MAHALALA NY HO AMPITSO ISIKA IZAO FA AMIN'I ADONAI IZANY TSY MIAFINA IZY IRERY IHANY NO ANANKINANA NY HO AVIN'NY FIAINANA IZY NO MANOME IZAY MAHASOA ANAO","AMPIANARO ZAHAY O EL SHADAI HANDA NY TENANAY FA HANANDRATRA ANAO EO AMIN'NY FIAINANAY FA IZANY NO ANTOKA HO ANAY HO TONGA ANY AMINAO HO AKAIKY ANAO EL SHADAI","NY FIAINANAY MIANKINA AMINAO NY HO AVINAY AM-PELATANANAO",""),
                (3,"Tsy miova Elohim","0","","" ,"P3","P1,P2,P3,P4,P3,P5,P3"," NY VONINAHITRAO TSY OMENAO NY HAFA NOHO NY ANARANAO, NAMINDRANAO FO IZAHAY","NY TAONANAY NO HANDROSO ADONAI NY ANDRONAY METY HO TAPITRA TSY MISY IZAY MAHARITRA, FA IANAO IRERY NO TSY MIOVA MORA SIMBA IZAY ETY AN-TANY METY HO VERY ARY KOA METY HO LO TSY IZANY RAHATEO NO ANTENAINAY, FA IANAO ILAY TSY MIOVA "," NODIOVINAO IZAHAY, NOHO NY ANARANAO KA TSY HO FONGOTRA IZAHAY, NOHO NY TENINAO NY VONINAHITRAO…","NY TENINAO TSY MBA HO TSOAHANAO NY FANEKENAO NO HAMAFISINAO IANAO NO MANAO IZANY , KA IZA NO AHASAKANA?","EFA RATSY IZAO TONROLO IZAO ADONAI FENO FITAKA (2) NY ANDRO IAINANAY MIOVAOVA TS’ISY IZAY AZO ANTOKA FA AO AMINAO IHANY NO TSARA TSY MIOVA",""),
                (3,"Izay madio am-po","0","","" ,"","P1,P2,P3,P4,P5,P6","SAMBATRA IZAY MADIO AM-PO TSY MBA MITAHIRY LOLOM-PO TSY MITAHIRY ALAHELO AM-PO TSY TAFINTOHINA AMIN’NY TENY KOA, SAMBATRA","SAMBATRA IZAY MADIO AM-PO FA IZY NO AHITA AN’IESHUA LAPA ITOERAN’I ADONAI NY FONY NA SENDRA NY MAFY AZA IZY DIA HO TONY","SATRIA ADONAI NO MPITARIKA MARINA TSY HAMELA AZY HANDEHA HIVARINA SAMBATRA IZAY, MADIO AM-PO FA IZY NO HAHITA AN’IESHUA, SAMBATRA","SAMBATRA IZAY MADIO AM-PO FA MAHATANTERAKA NY SITRAPON’IESHUA TSY MORA TEZITRA, ZATRA MANDEFITRA NEFA TSY MIHEVITRA ZAY RATSY KOA","TSY TIA ADIADY FA VAO MAINKA KOSA MANDRAVONA NY RATSY IZAY MITADY HIAVOSA NY TENIN’IESHUA IHANY NO FANILONY KA TSY MBA HO FATY NY JJIRONY","SAMBATRA IZAY MADIO AM-PO FA IZY IHANY NO HAHITA AN’IESHUA"),
                (3,"Fanahy tsara","0","","" ,"","P1,P2,P3,P4","SAMBATRA NY OLONA IZAY VOAVELA NY HELONY SY VOASARONA NY FAHOTANY TENA SAMBATRA NY OLONA IZAY TSY ISAIN'I ADONAI HELOKA ARY TSY MISY FITAKA NY FANAHINY","AMIN'NY ANDRO AHITANA AN'I ADONAI AOKA HIVAVAKA AMINY NY TSARA FANAHY F'IZY IRERY NO TSARA, MPANAO NY TSARA ARY AOKA TS'ISY HO AFENINA AMINY NY HELOTSIKA F'IZY IRERY NO AFAKA MANAVOTRA ANTSIKA IZAY TENA MATOKY AN'I ADONAI DIA AROVANY","FA NY RATSY FANAHY DIA HO BE FANANINTAINANA KA MATAHORA AN'I ADONAI ISIKA OLONY O O O O MIFALIA AMIN'I ADONAI RAVORAVOA RY OLO-MARINA HOBIO ADONAI RY MAHITSY FO, RY MAHITSY FO REHETRA","SAMBATRA NY OLONA IZAY VOAVELA NY HELONY (SAMBATRA NY OLONY)","",""),
                (3,"Az nitslav Ben Elohim","0","","" ,"P3","P1,P2,P3,P4,P3","AZ NITSLAV BEN ELOHIM, IESHUA HAMASHIAH BEN ELOHIM NANGINA IESHUA KA TSY NITENY, RAHA NANDA AZY NY IRAY FIRENENY MBA HO FANAVOTANA NY MARO DIA NATOLONY NY TENANY NANANAN'IESHUA NY FAHEFANA, NEFA NAVELANY HANOLOTRA AZY IREO FARISEO SY MPANORA-DALANA ARY DIA NOHOMBOIN'IZY IREO IESHUA","NOHO NY FITIAVANY ANTSIKA, NOHESOINA IZY, VOARORA, VOAKAPOKA ARY NASIAN'IREO SATROKA, DIA SATROKA TSILO NOTEVATEVAINA, NAHETRY IZY NATAO TOY NY FARAIDINY AZ NITSLAV BEN ELOHIM IESHUA HAMASHIAH","TODAH IESHUA, FA TENA NORAISINAO NY OZONA TOKONY HO ANJARANAY, SATRIA ANAY NY OTA NEFA IANAO DIA NISOLO TENA ANAY TAMIN'IZANY NANETRY TENA ELOHIM, IESHUA HAMASHIAH BEN ELOHIM TENY TONGA NOFO IESHUA, IESHUA HAMASHIAH BEN ELOHIM","NA MARO IREO MPANARAKA AZY, TSY NISY NIARO AZY NANAO TAZAN-DAVITRA FOTSINY TENY IHANY NY MPIANANY AZA DIA NISY NANDA AZY, SOA F'EFA FANTANY IESHUA HAMASHIAH O, TODAH NIARETANAO NA NANDROTIKA AZA NY KAPOKA, FANASITRANANA HO ANAY MIBABOKA FA NOHOMBOINA IANAO NOHO NY HELOKAY","",""),
                (3,"Aza matahotra","0","","" ,"P4","P1,P2,P1,P3,P4,P5,P4","TY NY FANEKENA RAISO FA HO ANAO IZANY (2) HO ANAO IZANY RY IAAKOV, ILAY TIAN'I ELOHIM (2)","AZA MATAHOTRA IANAO RY ISRAEL F'EFA NANAVOTRA ANAO ADONAI EFA NIANTSO NY ANARANAO IZY EFA NATOKANY HO AZY IANAO MIFALIA","AZA MATAHOTRA IANAO RY ISRAEL FA IANAO IHANY NO HENOIN'I ADONAI AO AMINAO IHANY NO TONGA NY TENIN'I ADONAI HO ANAO IHANY NO NIDINANY TETY","ADONAI IRERY NO ELOHIM ARY TSY MISY HAFA ANKOATRA AZY ADONAI NO MPAMONJY ARY IZY IRERY NO MARINA ADONAI IRERY NO ELOHIM ANDOHALIHAN'IZAO TONTOLO IZAO AO AMINY IRERY KOA NO AHAZOANTSIKA HERY MATOKIA RY ISRAEL","ILAY MAHERIN'IAAKOV NO MPAMONJY ANAO NY FANEKENY EFA NATOLONY HO ANAO",""),
                (3,"Fiarovana Avo","0","","" ,"","P1,P2,P3,P4,P5,P4","IZAHAY HIHIRA (2), NY HERINAO ADONAI ARY HIHOBY NY FAMIN-DRAM-PONAO NOHO NY MARAINA SATRIA FIAROVANA AVO HO ANAY IANAO ADONAI ARY FANDOSIRANAY AMIN'NY ANDRO FAHORIANA RY HERINAY, IANAO NO ANKALAZAINAY FA ELOHIM NO FIAROVANA HO ANAY DIA ELOHIM IZAY MAMINDRA FO AMINAY (2)","ZAHAY (MATOKY)2 NY FAMINDRAM-PONAO ADONAI ARY HIFALY AMIN'NY FAMPONJENAO NY FONAY KA (VELON-KIRA)2 HO ANAO IZAHAY ADONAI MANDRKARIVA DIA NY SOA NO OMENAO ANAY ZAHAY HIDERA (2) NY FAHAMARINANAO ADONAI ARY HANKALAZA (2) NY HATSARANAO HO AKAIKINAO, EO AKAIKINAO NO MAHATSARA ANAY (2)","MBOLA HO FANTATR'IZAO REHETRA IZAO FA IANAO IRERY NO ELOHIM ILAY AVO INDRINDRA, AMBONIN'NY MPANJAKA REHETRA TSY MAINTSY HANAIKY IZAO TONTOLO IZAO FA IANAO IRERY NO ELOHIM IZAY AVO INDRINDRA, HITSARA NY ZAVA-DREHETRA","NA IREO MANDA ANAO AZA HANGAHIAHY TSY HO AFA-MIALA AKORY TSY HO AFA-MIALA (2) SATRIA IANAO NO HITSARA IZAHAY MAHATSIARO SAMBATRA FA NALAINAO HO AO AMBANY ELATRAO SATRIA IANAO (2) NO TOKINAY ADONAI","MANDRAKARIVA, DIA NY SOA NO OMENAO ANAY EO AKAIKINAO (2) NO MAHATSARA ANAY ARY FANDOSIRANAY AMIN'NY ANDRO FAHORIANA, DIA ELOHIM IZAY MAMINDRA FO AMINAY ELOHIM FIAROVANA AVO HO ANAY",""),
                (3,"Azafady aminao","0","","" ,"","P1,P2,P1,P3,P4,P5,P4,P1","AZAFADY AMINAO ZA, RAHA MAMPATSIAHY KELY FA MISY ANJELY MIHAINO SY MIJERY K'IZAY ATAO REHETRA DIA AMBARANY ANY AMBONY ANY ANY AMIN'NY RAY","SAMIA MANDINIKA ISIKA, NY LALANA IZAY ALEHANTSIKA MAHITSY VE? SA EFA NIVILY TSY NANKATO NY TENY HO AIZA NY DIANTSIKA? IERUSHALAIM VAOVAO HO AIZA NY TANJONTSIKA? IERUSHALAIM VAOVAO AMBOARY NY LALANTSIKA, HAHITSY ARAKA NY TENY AMBOARY NY LALANTSIKA MBA HO TONGA ANY","SAMIA MIHEZAKA ISIKA, HO TSARA FITONDRA NY TENANTSIKA IESHUA IRERY NO MAHALALA IZAY TENA MARINA","AZY NY FAHEFANA HANAMELOKA ANTSIKA IZY KOA NO AFAKA HAMELA INDRAY NY HELOTSIKA ARAHO NY TENIN'IESHUA MBA TSY HANDALO FITSARANA ARAHO NY TENIN'IESHUA FA FANAVOTANA IZANY","MITANDREMA, ARAHO NY TENIN'IESHUA REHEFA MANANATRA IZY MIAMBENA, ARAHO NY DIDIN'IESHUA RAHA TE HO ZANANY MIHEVERA MBA HO TSARA FIHAFARANA NY DIANTSIKA",""),
                (3,"Derainay 26 345","0","","" ,"","P1,P2,P3,P4,P5,P6","IEHOVAH O ! AVO INDRINDRA IANAO KADOSH INDRINDRA IANAO TSY MISY TOA ANAO MARINA INDRINDRA IANAO","IEHOVAH O ! IANAO NO EL SHADAI IANAO NO ADONAI IANAO NO RAINAY IANAO NO TOKINAY","MENDRIKA HODERAINA MANDRAKIZAY MENDRIKA ANKALAZAINA NY RAINAY TSY MISY ELOHIM AFA-TSY IANAO MANDRAKIZAY NY TANY SY NY LANITRA ANAO NY ZAVA-BOARY REHETRA KOA ANAO NY HABAKABAKA ANAO ANAO IRERY MANDRAKIZAY","IEHOVAH O ! MAMINDRA FO AMINAY MAMELA NY HELOKAY AVELAO RE IZAHAY HIDERA ANAO MANDRAKIZAY","SAROBIDY LOATRA NY FITIAVANAO ANAY ADONAI FA NATOLOTRAO NY TENANAO HAMONJY ANAY TSARA NY FITONDRANAO ANAY SATRIA TSARA HO ANAY NY FIHEVITRAO NY FIAINANAY","TSARA LOATRA NY FITIAVANAO ANAY MARINA LOATRA NY FITONDRANAO ZAHAY NO MBOLA ADALA TSY MENDRIKA ANAO MIFONA E ! NY FAMINDRAM-PONAO TSY MIALA AMINAY NY FITIAVANAO ANAY MANDRALIZA NO MBOLA AHAFAHANAY MIDERA ANAO TODAH ! (2)"),
                (4,"MIHOBIA HO AN'I ADONAI RY TANY REHETRA","0","","" ,"","P1,P2,P3,P4","MIHOBIA AN'I ADONAI RY TANY REHETRA, MANOMPOA AN'I ADONAI AMIN'NY FIFALIANA MANKANESA EO ANATREHANY AMIN'NY FIHOBIANA ","AOKA HO FANTATRAREO FA ADONAI NO ELOHIM IZY NO NANAO ANTSIKA ARY AZY ISIKA DIA OLONY SY ONDRY FIANDRINY ","MIDIRA EO AMIN'NY VAVAHADINY AMIN'NY FISAORANA ARY EO AN-KIANJANY AMIN'NY FIDERANA MISAORA AZY,MANKALAZA NY ANARANY ","FA TSARA ADONAI:MANDRAKIZAY NY FAMINDRAM-PONY ARY MIHATRA AMIN'NY TARANAKA FARA MANDIMBY NY FAHAMARINANY","",""),
                (4,"TAO AMIN'NY LALINA","0","","" ,"P1","P1,P2,P3,P4","TAO AMIN'NY LALINA NO NIANTSOAKO ANAO,IEHOVAH O, ADONAI O, HENOY NY FEOKO;AOKA NY SOFINAO HIHAINO TSARA NY FEON'NY FIFONAKO","RAHA MANDINIKA HELOKA IANAO,IEHOVAH O, IZA NO HAHAJANONA,ADONAI O? FA EO AMINAO NO MISY NY FAMELAN-KELOKA MBA HAHATAHORANA ANAO ","NIANDRY AN'I IEHOVAH AHO;ENY NIANDRY AZY NY FANAHIKO ARY NY TENINY NO NANANTENAKO","NY FANAHIKO MIANDRY NY ADON MIHOATRA NOHO NY FIANDRIN'NY MPIAMBINA NY MARAINA DIA NY FIANDRIN'NY MPIAMBINA NY MARAINA ","MANANTENA AN'I IEHOVAH,RY ISRAEL FA EO AMIN'I IEHOVAH NO MISY FAMINDRAM-PO SY FANAVOTANA BE; ARY IZY NO HANAVOTRA NY ISRAEL HO AFAKA AMIN'NY HELONY REHETRA",""),
                (4,"THLH 107","0","","" ,"P1","P1,P2,P3","MIDERA AN'I ADONAI,FA TSARA IZY FA MANDRAKIZAY NY FAMINDRAM-PONY AOKA HANAO IZANY NY NAVOTAN'I ADONAI DIA IZAY NAVOTAN'I ADONAI,DIA IZAY NAVOTANY HO AFAKA TAMIN'NY TANAN'NY FAHAVALO SY NANGONINY AVY TANY AMIN'NY TANY MARO ","DIA AVY TANY ATSINANANA SY ANDREFANA ARY TANY AVARATRA SY TANY AMIN'NY RANOMASINA ","HUDOULAH ADONAI KITOV KILEOLAM HASDO","","",""),
                (4,"NA KELY NA LEHIBE","0","","" ,"P1","P1,P2,P3,P4","NA KELY NA LEHIBE N'AIZA N'AIZA ALEHA MBOLA HIFANENA AMIN'IEHOVAH IHANY SAMY HO TSARAINA ARAKA NY ASANY","TANDREMO IHANY NY DIDIN'ELOHIM SAINO IHANY NY TENINY FANDRAO HANENINA IANAO REHEFA ANY IVELANY FA NIKATONA TAMINAO NY FANJAKAN'NY LANITRA","MIERITRERETA IHANY DIENY TSY MBOLA MIKATONA NY FIAINANAO MIERITRERETA IHANY DIENY TSY TONGA NY FARANY","(TONGAVA SAINA IHANY )2","",""),
                (2,"TS'ISY ALAHELO","0","","" ,"P1","P1","IZAO NO LAZAIKO AMINAREO SAO DIA MBA MISY ALAHELO AVELAO ANY AMIZAY RAHA NANAO KA TSY NAVELA RA HA SENDRA MISY IZANY ADINOY IZAO DIA IZAO IHANY SAO DIA MBA MILENTIKA NY MASOANDRO TS'ISY EEEE","","","","",""),
                (4,"THLH 145","0","","" ,"P1","P1,P2,P3","HANANDRATRA ANAO AHO,RY ELOHI MPANJAKA O SY HANKALAZA NY ANARANAO MANDRAKIZAY DORIA ","HANKALAZA ANAO ISAN'ANDRO AHO,SY HIDERA NY ANARANAO MANDRAKIZAY DORIA LEHIBE ADONAI KA TOKONY HODERAINA INDRINDRA ARY TSY TAKATRY NY SAINA NY FAHALEBIAZANY ","NY TARANAKA REHETRA SAMY HIDERA NY ASANAO HO AMIN'IZAY MANDIMBY AZY SY ANAMBARANY ASANAO LEHIBE;NY LAZAN'NY VONINAHITRY NY FIANDRANANAO SY NY ASANAO MAHAGAGA NO SAINTSAINIKO ","","",""),
                (3,"ANAO IZAHAY","0","","" ,"P3","P1,P2,P3,P4,P5,P3,P5,P3","ADONAI O MIANTSO ANAO IZAHAY MBA TANTANO TSY HO VERY ADONAI MIANDRANDRA ANAO NY FITIAVANAO TSY MIERY ADONAI O MIANDRY ANAO IZAHAY AZA AVELA ANDEHA IRERY ADONAI O IANAO NO TOKINAY DIA NY SANDRINAO MAHERY","AZA ESORINA AMINAY NY FITAHIANA AVY AMINAO KA NY VONINAHITRAO HISANDRATRA AMIN'NY FIAINANAY ENY ATSANGANO ISRAEL HIJORO TSARA HO ANAO KA TSY HANAN-TAHOTRA SATRIA EFA AO AMINAO","NY FONAY HANKATO ANAO NY SOFINAY HIAINO ANAO VAVANAY MBOLA HIDERA ANAO FA IANAO NO ELSHADAI","ADONAI O HATSARAO IZAHAY AMORONY FO MADIO ADONAI O AMPIANARO IZAHAY KA NY LALANAY AHITSIO ADONAI O MAMELA ANAY AZA ISAINA NY HELOKAY ADONAI O MIHAINOA ANAY RAISO NY FIFONANAY ","AZA ESORINA AMINAY NY FITAHIANA AVY AMINAO KA TSY AHAVOA ANAY NY HOTRIKY NY FAHAVALONAY ANKADOSHIO IZAHAY DIA OLONAO MANDRAKIZAY KA NY FAHAMARINANAO NO HIKORIANA ANATINAY",""),
                (4,"THLH 103","0","","" ,"P1","P1,P2,P3,P4,P5,P6","MISAORA AN'ADONAI RY FANAHIKO ARY IZAY REHETRA ATO ANATIKO,MISAORA NY ANARANY KADOSH","MISAORA AN'I ADONAI,RY FANAHIKO;ARY AZA MISY HADINOINAO NY FITAHIANY REHETRA,","IZAY MAMELA NY HELOKAO REHETRA,IZAY MANASITRANA NY ARETINAO REHETRA IZAY MANAVOTRA NY AINAO TSY HIDINA ANY AN-DAVAKA, IZAY MANARONA FAMINDRAM-PO SY FIANTRANA ANAO","IZAY MAHAVOKY SOA NY VAVANAO NY FAHATANORANAO MODY INDRAY TOY NY ANY VOROMAHERY ADONAI MANAO FAHAMARINANA SY FITSARANA AMIN'NY IZAY REHETRA AMPAHORINA","EFA NAMPAHAFANTATRA AN'I MOSHE NY LALAN-KALEHANY IZY;NY ZANAK'ISRAEL NAMPAFANTARINY NY ASANY ","MAMINDRA FO SY MIANTRA ADONAI,MAHARI-PO SADY BE FAMINDRAM-PO TSY MANDAHA-TENY MANDRAKARIVA IZY NA MITAHIRY FAHATEZERANA MANDRAKIZAY"),
                (7,"TEO IANAO ADONAI","0","","2022" ,"P2","P1,P2,P3,P2","BETSAKA IHANY IZAY ZAVATRA EFA NISEHO NEFA IANAO TSY NIALA TAMIKO TEO IHANY IRENY SEDRA MARO SAMIHAFA IRENY FA NIFIKITRA FOANA AHO SATRIA IANAO NO ELOHIM","EFA FA NA DIA TEO AZA IRENY TSY NAHASAKANA AHY NY HIROSO SATRIA IANAO NO NANOME TOKY AHY SOA IHANY FA TEO IANAO NANAMPY AHY NA ADY NA SAROTRA TENA TIAKO NY FITONDRANAO AHY IANAO ADONAI NO MPIARO ANAY IANAO ADONAI NO HERY HO AHY","NISY KOA NY FIFALIANA SY ALAHELO NIARANISESY NEFA TSY NAVELANAO HO KIVY AHO VAO MAY ARY NATORONAO NY TOKONY HO NATAO DIA NAHITSINAO INDRAY SATRIA IANAO NO ELSHADAI","","",""),
                (7,"ABIB ","0","","2022" ,"","P1,P2","ABIBA OO (*2) TONGA ITY NY ABIBA, ABIBA TENA MIAVAKA ABIBA OO (*2) HEY AZAVAO IHANY FA INONA NO MAMPIAVAKA AZY? ABIBA OO (*2) NY AMIN'NY FIKARAKARANA FAHAKADOSHINA VE ABIBA OO (*2)","NA NY YASHAN, NA NY HADASH, NA NY HADSHEY NA NY NOTSRI, NA NY KTANEI, NA NY YALDOT ABIBA OO (*2) MISY IHANY KOA ANKOATRAN'IREO (SHUUUT HAFTAAH) NOMANIN'NY RAK DELET HO ANAO IESHUA ABIBA OO (*2)","","","",""),
                (4,"THLH 1","0","","" ,"P2","P1,P2,P3","SAMBATRA NY OLONA,IZAY TSY MANDEHA EO AMIN'NY FISAINAN'NY RATSY FANAHY ARY TSY MIJANONA EO AMIN'NY LALANA FALEHANY MPANOTA SAMBATRA NY OLONA TSY MIPETRAKA EO AMIN'NY FIPETRAHANY MPANIRATSIRA","FA NY LALAN'I IEHOVAH NO SITRANY ENY NY LALANY NO SAINTSAININY ANDRO AMAN'ALINA FA FANTATR'I ADONAI NY LALANY MARINA","FA FANTATR'I ADONAI NY LALANY MARINA ","","",""),
                (7,"Yaldot","0","","" ,"P2","P1,P2,P3,P2","HAFA KELY NY FIAINANAY TARIHINAO ADONAI MIAVAKA AMIN'NY TANORA HAFA IZAHAY SATRIA MANANA ANAO KA NY TOETRANAY AMBOARINAO HO MORA ALAHATRA NY ERITRERITRAY AHITSINAO AMIN'NY FANANARANA","TENA MAHATSARA ANAY NY TANTANANAO RY RAY KA HISAORANAY MANDRAKIZAY FA TSY TOY IZAO IZAHAY RAHA TSY IANAO ADONAI NO NIFIDY ANAY SATRIA TIA ANAY","FENO NY FITAHIANAO IZAY REHETRA ATAONAY AOKA HISEHO NY VONINAHITRAO AMIN'NY FIAINANAY NY MBOLA HOAVINAY ATOLOTRAY ANAO ENY HANJAKAO FENOY FAHENDRENA ANATINAY HO MENDRIKA ANAO","","",""),
                (4,"TAMIN'NY FOKO REHETRA","0","","" ,"P1","P1,P2,P3,P4","TAMIN'NY FOKO REHETRA,NO NITADIAVAKO ANAO AZA AVELA HIVILY HIALA AMIN'NY DIDINAO AHO","ADONAI NO TONGA TETO AN-TANY, MATY NATSANGANA HO VELONA AVOTR'ISRAEL","ATO AM-POKO NO HIRAKETAKO NY TENINAO MBA TSY HANOTAKO AMINAO HISAORANA ANIE IANAO IEHOVAH O,AMPIANARO AHY NY DIDINAO NY MOLOTRO NO NENTIKO NILAZA,NY DIDINAO,NY FIDERANA ANAO","DIDINAO,DIDINAO NO SAINTSAINIKO ARY HO DINIHIKO NY LALANAO DIDINAO,DIDINAO NO HIRAVORAVOAKO HIRAVORAVOAKO TSY HO ADINOIKO NY TENINAO","",""),
                (4,"THLH 117","0","","" ,"P1","P1,P2,P3,P1","MIDERA AN'I ADONAI RY FIRENENA REHETRA MIDERA AZY RY OLONA REHETRA","FA LEHIBE NY FAMINDRAM-PONY AMINTSIKA ARY MANDRAKIZAY NY FAHAMARINAN'I ADONAI ","HALELOUIA,HALELOUIA","","",""),
                (4,"THLH 34","0","","" ,"P1","P1,P2,P3,P4,P1","MISAOTRA AN'I ADONAI LALANDAVA AHO HO EO AMBAVAKO( MANDRAKARIVA NY FIDERANA AZY)2 ","ADONAI NO REHAREHA NY FANAHIKO HAHARE IZANY NY MPANDEFITRA KA HO FALY MIARAHA MANKALAZA AN'I ADONAI AMIKO ARY AOKA HIARA HANANDRATRA NY ANARANY ISIKA","NITADY AN'I ADONAI AHO DIA NAMALY AHY IZY KA NANAKA AHY AMIN'NY TAHOTRO,AMIN'NY TAHOTRO REHETRA "," MIJERY AZY IREO KA MIRAMIRANA SADY TSY MANGAHIAHY NY TAVANY","",""),
                (4,"Sitrano aho","0","","" ,"P2","P1,P2,P3,P1,P2","ADONAI O SITRANO AHO DIA HO SITRANA ,VONJEO AHO DIA HO VOAVONJY NITONDRA NY ARETINAY TOKOA IANAO,NIVESATRA NY FAHORIANAY ","IESHUA O SITRANO AHO DIA HO SITRANA,VONJEO AHO DIA HO VOAVONJY TAMINY TENANAO TEO AMBONY HAZO, NITONDRA NY FAHOTANAY IANAO","NY DIAN-KAPOKA TAMINY NO NAHASITRANANY ANTSIKA IZY NO NAMIRAVIRA,ARY IZY IHANY NO HAHASITRANA ANTSIKA IZY NO NAMELY,ARY IZY NO AMEHIN'NY FERINTSIKA IESHUA IHANY NO MPAMONJY NY ISRAEL","","",""),
                (3,"Teny atsipy","0","","" ,"","P1, P2, P3, P4 ,P5, P6","AOKA IZAY FA MANKALEO NY FITABATABANAO E ! ATSAHARO FA RAHA TSY TIA NDANA MIALA TSOTRA IZAO E ! NY VOAHOSOTR'I ADONAI VE NO IFANINANANAO O ! FA AVY AIZA NY FANAHY IZAY EFA NORAISINAO FA IZA IANAO NO TENA SAHY MITSAPATSAPA NY HERIN'I ADONAI TENA ADALA IANAO SAHY MANAO TSINONTSINONA NY HAFATR'I EL SHADAI MORAMORA ANGAHA, NY FIHEVERANAO NY FAMONJENA SAO HEVERINAO FA MITOVY AMINAO EL SHADAI","AOKA IZAY TSY MAMPANDROSO NY TSIKERAKERANAO E ! ATSAHARO FA ADONAI TSY NANIRAKA ANAO AKOMBONY NY VAVANAO, F'EFA TOFOKA IZAHAY E ! AOKA IZAY NY HAINGAM-BAVA AOKA HO MALAI-MITENY TOA TSY TAKATRAO NY LANJA SY NY HASARO-BIDIN'NY FITIAVAN'I ADONAI NAMONJENY ANAO TSY AMPY SAINA NGAMBA, TSY MAHATSAPA FA TSY METY NY ATAO MIZIRIZIZY DIA MIHEVITRA FA HAHAVONJY NY HAFA IANAO SATRIA HEVERINAO HO MARINA IANAO SATRIA ADINONAO (FA) NY FIHEVITR'I ADONAI TSY TOY NY FIHEVITRAO ","NY JIOLAHY TSY ITENENAN'I ADONAI NY OLON-DRATSY TSY MAINTSY ARINGAN'I EL SHADAI","AZA MANAMAFY FO SAINO TSARA IHANY ALOHA IZAY HIAFARANA SAO HIKATONA NY VARAVARANA RAHA MIALA AN-DAHARANA NOHO NY DITRAN'NY FONAO"," AMPY IZAY, AOKA IZAY TY AVONAVONAO E ! SAO HAHETRIN'I ADONAI NY FIANDRANANDRANAO IZAY MANDRAFY SY MANDA NY FANANARAN'I ADONAI DIA HO ARIANY, TSY HO TSITSIANY AMIN'NY AFO MAHAMAY 250 EFA NOLAVIN'I ADONAI 250 EFA NIALAN' I EL SHADAI","ADONAI MBOLA MIANDRY NY FAHATONGAVAN-TSAINANAO E ! MIVERENA KA IALAO NY AMBOM-PO MANARY ANAO E AMPY IZAY, MIVERENA AMBANY ELATR'I ADONAI E MBA HO TAHIANY SY HAKADOSHI-NY ISIKA REHETRA REHETRA IZAO AMPY IZAY, KA FORAO NY NY FONAO EL SHADAI NO ANGATAHO HITOETRA AO"),
                (3,"Mitaraina 652","0","","" ,"","P1,P2,P3,P4","MANDRA-PAHOVIANA ADONAI O NO MBOLA HANADINOANAO AHY MANDRA-PAHOVIANA NO MBOLA HANAFENANAO NY TAVANAO","MANDRA-PAHOVIANA NO MBOLA HISAINTSAINAKO AM-PANAHY SY HALAHELOVAKO AM-PO ISANANDRO MANDRA-PAHOVIANA NO MBOLA MBOLA (HISAINTSAINAN'NY)2 FAHAVALOKO HO AMBONIKO","JEREO AHO KA VALIO ADONAI AMPAHAZAVAO NY MASOKO, FANDRAO FANDRAO HO RENOKY NY TORIMASO RENOKY NY TORIMASO FAHAFATESANA FANDRAO NY FAHAVALOKO HANAO HOE NAHARESY AZY AHO FANDRAO HO FALY NY MPANDRAFY AHY RAHA MANGOZOHOZO AHO F'IZAHO KOSA NY FAMONJENAO NO HIFALIAN'NY FOKO","JEREO AHO KA VALIO ADONAI AMPAHAZAVAO NY MASOKO, FANDRAO FANDRAO HO RENOKY NY TORIMASO RENOKY NY TORIMASO FAHAFATESANA FANDRAO NY FAHAVALOKO HANAO HOE NAHARESY AZY AHO FANDRAO HO FALY NY MPANDRAFY AHY RAHA MANGOZOHOZO AHO F'IZAHO KOSA NY FAMINDRAM-PONAO NO ITOKIAKO","",""),
                (3,"Voakarakara tsara","0","","" ,"","P1, P2, P3, P4, P5, P4, P6","TSY MISY SAMBATRA TOA ANAY TSY MISY MILAMINA SY MIADANA OHATRANAY FA NY FIAROVANA AVO MANODIDINA ANAY NY TANA-MAHERIN'I EL SHADAI NO MIASA HO ANAY","TSY MISY SAMBATRA TOA ANAY TSY MISY MILAMINA SY MIADANA OHATRANAY FA NY FIAROVANA AVO MANODIDINA ANAY NY TANA-MAHERIN'I EL SHADAI NO MIASA HO ANAY MIKARAKARA ANAY, FA TIANY IZAHAY","RAHA MISY SAMBATRA DIA IZAHAY RAHA MISY MILAMIM-PIAINANA DIA ZAHAY RAHA MISY NY RATSY MANODIDINA ANAY D'ILAY MAHERY NO MIKARAKARA ANAY MIARO ANAY, MANOME HERY ANAY, MIARO ANAY","IZAY REHETRA MOMBA ANAY NA NY TENA NA NY FANAHY DIA AMBOARIN'I EL SHADAI HAMPILAMINA ANAY","AMPIANY NY HERY FIAROVANAY AMBOARINY MBA HIRINDRA NY MOMBA NY TENANAY RAVANY IZAY REHETRA MITADY HANDAMAKA ANAY NY FAHEFAN'I EL SHADAI NO MIASA HO ANAY","HEY SAMBATRA IZAHAY KARAKARAINAO EL SHADAI, O EL SHADAI"),
                (3,"Tsy ho adinonay","0","","" ,"P1","P1, P2, P3, P4 ,P5, P6, P1 ","TSY HO ADINONAY MANDRAKIZAY T@ VOALOHANY NAHALALANAY; NY ANARANAO EL SHADAÏ NY HAFALIANAY; VELOMBELONA NY FANAHY SATRIA ISAN’NY NALAINAO, HO OLONAO IZAHAY","TEO VAO NISOKATRA NY MASONAY TEO VAO NIHA-NAZAVA KOA NY LALANAY TEO VAO TSAPANAY F’AKAIKY IANAO TEO VAO TENA NISY TAHOTRA ANAO ZAHAY TEO NO NIANTOMBOHAN’NY FIFALIANAY TEO VAO AZONAY KOA IZAY NIRIANAY SATRIA TEO NO NANOMBOKA NITENY T@NAY IANAO NANITSY SY NAMPAHERY SY NANANATRA ANAY","TEO VAO TENA NAHALALA ANAO, TEO VAO TENA NIAINANA NY TENINAO SATRIA NOSOKAFANAO HO ANAY NY MOAD AHATONGA ANAY HO ISAN’NY VONJENAO DIA TENA VELONA TOKOA @ FIAINANAY NY TENINAO REHETRA, IESHUA ADONAÏ TARIHINAO @ ASAN’NY FANAHY IZAHAY MBA HO TAFATOETRA, TS’ISY AHIAHY","TSY HO ADINONAY MANDRAKIZAY,IZAY FOTOANA MAMY IZAY TSY HO ADINONAY, ENY HO TSAROANAY, ( MANDRAKIZAY) x2 INDRO HAVAOZINAY INDRAY ANDROANY FA IZAHAY HANOMPO SY HIDERA ANAO MANDRAKIZAY.","TSY HO ADINONAY MANDRAKIZAY, NY ANARANAO EL SHADAÏ VELOMBELONA NY FANAHY, SATRIA ISAN’NY NALAINAO HO OLONAO IZAHAY;","SATRIA TEO, VAO NANANA ANJARA AO AMINAO IZAHAY SATRIA TEO, VAO TENA NIAINA NY FITIAVANAO IZAHAY ADONAI."),
                (3,"Tsy hijanona eto (thlh 39)","0","","" ,"","P1, P2, P3, P4 ,P5, P6, P1 ","O IEHOVAH EL SHADAÏ, AMPAFAHANTARO NY FARANAY ZAHAY , SY IZAY OHATRY NY ANDRONAY ARY AOKA HO FANTATRAY FA OLONA MANDALO IZAHAY NY FIAINANAY TOY NY TSINONTSINONA EO ANATREHANAO","INONA NO ANDRASANAY ANKEHITRINY ADONAÏ IANAO NO ANTENAINAY KA MANAFAHA ANAY ,MANAFAHA ANAY @ FAHADISOANAY. ZAVA-POANA TOKOA IZAO REHETRA IZAO FA MPIVAHINY TSY HIJANONA ETO IZAHAY","NA NY HARENA NA NY HERY, ZAVA-POANA AVOKOA FANDEHANAY TOY NY ALOKA EO ANATREHANAO FA NY METY HO ANAY, MITANDRINA NY LALANAY SY MANDRAY NY ANATRAO, DIENY MBOLA ETO, TSY LASA IZAHAY.","O AMPAHAFANTARO ANAY NY TOKONY HO TOETRANAY OO,TARIO IZAHAY HO TONGA SOA ANY AMINAO FA NY TENA TANJONAY, IERUSHALAIM VAOVAO TS’ISY HIJANONA ETO, FA MPIVAHINY IHANY IZAHAY.","MPIVAHINY IZAHAY, TSY HIJANONA ETO AKORY ","OO AMPAHAFANTARO NY OHATRY NY ANDRONAY IZAHAY"),
                (3,"Ndao am'zay","0","","" ,"","P1, P2, P3, P4, P5, P6, P5, P6","ISIKA HANOVA FAMINDRA, HO SITRAK’I ADONAÏ ISIKA HANOVA FAMINDRA, MBA HO HENDRY @ZAY IALANA TANTERAKA, FARASISAN’I BABYLONA IALANA TANTERAKA, FA HANKATO AN’I ADON ISIKA ANIE KA TENA SAMBATRA, NOFIDIN’I ADONAÏ ISIKA ANIE KA TENA SAMBATRA, FA AN’I EL SHADAÏ ANDAO RE HO HENDRY @IZAY, DIENY MBOLA EO IZY ANDAO RE HO HENDRY @IZAY, DIENY MBOLA MIHAINO IZY HATOKY NY TENIN’IESHUA, TSY MISALASALA MINO NY TENIN’IESHUA, TSY MIHAMBAHAMBA F’IZANY NO HERINTSIKA, MAHERY NY TENIN’IESHUA F’IZANY NO HERINTSIKA, MAMELONA NY TENIN’IESHUA ISIKA ANIE KA TENA MIAVAKA, NOFIDIN’I ADONAÏ ISIKA ANIE KA TENA MIAVAKA, FA AN’I EL SHADAÏ ANDAO RE HANDROSO @IZAY, ASANDRATO ADONAÏ ANDAO RE HANDROSO @IZAY, ASANDRATO EL SHADAÏ AO VE…. IEEE; MANAIKY VE…. IEEE; NDAO ARY E……NDAO EEE","ISIKA ANIE KA TENA SAMBATRA, ISIKA ANIE KA TENA MIAVAKA VAHOAKA VOAFIDY, VOAFIDIN’I ADONAÏ VAHOAKA VOAFIDY, LOVAN’I EL SHADAÏ AO VE…. IEEE; MANAIKY VE……IEEE; NDAO ARY E…. NDAO EEEE HOU O RY RAK DELET E?!","ANDAO, (2) MBA HO MARINA @IZAY, ANDAO (2) MBA HO MENDRIKA @IZAY HANOME VONINAHITRA SY HANKATO ZAY AMBARAN’I ADONAÏ TSY HIROAROA SAINA IHANY KOA, F MATOKY AN’I ADONAÏ ANDAO MBA HIROSO E! TENA MBA HO HENDRY E! ANDAO TENA HIROSO E! DIA TENA MBA HO HENDRY E!","ISIKA ANIE KA TENA SAMBATRA, ISIKA ANIE KA TENA MIAVAKA ANDAO RE HO HENDRY @IZAY, ANDAO RE HANDROSO @IZAY","ISIKA DIA HO KADOSH, MBA HO TAFARAY ISIKA TSY MAINTSY KADOSH, TAFARAY @ EL SHADAÏ ARY DIA HO TANTERAKA AMINTSIKA TSIRAIRAY NY HERIN’NY TENIN’I ADONAÏ, FITAHIANA OMEN’I ADONAÏ ISIKA ANIE KA EFA MANANA, NY TENIN’I ADONAÏ ISIKA ANIE KA EFA MANANA, NY SANDRIN’I ADONAÏ KA NDAO RE HO HENDRY @IZAY, FA TIA ANTSIKA IZY KA NDAO RE HANDROSO @IZAY, TSY MAHAFOY ANTSIKA IZY","ISIKA (2) TSY MAINTSY MIROSO MANKANY @ ADONAÏ ISIKA (2) TSY MISY MAHASARAKA ANTSIKA @ ADONAÏ NA IZA LISEHO HO MAFY BE, N’IZA N’IZA MANAO MAMPIHOMEHY N’IZA N’IZA MANDRENDRIBAHOAKA, ISIKA (2) TSY MISY MITSÔKA AO VE…. IEEE; MANAIKY VE……IEEE; NDAO ARY E…. NDAO EEEE"),
                (3,"Didy vaovao","0","","" ,"P1","P1, P2, P1, P2, P3, P4, P5","DIDY VAOVAO NO NOMEN’IESHUA ANTSIKA, DIA NY HIFANKATIAVANTSIKA DIA NY HIFANKATIAVANTSIKA TAHAKA NY NITIAVANY ANTSIKA ARY RAHA TIA AZY ISIKA, DIA HITANDRINA NY DIDINY IZANY NO AHAFANTARAN’NY OLONA FA MPIANANY ISIKA AHAFANTARANA FA MPIANANY ISIKA (x2)","FA AO ANATIN’IZANY DIDY IZANY, ANATIN’NY HERIN’IZANY FITIAVANA IZANY NY NIFLAOT REHETRA NO HO TONGA AMINTSIKA, FIADANANA OMEN’IESHUA TSY ANANAN’IZAO TONTOLO IZAO, NATOKAN’IESHUA HO ANTSIKA IZAO KA N’INON’INONA ANGATAHINTSIKA, DIA HO TANTERAKA RAHA MINO SY TIA ISIKA","FA TAO ANATIN’IZANY DIDY IZANY, TANATIN’NY HERIN’IZANY FITIAVANA IZANY NO NAHAFOIZAN’IESHUA NY AINY HO ANTSIKA, ENY KA AVOTRA ISIKA KA NAHOANA MOA ISIKA NO TSY MBA HIFANKATIA TSY HO VERY MAINA IZAY NOMENY ANTSIKA RAHA MIFANKATIA TOKOA ISIKA","NY FITIAVANA NO FAHATANTERAHAN’NY LALANA, NY FITIAVANA NO LEHIBE INDRINDRA MAHARI-PO, MORA FANAHY, TSY MIALONA, TSY MIREHAREHA TSY MIEBOEBO TSY MANAO IZAY TSY MAHAMENDRIKA, (OOOH….) TSY MITADY NY AZY, TSY MORA SOSOTRA, TSY MANAO OTRI-PO TSY MIFALY AMIN’NY TSY FAHAMARINANA FA MANDEFITRA, MANATENA, MAHARITRA, MINO NY ZAVA-DREHETRA.","NY FITIAVANA, TSY HO LEVONA MANDRAKIZAY NY FITIAVANA, NO LEHIBE INDRINDRA TSY HO LEVONA MANDRAKIZAY.",""),
                (8,"Thlh 131","0","","" ,"P3","P1,P3,P2","ADONAI ô, tsy mirehareha ny foko ary tsy miandranandrana ny masoko; ary tsy misaintsaina izay zavatra ambony loatra aho, na izay saro-pantarina tsy takatro.","Fa tony sady mangina tsara ny fanahiko ato anatiko; tahaka ny zaza eo amin’ny reniny eny, tahaka ny zazakely eo amin’ny reniny ny fanahiko. ","Ry Israely ô, manantenà NY ADONAI, hatramin’izao ka ho mandrakizay.","","",""),
                (4,"FFHS","0","","" ,"P2","P1,P2,P3,P4,P2,P5","Koa amin' izany na inona na inona ataonareo Koa amin' izany tiava an' IEHOVAH o ","Tiava an' IEHOVAH Eloheiha Amin'ny fonao rehetra sy ny Fanahinao rehetra sy ny herinao rehetra ary ny sainao rehetra (*2)","Ary tiava ny namanao tahaka ny tenanao Izany no didy lehibe (2) sady voalohany (2)","Koa amin'izany na inona na inona tianareo Ataon'ny olona aminareo Dia mba ataovy aminy kosa tahaka izany (2) Fa izany no lalàna sy mpaminany Fa izany no torah sy navi"," ELOHIM AVINU DIA FITIAVANA ELOHIM ELKANA DIA FITIAVANA ELOHIM EL SHADDAI DIA FITIAVANA ADONAI ELOHIM DIA FITIAVANA IESHUA HAMASHIAH DIA FITIAVANA NY FANAHY KADOSH ATO AMINTSIKA MISY FITIAVANA FITIAVANA MANDRAKIZAY NO NITIAVANY ANTSIKA NY FIAINANTSIKA AO AMIN’IESHUA DIA FITIAVANA",""),
                (4,"Ny anaranao","0","","" ,"","P1,P2,P3,P4,P5","Ny famindramponao no hiraiko Ny anaranao IESHUA HAMASHIAH no deraiko Adonai ô, Adonai ô araka ny teninao Ny famindramponao no hiraiko Ianao no HAMASHIAH hankalazaiko Adonai ô, Adonai ô satria tsara ianao","Araka ny haben'ny famindramponao no hiderainay ny anaranao Adonai ô, Adonai ô hakadoshina Ianao","Hamorony fo madio Adonai ô Hatahorako anao Ieshua Hamashiah Hitandremako ny didinao Fenoy Fanahy Kadosh aho Ieshua ô Handehanako amin'ny Fanahinao Hitandremako ny didinao ","Tsarovy Adonai, ny nandehanako Tsarovy Adonai teo anatrehanao Tsaraovy Adonai, ny fifaliako Tsarovy Adonai, sy izay tsara eo anatrehanao Tsarovy Adonai, ka hasoavy aho Noho ny soa rehetra tao amin'ny heyhal-nao Tsarovy Adonai, avy tany aminao ireny hery rehetra ireny","Ny famindramponao no hiraiko Ny anaranao IEHOVAH no deraiko Adonai ô, Adonai ô satria tsara Ianao Ny famindramponao no hiraiko Ny anaranao IEHOVAH no IESHUA deraiko Adonai ô, Adonai ô Elohim Ianao (2)",""),
                (4,"Mifamelà heloka","0","","" ,"P1","P1,P1,P2,P3,P4,P5","Mifandeferana ka mifamela heloka ianareo raha misy manana alahelo amin'ny sasany Tahaka ny hamelan' IESHUA ny helokareo No mba hamelanareo heloka kosa ","Koa aoka ambonin'izany rehetra izany ny fitiavana Ka ny fitiavana dia fehin'ny fahatanterahana izany satria Elohim fitiavana ","Ary aoka hanapaka ao am-ponareo ny fiadanan'i Hamashiah Ieshua Ao amin'izany no niantsoana anareo ho tena iray feno fisaorana (*2) ","Fa raha mamela ny fahadisoan'ny olona ianareo dia mba hamela ny anareo kosa ny rainareo, ny rainareo izay mitoetra any amin'ny Raqia Mihira amin'ny fahasoavana ao am-ponareo ho an'Elohim (2) Ao amponareo ho an'Elohim ","Ary aoka ambon'ny izany rehetra izany ny fitiavana fa ny fitiavana dia feno fahatanterahana izany satria Elohim dia Fitiavana Aoka ny tenin'ny Hamashiah hitoetra betsaka ao aminareo. Ao aminareo amin'ny fahendrena rehetra dia mifampianara ka mifananara amin'ny Thilim sy ny fihirana ary ny tonon-kira panahy",""),
                (2,"Mahasaropiaro anay","0","","2022" ,"","P1,P2,P3,P4,P5,P6","TSY MORAMORA HO ANAY ANIE VAO TAFIDITRA AMZAO LALANA IZAO FA EFA ELA NO NITADY AHITA IZANY IZAHAY FA NOHO NY SITRAPON'ELOHIM DIA NAMPAHAFANTARINY ANAY ILAY FAMONJENA AVY AMIN'NY ANARAN'I IESHUA IESHUA IHANY, IZY IHANY NO ITOKIANA FA IZY IHANY, NO MANANA FAHEFANA IESHUA IHANY, NO MAHAVONJY, NA MAMELA HO VERY, IZY IRERY IHANY","IZAY NATSANGAN'I ADONAI TSY MISY MAHARAVA IZANY K'IZA NO SAHY HANOHITRA IZANY FAHEFANA IZANY","MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY IFIKIRANAY HATRAMIN'NY FARANY MIANGAVY AMINAO IZAHAY O MBA VANGIO ADONAI HAHAZO HERY, HOAZONINAY TSY HO VERY MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY TSY HO AVOTSOTRAY HATRAMIN'NY FARANY ","TSY HO MORAMORA HO ANTSIKA ANIE 'LAY FANADINANA AMIN'NY ANDRO IRAY REHEFA TONGA NY ORA HITSARAN'IESHUA HAMASHIAH RAHA TOA MISY AMINTSIKA IRETO SAHY MIODINA AMIN'ADONAI MANDÀ NY TENY IZAY MITARIKA ANTSIKA HO ANY AM' RAQIA","HENOY IHANY, ILAY IRAKA RAHA MITENY F'IZY IRERY IHANY, NO ITENENAN'IESHUA MBA RAISO IHANY NY HAFATR'IZAY OMENY F'IZANY NO ITARIHANA ANTSIKA, MAHASOA IZAY NATSANGAN'ADONAI TSY HISY HAHASAKANA IZANY NEFA MISY SAHY MANOHITRA IZANY FAHEFANA IZANY","MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY IFIKIRANAY HATRAMIN'NY FARANY MIANGAVY AMINAO IZAHAY O MBA TAHIO ADONAI HAHAZO HERY, HOAZONINAY TSY HO VERY MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY TSY HO AVOTSOTRAY HATRAMIN'NY FARANY "),
                (2,"Aleo za mba hiteny","0","","2022" ,"","P1,P2,P3,P4,P5","RAHA HOE NANGINA AHO, HATRAMIN'IZAY TSY MIDIKA AKORY IZANY HOE IANAO NO MARINA ALEO ARY AHO HITENY FA AMPY ANGAMBA IZAY","EFA VOALAZA FA NY RATSY FANAHY DIA MAMOAKA NY RATSY IZAY MAMENO NY FONY ARY IZAY RAKETINY ANATY NO HITENENANY MANEHO NY TOETRANY","FA NY RATSY FANAHY TSY METY TAFATOETRA MALOTO FIJERY, MALOTO FISAINA IZAY MIHEVITRA FA EFA MAHAFEHY FENO FAHALALANA AN'ELOHIM ","NEFA NY ATAONY NA IZAY LAZAINY AZA MOA TS'ISY ARAK'IZAY TENY AMPIANARIN' IESHUA MIHARIHARY, MANITSAKA NY TORAH. DIA MBOLA MIHEVITRA FA MARINA","ZANATSIPIKANAO, NO LOKON'NY FONAO NY RARINY ITSAHINAO NY MARINA AVADIKAO K'ALEO AM'ZAY HITENY AHO FA TONGA NY FOTOANA",""),
                (4,"Tiako ny fitiavanao","0","","2021" ,"","P1,P2,P3,P4,P5,P6","IESHUA, NAFOINAO HO ANAY NY FIAINANAO SY NY AINAO HATRAMIN'NY FAHAFATESANA NIANJADY TAMINAO","IESHUA HAMASHIAH TIAKO NY FITIAVANAO NY NAHAFOIZANAO HO ANAY NY FIAINANAO SY NY AINAO HATRAMIN'NY FAHAFATESANA NIANJADY TAMINAO NY TENY TSY TSARA REHETRA IEHUA, NIARETANAO NY FAMONJENA NY ZANAK'ISRAEL NO NOSAININAO","SAROBIDY LOATRA NY RA KADOSH-NAO SY NY FANAHY KADOSH-NAO IESHUA NANAVITANAO AHY TOMBON-TSOA KOA IZAY NOMENAO AHY","IEHOVAH O, TOV IANAO KA DERAINAY KADOSH, KADOSH NY ANARANAO IEHOVAH O, TOV IANAO KA DERAINAY ASANDRATRAY NY ANARANAO IESHUA O, TOV IANAO KA DERAINAY KADOSH, KADOSH NY ANARANAO IESHUA O, TOV IANAO KA DERAINAY ASANDRATRAY NY ANARANAO","IEHOVAH O, TOV IANAO KA DERAINAY FA TSY MISY TOA ANAO IEHOVAH O, TOV IANAO KA DERAINAY ASANDRATRAY NY ANARANAO","SAROBIDY LOATRA NY RA KADOSH-NAO SY NY FANAHY KADOSH-NAO IESHUA NANAVITANAO AHY TOMBON-TSOA KOA IZAY NOMENAO AHY ENY ADONAI, SAROBIDY LOATRA NY RA-NAO IESHUA KADOSH, KADOSH NY ANARANAO) TENA TIAKO IESHUA TENA TIAKO NY FITAVANAO IESHUA"),
                (1,"TIAKO LOATRA IANAO IESHUA","0","","" ,"P3","P1,P2,P3","Ieshua efa nandinika ihany aho Mahatsiaro ny fitondranao ahy Ianao nisahirana hatramin’izay Todah mahatsiaro sambatra aho ","Ieshua efa nandinika ihany aho Fa tsy misy hafa tsy ianao ","Fa izay nomenao ahy dia tsy foiko Fa tiako loatra ianao Ieshua ","","",""),
                (1,"RY RAY AMAN-DRENY","0","","" ,"P1","P1,P2,P1,P2","Ry ray aman-dreny mifikira ianareo Fa izahay dia tsy te iala Sao tratran’ny matsav ianareo Ka mirifatra, ka voatery Tsy maintsy miaraka aminareo izahay ","Fa tato nahendry anay Raha tsy tato dia tsy mba toy izao izahay Raha tsy tato dia efa goim izahay ","","","",""),
                (1,"RY MPIANDRIN’IESHRON","0","","" ,"","P1,P2,P3","Ry mpiandrin’Ieshron o Mihaino ahy ianao Ianao izay mitondra an’i Iossef toy ny ondry Ianao izay mipetraka amin’nuy kerobim, mamirapirata ","Fohazy ny herinao, ka avy amonjy anay Elohim Adonai Tsevaot, mandrapahoviana No anetroka aminay, ny fahatezeranao ","Elohim Adonai Tsevaot Elohim ampodio izahay Fa very izahay, ringana izahay Adonai ","","",""),
                (1,"OLOMBELONA FOFON’AINA","0","","" ,"","P1,P2","Ny olombelona fofon’aina izy Fa ianao no azo antenainy ho doria Ianao no Elohei Israel Tena izay vao tonga saina aho Ieshua Fa tsy an’olona ny lalan-kaleha Nahary ny mpandeha no ahalavorary ny dia ","Tena izay, tena izay No tadiavin’Adonai taminao ","","","",""),
                (1,"NY HIRAKO","0","","" ,"","P1,P2,P1,P2,P3","Ieshua ny hirako atolotro ho anao, ho anao Tsy ampidera feo sanatria fa ho anao irery Fa mafy foana ny nanjo hatrizay fa ianao namonjy ahy ","Dia hidera anao Ieshua Hamashiah no tanjoko Mandrakizay satria ianao namonjy ahy Dia hidera anao ieshue Hamashiah no tanjoko Satria ianao efa namonjy ahy doria ","Hidera anao, hidera anao no tanjoko","","",""),
                (1,"NOTEFENAO AHO","0","","" ,"","P1,P2,P3,P4,P5","Notefenao aho tamin’ny fahasaro-piaronao Ieshua Notefenao aho ho fatsom-piderana ho anao Notefenao aho ka tsy afaka intsony fa lasanao Ho anao doria no nanefenao ahy Ieshua ","Dia nofenoinao ny fitahiam-panahy Narovanao aho na aiza na aiza nisy ahy Tsy navelanao, ho voakasika aho e Ny masonao saro-piaro tamiko ","Notefenao aho tamin’ny fahasaro-piaronao Ieshua Notefenao aho ho fantsom-piderana ho anao Ho vazi-mendrika vokatry ny ezakao tamiko Matokisa ny fanahy izay nomenao ahy ","Fa nony taty aoriana mazava amiko Ny antony nanefenao ahy Fa taona maro izay nefa tsy afaka ato an-tsaiko Satria ny fitiavanao latsaka ato am-poko ","Notefenao aho",""),
                (5,"Sacerdoce messianique","0","","" ,"P1","P1,P3,P1","Vita ny famonjena antsika e, Sacerdoce messianique fanavotan-dehibe Nonina tamintsika e, ny teny tonga nofo e, naka ny endrik'olombelona Fa nofoanany ny tenany, tamin'ny nakàny ny endriky ny mpanota manam-pitoviana amin'ny olona ","","dia nanetry tena Izy, niaritra fahoriana, nombohana tamin'ny hazo fijaliana nanaiky hatramin'ny fahafatesana nefa tsy nanao izay ialana tonga voahozona miafina tsy fantatsika e, izay tena hevitra izany e, ","","",""),
                (5,"Ziona","0","","" ,"P3","P1,P2,P3,P4,P5,P3","Eny ny navotan'Adonai hiverina hankany Ziona amin'ny fihobiana e, ary fifaliana mandrakizay no eny an-dohany hahazo fifaliana sy faharavoravoana izy sady handositra ny alaelo sy fisentoana Adonai hampionona an'ny ziona eny, hampionona izay rava rehetra ao Izy","hatsangano ny efa rava e, hatry ny fony fahagola hamboarina ny efa lao hatramin'ny fahiny dia havaozina indray e, ny tanana rava","Hifaly dia hifaly amin'Adonai aho, ny fanahiko ravoravo amin'Elohi notafiany fitafiana famonjena aho nampiakanjony akanjo fahamarinanana Toy ny mpampakatra misatroka hamama tahaka ny mpisorona ary toy ny hampakarina miravaka ny firavany","Tsy hangina aho noho ny amin'ny ziona ary tsy hitsaha-miteny aho noho ny amin'ny Ierushaleim mandram-piposaky ny fahamarinany tahaka ny famirapiratry ny mazvava Dia omeny anaram-baovao ianao izay ho tononon'ny vavan'Adonai, Ary ianao atao hoe ilay Sitrako, ny taninao atao hoe vady ampakarina","fa ianareo kosa efa mby e, Ziona tananan'Elohim velona, Ierushaleim any an-danitra, ary amin'ny anjely tsy omby alin'alina amin'ny fihaonana fifalina",""),
                (5,"Shema Israel","0","","" ,"P2","P1,P2,P3,P4,P2,P5,P2","Ouuuh ouhhh yeah yeah Shema Israel Ko amar Adonai Ki Hessed afatsti velo Zevah Vedaat Elohim meholot","Fa tsy misy anarana ahazoana famonjena afatsy ny anaran'Ieshua Hamashiah Elshadai nanao ny ràny ho fanekena ho fanavotana mandrakizay doria Fa Ieshua tsy tonga handrava ny lalana ny Torah tsy hanampiana, tsy hanalana ny fisoronana ihany no novana satria tsy mahaisotr'ota ny asan'ny lalana","Ndao isika hifaly e, Ndao isika hifaly e, hifaly amin'Adonai Ndao isika hihoby e, Amin'ny endrika mirana , amin'ny endrika sariaka feno hehy","Fa hiverina amintsika indray e, Elohim Adonai Fa hiverina amintsika indray Elshadai","Shema Shema Israel yeah eh eh Shema Israel tsurutsutsutsurururu eehhhh",""),
                (5,"Miangavy Adonai o","0","","" ,"P3","P1,P2,P3,P4,P3,P5","Miangavy Adonai o, raha mba mety ianao, mifona aminao mba hiantrao fa nanenenako ireo ota vitako tamin'ny tsy fahafantarako","Ekeko Adonai o, ny ho rantsaninao mba ho sampana mamoa Esoriko avokoa ny toetra ratsiko tena vonona aho, ny hiova fo","Ianao nifidy ahy sy niantso ahy koa nampahafantarinao ka dia izorako ny didinao sy ny fitsipikao fiainako Hazony aho mba tsy ho tafasaraka aminao, tafaray aminao mandrakizay","Ankehitriny Adonai o, angatahiko koa, fahendrena sy fahabdiovam-po ny fanahinao kadosh, mba hitarika ahy dia izany no ho fiadanako","Ataoko ahoana Adonai o, ny tsy hisaotra anao ny amin'ny fahasoavanao, ny famindramponao sy ny fiantranao dia amin'izay mitandrina ny didinao",""),
                (5,"THLH 115","0","","" ,"P1","P1,P2,P3,P4,P1","Adonai o, aza izahay aza izahay no omena voninahitra, Fa ny anaranao ihany","Ieshua o, aza izahay, aza izahay no omena voninahitra fa ny anaranao ihany","Noho ny famindramponao sy ny fahamarinanao Adonai, ny anaranao ihany. ","Fa nahoana ny goim no manao hoe: Aiza izay Eloheihem? Nefa any an-danitra Elohim Shelanu Fa nanao izay sitrapony rehetra Izy Adonai, ny anaranao ihany","",""),
                (5,"THLH 24","0","","" ,"P1","P1,P2,P4,P5,P6,P1","An'i Adonai ny tany sy izay rehetra ao aminy izao rehetra izao sy ny mponina eo aminy. Fa Izy no nanorina azy tambon'ny ranomasina. Tambonin'ny rano no nampitoerany azy","Iza no hiakatra any an-tendorombohitr'i Adonai Ary iza no hitoetra eo amin'ny fitoerany kadosh? Izay madio tanana sy mahitsy fo, Izay tsy manandratra ny fanahiny ho amin'ny lainga, na mianiana hamitaka Handray fitahiana avy amin'i Adonai izy Ary fahamarinana avy amin'Elohein'ny famonjena azy+","","Izany no taranaka mitady azy Izay mitady ny tavanao dia Iakova Asandrato ny lohanareo, ry vavahady, Ary misandrata hianareo, ry varavarana fahagola Mba hidiran'ny Mpanjakan'ny voninahitra. ","Iza izao Mpanjakan'ny voninahitra izao? Adonai mahery Tsitoha, Adonai mpiady mahery, Asandrato ny lohanareo, ry vavahady; Misandrata hianareo Mba hidiran'ny Mpanjakan'ny voninahitra. Adonai, Adonai Tsevaot","Adonai mahery Tsitoha, Adonai mpiady mahery, Izy no Mpanjaka Mpanjakan'ny voninahitra"),
                (5,"Tsisy miafina aminao","0","","" ,"P2","P1,P2,P2,P1,P3","Voadinikao ny fisainako Ny toetra miafina ao am-po Fa tsy misy izay tsy fantatrao hatramin'ny eritreritro Efa reko ny filazana anao Ka dia raiki-tahotra aho Ny mpanota tsy avelanao Aringanao raha tsy mibebaka","Ieshua tsisy miafina aminao e, ny ato am-poko rehetra fa mihanjahanja eo anatrehanao na mandeha aho na mitoetra","Adonai fantatrao anie ny fahatahoranay anao e, Ieshua, lalina indrindra e, ny famonjena izay nataonao ho anay fitiavana lehibe indrindra e, namoizanao ny ainao fitiavana lehibe indrindra e, ka misaotra anao Todah","","",""),
                (5,"Mba hiasan'ny famindramponao","0","","" ,"P2","P1,P2,P3,P1,P2","Fa Adonai tsy hahafoy ny olony Noho ny anarany lehibe satria Sitrak'Iehovah ny nanaovany Nifidianany anareo olony Kanefa matahora azy ianareo Ka manompo azy marina amin'ny fo tokoa","Mba hiasan'ny famindramponao Adonai o, ny olona ho avy hanetry tena ka hibebaka, Ka hivavaka sy hitady ny tavanao dia hihaino any an-danitra ianao Adonai o Ka dia avelanao tokoa ny helony","Ary raha miala amin'ny ratsy fanaony e, Ka miverina aminao indray toy ny taloha Dia hihiratra ny masonao, hianao hifoa Ny sofinao hihaino ny fitarainany Ka dia avelanao tokoa ny helony","","",""),
                (5,"THLH 146","0","","" ,"P1","P1,P2,P6,P3,P4,P5,P2,P4"," Manjaka mandrakizay Adonai Eloheiha x 2 Ry Ziona, Haleluia Haleluia, Miderà an’Adonai, ry fanahiko Hidera an’Adonai aho, raha mbola miaina koa; Eny, hankalaza an'Elohi aho, raha mbola velona koa Aza matoky ny lehibe, Na ny zanak'olombelona izay tsy mahavonjy Miala ny fofonainy, ka miverina ho amin'ny taniny izy; Ary amin'izay indrindra no hahafoanan'ny fikasany ","Sambatra izay manana an'Elohei Iakov ho Mpanampy azy Sady manantena an'Adonai Elohim Izay nanao ny lanitra sy ny tany, Ny ranomasina sy izay rehetra ao anatiny Izay mitandrina fahamarinana mandrakizay, Izay manome rariny ho an'ny ampahoriana, Izay manome hanina ho an'ny noana. ","Adonai mamaha ny mpifatotra; Adonai mampahiratra ny jamba; Adonai mampitraka ny mitanondrika; Adonai tia ny marina; Adonai miaro ny vahiny Ary manandratra ny kamboty sy ny mpitondratena","Manjaka mandrakizay Adonai ","Hatramin'ny taranaka fara mandrimby Eloheiha, ry Ziona Haleuia","Ry Ziona, Haleluia"),
                (3,"Fanahy fahendrena","0","","" ,"P2","P1,P2,P3,P4,P5,P6,P2","TIAVONAREO NY FAHAMARINANA IANAREO IZAY MPITSARA ETO AN-TANY AOKA HO ARAKA NY HITSINY NO FIHEVITRAREO AN'I EL SHADAI","AOKA HO AMIN'NY FO MARINA NO HITADIAVANAREO FA METY HO HITAN'ZAY TSY MAKA FANAHY ARY MISEHO, ENY MISEHO AMIN'IZAY MATOKY AZY ADONAI NY FANAHY MISAIN-DRATSY DIA TSY TIA FAHENDRENA NY FAHENDRENA KOSA TSY MBA MONINA AMIN'NY VATANA VATANA ANDEVON'NY FAHOTANA","FA NY FANAHY KADOSH MPANABE NY OLONA MANDOSITRA NY HAFETSEN-DRATSY IZY MANALAVITRA NY HEVITRA TSY MISAINA ARY MIHATAKA IZY, RAHA MANDROSO NY HELOKA NY FAHENDRENA DIA FANAHY TIA OLOM-BELONA TSY AVELANY HO AFA-MAINA IZAY MITENY RATSY AN'I ELOHIM","MANERANA AN'IZAO TONTOLO IZAO NY FANAHI'I EL SHADAI ARY HO AMINY NY ZAVATRA REHETRA RENY AVOKOA IZAY LAZAIN'NY OLONA IZAY MANOHITRA AZY TSY HO AFAKA MIHERY TSY HO AFAKA MBA HO SAZIANA AMIN'NY RATSY IZAY NATAONY","KOA FADIO (2) NY FIMONOMONONANA TSY MAHASOA, ARY AROVY NY LELANAO AROVY FA NY ZAVA-DREHETRA OHARIANY HO AMIN'NY FIAINANA KA MAHASOA NY ZAVA-BOARIN'IZAO TONTOLO IZAO MAHASOA TS'ISY FOTOAPAHALEVONANA AO AMINY SATRIA TSY METY MATY NY FAHAMARINANA AO AMINY","FITONDRA-TENA MAVONA DIA MIHANTSY FAHAVEREZANA AROVY, AROVY NY FANAHINAO NY HEVI-DRATSY MAMPISARAKA MAMPISARAKA AMIN'ELOHIM RAHA MAKA FANAHY AZY"),
                (3,"Ankalazaina","0","","" ,"","P1,P2,P3,P4","ANDAO HANDIHY, HIHIRA SY HIFALY O IA E HISAOTRA AN'I ADONAI ISIKA ANDAO HITEHAKA, HIHOBY SY HIFALY O IA E HIDERA NY HATSARANY ISIKA ANDAO HANDIHY, HIHIRA SY HIFALY ZALAHY E HISAOTRA AN'I ADONAI ISIKA HITEHAKA, HIHOBY SY HIFALY ZALAHY E HIDERA NY HATSARANY ISIKA","NA MIFANDIMBY ENY NY TAONA SY ANDRO TSY MIOVA IZY FA TIA ANTSIKA MIPOSAKA SY MILENTIKA FOANA NY MASOANDRO TSY MIOVA IZY FA TIA ANTSIKA NA AIZA ALEHA, NA INON'INONA ATAO NY MASONY EO AMINTSIKANA AIZA ALEHA, KA NA INONA ATAO NY SANDRINY NO MOMBA ANTSIKA","ANDAO HIHIRA AM-PIFALIANA ANDAO HIHIRA, HIDERA SY HIHOBY E","ANKALAZAINAY SY DERAINAY NY ASANAO ADONAI ELOHEINU ANKALAZAINAY SY ASANDRATRAY NY HERINAO ADONAI ELOHEINU FA IANAO IHANY NO MPITSARA MARINA IANAO NO TOMPON'NY FAHEFANA IANAO IRERY IHANY NO MAHAVONJY ANAY ADONAI TSY HO VOAROMBAKY NY RATSY FANAHY","",""),
                (3,"Làlana vaovao","0","","" ,"","P1,P2,P3,P4,P5","FIAINANA VAOVAO O OMEN'I ADONAI ANTSIKA TS'ISY IFANDRAISANY AM'ZAY TANY ALOHA TANY LALANA VAOVAO NOSOKAFANY HIZORANTSIKA LAY MARINA SY FENO NYHATSARANY TSY AMIN'NY SAINTSIKA INTSONY NO ANDEHANANTSIKA FA EFA MISY NY FITARIHAN'NY FANAHY NY DIDY SY FITSIPINY NO MAMPIANATRA ANTSIKA MBA TS'ISY HO VERY IZAY MANKATO IZANY","NY TORITENY MAMPIORINA TSARA ANAO TSY IZAY HEVITR'OLONA NO AMBARA AO FA NY TENIN'I ADONAI; LAY TENY VELONA TS'ISY FITAKA TSY AMBOAMBOARINA NY TORITENY RE-NAO DIA FAHAMARINANA MANARAKA IANAO DIA TSY HO SAHIRANA AMIN'NY FIFANDRAISANAO AMIN'ELOHIM HO HITANAO IZANY FITIAVANY (SATRIA)","FIAINANA VAOVAO NO OMEN'I ADONAI ANTSIKA TS'ISY IFANDRAISANY AM'ZAY TANY ALOHA TANY FO SY SAINA VAOVAO NO NANAVAOZANY ANTSIKA HANDRAISANTSIKA REHETRA NY HATSARANY","ANKEHITRINY AM'ZAO ANDRO IZAO VAO ASEHON'I EL SDAHAI MAZAVA AMINAO NY TENINNY MPAMINANY IZAY VOASORATRA DIA ASEON'I ADONAI FA NATOKANY HO ANAO ARY TSY MISY AMBONIN'NY TANY ANEHOANY IZANY ZAVA-MAHAGAGA OMENY ANJARANAO OMENY NY POROFO, IANAO NO OLONY DIA NY ZANANY IZAY TSY FOINY","NY FISAINANAO, NY FITENINAO, NY FIJERINAO KOA, HAKADOSHIO NY FITONDRAN-TENA, FENO FAHENDRENA NO FITARATRA AHITANA AN'ELOHIM NY FO MADIO, NY FITIAVANAO NO MAMPAHITSY NY LALANAO IALAO NY RATSY IZAY MANIMBA ANAO LALANA VAOVAO IZAO NO IZORANAO",""),
                (1,"MISY TANTARA","0","","" ,"P2","P1,P2,P3,P2","Misy tantara tsy fantatry n’iza n’iza Fa mitoetra mangina, mangina ato am-po Misy tantara tsy fantatry n’iza n’iza Fa lasa tao an-kira, mangina ato am-po ","Fa ny hiranay Adonai, misy fahatsiarovana Tsy mety maty intsony, fa mitoetra ato am-po ","Misy tantara tsy fantatry n’iza n’iza Hafa tsy izay rehetra natokana ho anao Ieshua Misy tantara tsy fantatry n’iza n’iza Ka na dia ho tantaraiko, tsy ho tsapany ao am-po ","","",""),
                (1,"MILA MAHATOKY","0","","" ,"P3","P1,P2,P3,P4,P3","Mosesy sy Arona, mpanompon’i Iehovah, tena masahy I Farao sy ny miaramilany, tena mahery Fa tsy mahaleo an’i Iehovah Tsy misy maharesy an’Iehovah Satria mpanjakan’Israel izy Tsy misy maharesy an’Iehovah Izy no mpanjaka avo indrindra Satria mpanjakan’Israel Izy ","I Iehovah efa nahery hatrizay Fa ny loza folo no noeniny fotsiny Ampahafantarina ny zanak’Israel Hoe mahery , ny sandrin’Adonai ","Mila mahatoky, mila mahatoky An’i El Shadai ","Nankaiza babylon sy ireo miaramilany Fa Iehovah, nampiseho ny voninahiny ","",""),
                (1,"MIFOHAZA RY VALIHA","0","","" ,"P2","P1,P2,P3,P2,P4,P2,P5,P2,P6","Mifohaza ry valiha, fa izao hidera an’i Iehovah Fa zava-dehibe no antsoina hoe sacerdos O ry firenena, mbola ho avy izy ireo Iankohoka eo anatrehanao Fa lehibe, Eloheinu ","Ieshua irery ihany no mahavita toy izany Ieshua irery ihany no mahavita toy izany ","Nanaiky nombohana izy, ho famonjena antsika Satria fantatr’i IEshua Fa izay no lalana farany ho an’ Israel ","Dia nitsangana izy, ho any an-danitra Nitondra ny rà kadosh any Ho famonjena antsika, ho fisoronana leolam ","Jereo anie any amin’ny firenena Fa tsy mba misy toy izany Elohim, El Shadai mahavonjy Mifohaza ry valiha, fa izao hidera an’i Iehovah Fa zava-dehibe no antsoina hoe sacerdos ","Ki leolam hasdo"),
                (1,"MANDRAKIZAY NO HIDERAKO ANAO","0","","" ,"","P1,P2,P1,P2","Mandrakizay Ieshua o no hiderako Anao Ry fanahiko misaora an’Elohim Tsy ho adinoko ireny rehetra ireny izay nataonao ahy Fisaintsainako mandrakariva izany ","Misy aza tany aloha tany, Misy andro maro, tsy misy mahalala Hafa tsy ianao ihany Elohim Rehefa avy mianatra aza aho Dia feno anao Feno anao ny tontolo androko Efa hatramin’izay Ilay fahakadoshina hatramin’izay hatramin’izay Izay nahafantaranao ahy Izany anie ianao hatramin’izay ka hatramin’izao Izany anie Ianao ","","","",""),
                (1,"LEHIBE SY MAHATALANJONA","0","","" ,"","P1","Lehibe sy mahatalanjona ny asanao Adonai o Tsevaot Mahintsy sy marina ny asanao Ry mpanjaka mandrakizay Iza no tsy atahotra ary iza no tsy ankalaza Ny anaranao Adonai o Fa Ianao ihany no kadosh Ary ny firenena rehetra Ho avy iankohoka eo anatrehanao Mamindra fo amiko ","","","","",""),
                (1,"TONTOLO ANDROKO","0","","" ,"","P1,P2","Ieshua ny tontolo androko Apetrako aminao tokoa Tsy mahavita na inona na inona aho Raha tsy miaraka aminao Ieshua ","Ieshua, tena miankina aminao ny fiainako Tsy mahavita na inona na inona aho Raha tsy miaraka aminao ","","","",""),
                (1,"FITONDRANAO AHY","0","","" ,"","P1,P2,P3,P4","Ny sitraponao tsy maintsy tanteraka Fa ianao no El Shadai, mandrakizay Ianao ilay mpanjaka, ilay Avo indrindra Dia izaho ilay vovoka ","Fa tsara ny lalana, nitondranao ahy Fa nisy tamin’ireo lalanao, nampitomany koa Fantatro fa avy taminao izany Kanefa ny foko mbola mitomany ihany ","Ianao ilay El Shadai Ianao ilay mandrakizay ","Fa tsara ny lalana nitondranao ahy Fa nisy tamin’ireo lalana nampitomany koa Todah ","",""),
                (1,"EVEN","0","","" ,"P2","P1,P2,P3,P2","Misy, tanana iray napetraka teo ambony arbot e Mba ho tazana, toy ny kintana mitarika ny maraina e Atao inona moa, ny fanasina raha tonga matsatso e ","Fa mpianatra ADONAI isika, asehoy amin’izay Fa mpianatra Adonai isika, hafa ny taloha ","Misy, even iray, napetraka teo ambony arbot e Mba handrava, ny fampianarana Izay avy amin’ny babylon Sy ny aizina, izay manarona ny tany rehetra ","","",""),
                (1,"ELOHI","0","","" ,"","P1","Elohi, matahotra aho sao tsy mihaino ahy intsony Ianao Elohi o, antongilano ny sofinao Malahelo tanteraka aho raha laozanao Hoy izaho tamin’ny fahatairako Voafongotra tsy ho eo imasonao Kanjo nihaino ny feon’ny fifonako ihany ianao ","","","","",""),
                (1,"ELATRA","0","","" ,"","P1,P2,P3","Na dia ny tanora fanahy aza Dia mety ho reraka Na dia ny tanora fanahy aza Dia mety ho sasatra ","Hatramin’ny zatovo, dia mety tafitohana Fa izay miandry an’Iehovah Dia mandroso hery kosa ","Helatra no iakarany tahaka ny voromahery Nihazakazaka izy, nefa tsy ho sasatra Handeha izy, nefa tsy ho reraka ","","",""),
                (1,"ADONAI EHAD","0","","" ,"","P1,P2","Adonai, Adonai Ianao irery Tsy izaho, tsy izaho intsony, no velona Fa misy fanahy izay nomenao ho ahy HAMASHIAH Tsy izaho, tsy izaho intsony no velona Fa HAMASHIAH Efa lasanao aho ADONAI ","Adonai, Adonai Ianao irery Tsy izaho, tsy izaho intsony no velona Efa maty ao amin’ny fiainako miafina ao amin’ny HAMASHIAH Efa lasanao aho ADONAI Ka ho hitan’izao rehetra izao fa ato amiko Ianao Ampahafantariko an’izao rehetra izao fa ato amiko ","","","",""),
                (1,"MINIA MANOTA","0","","" ,"","P1,P2,P1","Efa ampy ny fahaverezana Ho an’ireo izay minia manota Tsy misy intsony fahabedesana Ho an’izy ireo ","Afo be efa miandry azy Inona intsony moa no anapiana izany Efa ampy ny fahaverezana ho an’izy ireo ","","","",""),
                (3,"Mieritrereta","0","","" ,"","P1,P2,P3,P4,P5","NA NY FAHATANORANA, NA NY FAHATANJAHANA IZAY ITOKISANAO, DIA ZAVA-POANA IHANY IZANY NY FAHARATSIANA ESORY LAVITRA ANAO NY FAHITSIANA RAIKETO AO AM-PONAO FA TSY MISY MANAN-KERY HAHATANA NY AINY NA HAHAY HANAMPY NY ISAN'NY ANDRO IAINANY","SAINGY TSY VETIVETYNY FAMALIANA NY RATSY IZAY ATAO, DIA MISY MIKIRY NEFA TSY HISY SOA HO AN'IZAY IZAY RATSY FANAHY FA HO TOY NY ALOKA TSY HAHARITRA IZY FA NA NY FAHATANORANA, NA NY FAHATANJAHANA IZAY ITOKIANY DIA ZAVA-POANA HANDALO IHANY NY FAHARATSIANA ESORY LAVITRA ANAO FAHAMARINANA NO AMPIARO AMIN'NY FIAINANAO FA IZAY REHETRA ATAO, NA TSARA NA NY RATSY NO ENTIN'I ADONAI HITSARANA ANAO","AMIN'NY MAHAFALY MIFALIA AMIN'NY ANDRO MAHAORY MIERITRERETA FA NAMPIFANDIMBIASIN'ELOHIM ZANY REHETRA ZANY TSY AHITAN'NY OLONA IZAY HO AVY ANY AORIANA ANY ADONAI IHANY NO ATAHORY ARY NY DIDINY REHETRA NO TANDREMO F'IZANY IHANY NO TOKONY ATAO ATAON'NY OLONA FA IZAY ATAON'I ADONAI NO MAHARITRA","FA NA NY FAHATANORANA NA NY FATANJAHANA IZAY ITOKISANAO DIA ZAVA-POANA MANDALO IHANY NY FAHARATSIANA ESORY LAVITRA ANAO NY FAHITSIANA RAIKETO AO AM-PONAO FA TSY MISY MANAN-KERY HAHATANA NY AINY NA HAHAY HANAMPY NY ISAN'NY ANDRO IAINANY","NYT RATSY FANAHY TSY HO VOAVONJY AMIN'NY FAHARATSIANY IZAY MATAHOTRA AN'I ADONAI NO AVOTANY SATRIA TIANY",""),
                (3,"Elohim any amin'ny 1000","0","","" ,"","P1,P2,P3,P4,P5","TSY HO VOAFEHY ANATY TENY NY VONINAHITR'ELOHIM TSY VOAFARITR'IZAY HITA MASO NY FAHALEBIAZAN'I ELOHIM ANY AMIN'NY RAQIA NO ITOERANY ANY AMIN'NY RAQIA ANY ANY NY FIANDRIANANY EO AMBONY VATO AFO IZY NO MITOETRA AMIN'NY HERINY ANY AMIN'NY TOERANA KADOSH NDRINDRA NO MISY AN'I ELOHIM ANY AMIN'NY RAQIA ANY NO ITSINJOAVANY ANTSIKA NO ITAHIANY NY ZANANY","TSY VOAFEHY ANATY FOTOANA NY FAHEFAN'I ELOHIM TSY VOAFARITRY NY HITA MASO NY FANAPAHAN'I ELOHIM MIDERA AZY SY MANAIKY AZY NY ZAVA-BOARY IZAY NOFORONINY NEFA ILAY FANEKENY DIA NATOKANY HO ANTSIKA","","TS'ISY TENY HAHAFARITRA NY VONINAHITR'ELOHIM TSY HO TAPITRA TSY HO VOAREFY NY FAHALEBIAZAN'ELOHIM","ANY AMIN'NY RAQIA ANY, LAY KADOSH INDRINDRA ANY AMIN'NY RAQIA ANY; MANAO TOERANA HO ANTSIKA ANY AMIN'NY RAQIA ANY, LAY RAY AVO INDRINDRA ANY AMIN'NY RAQIA ANY, ANY NO FANANTENANTSIKA","MAMPIRAPIRATRA ANY AMIN'NY AVO INDRINDRA NY VONINAHINY"),
                (3,"Mifankatiava","0","","" ,"P1","P1,P2,P1,P3,P1,P4","MIFANKATIAVA TAHAKA NY ATAON'NY MPIRAHALAHY MITARI-DALANA HO AMIN'NY FIFANOMEZAM-BONINAHITRA MIFANKATIAVA TAHAKA NY ATAON'NY MPIRAHALAHY FA [TSARA IZANY](2) EO ANATREHAN'I ADONAI","FIFANKATIAVAN'NY MPIHAVANA DIA TIAN'I ADONAI FIFANARAHAN'NY MPIVADY ANKASITRAHAN'I ADONAI MIARA-ORY, MIARA-FALY NY TENA MPIRAHALAHY MIARA-MONINA ANATY FITIAVANA NO TENA MAHAFINARITRA","MIFANOMEZA TANANA MBA MIFANAMPY INDRAINDRAY RAHA MISY AZON'NY TANANAO OMENA AZA FIHININA HO ANAO MIFAMPAHERY, MITONDRA AM-BAVAKA HO AN'NNY RERAKA MIARA-MONINA ANATY FITIAVANA NO TENA TIAN'I ADONAI ARAHO TSARA IZAY LAZAIN'I DONAI ARAHO TSARA FA MISY FITAHIANA IZANY","MIFANKATIAVA AMIN'NY TSY FIATSRAM-BELATSIHY MIFANANARA HO AMIN'NY MARINA IZAY REHETRA ATAO ALAVIRO IZAY MITARIKA HIALA AMIN'NY LALANAO AZA MAHAFOY NY DIDIN'I ADONAI IZAY FITAHIANA HO ANAO","FIFANKATIAVAN'NY MPIHAVANA DIA TIAN'I ADONAI FIFANARAHAN'NY MPIVADY ANKASITRAHAN'I ADONAI MIARA-ORY, MIARA-FALY NY TENA MPIRAHALAHY MIARA-MONINA ANATY FITIAVANA NO TENA MAHASAMBATRA TSY MISY FIANGARANA ARY TSY MAMADIKA NY TENA FITIAVANA FA MAMPIADANA",""),
                (3,"Kadosh IEHOVAH","0","","" ,"P2","P1,P2,P3,P2,P4,P2,P5","ADONAI MPANJAKA, AOKA HANGOVITRA NY FIRENENA MIPETRAKA AM'KEROBIMA IZY AOKA HIHOROHORO NY TANY LEHIBE ANY ZIONA IEHOVAH ADONAI AVO AMBONIN'NY FIRENENA REHETRA IZY","KADOSH IEHOVAH, KADOSH IEHOVAH DERAINA NY ANARANY LEHIBE","AMPITOERINY NY FAHITSIANA ARY TIA NY RARINY INDRINDRA IZY NY FAHAMARINANA SY FITSARANA NO ATAONY AMIN'NY OLONY MANANDRATA AN'I ADOAI ELOHEINU KA MIANKOHOFA EO AMIN'NY FITOERA-TONGONY","IREO MPISORONA SY MPAMINANY NITANDRINA NY DIDY IZAY NOMENY NIANTSO AN'ADONAI IREO, ARY NAMALY AZY IZY NITENY TAMINY TANATY ANDRY RAHONA IZY","LEHIBE, KADOSH NY ANARAN'I ADONAI TENA KADOSH, LEHIBE NY ANARAN'I EL SHADAI TENA LEHIBE NY ANARANAO IEHOVAH O TENA KADOSH NY ANARANAO",""),
                (3,"Tandremo","0","","" ,"P1","P1,P2,P3,P1","AZA MANAO HAVANA RAHA MISY PATSA KA REHEFA MATAVY DIA MAMELY DAKA REHEFA AZONAO IZAY ILAINAO AZA MANAO HAVANA RAHA MISY PATSA NAHAZO TOERANA KELY DIA MANJAKAZAKA NIVADIHANAO ILAY NANAMPY ANAO TSY TSAROANAO ANGAHA ILAY NANDADILADY? NAHAFOY FOTOANA SY ANDRO SATRIA TENA NITADY LAY TENA FAHAMARINANA NAMITSAKA ERY TAM'ZANY ANDRO ZANY VAO NAHAZO TENY SY HAFATR'I ADONAI DIA MITOMANY MBOLA NADIO SY TOROTORO NY FO FA TE HO AO AMIN 'IESHUA NO TAO AN-DOHA","AZA MITSIPA-DOHA NY LAKA-NITANA REHEFA ANY AMBADIKA ANY DIA TENA VAVANA MANARATSY ERY, MIATSARA-IVELATSIHY AZA MANAO HAVANA RAHA MISY PATSA VAO NISONDROTRA KELY DIA SAHY MANDATSA IZAY NANAMPY ANAO NO ITSAHINAO MANDRAHONA, HONO, RE ANY AMBADIKA ANY DIA TENA MANADINO FA MISY FETRANY IHANY IZANY REHEFA TONGA HAMALY ADONAI ZAZA TSY MAHATOKY, MPIVADIBADIKA FA IZY OMENA INDRAY NO MANGARINGARIKA DIA GAGA IANAO AMIN'NY TOETRANY FA LASA TSY METY MANDRAY NY ANATR'I EL SHADAI","NIHANATAVY NY SASANY KA SAHY NANDAKA VORY NOFO, VAVENTY DIA MANJAKAZAKA, MAMADIKA, MIVADIKA MIREHAREHA, MIEBOEBO, MIVATRAVATRA MANDEHANDEHA, MISEHOSEHO, MIRANGARANGA TSISY TAHOTRA NITSIPA-DOHA NY LAKA-NITANA IZY IREO E TSY MITSINJO IZAY IHAFARANA IZY IREO E KA TONGA ZAVA-POANA MIREHAREHA, MIEBOEBO, MIVATRAVATRA MANDEHANDEHA, MISEHOSEHO, MIRANGARANGA TS'ISY TAHOTRA","","",""),
                (3,"Thlh 33","0","","" ,"P1","P1,P2,P1,P3,P4","SAMBATRA NY FIRENENA IZAY MANANA AN'I ADONAI HO ELOHIM DIA IZAY OLONA REHETRA NOFIDIN'I ELOHIM HO LOVANY","INDRO NY MASON'I ADONAI MITSINJO IZAY MATAHOTRA AZY DIA IZAY MANANTENA IZAY MANANTENA NY FAMINDRAM-PONY MBA HANAFAKA ENY HANAFAKA NY FANAHINY AMIN'NY FAHAFATESANA SATRIA MATOKY NY ASAN'I ADONAI ","NY FANAHINTSIKA NY FANAHINTSIKA MIANDRY AN'I ADONAI FA FAMONJENA ANTSIKA IZY SY AMPINGANTSIKA HIFALIAN'NY FONTSIKA SATRIA NY ANARANY KADOSH IO IHANY NO ITOKIANTSIKA AOKA NY FAMINDRAM-PONAO HITOETRA AMINAY ARAKA NY ANANTENANAY ANAO AOKA HATAHOTRA AN'I ELOHIM NY TANY REHETRA AOKA HANGOVITRA EO ANATREHANY NY MPONINA NY MPONINA REHETRA AMIN'IZAO TONTOLO IZAO","AOKA HIHOBY AN'I EL SHADAI NY MARINA FA MENDRIKA ATAO IZANY AMIN'NY LOKANGA NO HIDERAO AN'I EL SHADAI MANKALAZA AZY AMIN'NY VALIHA AMIN'NY FIHIRAM-BAOVAO NO HIDERAO AZY MITENDRE TSARA AMIN'NY FEO FIFALIANA HENOKY NY FAMIN-DRAM-PON'I ADONAI NY TANY MAHATOKY AVOKO, MAHATOKY (x2) MAHATOKY AVOKOA NY ASANY NY ASANAO IEHOVAH OH, MAHATOKY AVOKOA NY ASANAO IEHOVAH OH, TSARA AVOKOA","",""),
                (3,"Thlh 27","0","","" ,"P2","P1,P2,P3,P2,P4,P2,P5","ZAVATRA IRAY LOHA NO NANGATAHIKO TAMIN'I ADONAI IZANY NO TADIAVIKO DIA NY HITOETRA AO AN-TRANON'I ADONAI AMIN'NY ANDRO REHETRA IAINAKO MBA HO FALY MIJERY NY FAHASOAVAN'I ADONAI SY MANDINIKA NY HEYHAL-NY FA HANAFINA AHY AO AN-TRANO FIALOFANY AMIN'NY ANDRO FAHORIANA IZY HAMPIERY AHY AO AMIN'NY FIERENY AO AN-DAINY","ADONAI, NO FAHAZAVAKO ADONAI, NO FAMONJENA AHY IZA NO ATAHORAKO F'IZY NO FIAROVANA MAFY HO AN'NY AIKO IZA NO HANGOVITAKO FA NY FAHAVALO SY NY MPANDRAFY KOA DIA HO TAFINTOHINA KA HO LAVO ARY TSY HATAHOTRA NY FOKO","MIHAINOA ADONAI O FA MITARAINA MAFY AHO ; AMINDRAO FO ARY AOKA HO ASANDRATRAO AMBONIN'NY FAHAVALOKO NY LOHAKO HANATITRA FANATITRA HIHOBIANA AO AN-DAINAO AHO HIHIRA SY HANKALAZA AN'I ADONAI EFA NOTADIAVIKO NY TAVANAO FA FAMONJENA AHY IANAO ADONAI AZA MANARY NA MAHAFOY AHY","FAMONJENA AHY SY FAHAZAVAKO IANAO O ! FIAROVANA ITOKIAKO","OUH !OUH ! ADONAI TSY HATAHOTRA NY FOKO SATRIA AN-DAINAO ADONAI ADONAI NO MIARO AHY ADONAI NO FAMONJENA AHY",""),
                (2,"Ny tantaran'ny Zanak'Israel","0","","" ,"P1","P1,P2,P1,P3","NY TANTARAN’NY ZANAK’ISRAEL","TANTARA TSY ADINO TSY VOAFAFA AO ANTSAINA TSY AZO ODY TSITA FA HITAN’IZAO TONTOLO IZAO ","NAVOAKA AVY TAO AMIN’NY TANY MITSRAIM KA NISARAKA NY RANOMASINA MENA 430 TAONA NIJALY TANY EGYPTA NY RAZANTSIKA TAMIN’IZANY FOTOANA IZANY ","","",""),
                (2,"Haftaah","0","","" ,"P1","P1,P2,P3","HO AVY IESHUA. ENY HO AVY IZY NY ALAHELONAO APETRAO AMINY ANDAO AMIN’IZAY HIDERA AZY ","IERUSHALAIM DIA FITOERANA KADOSH ARY HO FAFANY NY RANOMASONAO ARY HITOETRA ANY IANAO MANDRAKIZAY DORIA ","ARY ABRAHAMA DIA HO HITANAO AMIN’IZAY TSY IZY IRERY IHANY FA MPAMINANY HAFA KOA DIA HO ISY HAFTAAH AMIN’IANY ANDRO IZANY ","","",""),
                (2,"Amin'izay andro izany","0","","" ,"P2","P1,P2,P3","AMIN’IZANY ANDRO IZANY SY AMIN’IZANY FOTOANA IZANY HOY I ADONAI DIA HO AVY NY ZANAK’ISRAEL IZY MBAMIN’NY TARANAK’IEHODAH ENY ANDEHA IZY SADY HITOMANY ENY AMPANDEHANA ANY KA HITADY AN’ADONAI ELOHEIHEM ANONTANY NY LALANA MANKANY ZIONA IZY SADY HANATRIKA ANKANY KA ANAO HOE ","AVIA KA MANEKE HO AN’I ADONAI AMIN’NY FANKEKENA MANDRAKIZAY IZAY TSY HO ADINOINA ","AMIN’IZANY ANDRO IZANY NO ITONDRAKO ANAREO MIDITRA ETO AMIN’IZANY ANDRO IZANY NO HANANGONAKO ANAREO FA HATAOKO ANARANA SY HO FIDERANA ANY AMIN’NY FIRENENA REHETRA MITADY ANAREO HAMPODIAKO AVY AMIN’NY FAHABABOANA IANAREO KA HO HITAN’NY MASONAREO FA IZAHO NO ADONAI ","","",""),
                (2,"Elatra","0","","" ,"P2","P1,P2,P3","NA DIA NY TANORA FANAHY AZA DIA METY HO RERAKA NA DIA TANORA FANAHY AZA DIA METY HO SASATRA HATRAMIN’NY ZATOVO DIA METY TAFINTOHINA ","FA IZAY MIANDRY AN’I IEHOVAH DIA MANDROSO HERY KOSA FA IZAY MIANDRY AN’I IEHOVAH DIA MANDROSO HERY KOSA ","ELATRA NO HIAKARANY TAHAKA NY VOROMAHERY HIAZAKAZAKA IZY NEFA TSY HO SASATRA ANDEHA IZY NEFA TSY HO RERAKA TSY HO RERAKA ","","",""),
                (2,"Israel mamash","0","","" ,"P1","P1,P1,P2,P3","FA NOHO NY AMIN’ISRAEL ADONAI NO NAFOIZANAO NY ZANAKAO ILAY LAHY TOKANA MBA TSY HO VERY IZAY REHETRA MIALOKA AMINAO ","FA NIJALY TOKOA IANAO TS’ISY TSINY NEFA NOVONOINA LEHIBE NY FITIAVANAO KA DIA AVOTRA IZAHAY ","NY FANATITRA HO DORANA TSY NAHAFALY ANAO INTSONY TENA FONGOTRA IZAHAY FA RAHA TSY TEO IANAO IESHUA DIA VOA MAFY IZAHAY ","","",""),
                (2,"Hobio IEHOVAH HAAV","0","","" ,"P2","P1,P2,P3,P4,P2","HOBIO IEHOVAH HAAV DERAO NY ANARANY ANKALAZAO KOA IESHUA HAMASHIAH IZAO REHETRA IZAO ASAN-TANANY NY FAMONJENY NO RAISINAO MIFIKIRA AZA MIOVA NA MIALA EH IEHOVAH IHANY NO TOKINAO RY ISRAEL ","DERAO IEHOVAH DERAO IEHOVAH FA IZY NO MPANJAKATSIKA DERAO IESHUA DERAO IESHUA FA IZY NO MPANAVOTRA DERAO AMIN’NY DIHY SY NY VALIHA AIZA NY AMPONGA SY ZAVA-MANENO ? DERAO AMIN’NY DIHY SY NY VALIHA AIZA IANAREO AVIA DERAO I IESHUA ","DERAO IEHOVAH DERAO IEHOVAH DA IZY NO MPANJAKA ANTSIKA DERAO IESHUA DERAO IESHUA FA IZY NO MPANAVOTRA IANAO IRERY ADONAI OH NO TOKINAY SY HERINAY IANAO IRERY ADONAI OH DIA EFA AMPY ANAY ","ANDAO ATSANGANA NY FANEVA ANDAO HANANGANA NY ISRAEL ANDAO ATSANGANA NY ISRAEL MATANJAKA SADY KADOSH HO AN’I ADONAI ","",""),
                (2,"Inty ny ora","0","","" ,"P1","P1,P2,P3","ANONTANIO NY TENANAO HOE IZAHO VE VOAFIDY ? MARO NY ANTSOINY DIA IZAHO VE VOAFIDY ? ","FA NY ATAONAO IHANY NO MAHAVONJY ANAO NO OTSARANAO FA NY ATAONAO IHANY NO MAHAVERY ANAO NY TOETRANAO ","ITY NY ORA TAPAO NY HEVITRAO RAHA HIARAKA AMINAY DE ANDAO ATOLOTRAY NY FONAY HO AN’ELOHIM AVAO BE MALKHUT HASHAMAIM ","","",""),
                (2,"Oay","0","","" ,"P1","P1,P2,P3","OAY ! FA INONA LOATRA IZAHAY ? ","TARANAK’I IAAKOVA IZAHAY FA TONGA AO AMIN’NY TOBY I IEHOVAH MIFALIA KA MIHOBIA AMIN’IZAY","AMBARAO KA LAZAO RY ISRAEL FA INONA NY ANTON’IZAO ? *2 FA HIVERINA AMINAY INDRAY IZY*2 FA TSY MISY TOA ANAO*2 RY ISRAEL ","","",""),
                (2,"Josoa (fa miafina)","0","","" ,"P1","P1,P2,P1,P3,P1","FA MIAFINA INDRO NY FANDRESENA ","MBOLA TSY FANTATRAO HATRAMIN’IZAO VE RY ISRAEL FA MODY RESY IANAO REHEFA MIARAKA AMIN’IESHUA TOY IZANY TAMN’I JOSOA ","AZA KIVY IANAO AOKA HO TONY NY FONAO SAMBATRA IZAY VOAENJIKA NOHO I IESHUA FA HANDRAY NY VALISOA ","","",""),
                (2,"Zana-tsipika","0","","" ,"P2","P1,P2,P3,P2","RAHA MBOLA HISY HIBITSIKA AMIKO HOE RAVA ESHRON RAHA MBOLA HISY HILAZA AMIKO HOE POTIKA ESHRON ADONAI AROVY AHO ADONAI OMEO HERY AHO ADONAI VONJEO ","NA DIA EFA NISY, TSY NATAHOTRA AHO NA DIA MBOLA MISY, MATOKY AHO NA DIA MBOLA HISY, HIFIKITRA AMINAO ","IZAHO MINO MIHITSY ATO ANATIKO (FA) HO AVY ESHRON AMBARAKO AMINY ILAY TENY TSY TANTINY, VELONA ESHRON ADONAI OH DIA FALY AHO ADONAI OH MITSANGANA AHO ADONAI VONJEO ","","",""),
                (2,"Baruh Haba","0","","" ,"P1","P1,P2,P3,P4,P5,P3","BARUH HABA FENOY FIFALIANA AHO ADONAI OH. FENOY FIFALIANA AHO ","TAMIN’IZANY FOTOANA IZANY INDRINDRA NO NILAZA HAMASHIAH (bat) FA TSY AHITA INTSONY IANAREO (ben)","RAHA TSY MITENY MANAMBARA HOE BARUH HABA BESHEM ADONAI","TAMIN’IANY FOTOANA IZANY INDRINDRA NO NITENY AN’IZANY (bat) FA TSY AHITA INTSONY IANAREO (ben)","KA HITENY HANAMBARA HOE BARUH HABA BESHEM ADONAI",""),
                (2,"Hira vaovao","0","","" ,"P2","P1,P2,P3,P4,P5,P2","ANKALAZAO IESHUA AVIA DERAO IESHUA MENDRIKA HO DERAINA FA IANAO NANDRESY ","HIHIRA HIRA VAOVAO HO ANAO (HIRA VAOVAO) HIHIRA HIRA VAOVAO HO ANAO HO ANAO ADONAI OH ","BEN: ZAVA-DEHIBE NO NIDINAN’I IESHUA ZAVA-DEHIBE HO ANTSIKA IZAO MATY HO ANTSIKA DIA NIAKATRA INDRAY HIVERINA HO AMIN’NY VONINAHINY ","BAT: RAHA MBA FANTATRY NY FAHAVALO DIA TSY NOVONOINY I HAMASHIAH ","TSY HO ADINOINA MANDRAKIZAY NY FITIAVANAO FIHIRAM-BAOVAO NATOLOTRAO HO ANAY IESHUA ",""),
                (2,"Ts'isy manana","0","","" ,"P4","P1,P2,P3,P4","TS’ISY MANANA NY ANAY : FIFALIANAY SATRIA AVY AMINAO IZANY ADONAI MAHARITRA TSY MORA LEFO TOY NY AN’NY HAFA ","MBOLA HAFA IHANY KOA NY FIHARAHANAY SATRIA MIARAKA AMINAO IZANY ADONAI TENA KADOSH FENO NY FANATREHANAO ","FIFALIANA NY ANDRONAY REHETRA REHEFA MIARAKA AMINAO IZAHAY NY ANDRO FIVORIANAY TS’ISY MANANA SATRIA VOATENDRINAO IZANY ADONAI ","OUH OUH LAFATRA OUH OUH FIFALIANAY TENA LAFATRA NY FIFALIANAY ARY FATRATRA NY FIRAVOANAY TSY HO ATAKALO TSY MISY MPANANA TSY FOINAY FA REHAREHANAY SATRIA IZAHAY IRERY IHANY NO MANANA ANAO ","",""),
                (2,"El Shadai miandry","0","","" ,"P1","P1,P1,P2,P2,P3,P4,P5,P5","FA EL SHADAI MIANDRY MBA HAMONJENY ANAO","KANEFA TSY MBOLA HAINAO RY ISRAEL NY MIARAKA AMINY","HATRAMIN’IZAY DISO FOANA IANAO RY ISRAEL","VOASAKANA NY TSO-DRANO IZAY NOMENY HO ANAO","KA HAMPITOMBOY AMIN’IZAY NY FITIAVANAO",""),
                (2,"Jodasy","0","","" ,"P2","P1,P2,P3,P2,P4","DIA LASA I JODASY NAKANY AMIN’NY FARISEO KA NAMERINA VOLA TELOPOLO VIDIN’I IESHUA ","ITY NY VOLANAREO FA AVERIKO AMINAREO","NIHEVITRA AHO MANTSY FA HANAO FAHAGAGANA IESHUA HAMASHIAH KA IZY AFAKA (DIA ANA ILAY KESSEF)*2 DIA NAMALY NY LOHOLONA NY MPISORONA SY NY FARISEO AHOANA INONA MOA IZANY FA LASA IANAO APETRAO NY KESSEF ","MISAOTRA IESHUA FA NAVADIKAO HO FAMONJENA NY ADALAN’INGAHY JODASY ITY NY VOLANAREO FA AVERIKO AMINAREO ","",""),
                (2,"Koa mitandrema","0","","" ,"P2","P1,P2,P2,P3,P2,P2","BESTAKA NY FITAKA IZAY HITA ETO AN-TANY EH KOA MITANDREMA, KOA MITANDREMA ALEO MIBEBAKA IANAO FA TSY HO TAPITRA EH NY RENDRARENDRA ","KOA MITANDREMA IHANY EH KA MITANDREMA IHANY EH FA SAO VOAFITAKA FA SAO VOAFITAKA AH ","ITY MISY HAFATRA IRAY HO ANAREO HO ANAREO MANATRIKA ETO BETSAKA IREO FAHAVALO IZAY MANENJIKA EH TSY HO TAFAVOKA. TSY HO TAFAVOKA ","","",""),
                (2,"Fisaorana","0","","" ,"P2","P1,P2,P3,P2","IZAY AVY AMINAO DIA HISAORANAY SATRIA IANAO TIA ANAY SY MIAHY ANAY TS’ISY FITAKA IZAY AVY AMINAO SATRIA MARINA NY FITIAVANAO ANAY MARINA NY FITANTANANAO ","MAHAGAGA ANAY ADONAI NY FITIAVANAO NATOLOTRAO ANAY KA IZANY NO HIRAINAY SAOTRA DERA HAJA ATOLOTRA ANAO IRERY IESHUA ","INDRAINDRAY IZAHAY TOA TSY MAHATSIAHY NY FIAROVANAO NEFA IANAO TSY MAHAFOY TENA LALINA NY FITIAVANAO FA MAMINDRA FO TSY MIJERY, TSY MIAMPANGA NY TSY FAHATANTERAHANAY ","","",""),
                (2,"Davar","0","","" ,"P2","P1,P2,P3,P2","HO ANAO RY RAY OH ITY DAVAR ITY TSY HIEMOTRA INTSONY AHO FA HANDROSO TSY HIJERY AN’IZA N’IZA IZY IRERY IHANY NO NANOME IZAO ZAVATRA IZAO ","FA NANENENAKO AVOKOA IESHUA MIFONA AMINAO HANAO NY DINGANA VAOVAO HO ANAO ","ANIO DIA TAPAK’HEVITRA AHO FA HANDRAY NY HERY OMEN’I ADONAI (TSY HIEMOTRA INTSONY AHO) TSY HIEMOTRA INTSONY AHO FA HANDROSO TSY HIJERY AN’IZA N’IZA IZY IRERY IHANY NO NANOME IZAO ZAVATRA IZAO ","","",""),
                (2,"Abiba","0","","" ,"P1","P1,P1,P2,P2,P3","ABIBA AH TONGA NY ABIBA ","ARY ADONAI NITENY TAMIN’I MOSHEH ARY ADONAI NITENY TAMIN’I AARON HOE ABIBA IZAO ITY VOLANA ITY ","RY ISRAEL MBA HENOY RY ISRAEL HOE ABIBA IZAO ITY VOLANA ITY ","","",""),
                (2,"Anjaranao sisa","0","","" ,"P2","P1, P2,P3,P4,P5","EFA NATOLOTRY ADONAI NY FITAHIANY EFA NASEHON’I ADONAI NY FITARIANY KA LANJALANJAO FA ANDRONAO IZAO SAO HIDIFY ANAO NY LOVANAO HEVERO SY SAINTSAINO IHANY IZAY TENENINY FA TSY MBOLA NISY NIVERINA ANY RAHA TSY TANTERANY KA ANJARANAO FA ANDRONAO IZAO NY HANDRAY IZANY NA IAVONA ","ENY ANJARANAO TENA ANJARANAO SISA ANJARANAO *2 SISA DINIO IHANY NY HANDRAY NY TENY SY HANDRAY NY ANATRA RAISO NY TENY RAISO NY ANATRA AHASOA ANAO ENY ANJARANAO TENA ANJARANAO SISA ANJARANAO*2 SISA DINIO IHANY FA EFA NOMENY HO LOVANAO NY LANITRA EFA NOMENY, NOMENY ANAO IZANY, HO ANJARANAO ","EFA NOMANIN’I ADONAI NY FAMONJENA ANAO EFA NAMBOARIN’I ADONAI IZAY HONENANAO KA ANJARANAO, ANDRONAO IZAO NY HANDOVA IZANY NA KOA HANDA ","EFA NATAONY HO TSAPANAO NY FAHARETANY EFA NANAZAVANY ANAO NY FIREHETANY KA LANJALANJAO, ANDRONAO IZAO SAO HIDIFY ANAO NY LOVANAO ","EFA NOMANIN’I ADONAI NY FAMONJENA ANAO",""),
                (2,"3000 taona","0","","" ,"","P1","TELO ARIVO TAONA IZAY NO NANDROAHANAO ANAY TELO ARIVO TAONA IZAY NO VERY IZAHAY ADONAI O. NARIANAO MANDRAKIZAY VA IZAHAY ? NANOTA NY RAZANAY TSY ETY INTSONY IZY FA IZAHAY NO MIVESATRA NY HELONY ADONAI O. MIANJADY AMINAY NY OZONA ADONAI TSEVAOT AVERENO IZAHAY ","","","","",""),
                (2,"Fiderana miavaka","0","","" ,"P1","P1,P2,P1,P3,P1,P4","HALELOIA FIDERANA HO ANAO EE ; HALELOIA TENA MIAVAKA*2 ","HALELOIA HO ANAO RY EL SAHDAI FIDERANA MIAVAKA IZAHAY REHETRA HIONDRIKA EO AMINAO FA IANAO NO MPANJAKA ANAY","IANAO NAMONJY AHY KA TSY AVELAKO RAHA HITANISA NY FAHAGAGANAO DIA TSY HO TAPITRA RY EL SHADAI … OHHHH…. MANDRAKIZAY ","HALELOIA","",""),
                (2,"Ahoanao","0","","" ,"P1","P1,P2,P3,P4,P5,P6","OAY OAY HAINGANA ERY NY FIHEVITRAO MANAMELOKA IRY*2 OAY OAY OAY RATSY ERY NY FIJERINAO RAHA MANDINIKA IRY*2 NEFA IANAO TSY MAHALALA IZAY MARINA*2 AOKA ALOHA DINIO IHANY HOE AHOANA IANAO SAO HO MAFY NO IZANY NO AHAZO ANAO ADONAI NO MPITSARA IZY IRERY IHANY ","OAY OAY TOA HAINAO ERY NY MODY MANADINO NY NATAONAO TAMIN’IRY*2 OAY OAY HAINAO ERY MANOME TSINY IRY OLONA IRY*2 IANAO TSY TE HAHALALA IZAY HIAFARANY ANY*2 AOKA ALOHA DINIO IHANY HOE AHOANA IANAO SAO HO MAFY NO IZANY NO AHAZO ANAO FA IANAO TSY MAHALALA NY HO AMPITSONAO ","TENA HAINAO ERY NY MANIPY NY TENY NY MITSIKERA KOA ARY IZAY TRATRAN’IRENY METY HIRENIRENY ENY, METY HO LAVO IHANY KOA AOKA HO FANTATRAO FA ANY AM-PARANY MBOLA HISY FITSARANA ALAVIRO IZANY SAO HO VERY IANAO MBOLA HISY FITSARANA ","TIA TENA, MPANDOKA TENA MPIAVONAVONA TSY MANAJA IZAY KADOSH MPITENY RATSY IH, TSY MISAOTRA MANENDRIKENDRIKA TSY MANOA RAY SY RENY ","OAY OAY HAINGANA ERY NY FIHEVITRAO MANAMELOKA IRY OAY OAY RATSY ERY NY FIJERINAO RAHA MANDINIKA IRY OAY OAY TOA HAINAO ERY NY MODY MANADINO NY NATAONAO TAMIN’IRY OAY OAY HAINAO ERY NY MANOME TSINY IRY OLONA IRY ","MAZOTOA MANOLOTRA NY TENANAO AMIN’ELOHIM MPITSARATSARA NY TENY FAHAMARINANA "),
                (2,"Tsy fantatrao","0","","" ,"P2","P1,P2,P3,P2","TSY EFA FANTATRAO VE FA TSY AZO ALEHA ANIE ANY MBOLA MISEHO HO MAFY LOHA FOANA FOANA IHANY MORAMORA IANAO RY ZANAK’ELOHIM TSY FANTATRAO NY ZAVATRA MIANDRY ANY AORINA MORAMORA IANAO RY ZANAK’ELOHIM. TSY FANTATRAO *3 ","RAISO NY TENY ANAMBOARANY ANAO HO HITANAO FA HITOMBO HERY SY FITAHIANA MIARAKA AMIN’I ADONAI ","TSY EFA FANTATRAO VE ADONAI TSY MIVAZIVAZY NY HIAFARANAO IO ANIE HO VOAKAPOKA AMIN’NY SAZY MITANDREMA IHANY IANAO RY ZANAK’ELOHIM SAO TSY HO ZAKANAO NY ZAVATRA MIANDRY ANY AORIANA MITANDREMA IHANY IANAO RY ZANAK’ELOHIM. TSY HO ZAKANAO *3 TSY HO ZAKANAO IZAY MIANDRY ANY AORIANA ","","","")
                
                `,[],
                                  (sqlTxn, res)=>{
                  console.log('Song created')             
                },
                error =>{
                  console.log('error on displaying table' + error.message)
                }
              )
            })          
          }
        },
        error =>{
          console.log('error on displaying table' + error.message)
        }
      )
    })
  }
  useEffect(() => {  
    //  addSong();
    //  getListSong();
    //  getSong();
       createTableUser();
       createTableConnexion();
       createTableInfoapp();
       createTableArtist();
       createTableSong();
       addFirstUser();
       createTableRateUs();
       /*getListUserAPI();
       getUser();*/
       getInfoapp();
       getConnexion();
       addForTheFistTimeArtist();
       addForTheFistTimeSong();
       
      /* getListArtist();
         getArtist();
         getListSong();
         getSong();*/
        
        // dropTables('RateUs');
          createTableRateUs();
          getRateUs()
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
        }}
        />
        <Stack.Screen name="Song" component={Song}
         options={{
          title: 'Tonon-kira', //Set Header Title
          headerStyle: {
            backgroundColor: '#f7bd36', //Set Header color
          },
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
