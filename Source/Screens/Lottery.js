import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ToastAndroid } from 'react-native'
import Navbar from '../Components/Navbar'
import TimerComponent from '../Components/Timer'
import { useDispatch, useSelector } from 'react-redux'
import PostData from '../Service/Connection'
import { Add_Winner_to_Group } from '../Redux/Reducers/Group'

export default function Lottery({ navigation }) {
    const url = useSelector((state) => state.BaseUrl.url)
    let { createdAt, amount, winner_list, updatedAt, intrest_rate, duration, _id } = useSelector((state) => state.Group)
    const members_list = useSelector((state) => state.Member.members);
    let prize = (duration * amount * (100 - (intrest_rate * ((calculateDaysFromToday(updatedAt) / 30) + 1))) / 100).toFixed(0)
    let dispatch = useDispatch()

    // if duration === no of winner list
    useEffect(() => {
        if (((calculateDaysFromToday(createdAt) / 30).toFixed(0)) > winner_list.length) {
            console.log((calculateDaysFromToday(updatedAt))%30)
            GenerateWinner()
        } 
        
    }, [navigation])


    function calculateDaysFromToday(createdAt) {
        const currentDate = new Date();
        const createdDate = new Date(createdAt);

        // To calculate the time difference of two dates
        const timeDiff = Math.abs(currentDate.getTime() - createdDate.getTime());

        // To calculate the number of days between two dates
        const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return diffDays;
    }
    console.log("day no ", (typeof +Number(calculateDaysFromToday(updatedAt) / 30).toFixed(0)))

    function getPoolPrize() {
        let total = duration * amount
        let pr = 0;
        let pro = 0;
        let n = duration - (+Number(calculateDaysFromToday(updatedAt) / 30).toFixed(0))
        for (var i = 0; i < n; i++) {
            

            if (i == 0) {
                pr = (total * ((100 - (intrest_rate * 0)) / 100)).toFixed(0) // user profit
                pro = total - pr
            } else {
                pr = (total * ((100 - (intrest_rate)) / 100)).toFixed(0) // user profit
                pro = duration * amount - pr
                total = pr
            }
        }
        return pr
    }


    function returnWinner() {
        let winnerId = winner_list[winner_list.length - 1]
        let winner = members_list.filter((m) => m._id == winnerId)
        let winner_name = winner[0]?.name
        return winner_name
    }

    function GenerateWinner() {

        let nonWinners = members_list.filter((m) => !winner_list.includes(m._id));
        if (nonWinners.length > 0) {
            const randomIndex = Math.floor(Math.random() * nonWinners.length);
            // setWinner(nonWinners[randomIndex].name);
            let winner_id = nonWinners[randomIndex]._id
            let winner_name = nonWinners[randomIndex].winner_name

            // pushdata to backend

            let data = {
                group_id: _id,
                winner_id: winner_id
            }

            PostData(url + "group/addwinner", data)
                .then((res) => {
                    console.log("\n\n postdata", res.data.winner_list, "\n\n")
                    let winner = res.data.winner_list
                    dispatch(Add_Winner_to_Group(winner))
                }).catch((error) => {
                    console.log("error from Lottery generateWinner")
                    console.log(error)
                })
        }

    }

    

    function UI() {
        if (((calculateDaysFromToday(createdAt)).toFixed(0) % 30 == 0)&& ((calculateDaysFromToday(createdAt) / 30).toFixed(0)) == winner_list.length && winner_list.length !=0  ) {
            return (<View style={styles.box}>

                <Text style={{ color: 'black', fontSize: 20 }} > The Winner is </Text>

                <Text style={{ color: 'purple', height: 100, fontSize: 25, fontWeight: '600' }} >{returnWinner()}</Text>

            </View>)
        } else if (duration == winner_list.length) {
            return (<View style={[styles.box,{ alignItems:'center', justifyContent:'center'}]}>
                <Text style={{ fontSize: 30, color: 'purple' }} > Game Over </Text>
            </View>)

        } else {
            return (<View style={styles.box}>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 25,
                        fontWeight: '800',
                        color: "orange"
                    }}
                >PRIZE POOL</Text>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 35,
                        fontWeight: '800',
                        color: "purple"
                    }}
                >{getPoolPrize()} </Text>
                <TimerComponent initialDate={updatedAt} />
                <TouchableOpacity
                    style={{ width: '90%', backgroundColor: 'purple', borderRadius: 10 }}
                    onPress={() => {
                        ToastAndroid.show("Wait til given time", ToastAndroid.LONG)
                    }}
                >
                    <Text
                        style={{ textAlign: 'center', fontSize: 20, margin: 5, color: 'white' }}
                    >Get Winner</Text>
                </TouchableOpacity>
            </View>)
        }
    }



    return (
        <View style={{ flex: 1, }}>
            <Navbar header={"Lottery"} navigation={navigation} />
            {/* make this view as card */}
            <View style={{
                w: '100%',
                alignItems: 'center', justifyContent: 'center',
                flex: 1
            }} >

                <View style={{
                    backgroundColor: 'white', elevation: 500, width: '90%',
                    alignItems: 'center', padding: 20,
                    borderRadius: 10
                }} >

                  <UI />


                </View>



            </View >

        </View>
    )
}






const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        position: 'absolute',
        backgroundColor: 'white',
        width: '90%',
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: '70%',
    },
    timerContainer: {
        width: '100%',
        backgroundColor: 'green',
        height: 230,
    },
    box: {
        width: '100%',
        backgroundColor: '#e0e0eb', height: 230, borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    }
});