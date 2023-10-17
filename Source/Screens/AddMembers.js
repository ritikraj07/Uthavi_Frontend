import { useState} from 'react'
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import {setMembers } from '../Redux/Reducers/Member'
import Loading from '../Components/Loading'
import { setLoadingFalse, setLoadingTrue } from '../Redux/Reducers/Loading'

export default function AddMembers({navigation}) {
    const [name, setName] = useState('')
    const [phone_no, setPhone] = useState('')
    let { duration, _id } = useSelector((state) => state.Group)
    let group_name = useSelector((state)=>state.Group.name)
    let [count, setCount] = useState(useSelector((state) => state?.Member?.members?.length + 1) || 1)
    const isloading = useSelector((state) => state.Loading.value)
    // let count = 0
    // change
    const url = useSelector((state) => state.BaseUrl.url)
    let dispatch = useDispatch()


    function addMember() {
        if (isloading) {
            return false
        }
        if (name.length < 1) {
            ToastAndroid.show('Enter member name', ToastAndroid.SHORT);
            return false
        }
        if (phone_no.length != 10) {
            ToastAndroid.show('Invalid! Phone Number', ToastAndroid.SHORT);
            return false
        }
        
        dispatch(setLoadingTrue())
        // ToastAndroid.show(`Cool! Adding ${name} to  ${group_name} `, ToastAndroid.LONG);

        const postData = async (data) => {
            try {
                const response = await fetch(url + 'member/create', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),

                });

                return await response.json();
            } catch (error) {
                console.error("error from create group frontend", error);
            }
        };




        let data = {
            group_id: _id,
            history: createHistory(),
            phone_no: phone_no,
            name: name
        }



        postData(data)
            .then((res) => {
                // console.log("line 62 add member fuction ==> ",res.data.member)
                dispatch(setMembers(res.data.member))
                dispatch(setLoadingFalse())
                ToastAndroid.show(`${name} added to ${group_name} `, ToastAndroid.SHORT)
                setName('')
                setPhone('')
                console.log('count before==>', count)
                setCount(count+1)
                console.log("\n\n\n", count, duration, '\n\n')
                
               
                console.log('count after==>', count)
                
            })
            .catch((error) => {
                console.log("error from create group post data", error)
                dispatch(setLoadingFalse())
                ToastAndroid.show(`Something went wrong`, ToastAndroid.SHORT)
            })




    }





    
    function createHistory() {
        let history = {}

        for (var i = 1; i <= duration; i++) {
            history[i] = false
        }

        return history
    }
    if (count == duration+1) {
        navigation.replace("Drawer")
    }
    return (<View style={{ backgroundColor: 'purple', flex: 1, paddingTop: 40, }} >
        <Loading />
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 30 }}>Add Members</Text>

        
        <View style={{
            backgroundColor: 'white', flex: 1, width: '100%', alignItems: 'center',
            marginTop: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20,
            justifyContent:'space-between'
        }} >
           
            <View style={{ padding: 10, width: '90%' }} >
                <Text style={{ textAlign: 'right', color:'black' }} >Add {count}/{duration}</Text>
                <Text style={{color:'black'}}>Name</Text>
                <TextInput placeholderTextColor={'#8c8c8c'} value={name} onChangeText={setName} style={styles.input} placeholder="Enter member name" />
                <Text style={{ color: 'black' }}>Phone Number</Text>
                <TextInput placeholderTextColor={'#8c8c8c'} value={phone_no} onChangeText={setPhone} keyboardType="number-pad" style={styles.input} placeholder="Enter member's phone number" />
                
                
            </View>
            <TouchableOpacity style={styles.button}
                onPress={() => { addMember() }}
            >
                <Text style={styles.text}>Add Member</Text>
            </TouchableOpacity>
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
        color: 'black'
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: '43%',
        alignItems: 'center',
        marginBottom:50
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },

})
