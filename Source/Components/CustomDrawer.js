import { useNavigation,  } from '@react-navigation/native'
import { } from 'react'
// import { MaterialCommunityIcons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {View, TouchableOpacity, Text, Image, ScrollView, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { setLogin } from '../Redux/Reducers/Admin'
import { GetData } from '../Service/Connection';
import { setGroup } from '../Redux/Reducers/Group';
import { resetMember } from '../Redux/Reducers/Member';
import Loading from './Loading';
import { setLoadingFalse, setLoadingTrue } from '../Redux/Reducers/Loading';


export default function CustomDrawer() {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const url = useSelector((state)=>state.BaseUrl.url)
    const { groups, name } = useSelector((state) => state.Admin)
    
    



    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    
    function ChangeGroup(_id) {
        ToastAndroid.show('Fetching Data', ToastAndroid.LONG);
        dispatch(setLoadingTrue())
        GetData( url+"/group/"+_id)
            .then((res) => {
                let group = res.data.group
                let members = res.data.members
                dispatch(setGroup(group))
                dispatch(resetMember(members))
                dispatch(setLoadingFalse())
                
                // console.log("res==>\n", "Group====> \n", group, "\n\n", "members==> \n\n ", members )
            })
            .catch((error) => {
                console.log(error)
                dispatch(setLoadingFalse())
            })
        
    }


    const Create = ({ group, i }) => {
        
        return <TouchableOpacity
            key={i}
            style={{ margin: 10, flexDirection: 'row', width: '100%', alignItems: 'center' }}

            onPress={() => {
                ChangeGroup(group.group_id ||  group._id)
                console.log("\n \n\n\n\n error group ==> \n", group, "\n \n\n\n\n\n")
            }}
        >
            <View style={{
                width: 60, height: 60, backgroundColor: getRandomColor(),
                alignItems: 'center', justifyContent: "center",
                borderWidth: 2,
                borderColor: 'white',
                borderRadius: 5,
                marginRight:15
                
            }}>
                <Text style={{
                    fontSize: 40,
                    borderWidth: 4,
                    borderColor: 'black',
                    width: '100%',
                    textAlign: 'center',
                    borderRadius: 5,
                    color: 'white'
                }} >{group.name[0]}</Text>
            </View>
            <View>
                <Text style={{ color: 'white', fontSize: 25, }} numberOfLines={1}>{group.name}</Text>
                {group?.duration && <Text style={{color:'white'}} >Members: {group?.duration}</Text>}
            </View>
            
            
        </TouchableOpacity>
    }
  





    return (<View style={{ flex: 1, backgroundColor: 'purple', paddingTop: 30 }}>
        <Loading />
        <View style={{
            width: "100%",
            backgroundColor: "white", height: 200,
            alignItems: 'center', padding: 10,
            borderBottomLeftRadius: 50,
            borderBottomRightRadius:50
        }} >
            <TouchableOpacity
                style={{
                    borderWidth: 1,
                    borderColor: 'black', padding: 5, borderRadius: 50,
                    margin:10
                }}
            >
            <Image
                style={{width:80, height:80, borderRadius:40 }}
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3001/3001764.png' }} />
            </TouchableOpacity>

            <Text style={{fontSize:20, fontWeight:'600', color:'black'}} >Hi, 👋 {name}</Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }} >
            
            <View style={{height:"80%", width:"100%", paddingHorizontal:10}} >
                <Text style={{ color: 'white', fontSize: 22, fontWeight: '800', textAlign:"center", marginVertical:10 }} >Manage Your Groups</Text>               

                <ScrollView>
                    {groups?.map((group, i) => {
                        return <Create key={i} group={group} />
                    })}
                </ScrollView>
                
              
                
            </View>

            

            


            <View style={{
                backgroundColor: 'white', width: "100%",
                height: "20%",
                alignItems: "flex-start",
                justifyContent:"space-around"
                
            }} >
                

                <TouchableOpacity TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CreateGroup')
                    }}
                    style={{
                        backgroundColor: 'white', paddingHorizontal: 23,
                        flexDirection: 'row', paddingVertical:7
                    }} >
                    <AntDesign name="addusergroup" size={24} color="black" />
                    <Text style={{fontSize:18, marginLeft:10, color:'black' }}>Create Group</Text>
                </TouchableOpacity >



                <TouchableOpacity TouchableOpacity
                    onPress={() => { ToastAndroid.show('Comming Soon!', ToastAndroid.SHORT); }}
                    style={{
                        backgroundColor: 'white', paddingHorizontal: 23,
                        flexDirection: 'row', paddingVertical: 7
                    }} >
                    <Feather name="settings" size={24} color="black" />
                    <Text style={{ fontSize: 18, marginLeft:8, color:'black' }}>Settings</Text>
                </TouchableOpacity >




                <TouchableOpacity TouchableOpacity
                    onPress={() => {
                        dispatch(setLogin())
                        navigation.replace('LogIn')
                        ToastAndroid.show('logged out!', ToastAndroid.SHORT);
                    }}
                    style={{
                        
                        backgroundColor: 'white', paddingHorizontal: 23,
                        flexDirection: 'row', paddingVertical: 7
                    }} >
                    <MaterialIcons name="logout" size={28} color="black" style={{ textAlign: 'left' }} />
                    <Text style={{ fontSize: 18, color:'black' }}> Log out</Text>
                </TouchableOpacity >
            </View>



        </View>




    </View>)
}
