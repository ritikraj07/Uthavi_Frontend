import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ToastAndroid, ScrollView, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setAdmin } from "../Redux/Reducers/Admin"
import Loading from "../Components/Loading"
import { setLoadingFalse, setLoadingTrue } from "../Redux/Reducers/Loading"

export default function SignUp({ navigation }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const url = useSelector((state) => state.BaseUrl.url)
    const isLogin = useSelector((state)=>state.Admin.isLogin)
    const dispatch = useDispatch()

    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const checkPasswordStrength = (password) => {
        const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        const mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

        if (strongRegex.test(password)) {
            ToastAndroid.show('Strong Password!', ToastAndroid.SHORT);
        } else if (mediumRegex.test(password)) {
            ToastAndroid.show('Medium Password!', ToastAndroid.SHORT);

        } else {
            ToastAndroid.show('Weak Password!', ToastAndroid.SHORT);
        }
    };

    function signUp() {

        if (name.length < 1) {
            ToastAndroid.show('Enter your name', ToastAndroid.LONG);
            return
        }
        if (email.length<2) {
            ToastAndroid.show('Invalid Email!', ToastAndroid.LONG);
            return
        }
        if (!isValidEmail(email)) {
            ToastAndroid.show('Invalid Email!', ToastAndroid.LONG);
            return
        }
        if (password.length < 6) {
            ToastAndroid.show('Password is too small', ToastAndroid.LONG);
            return
        }

        // checkPasswordStrength(password)

        dispatch(setLoadingTrue())


        const postData = async () => {
            console.log("Enter", url)
            try {
                const response = await fetch(url+'admin/register', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password, name }),

                });
                
                return await response.json();
            } catch (error) {
                console.error(error, "eeeeee");
            }
        };

        postData()
            .then((res) => {
                console.log("ressssssss====>", res.data)
                if (!res.data ) {
                    ToastAndroid.show('Already have an account', ToastAndroid.LONG);
                    return
                }                
                dispatch(setAdmin(res.data))
                dispatch(setLoadingFalse())
                navigation.replace("CreateGroup")
            })
            .catch((error) => {
                console.log("72", error)
                dispatch(setLoadingFalse())
            })


    


    }


    return (<ScrollView contentContainerStyle={{ flex: 1, backgroundColor: 'purple', alignItems: 'center', paddingTop: 50, position: 'relative' }} >
        <Loading />
        <View style={{ height: 140, paddingTop: 20, width: '80%' }} >
            <Text style={styles.headers}>Hey Buddy! 👋</Text>
            <Text style={styles.headers}>Welcome to Uthavi</Text>
        </View>
        <View style={{ backgroundColor: 'white', width: "90%", borderRadius: 10, padding: 5, zIndex: 10 }} >
            <Text style={{ textAlign: 'center', color: 'purple', fontSize: 30, fontWeight: 'bold', marginBottom: 5 }} >Uthavi</Text>
            <Text style={{ textAlign: 'center', fontSize: 20, color:'black', fontWeight: '600', marginBottom: -20 }} >
                Create an account and start your game!
            </Text>


            <View style={{ padding: 10, }} >
                <Text style={{color:'black'}} >Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    onChangeText={setName}
                    placeholderTextColor={'#8c8c8c'}
                />
                <Text style={{ color: 'black' }} >Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    onChangeText={setEmail}
                    placeholderTextColor={'#8c8c8c'}
                />
                <Text style={{ color: 'black' }} >Password</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="Enter your password"
                    onChangeText={setPassword}
                    placeholderTextColor={'#8c8c8c'}
                />

                <TouchableOpacity style={styles.button} onPress={() => signUp()} >
                    <Text style={styles.text}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={{ width: '25%', alignSelf: 'flex-end' }} onPress={() => navigation.navigate('LogIn')} >
                <Text style={{ textAlign: 'center', color: 'green' }} >Login Now</Text>
            </TouchableOpacity>

        </View>

        {/* <View style={{
            width: '100%', backgroundColor: 'brown',
            height: '5000', flex: 1,
            borderTopRightRadius:323
        }} >
                <Text>.</Text>
        </View> */}

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
        height: 40,
        borderColor: 'black',
        color:'black'
        

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
        fontWeight: 'bold',
        

    }
})
