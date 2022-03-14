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
        title: "Let's understand a song",
        description:"Are you ready? cause I am1 ",
        img:onboarding1
    },
    {
        title: "Navigation",
        description:"Are you ready? cause I am2 ",
        img:onboarding2
    },
    {
        title: "title3",
        description:"Are you ready? cause I am3 ",
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
            if (Math.floor(value / SIZES.width) === OnBoardings.length - 1){
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
                        ...FONTS.h1,
                         color:COLORS.white,
                          textAlign:'center'
                        }}
                    >
                            {item.title}
                    </Text>
                    <Text
                        style={{
                        ...FONTS.body3,
                         color:COLORS.white,
                          marginTop:SIZES.base,
                          color:COLORS.white
                        }}
                    >{item.description}</Text>
                </View>
                {/* Button */}
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
    
                    borderBottomLeftRadius:30,
                    backgroundColor:'orange',
    
                }}
                onPress={()=>navigation.navigate('Login')}
                >
                    {
                    console.log(completed)}
                    <Text style={{...FONTS.h2,color: COLORS.white}}>{completed ? "Let's Go" : "Skip"}</Text>
                </TouchableOpacity>
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
        backgroundColor: COLORS.blue,
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
        bottom: SIZES.height > 700 ? '30%' : '20%'
    }
    
})
export default OnBoarding;