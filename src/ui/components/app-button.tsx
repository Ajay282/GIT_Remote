import React from "react";
import { Text, StyleSheet, TouchableOpacity, TextStyle, StyleProp, ViewStyle, GestureResponderEvent } from "react-native";

export enum ButtonType {
    DEFAULT
}

interface Props {
    title: string;
    type?: ButtonType;
    textStyle?: StyleProp<TextStyle>;
    viewStyle?: StyleProp<ViewStyle>;
    onPress?: (event: GestureResponderEvent) => void;
}

const getButtonContainerStyle = (type: ButtonType) => {
        return viewStyles.default;
};

const getTextStyle = (type: ButtonType) => {
        return textStyles.default;
};

export const AppButton = (props: Props) => {
    const { onPress, title, type = ButtonType.DEFAULT, viewStyle, textStyle } = props;

    const customStyle = getButtonContainerStyle(type);
    const customTextStyle = getTextStyle(type);

    return <TouchableOpacity onPress={onPress} style={[viewStyles.commonStyle, customStyle, viewStyle]}>
        <Text style={[textStyles.commonStyle, customTextStyle, textStyle]}>{title}</Text>
    </TouchableOpacity>;
};

const viewStyles = StyleSheet.create({
    commonStyle: {
        paddingVertical: 10,
        paddingHorizontal: 12,
        height: 50,
        borderRadius: 10,
        elevation: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    default: {
        backgroundColor: "#34424a",
    },
});
const textStyles = StyleSheet.create({
    commonStyle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    default: {
        color: "#FFFAFA",
    },
});