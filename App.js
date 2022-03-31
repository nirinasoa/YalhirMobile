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
                (4,"FFHS","0","","" ,"P2","P1,P2,P3,P4,P2,P5","Koa amin' izany na inona na inona ataonareo Koa amin' izany tiava an' IEHOVAH o o o","Tiava an' IEHOVAH Eloheiha Amin'ny fonao rehetra sy ny Fanahinao rehetra sy ny herinao rehetra ary ny sainao rehetra (*2)","Ary tiava ny namanao tahaka ny tenanao Izany no didy lehibe (2) sady voalohany (2)","Koa amin'izany na inona na inona tianareo Ataon'ny olona aminareo Dia mba ataovy aminy kosa tahaka izany (2) Fa izany no lalàna sy mpaminany Fa izany no torah sy navi"," ELOHIM AVINU DIA FITIAVANA ELOHIM ELKANA DIA FITIAVANA ELOHIM EL SHADDAI DIA FITIAVANA ADONAI ELOHIM DIA FITIAVANA IESHUA HAMASHIAH DIA FITIAVANA NY FANAHY KADOSH ATO AMINTSIKA MISY FITIAVANA FITIAVANA MANDRAKIZAY NO NITIAVANY ANTSIKA NY FIAINANTSIKA AO AMIN’IESHUA DIA FITIAVANA",""),
                (4,"Ny anaranao","0","","" ,"","P1,P2,P3,P4,P5","Ny famindramponao no hiraiko Ny anaranao IESHUA HAMASHIAH no deraiko Adonai ô, Adonai ô araka ny teninao Ny famindramponao no hiraiko Ianao no HAMASHIAH hankalazaiko Adonai ô, Adonai ô satria tsara ianao","Araka ny haben'ny famindramponao no hiderainay ny anaranao Adonai ô, Adonai ô hakadoshina Ianao","Hamorony fo madio Adonai ô Hatahorako anao Ieshua Hamashiah Hitandremako ny didinao Fenoy Fanahy Kadosh aho Ieshua ô Handehanako amin'ny Fanahinao Hitandremako ny didinao ","Tsarovy Adonai, ny nandehanako Tsarovy Adonai teo anatrehanao Tsaraovy Adonai, ny fifaliako Tsarovy Adonai, sy izay tsara eo anatrehanao Tsarovy Adonai, ka hasoavy aho Noho ny soa rehetra tao amin'ny heyhal-nao Tsarovy Adonai, avy tany aminao ireny hery rehetra ireny","Ny famindramponao no hiraiko Ny anaranao IEHOVAH no deraiko Adonai ô, Adonai ô satria tsara Ianao Ny famindramponao no hiraiko Ny anaranao IEHOVAH no IESHUA deraiko Adonai ô, Adonai ô Elohim Ianao (2)",""),
                (4,"Mamela heloka","0","","" ,"P2","P1,P2,P2","Mifandeferana ka mifamela heloka ianareo raha misy manana alahelo amin'ny sasany Tahaka ny hamelan' IESHUA ny helokareo No mba hamelanareo heloka kosa ","pppp","","","",""),
                (2,"Mahasaropiaro anay","0","","2022" ,"","P1,P2,P3,P4,P5,P6","TSY MORAMORA HO ANAY ANIE VAO TAFIDITRA AMZAO LALANA IZAO FA EFA ELA NO NITADY AHITA IZANY IZAHAY FA NOHO NY SITRAPON'ELOHIM DIA NAMPAHAFANTARINY ANAY ILAY FAMONJENA AVY AMIN'NY ANARAN'I IESHUA IESHUA IHANY, IZY IHANY NO ITOKIANA FA IZY IHANY, NO MANANA FAHEFANA IESHUA IHANY, NO MAHAVONJY, NA MAMELA HO VERY, IZY IRERY IHANY","IZAY NATSANGAN'I ADONAI TSY MISY MAHARAVA IZANY K'IZA NO SAHY HANOHITRA IZANY FAHEFANA IZANY","MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY IFIKIRANAY HATRAMIN'NY FARANY MIANGAVY AMINAO IZAHAY O MBA VANGIO ADONAI HAHAZO HERY, HOAZONINAY TSY HO VERY MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY TSY HO AVOTSOTRAY HATRAMIN'NY FARANY ","TSY HO MORAMORA HO ANTSIKA ANIE 'LAY FANADINANA AMIN'NY ANDRO IRAY REHEFA TONGA NY ORA HITSARAN'IESHUA HAMASHIAH RAHA TOA MISY AMINTSIKA IRETO SAHY MIODINA AMIN'ADONAI MANDÀ NY TENY IZAY MITARIKA ANTSIKA HO ANY AM' RAQIA","HENOY IHANY, ILAY IRAKA RAHA MITENY F'IZY IRERY IHANY, NO ITENENAN'IESHUA MBA RAISO IHANY NY HAFATR'IZAY OMENY F'IZANY NO ITARIHANA ANTSIKA, MAHASOA IZAY NATSANGAN'ADONAI TSY HISY HAHASAKANA IZANY NEFA MISY SAHY MANOHITRA IZANY FAHEFANA IZANY","MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY IFIKIRANAY HATRAMIN'NY FARANY MIANGAVY AMINAO IZAHAY O MBA TAHIO ADONAI HAHAZO HERY, HOAZONINAY TSY HO VERY MAHA-SARO-PIARO ANAY IZANY FAMONJENA IZANY TSY HO AVOTSOTRAY HATRAMIN'NY FARANY "),
                (2,"Aleo za mba hiteny","0","","2022" ,"","P1,P2,P3,P4,P5","RAHA HOE NANGINA AHO, HATRAMIN'IZAY TSY MIDIKA AKORY IZANY HOE IANAO NO MARINA ALEO ARY AHO HITENY FA AMPY ANGAMBA IZAY","EFA VOALAZA FA NY RATSY FANAHY DIA MAMOAKA NY RATSY IZAY MAMENO NY FONY ARY IZAY RAKETINY ANATY NO HITENENANY MANEHO NY TOETRANY","FA NY RATSY FANAHY TSY METY TAFATOETRA MALOTO FIJERY, MALOTO FISAINA IZAY MIHEVITRA FA EFA MAHAFEHY FENO FAHALALANA AN'ELOHIM ","NEFA NY ATAONY NA IZAY LAZAINY AZA MOA TS'ISY ARAK'IZAY TENY AMPIANARIN' IESHUA MIHARIHARY, MANITSAKA NY TORAH. DIA MBOLA MIHEVITRA FA MARINA","ZANATSIPIKANAO, NO LOKON'NY FONAO NY RARINY ITSAHINAO NY MARINA AVADIKAO K'ALEO AM'ZAY HITENY AHO FA TONGA NY FOTOANA",""),
                (4,"Tiako ny fitiavanao","0","","2021" ,"P1","P1","Test Hira","","","","",""),
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
                (3,"Mifankatiava","0","","" ,"P1","P1,P2,P1,P3,P1,P4","MIFANKATIAVA TAHAKA NY ATAON'NY MPIRAHALAHY MITARI-DALANA HO AMIN'NY FIFANOMEZAM-BONINAHITRA MIFANKATIAVA TAHAKA NY ATAON'NY MPIRAHALAHY FA [TSARA IZANY](2) EO ANATREHANI ADONAI","FIFANKATIAVAN'NY MPIHAVANA DIA TIAN'I ADONAI FIFANARAHAN'NY MPIVADY ANKASITRAHAN'I ADONAI MIARA-ORY, MIARA-FALY NY TENA MPIRAHALAHY MIARA-MONINA ANATY FITIAVANA NO TENA MAHAFINARITRA","MIFANOMEZA TANANA MBA MIFANAMPY INDRAINDRAY RAHA MISY AZON'NY TANANAO OMENA AZA FIHININA HO ANAO MIFAMPAHERY, MITONDRA AM-BAVAKA HO AN'NNY RERAKA MIARA-MONINA ANATY FITIAVANA NO TENA TIAN'I ADONAI ARAHO TSARA IZAY LAZAIN'I DONAI ARAHO TSARA FA MISY FITAHIANA IZANY","","MIFANKATIAVA AMIN'NY TSY FIATSRAM-BELATSIHY MIFANANARA HO AMIN'NY MARINA IZAY REHETRA ATAO ALAVIRO IZAY MITARIKA HIALA AMIN'NY LALANAO AZA MAHAFOY NY DIDIN'I ADONAI IZAY FITAHIANA HO ANAO","FIFANKATIAVAN'NY MPIHAVANA DIA TIAN'I ADONAI FIFANARAHAN'NY MPIVADY ANKASITRAHAN'I ADONAI MIARA-ORY, MIARA-FALY NY TENA MPIRAHALAHY MIARA-MONINA ANATY FITIAVANA NO TENA MAHASAMBATRA TSY MISY FIANGARANA ARY TSY MAMADIKA NY TENA FITIAVANA FA MAMPIADANA"),
                (3,"Kadosh IEHOVAH","0","","" ,"P2","P1,P2,P3,P2,P4,P2,P5","ADONAI MPANJAKA, AOKA HANGOVITRA NY FIRENENA MIPETRAKA AM'KEROBIMA IZY AOKA HIHOROHORO NY TANY LEHIBE ANY ZIONA IEHOVAH ADONAI AVO AMBONIN'NY FIRENENA REHETRA IZY","KADOSH IEHOVAH, KADOSH IEHOVAH DERAINA NY ANARANY LEHIBE","AMPITOERINY NY FAHITSIANA ARY TIA NY RARINY INDRINDRA IZY NY FAHAMARINANA SY FITSARANA NO ATAONY AMIN'NY OLONY MANANDRATA AN'I ADOAI ELOHEINU KA MIANKOHOFA EO AMIN'NY FITOERA-TONGONY","IREO MPISORONA SY MPAMINANY NITANDRINA NY DIDY IZAY NOMENY NIANTSO AN'ADONAI IREO, ARY NAMALY AZY IZY NITENY TAMINY TANATY ANDRY RAHONA IZY","LEHIBE, KADOSH NY ANARAN'I ADONAI TENA KADOSH, LEHIBE NY ANARAN'I EL SHADAI TENA LEHIBE NY ANARANAO IEHOVAH O TENA KADOSH NY ANARANAO",""),
                (3,"Tandremo","0","","" ,"P1","P1,P2,P3,P1","AZA MANAO HAVANA RAHA MISY PATSA KA REHEFA MATAVY MATAVY DIA MAMELY DAKA REHEFA AZONAO IZAY ILAINAO AZA MANAO HAVANA RAHA MISY PATSA NAHAZO TOERANA KELY DIA MANJAKAZAKA NIVADIHANAO ILAY NANAMPY ANAO TS TSAROANAO ANGAHA ILAY NANDADILADY? NAHAFOY FOTOANA SY ANDRO SATRIA TENA NITADY LAY TENA FAHAMARINANA NAMITSAKA ERY TAM'ZANY ANDRO ZANY VAO NAHAZO TENY SY HAFATRI ADONAI DIA MITOMANY MBOLA NADIO SY TOROTORO NY FO FA TE HO AO AMIN 'IESHUA NO TAO AN-DOHA","AZA MITSIPA-DOHA NY LAKA-NITANA REHEFA ANY AMBADIKA ANY DIA TENA VAVANA MANARATSY ERY, MIATSARA-IVELATSIHY AZA MANAO HAVANA RAHA MISY PATSA VAO NISONDROTRA KELY DIA SAHY MANDATSA IZAY NANAMPY ANAO NO ITSAHINAO MANDRAHONA, HONO, RE ANY AMBADIKA ANY DIA TENA MANADINO FA MISY FETRANY IHANY IZANY REHEFA TONGA HAMALY ADONAI ZAZA TSY MAHATOKY, MPIVADIBADIKA FA IZY OMENA INDRAY NO MANGARINGARIKA DIA GAGA IANAO AMIN'NY TOETRANY FA LASA TSY METY MANDRAY NY ANATR'I EL SHADAI","NIHANATAVY NY SASANY KA SAHY NANDAKA VORY NOFO, VAVENTY DIA MANJAKAZAKA, MAMADIKA, MIVADIKA MIREHAREHA, MIEBOEBPO, MIVATRAVATRA MANDEHANDEHA, MISEHOSEHO, MIRANGARANGA TSISY TAHOTRA NITSIPA-DOHA NY LAKA-NITANA IZY IREO E TSY MITSINJO IZAY IHAFARANA IZY IREO E KA TONGA ZAVA-POANA MIREHAREHA, MIEBOEBO, MIVATRAVATRA MANDEHANDEHA, MISEHOSEHO, MIRANGARANGA TS'ISY TAHOTRA","","",""),
                (3,"Thlh 33","0","","" ,"P1","P1,P2,P1,P3,P4","SAMBATRA NY FIRENENA IZAY MANANA AN'I ADONAI HO ELOHIM DIA IZAY OLONA REHETRA NOFIDIN'I ELOHIM HO LOVANY","INDRO NY MASON'I ADONAI MITSINJO IZAY MATAHOTRA AZY DIA IZAY MANANTENA IZAY MANANTENA NY FAMINDRAM-PONY MBA HANAFAKA ENY HANAFAKA NY FANAHINY AMIN'NY FAHAFATESANA SATRIA MATOKY NY ASAN'I ADONAI ","NY FANAHINTSIKA NY FANAHINTSIKA MIANDRY AN'I ADONAI FA FAMONJENA ANTSIKA IZY SY AMPINGANTSIKA HIFALIAN'NY FONTSIKA SATRIA NY ANARANY KADOSH IO IHANY NO ITOKIANTSIKA AOKA NY FAMIN-DRAM-PONAO HITOETRA AMINAY ARAKA NY ANANTENANAY ANAO AOKA HATAHOTRA AN'I ELOHIM NY TANY REHETRA AOKA HANGOVITRA EO ANATREHANY NY MPONINA NY MPONINA REHETRA AMIN'IZAO TONTOLO IZAO","AOKA HIHOBY AN'I EL SHADAI NY MARINA FA MENDRIKA ATAO IZANY AMIN'NY LOKANGA NO HIDERAO AN'I EL SHADAI MANKALAZA AZY AMIN'NY VALIHA AMIN'NY FIHIRAM-BAOVAO NO HIDERAO AZY MITENDRE TSARA AMIN'NY FEO FIFALIANA HENOKY NY FAMIN-DRAM-PON'I ADONAI NY TANY MAHATOKY AVOKO, MAHATOKY (x2) MAHATOKY AVOKOA NY ASANY NY ASANAO IEHOVAH OH, MAHATOKY AVOKOA NY ASANAO IEHOVAH OH, TSARA AVOKOA","",""),
                (3,"Thlh 27","0","","" ,"P2","P1,P2,P3,P2,P4,P2,P5","ZAVATRA IRAY LOHA NO NANGATAHIKO TAMIN'I ADONAI IZANY NO TADIAVIKO DIA NY HITOETRA AO AN-TRANON'I ADONAI AMIN'NY ANDRO REHETRA IAINAKO MBA HO FALY MIJERY NY FAHASOAVAN'I ADONAI SY MANDINIKA NY HEYHAL-NY FA HANAFINA AHY AO AN-TRANO FIALOFANY AMIN'NY ANDRO FAHORIANA IZY HAMPIERY AHY AO AMIN'NY FIERENY AO AN-DAINY","ADONAI, NO FAHAZAVAKO ADONAI, NO FAMONJENA AHY IZA NO ATAHORAKO F'IZY NO FIAROVANA MAFY HO AN'NY AIKO IZA NO HANGOVITAKO FA NY FAHAVALO SY NY MPANDRAFY KOA DIA HO TAFINTOHINA KA HO LAVO ARY TSY HATAHOTRA NY FOKO","MIHAINOA ADONAI O FA MITARAINA MAFY AHO ; AMINDRAO FO ARY AOKA HO ASANDRATRAO AMBONIN'NY FAHAVALOKO NY LOHAKO HANATITRA FANATITRA HIHOBIANA AO AN-DAINAO AHO HIHIRA SY HANKALAZA AN'I ADONAI EFA NOTADIAVIKO NY TAVANAO FA FAMONJENA AHY IANAO ADONAI AZA MANARY NA MAHAFOY AHY","FAMONJENA AHY SY FAHAZAVAKO IANAO O ! FIAROVVANA ITOKIAKO","OUH !OUH ! ADONAI TSY HATAHOTRA NY FOKO SATRIA AN-DAINAO ADONAI ADONAI NO MIARO AHY ADONAI NO FAMONJENA AHY",""),
                (2,"Ny tantaran'ny Zanak'Israel","0","","" ,"P1","P1,P2,P1,P3","NY TANTARAN’NY ZANAK’ISRAEL","TANTARA TSY ADINO TSY VOAFAFA AO ANTSAINA TSY AZO ODY TSITA FA HITAN’IZAO TONTOLO IZAO ","NAVOAKA AVY TAO AMIN’NY TANY MITSRAIM KA NISARAKA NY RANOMASINA MENA 430 TAONA NIJALY TANY EGYPTA NY RAZANTSIKA TAMIN’IZANY FOTOANA IZANY ","","",""),
                (2,"Haftaah","0","","" ,"P1","P1,P2,P3","HO AVY IESHUA. ENY HO AVY IZY NY ALAHELONAO APETRAO AMINY ANDAO AMIN’IZAY HIDERA AZY ","IERUSHALAIM DIA FITOERANA KADOSH ARY HO FAFANY NY RANOMASONAO ARY HITOETRA ANY IANAO MANDRAKIZAY DORIA ","ARY ABRAHAMA DIA HO HITANAO AMIN’IZAY TSY IZY IRERY IHANY FA MPAMINANY HAFA KOA DIA HO ISY HAFTAAH AMIN’IANY ANDRO IZANY ","","",""),
                (2,"Amin'izay andro izany","0","","" ,"P2","P1,P2,P3","AMIN’IZANY ANDRO IZANY SY AMIN’IZANY FOTOANA IZANY HOY I ADONAI DIA HO AVY NY ZANAK’ISRAEL IZY MBAMIN’NY TARANAK’IEHODAH ENY ANDEHA IZY SADY HITOMANY ENY AMPANDEHANA ANY KA HITADY AN’ADONAI ELOHEIHEM ANONTANY NY LALANA MANKANY ZIONA IZY SADY HANATRIKA ANKANY KA ANAO HOE ","AVIA KA MANEKE HO AN’I ADONAI AMIN’NY FANKEKENA MANDRAKIZAY IZAY TSY HO ADINOINA ","AMIN’IZANY ANDRO IZANY NO ITONDRAKO ANAREO MIDITRA ETO AMIN’IZANY ANDRO IZANY NO HANANGONAKO ANAREO FA HATAOKO ANARANA SY HO FIDERANA ANY AMIN’NY FIRENENA REHETRA MITADY ANAREO HAMPODIAKO AVY AMIN’NY FAHABABOANA IANAREO KA HO HITAN’NY MASONAREO FA IZAHO NO ADONAI ","","",""),
                (2,"Elatra","0","","" ,"P2","P1,P2,P3","NA DIA NY TANORA FANAHY AZA DIA METY HO RERAKA NA DIA TANORA FANAHY AZA DIA METY HO SASATRA HATRAMIN’NY ZATOVO DIA METY TAFINTOHINA ","FA IZAY MIANDRY AN’I IEHOVAH DIA MANDROSO HERY KOSA FA IZAY MIANDRY AN’I IEHOVAH DIA MANDROSO HERY KOSA ","ELATRA NO HIAKARANY TAHAKA NY VOROMAHERY HIAZAKAZAKA IZY NEFA TSY HO SASATRA ANDEHA IZY NEFA TSY HO RERAKA TSY HO RERAKA ","","",""),
                (2,"Israel mamash","0","","" ,"P1","P1,P1,P2,P3","FA NOHO NY AMIN’ISRAEL ADONAI NO NAFOIZANAO NY ZANAKAO ILAY LAHY TOKANA MBA TSY HO VERY IZAY REHETRA MIALOKA AMINAO ","FA NIJALY TOKOA IANAO TS’ISY TSINY NEFA NOVONOINA LEHIBE NY FITIAVANAO KA DIA AVOTRA IZAHAY ","NY FANATITRA HO DORANA TSY NAHAFALY ANAO INTSONY TENA FONGOTRA IZAHAY FA RAHA TSY TEO IANAO IESHUA DIA VOA MAFY IZAHAY ","","",""),
                (2,"Hobio IEHOVAH HAAV","0","","" ,"P2","P1,P2,P3,P4,P2","HOBIO IEHOVAH HAAV DERAO NY ANARANY ANKALAZAO KOA IESHUA HAMASHIAH IZAO REHETRA IZAO ASAN-TANANY NY FAMONJENY NO RAISINAO MIFIKIRA AZA MIOVA NA MIALA EH IEHOVAH IHANY NO TOKINAO RY ISRAEL ","DERAO IEHOVAH DERAO IEHOVAH FA IZY NO MPANJAKATSIKA DERAO IESHUA DERAO IESHUA FA IZY NO MPANAVOTRA DERAO AMIN’NY DIHY SY NY VALIHA AIZA NY AMPONGA SY ZAVA-MANENO ? DERAO AMIN’NY DIHY SY NY VALIHA AIZA IANAREO AVIA DERAO I IESHUA ","DERAO IEHOVAH DERAO IEHOVAH DA IZY NO MPANJAKA ANTSIKA DERAO IESHUA DERAO IESHUA FA IZY NO MPANAVOTRA IANAO IRERY ADONAI OH NO TOKINAY SY HERINAY IANAO IRERY ADONAI OH DIA EFA AMPY ANAY ","ANDAO ATSANGANA NY FANEVA ANDAO HANANGANA NY ISRAEL ANDAO ATSANGANA NY ISRAEL MATANJAKA SADY KADOSH HO AN’I ADONAI ","",""),
                (2,"Ity ny ora","0","","" ,"P1","P1,P2,P3","ANONTANIO NT TENANAO HOE IZAHO VE VOAFIDY ? MARO NY ANTSOINY DIA IZAHO VE VOAFIDY ? ","FA NY ATAONAO IHANY NO MAHAVONJY ANAO NO OTSARANAO FA NY ATAONAO IHANY NO MAHAVERY ANAO NY TOETRANAO ","ITY NY ORA TAPAO NY HEVITRAO RAHA HIARAKA AMINAY DE ANDAO ATOLOTRAY NY FONAY HO AN’ELOHIM AVAO BE MALKHUT HASHAMAIM ","","",""),
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
                (2,"Tsy fantatrao","0","","" ,"P2","P1,P2,P3,P2","TSY EFA FANTATRAO VE FA TSY AZO ALEHA ANIE ANY MBOLA MISEHO HO MAFY LOHA FOANA FOANA IHANY MORAMORA IANAO RY ZANAK’ELOHIM TSY FANTATRAO NY ZAVATRA MIANDRY ANY AORINA MORAMORA IANAO RY ZANAK’ELOHIM. TSY FANTATRAO *3 ","RAISO NY TENY ANAMBOARANY ANAO HO HITANAO FA HITOMBO HERY SY FITAHIANA MIARAKA AMIN’I ADONAI ","TSY EFA FANTATRAO VE ADONAI TSY MIVAZIVAZY NY HIAFARANAO IO ANIE HO VOAKAPOKA AMIN’NY SAZY MITANDREMA IHANY IANAO RY ZANAK’ELOHIM SAO TSY HO ZAKANAO NY ZAVATRA MIANDRY ANY AORIANA MITANDREMA IHANY IANAO RY ZANAK’ELOHIM. TSY HO ZAKANAO *3 TSY HO ZAKANAO IZAY MIANDRY ANY AORIANA ","","",""),
                (2,"Teo ianao Adonai","0","","2022" ,"P2","P1,P2,P2,P1,P3","Test ny Toky","AAAAAA","AAA","","",""),
                (3,"Test2","0","","" ,"P1","P1","aaaaa","","","","",""),
                (1,"Mila mahatoky","0","","2012" ,"P1","P1,P2,P1,P4,P1","P1--Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software","AAThere are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.","It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, 77sometimes on purpose (injected humour and the like).","AAA","",""),
                (1,"Ny Fitondranao ahy","0","","2021" ,"P3","P1,P2,P3","AAAAAA","AAAAAAAAAAA","","","","")
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
          title: 'Hira', //Set Header Title
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
