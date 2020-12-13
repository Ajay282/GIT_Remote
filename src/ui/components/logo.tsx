import { View, StyleSheet, Image } from "react-native";
import React from "react";
export const Logo = () => {
    return <View style={styles.ImageView}>
        <Image style={styles.logo} source={require( "src/assets/icon-logo.png")} />
    </View>;
};


const styles = StyleSheet.create({
    ImageView: {
        alignItems:"center",
        justifyContent:"center"
    },
    logo: {
        height: 100,
        width: 100
    },

});