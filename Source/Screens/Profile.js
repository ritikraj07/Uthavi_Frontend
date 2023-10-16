import {useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'
import Navbar from '../Components/Navbar'
import { useSelector } from 'react-redux'

export default function Profile({ navigation }) {
    const { groups, name } = useSelector((state) => state.Admin)
    const { earning, intrest_rate, duration, amount } = useSelector((state) => state.Group)
    
    

    function Profit() {
        let pro = 0
        for (var i = 0; i < duration; i++){
            pro += duration * amount - (duration * amount * (100 - (intrest_rate * i)) / 100).toFixed(0)
        }
        return pro
    }
    function MyProfit() {
        let arr = []
        profit = 0
        for (var i = 0; i < duration; i++){
            let pr = (duration * amount * (100 - (intrest_rate * i)) / 100).toFixed(0)
            let pro = duration * amount - (duration * amount * (100 - (intrest_rate * i)) / 100).toFixed(0)
            
            arr.push(
                <View style={{
                    borderWidth: 0.2,
                    margin: 10,
                    borderRadius: 5,
                    elevation: 0.1,
                    padding: 5

                }}
                    key={i}
                >
                    <Text style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        fontSize: 20,
                        marginBottom: -10,
                        color:'black'
                    }} >Month {duration- i}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>

                        <View style={styles.box1}>
                            <Text style={styles.text1}>{pr}</Text>
                            <Text style={styles.lable1}>Prize Money</Text>
                        </View>
                        <View style={styles.box1}>
                            <Text style={styles.text1}>{intrest_rate}</Text>
                            <Text style={styles.lable1}>Int. Rate</Text>
                        </View>
                        <View style={styles.box1}>
                            <Text style={styles.text1}>{pro}</Text>
                            <Text style={styles.lable1}>Profit</Text>
                        </View>
                    </View>

                </View>
            )
        }

        return arr.reverse()
    }
    

    return (
        <View style={{ flex: 1, }}>
            <Navbar navigation={navigation} header={"Profile"} />
            <View style={{ backgroundColor: "purple" }} >
                <View style={{
                    borderWidth: 1, alignItems: 'center', padding: 15,
                    backgroundColor: 'white',
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30
                }} >
                    <Image
                        style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: 'purple' }}
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3001/3001764.png' }} />

                    <Text style={{ fontSize: 20, fontWeight: '600', marginTop: 5, color:'black' }} >{name}</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >

                    <View style={styles.box}>
                        <Text style={styles.text}>{duration}</Text>
                        <Text style={styles.lable}>Members</Text>
                    </View>

                    <View style={styles.box}>
                        <Text style={styles.text}>{duration*amount}</Text>
                        <Text style={styles.lable}>Collection(m)</Text>
                    </View>


                    <View style={styles.box}>
                        <Text style={styles.text}>{earning}</Text>
                        <Text style={styles.lable}>Earn</Text>
                    </View>

                </View>

            </View>

            <View style={{flex:1}}>

                

                <ScrollView contentContainerStyle={{paddingBottom:0}} >
                 

                    <MyProfit />


                </ScrollView>
               

            </View>

            
           
            <View>
                <Text style={{
                    textAlign: 'center',
                    fontSize: 20,
                    margin: 5,
                    color:'purple'
                }} >
                    You will earn {Profit()}
                </Text>
</View>

        </View>
    )
}


const styles = StyleSheet.create({
    box: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    lable: {
        color: 'white',
        fontSize: 15,

    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800'
    },

    box1: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    lable1: {
        
        // fontSize: 15,
        color:'black'

    },
    text1: {
        
        fontSize: 20,
        fontWeight: '500',
        color:'black'
    }
})