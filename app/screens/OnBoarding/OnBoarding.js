import React from "react";
import {
SafeAreaView,
View,
StyleSheet,
Text,
Animated,
Image,
TouchableOpacity
} from 'react-native';
import { images, theme } from "../../constants";
//Constants
const {onboarding1, onboarding2, onboarding3} = images;
//theme
const {COLORS, FONTS, SIZES} = theme;

//Dummy Data
const OnBoardings = [
    {
        title: "Ny fiderako Anao, ahitako fotoana foana",
        description:"Na dia maro aza ny zavatra atao",
        img:onboarding1
    },
    {
        title: "Te hihira ny hatsaranao aho Adonai",
        description:"Mamelombelona ny fanahy ny zavatra rehetra izay atolotrao ahy",
        img:onboarding2
    },
    {
        title: "IESHUA o hatreo aho",
        description:"Tsy mety raha tsy manatrika Ianao fa ho Anao no anaovako izao",
        img:onboarding3
    },
];

const OnBoarding = ({ navigation }) =>{
    //Render 
    const [completed, setCompleted] = React.useState(false);

    const scrollX = new Animated.Value(0);
    React.useEffect(()=>{
        // To check if user had finished scrolling the onBoarding pages
        scrollX.addListener(({value})=>{
            if (Math.floor(value / SIZES.width) === OnBoardings.length - 2){
                setCompleted(true)
            }
        })
        return () => scrollX.removeListener();
    },[]);
    function listOnBordings(){
        return OnBoardings.map((item, index)=>{
            return (
            <View
             key={index}
             style={{width: SIZES.width}}
             >
                <View style={{flex:1, alignItems:"center", justifyContent:"center",}}>
                     <Image 
                       source={item.img}
                        resizeMode="cover"
                        style ={{
                            width:"100%",
                            height:"100%"
                        }}
                    /> 
                </View>
                {/* Text */}
                <View 
                style={{
                    position:'absolute',
                    bottom:'10%',
                    left:40,
                    right:40
                }}
                >
                    <Text 
                        style={{
                        ...FONTS.h2,
                         color:'#4a4c4d',
                          justifyContent:'center',
                          alignItems:'center'
                        }}
                    >
                            {item.title}
                    </Text>
                    <Text
                        style={{
                          fontSize:18,
                          marginTop:SIZES.base,
                          color:'#4a4c4d',
                          justifyContent:'center',
                          alignItems:'center'
                        }}
                    >{item.description}</Text>
                </View>
                {/* Button */}
                {completed ?
                <TouchableOpacity
                style={{
                    position:'absolute',
                    bottom: 0,
                    right:0,
                    width:150,
                    height:60,
                    justifyContent:'center',
                    borderTopLeftRadius:30,
                    paddingLeft:20,
                    elevation:10,
                    borderBottomLeftRadius:30,
                    backgroundColor:'#914a17',
    
                }}
                onPress={()=>navigation.navigate('Login')}
                >
                    {
                    console.log(completed)}
                    <Text style={{...FONTS.h2,color: COLORS.white}}>Let's Go</Text>
                </TouchableOpacity>:
                 <TouchableOpacity
                 style={{
                     position:'absolute',
                     bottom: 0,
                     right:0,
                     width:150,
                     height:60,
                     justifyContent:'center',
                     borderTopLeftRadius:30,
                     paddingLeft:20,
                     elevation:10,
                     borderBottomLeftRadius:30,
                     backgroundColor:'#914a17',
     
                 }}
                 onPress={()=>navigation.navigate('Login')}
                 >
                     {
                     console.log(completed)}
                     <Text style={{...FONTS.h2,color: COLORS.white}}>Skip</Text>
                 </TouchableOpacity>
                
                }
            </View>
            )
        })
    }
    function renderContent() {
        return(
        <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
            {nativeEvent: {contentOffset:{x: scrollX}}}
        ], {useNativeDriver:false})}
        >
            {listOnBordings()}
        </Animated.ScrollView>
        )
    }
    function renderDots(){
        const dotPosition = Animated.divide(scrollX, SIZES.width);
        return (
            <View style={styles.dotContainer}>
                {OnBoardings.map((item, index)=>{
                    const opacity = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [0.3, 1,0.3 ],
                        extrapolate:'clamp'
                    })
                    const dotSize = dotPosition.interpolate({
                        inputRange: [index - 1, index, index + 1],
                        outputRange: [SIZES.base, 17 ,SIZES.base ],
                        extrapolate:'clamp'
                    })
                    return (
                        <Animated.View
                        key={`dot-${index}`}
                        opacity={opacity}
                        style={[styles.dot, {width:dotSize, height:dotSize}]}
                        >

                        </Animated.View>
                    )
                })}
   
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {renderContent()}
            </View>
           <View style={styles.dotsRootContainer}>
               {renderDots()}
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
    dot:{
        borderRadius: SIZES.radius,
        backgroundColor: '#914a17',
        marginHorizontal: SIZES.radius / 2
    },
    dotContainer:{
        flexDirection:'row',
        height:SIZES.padding,
        alignItems:'center',
        justifyContent:'center'
    },
    dotsRootContainer:{
        position:'absolute',
        bottom: SIZES.height > 700 ? '5%' : '5%'
    }
    
})
export default OnBoarding;