import { } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import notifee from '@notifee/react-native';

export default function Members() {


    async function onDisplayNotification(title, body) {
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


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: 'purple', width: '50%', height: 60 }}
                onPress={() => {
                    onDisplayNotification().then((res) => {
                        console.log('res', res)
                    }).catch((err) => {
                        console.log('error', err)
                    })
                }}
            >
                <Text style={{textAlign:'center', color:'white'}} >Get Notification</Text>
            </TouchableOpacity>
            
        </View>
    )
}