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
      name: 'POOPY',
      avatar_url: require("../assets/images/poopy.jpg"),
      subtitle: 'Yeladim'
    },
    {
      id:'2',
      name: 'Ryvkah',
      avatar_url:  require("../assets/images/yael.jpg"),
      subtitle: 'Batim'
    },
  ];

const Home = ({ navigation }) =>{
    const [search, setSearch] = useState('');
    function ficheItem(id){
        console.log(id);
        navigation.navigate('FicheItem', {itemId: id});
    }
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/homeBackground.jpg")}
             style={{height:Dimensions.get('window').height/3.8,}}
             
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
                    {
                        list.map((l, i) => (
                        <TouchableOpacity
                         key={l.id}
                         onPress={()=>ficheItem(l.id)}
                         >
                            <ListItem  bottomDivider>
                                <Avatar 
                                rounded 
                                size={50}
                                source={l.avatar_url} 
                                />
                                <ListItem.Content>
                                <ListItem.Title style={{  fontWeight: 'bold', ...FONTS.h5 }}>{l.name}</ListItem.Title>
                                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
                                </ListItem.Content>
                                <Text>2012</Text>
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
export default Home;