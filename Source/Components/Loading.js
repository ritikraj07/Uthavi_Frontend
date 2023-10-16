import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

let {width, height} = Dimensions.get('window')

const Loading = () => {
    const isLoading = useSelector((state)=>state.Loading.value)
    console.log( "======>",isLoading)
    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="30" color="green" />
            ) : (
                <View>
                    {/* Your content goes here */}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: height/5,
        left: width/2.4,
        zIndex: 100,
        alignItems: 'center',
        justifyContent:'center'

    },
});

export default Loading;
