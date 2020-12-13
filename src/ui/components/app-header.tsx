import { ViewStyle, TextStyle, StyleProp, View, Text, StyleSheet } from "react-native";
import React from "react";
import { AppButton } from "./app-button";

interface Props {
    primaryTitle: string,
    buttonText?: string,
    onButtonPress?: () => void;
    viewStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const Header = (props: Props) => {
    const { onButtonPress, primaryTitle, buttonText, textStyle } = props;
    return <View style = {styles.container}>
        <Text numberOfLines={2} style={styles.title}>{primaryTitle}</Text>
       { buttonText && <AppButton title={buttonText} viewStyle = {{backgroundColor:"#34424a", height: 40}} textStyle={[{color:"#FFF"}, textStyle]} onPress={onButtonPress}  />}
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"space-between",
    },
    title: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: "300",
        flex: 1
    },

});
