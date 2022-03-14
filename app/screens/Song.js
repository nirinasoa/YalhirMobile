import React, {useState} from "react";
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
//theme
const {COLORS, FONTS, SIZES} = theme;


const Song = ({ route, navigation }) =>{
    const [search, setSearch] = useState('');
    const { itemId, idSong } = route.params;
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
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff',}} 
        showsHorizontalScrollIndicator={false}>
            {list.map((l, i) => (
            <ImageBackground
             blurRadius={5}
             source={l.image}
             style={{height:Dimensions.get('window').height}}
             
             >
                <View style={styles.containerTitle}>
                    <Text style={{ ...FONTS.h2,fontSize:27,color: COLORS.white,padding:10, }}>{l.title}</Text>
                    <Text style={{color: COLORS.white}}> ──────── <Ionicons style={styles.icon} testID="nextButton" name="heart" color="black" size={20}
                    />  ────────</Text>
                </View>
                <View style={styles.containerSong} >
                    <View style={styles.containerLyrix} opacity={0.8}>
                        <Text style={styles.lyrix} >
                            {l.lyrix}
                         
                         </Text>
                    </View>
                </View>
             </ImageBackground>
                    ))
                }
             
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
        fontSize:20,
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
       
    }
   
})
export default Song;