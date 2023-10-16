import { useState, useEffect} from 'react'
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ToastAndroid } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setGroup } from '../Redux/Reducers/Group'
import { AddGroupToReducer } from '../Redux/Reducers/Admin'
import { clearMember } from '../Redux/Reducers/Member'
import Loading from '../Components/Loading'
import { setLoadingFalse, setLoadingTrue } from '../Redux/Reducers/Loading'
import notifee from '@notifee/react-native';

export default function CreateGroup({navigation}) {
    const [name, setname] = useState('')
    const [duration, setduration] = useState('')
    const [amount, setamount] = useState('')
    const [intrest, setIntrest] = useState('')
    const url = useSelector((state) => state.BaseUrl.url)
    const admin_id = useSelector((state) => state.Admin._id)
    const admin_name = useSelector((state)=>state.Admin.name)
    const dispatch = useDispatch()

    function createGroup() {
        
        if (!checkInput()) {
           return 
        }
       
        
        ToastAndroid.show('Cool! Creating Your Group', ToastAndroid.LONG);
        dispatch(setLoadingTrue())
        const postData = async (data) => {
            try {
                const response = await fetch(url + 'group/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),

                });

                return await response.json();
            } catch (error) {
                console.error("error from create group frontend" ,error);
            }
        };



        let data = {
            admin_id: admin_id,
            members_id: [],
            duration: duration,
            earning: 0,
            winner_list: [],
            intrest_rate: intrest,
            name: name,
            amount: amount,
        }


        
        
        postData(data)
            .then((res) => {
                console.log("61 from create group => ", res.data)
                DisplayNotification('Group Create', `Hey ${admin_name}, You successfully created ${name} 🎉`) 
                dispatch(clearMember())
                dispatch(setGroup(res.data))
                dispatch(AddGroupToReducer(res.data))
                dispatch(setLoadingFalse())
                navigation.replace("AddMembers")
            })
            .catch((error) => {
                console.log("error from create group post data", error)
                dispatch(setLoadingFalse())
            })

        


    }

  

    function checkInput() {
        if (name.length < 1) {
            ToastAndroid.show('Enter group name', ToastAndroid.SHORT);
            return false
        }
        if (name.length > 19) {
            ToastAndroid.show('Group name too large', ToastAndroid.SHORT);
            return false
        }
        if (duration < 2) {
            ToastAndroid.show('Duration must > 1', ToastAndroid.SHORT);
            return false
        }
        if (duration > 12) {
            ToastAndroid.show('Duration must < 25', ToastAndroid.SHORT);
            return false
        }
        if (amount < 100) {
            ToastAndroid.show('Amount must > 100', ToastAndroid.SHORT);
            return false
        }
        if (intrest <= 0.2) {
            ToastAndroid.show('too low intrest rate', ToastAndroid.SHORT);
            return false
        }
        if (intrest > 5) {
            ToastAndroid.show('too high intrest rate', ToastAndroid.SHORT);
            return false
        }

        return true
    }

    
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



    return (<View style={{ backgroundColor: 'purple', flex: 1, paddingTop: 40, }} >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 30 }} >Create Group</Text>
        <Loading />
        {/* why I am not getting this view */}
        <View style={{ backgroundColor: 'white', flex: 1, width: '100%', alignItems: 'center', marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }} >
            <View style={{ padding: 10, width: '90%' }} >
                <Text style={{color:'black'}} >Name</Text>
                <TextInput maxLength={20} onChangeText={setname} style={styles.input} placeholder="Enter group name" />
                <Text style={{ color: 'black' }} >Duration</Text>
                <TextInput keyboardType="number-pad" value={duration} onChangeText={setduration} style={styles.input} placeholder="Enter game duration in month" />
                <Text style={{ color: 'black' }} >Number of Members</Text>
                <TextInput editable={false} keyboardType="number-pad" value={duration}  style={styles.input} placeholder='Enter number of members' />
                <Text style={{ color: 'black' }} >Amount</Text>
                <TextInput keyboardType="number-pad" onChangeText={setamount} value={amount} style={styles.input} placeholder='Enter amount ' />
                {/* <Text>Reminder Date</Text>
                <TextInput style={styles.input} placeholder='Enter amount ' /> */}
                <Text style={{color:'black'}} >Intrest Rate</Text>
                <TextInput onChangeText={setIntrest} keyboardType="number-pad" style={styles.input} placeholder='Enter amount ' />
                <View style={{ width: '90%', flexDirection:'row', justifyContent:"space-between" }} >
                    <TouchableOpacity style={styles.button} onPress={()=>{createGroup()}} >
                        <Text style={styles.text}>Create Group</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.button}  onPress={()=>createHistory()} >
                        <Text style={styles.text}>Check chat</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

        </View>
    </View>)
}



const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderWidth: 0.5,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 16,
        height: 40,

    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: '43%',
        alignItems: 'center',
        
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    
})

