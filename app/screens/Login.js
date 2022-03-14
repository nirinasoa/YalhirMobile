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
import { images, theme } from "../constants/";
//theme
const {COLORS, FONTS, SIZES} = theme;


const Login = ({ navigation }) =>{
    const [password, setPassword] = useState('');
    function home(){
        if(password == "1351"){
            navigation.navigate('Home');
        }
        else{
            Alert.alert(
                "Diso ny code izay nosoratanao"
              );
        }
       
        console.log(password);
    }
    return (
        <ScrollView style ={{flex:1, backgroundColor:'#ffffff'}} 
        showsHorizontalScrollIndicator={false}>
             <ImageBackground
             source={require("../assets/images/loginBackground.png")}
             style={{height:Dimensions.get('window').height/2.5,}}
             
             />
             <View style={styles.bottomView}>
                <View style={{padding:50}}>
                    <Text style={{ ...FONTS.h2,fontSize:27,color: COLORS.black}}>Welcome to Yalhir </Text>
                    <Text style={{ ...FONTS.body4,color: COLORS.gray}}>Andao aingana ary hiara hira isika 734 eh</Text>
                    <Text style={{ ...FONTS.body4,color: COLORS.gray}}>Arahana tsara ilay hira amin'izay tsy diso</Text>
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
                    backgroundColor:'orange',
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
        left:35
        
    },
    bottomView:{
        flex:1.5,
        backgroundColor:'#ffffff',
        bottom:50,
        borderTopStartRadius:60,
        borderTopEndRadius:60,
    },
    button:{
      padding:10,
    
 
    }
})
export default Login;