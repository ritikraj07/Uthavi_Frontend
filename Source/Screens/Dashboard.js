import {useEffect } from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import { Notifee } from '@notifee/react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useDispatch, useSelector } from 'react-redux'

import Navbar from '../Components/Navbar'
import PostData from '../Service/Connection';
import { changeStatus } from '../Redux/Reducers/Member';
import Loading from '../Components/Loading';
import { setLoadingFalse, setLoadingTrue } from '../Redux/Reducers/Loading';
import notifee from '@notifee/react-native';

export default function Dashboard({ navigation }) {
    let dispatch = useDispatch()
    let adminName = useSelector((state)=>state.Admin.name)
    let { createdAt, amount, name, intrest_rate, duration} = useSelector((state) => state.Group)
    let members = useSelector((state) => state.Member.members)
    let url = useSelector((state)=>state.BaseUrl.url)
    let mem = useSelector((state) => state.Member.members)
    let m = +(+calculateDays(createdAt).toFixed(0) / 30).toFixed(0) + 1

    

    useEffect(() => {
        scheduleMonthlyNotification()
            .then((res) => { })
            .catch((err) => { })
        
        if (m == 10) {
            DisplayNotification('Monthly Reminder', `Hi, ${adminName} Collect money from every one`)
        }
    }, [])

    
    const scheduleMonthlyNotification = async () => {
        const nextDate = new Date();
        nextDate.setDate(10);
        nextDate.setHours(10, 0, 0, 0);
        console.log(nextDate)
        await Notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        await Notifee.scheduleNotification({
            title: 'Monthly Reminder',
            body: `Hi, ${adminName} Collect money from every one`,
            android: {
                channelId: 'default',
            },
            ios: {
                categoryId: 'general',
            },
            schedule: {
                at: nextDate.getTime(),
                repeat: {
                    every: 'month',
                },
            },
        });
    };

  
    


    async function DisplayNotification(title, body) {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }








    function ChangeStatus(month, _id, newStatus) {
        dispatch(setLoadingTrue())
        dispatch(changeStatus({ month, _id, newStatus }))
        let data = {
            month: month,
            _id: _id, 
            newStatus: !newStatus
        }

        PostData(url + "member/update", data)
            .then((res) => { 
                dispatch(setLoadingFalse())
                console.log("res from change status Dashboard", res)
                
            })
            .catch((error) => {
                console.log("error from post Data Dashboard =>", error)
                dispatch(setLoadingFalse())
            })
        
    }









    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-GB', options);
    }

    function calculateDays(dateString) {
        const givenDate = new Date(dateString);
        const currentDate = new Date();

        const differenceInTime = currentDate.getTime() - givenDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);

        return differenceInDays;
    }



    
    


    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


    function CreateMemberTab({ member }) {
        
        let isPaid = member.history[m.toString()]
        // console.log("\n\n\n\n\n ", "ispaid ==>", isPaid, "\n\n\n\n", "m \n\n\n", m, "\n\n\n" )
        // console.log(member.name, isPaid, member._id)


        return <View style={{
            flexDirection: 'row',
            alignItems: 'center', justifyContent: 'space-between',
            marginVertical:5
        }}
            onPress={() => {
                console.log(mem[1])
            }}
        >

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width: 60, height: 60, backgroundColor: 'white',
                    alignItems: 'center', justifyContent: "center",
                    borderWidth: 2,
                    borderColor: 'white',
                    borderRadius: 5,
                    marginRight: 15

                }}>
                    <Text style={{
                        fontSize: 40,
                        borderWidth: 4,
                        borderColor: getRandomColor(),
                        width: '100%',
                        textAlign: 'center',
                        borderRadius: 5,
                        color: getRandomColor()
                    }} >{member.name[0]}</Text>
                </View>
                <View>
                    <Text style={{fontWeight:'bold', fontSize:18, color:'black'}} >{member.name}</Text>
                    <Text style={{color:'black'}}>{member.phone_no}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => {
                ChangeStatus(m,member._id,isPaid)
            }} style={{}} >
                {!isPaid ?
                    <MaterialCommunityIcons name="checkbox-blank" size={24} color="purple" /> :
                    <Ionicons name="checkbox" size={24} color="purple" />}
            </TouchableOpacity>
        </View>
    }


    return (
        <View style={{ flex: 1,}}>
            <Navbar navigation={navigation} header={"Dashboard"} />

            <Loading />
            
            <View
                style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    padding: 10,
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    shadowColor: 'purple',
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 20,
                    width: '90%',
                    alignSelf: 'center',
                    marginBottom: 20,
                }}
            >
                <View style={{ marginRight: 15 }}>
                    <Text style={styles.infoText}>Group Name:</Text>
                    <Text style={styles.infoText}>Interest Rate:</Text>
                    <Text style={styles.infoText}>Amount member/month:</Text>
                    <Text style={styles.infoText}>Duration(month):</Text>
                    <Text style={styles.infoText}>Create At:</Text>
                </View>

                <View>
                    <Text style={styles.infoText}>{name}</Text>
                    <Text style={styles.infoText}>{intrest_rate} %</Text>
                    <Text style={styles.infoText}>{amount}</Text>
                    <Text style={styles.infoText}>{duration} Month</Text>
                    <Text style={styles.infoText}>{formatDate(createdAt)}</Text>
                </View>
            </View>

            <View style={{paddingBottom: 223, paddingHorizontal: 10 }} >
                <Text style={{
                    textAlign: 'center', fontSize: 20,
                    fontWeight: 'bold',
                    color:'black'
                }} >Group Members</Text>
                <Text style={{
                    textAlign: 'center', fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black'
                }} >  Month: {m}</Text>
                <ScrollView contentContainerStyle={{ padding: 10, paddingBottom:70 }} >
                    {members?.map((member, i) => {
                        return <CreateMemberTab key={i} member={member} />
                    })}
                </ScrollView>




            </View>
            <View>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    infoText: {
        color:'black'
    }
})