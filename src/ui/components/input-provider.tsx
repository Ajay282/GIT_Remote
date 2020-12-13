import { View, StyleSheet, StyleProp, ViewStyle, TextStyle } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from 'react-native-dropdown-picker';
import { AppButton } from "./app-button";
import React, { useState } from "react";
import { FilterType } from "../screens/home-screen";
import { Image } from "react-native";

interface Props {
    onPress: (text: string, status: FilterType) => void;
    multiline?: boolean;
    placeholder: string;
    inputViewStyle?: StyleProp<ViewStyle>;
    buttonViewStyle?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    buttonText?: string;
    isCustomerList?: boolean;
}

export const InputProvider = ({ onPress, multiline, placeholder,buttonText, inputViewStyle, buttonViewStyle, inputStyle, isCustomerList }: Props) => {

    const [inputText, setInputText] = useState("");
    const [status, setInputStatus] = useState(null);
    const [statusText, setStatusText] = useState("");

    const _onPress = () => {
        const noteStatus = status || FilterType.ACTIVE;
        onPress(inputText, noteStatus);
        setInputText("");
        setStatusText("");
        setInputStatus(null);
    };

    return <View style={styles.container}>
        <View style={[styles.inputView, inputViewStyle]}>
            <TextInput
                style={[styles.input, inputStyle as any]}
                underlineColorAndroid="rgba(0,0,0,0)"
                placeholder={placeholder}
                autoCorrect={false}
                placeholderTextColor="#999"
                autoCapitalize="none"
                onChangeText={setInputText}
                value={inputText}
                multiline={multiline}
            />
        </View>
        {!isCustomerList && <View style={styles.dropDownContainer}>
        <DropDownPicker
            items={[
                { label: 'Active', value: FilterType.ACTIVE, icon: () => status === FilterType.ACTIVE && <View style={styles.checkBoxContainer}>
                    <Image style={styles.checkBox} source={require("src/assets/tick.png")} />
                    </View> as any
                 , hidden: true },
                { label: 'Pending', value: FilterType.ALL, icon: () => status === FilterType.ALL && <View style={styles.checkBoxContainer}>
                    <Image style={styles.checkBox} source={require( "src/assets/tick.png")} /> 
                    </View> as any },
                { label: 'Completed', value: FilterType.COMPLETED, icon: () => status === FilterType.COMPLETED && <View style={styles.checkBoxContainer}>
                    <Image style={styles.checkBox} source={require( "src/assets/tick.png")} /> 
                    </View> as any},
            ]}
            defaultValue={status}
            containerStyle={{ height: 40, flex: 4 }}
            style={{ backgroundColor: '#fafafa' }}
            itemStyle={{
                justifyContent: 'flex-start'
            }}
            labelStyle={{ marginTop: 3}}
            placeholder={statusText ? statusText : "select a status"}
            dropDownStyle={{ backgroundColor: '#fafafa' }}
            onChangeItem={item => {
                setStatusText(item.label);
                setInputStatus(item.value);
            }}
        />
        </View>}
        <AppButton onPress={_onPress} title={buttonText || "Add"} viewStyle={[styles.buttonViewStyle, buttonViewStyle]} textStyle={[{ color: "#228B22", fontSize: 16 }]} />
    </View>;
};


const styles = StyleSheet.create({
    input: {
        marginHorizontal: 20,
        borderColor: '#999',
        borderWidth: 0,
        color: '#000',
        fontSize: 16,
        fontWeight: "500"
    },
    inputView: {
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.4,
        elevation: 3,
        borderColor: '#999',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFF',
        opacity: 0.9,
        flex: 4,
        height: 80,
    },
    checkBoxContainer: {
        justifyContent: 'center'
    },
    checkBox: {
        width: 25, 
        height: 25
    },
    dropDownContainer: {
        left: 10,
        flex: 4,
        height: 40
    },
    container: {
        flexDirection: "row",
        marginVertical: 20,
        alignItems: "center"
    },
    buttonViewStyle: {
        height: 40,
        borderRadius: 10,
        elevation: 8,
        flex: 2,
        marginLeft: 20,
        backgroundColor: "rgba(255,255,255, 0.9)"
    }
});