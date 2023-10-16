import {useState, useEffect} from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ScrollView } from 'react-native'
import { useSelector, useDispatch } from "react-redux"
import { setAdmin } from "../Redux/Reducers/Admin"
import { resetMember, setMembers } from "../Redux/Reducers/Member"
import { setGroup } from "../Redux/Reducers/Group"
import Loading from "../Components/Loading"
import { setLoadingFalse, setLoadingTrue } from "../Redux/Reducers/Loading"

export default function Login({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let isLogin = useSelector((state) => state.Admin.isLogin) 
    isLogin = isLogin == undefined ? false : isLogin
    const url = useSelector((state) => state.BaseUrl.url)
    const dispatch = useDispatch()
    useEffect(() => {
        if (isLogin) {
            navigation.replace('Drawer')
            console.log("==is login line 17  ==>",isLogin)
        }

    }, [])

    

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }


    function login() {
        console.log('clicked')
        if (!isValidEmail(email)) {
            ToastAndroid.show('Invalid Email!', ToastAndroid.LONG);
            return
        }
        if (password.length < 6) {
            ToastAndroid.show('Password is too small', ToastAndroid.LONG);
            return
        }
        ToastAndroid.show('fetching your data', ToastAndroid.LONG);
        dispatch(setLoadingTrue())

        const postData = async () => {
            try {
                const response = await fetch(url + 'admin/login', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password}),
                });
                return await response.json();
            } catch (error) {
                console.error(error, "eeeeee");
            }
        };

        postData()
            .then((res) => {
                
                // console.log('res ==> ', res)
                let admin = res.data.admin
                let group = res.data.members.group
                let members = res.data.members.members
                console.log(admin, "\n", "\n", "\n", group, "\n", "\n", "\n", members)
                // console.log('res members ==>', res.data.members)
                dispatch(setAdmin(admin))
                dispatch(resetMember(members))
                dispatch(setGroup(group))
                dispatch(setLoadingFalse())
                navigation.replace("Drawer")
            })
            .catch((error) => {
                console.log("72", error)
                dispatch(setLoadingFalse())
                ToastAndroid.show("User Not Exist! or Wrong Password", ToastAndroid.SHORT)
            })


    


    }




    return (<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'purple', alignItems: 'center', paddingTop: 50 }} >
        <Loading />
        <View style={{ height: 140, paddingTop: 20, width: '80%' }} >
            <Text style={styles.headers}>Hey Buddy! 👋</Text>
            <Text style={styles.headers}>Welcome back to Uthavi</Text>
        </View>
        <View style={{ backgroundColor: 'white', width: "90%", borderRadius: 10, padding: 5 }} >
            <Text style={{ textAlign: 'center', color: 'purple', fontSize: 30, fontWeight: 'bold', marginBottom: 5 }} >Uthavi</Text>
            <Text style={{color:'black', textAlign: 'center', fontSize: 20, fontWeight: '600', marginBottom: -20, paddingHorizontal:20 }} >
                Login in to your account and start your game!
            </Text>

            <Text></Text>
            <View style={{ padding: 10, }} >
                <Text style={{ color: 'black' }} >Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                />
                <Text style={{ color: 'black' }} >Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={()=>login()} >
                    <Text style={styles.text}>Log In</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ width: '25%', alignSelf: 'flex-end' }} onPress={()=>navigation.navigate('SignUp')} >
                <Text style={{ textAlign: 'center', color: 'green' }} >SignUp Now</Text>
            </TouchableOpacity>

        </View>

    </ScrollView>)
}


const styles = StyleSheet.create({
    input: {
        width: '90%',
        borderWidth: 0.5,
        marginVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 16,
        height: 40
    },
    button: {
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 5,
        width: 150,
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    headers: {
        color: 'white',
        fontSize: 25,
        fontWeight: 'bold'

    }
})
