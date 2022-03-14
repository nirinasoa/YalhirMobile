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
const list = [
    {
      id:'1',
      name: 'Hanao ny sitrakao',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      subtitle: '2015'
    },
    {
      id:'2',
      name: 'Tia anao aho Ieshua',
      avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: '2018'
    },
  ];

const FicheItem = ({ route, navigation }) =>{
    const [search, setSearch] = useState('');
    const { itemId } = route.params;
    function displaySong(idSong){
        navigation.navigate('Song', {itemId: itemId, idSong:idSong});
    }
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/homeBackground.jpg")}
             style={{height:Dimensions.get('window').height/5.8,}}
             
             >
                  <View style={styles.inputContainer}>
                  <TextInput
                    label="Hitady"
                    style={styles.input}
                    placeholder="Hitady mpihira 734"
                    secureTextEntry={true}
                    defaultValue={search}
                    onChangeText={search => setSearch(search)}
                    />
                    <Ionicons
                    style={styles.searchIcon}
                    testID="nextButton"
                    name="search"
                    color="black"
                    size={24}
                    />
                 </View>
             </ImageBackground>
             <View style={styles.bottomView}>
                <View style={{paddingLeft:20, paddingRight:20}}>
                <Text style={{ ...FONTS.h2,fontSize:27,color: COLORS.gray,padding:10}}>Ireo hiran' i {itemId} </Text>
                    {
                        list.map((l, i) => (
                        <TouchableOpacity
                         key={l.id}
                         onPress={()=>displaySong(l.id)}
                         >
                            <ListItem  bottomDivider> 
                                <Ionicons
                                testID="nextButton"
                                name="md-musical-notes"
                                color="black"
                                size={24}
                                />
                                <ListItem.Content>
                                <ListItem.Title style={{  fontWeight: 'bold', ...FONTS.h3 }}>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>
                                <Ionicons
                                style={styles.icon}
                                testID="nextButton"
                                name="md-heart-outline"
                                color="black"
                                size={22}
                                />
                                </Text>
                            </ListItem>
                        </TouchableOpacity>
                        ))
                    }
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
    input:{
        color:COLORS.black,
        width:275,
        paddingLeft:10
      
 
    },
    icon: {
        flex: 1,
        color:'#f50a4c'
    },
    searchIcon: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        height:62,
        textAlign:'center',
        paddingTop:22
    },
    inputContainer:{
        opacity:0.7,
        alignItems:'center',
        justifyContent:'center',
        padding:50,
        flex: 1,
        flexDirection: 'row',
    }
   
})
export default FicheItem;