import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimerComponent = ({ initialDate }) => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const futureDate = new Date(initialDate);
        futureDate.setDate(futureDate.getDate() + 30);

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const timeDiff = futureDate - now;

            const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

            setTimeLeft({ days, hours, minutes, seconds });

            if (timeDiff < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [initialDate]);

    return (
        <View style={{
            flexDirection: 'row',
            width: '100%', justifyContent: 'center',
            alignItems: 'center',
            
        }} >
            
          
                <View style={styles.box} >
                    <Text style={styles.lable} >Day</Text>
                    <Text style={styles.timer}>{timeLeft.days}</Text>
               </View>
                <View style={styles.box} >
                    <Text style={styles.lable} >Hr</Text>
                    <Text style={styles.timer}>{timeLeft.hours}</Text>
                </View>
                <View style={styles.box} >
                    <Text style={styles.lable} >Min</Text>
                    <Text style={styles.timer}>{timeLeft.minutes}</Text>
                </View>
                <View style={styles.box} >
                    <Text style={styles.lable} >Sec</Text>
                    <Text style={styles.timer}>{timeLeft.seconds}</Text>
                </View>
            
        </View>
    );
};

export default TimerComponent;


let styles = StyleSheet.create({
    timer: {
        borderWidth: 0.2,
        padding: 10,
        textAlign: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
        width: 40,
        height: 40,
        borderColor: 'purple',
        color:'purple'
    },
    lable: {
        color: 'purple',
        fontWeight: '600',
        marginBottom:5
    },
    box: {
        alignItems: 'center',
        margin:5
    }
})