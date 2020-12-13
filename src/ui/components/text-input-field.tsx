import { View, Text, StyleSheet, TextInput, TextInputProperties } from "react-native";
import React from "react";
interface Props extends TextInputProperties {
    label: string;
    inputType?: string;
}

const TextInputFieldComponent = (props: Props) => {
    const { label, inputType, ...otherProps } = props;
    return <View style={styles.viewStyle}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            autoCorrect={false}
            style={[
                styles.textInput
            ]}
            secureTextEntry={inputType === "password"}
            {...otherProps}
        />
    </View>;
};

export const TextInputField = React.memo(TextInputFieldComponent);

const styles = StyleSheet.create({
    viewStyle: {
        marginBottom: 30
    },
    label: {
        fontWeight: "700",
        color: "#FFF",
        fontSize: 16,
        marginBottom: 10,
    },
    textInput: {
        color: "#FFF",
        paddingTop: 5,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#FFF"
    }

});