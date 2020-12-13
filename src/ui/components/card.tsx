import React, { useCallback } from "react";
import {
    TouchableOpacity,
    Text,
    Alert,
    StyleSheet,
    View,
    Dimensions,
} from "react-native";
import CheckBox from "@react-native-community/checkbox";
import Swipeout, { SwipeoutButtonProperties } from "react-native-swipeout";
const { width: WINDOW_WIDTH } = Dimensions.get("window");
import "intl";
import "intl/locale-data/jsonp/en";
import { FilterType } from "../screens/home-screen";
import { strings } from "src/strings";

type Props = {
    status: FilterType;
    title: string;
    createdAt: number,
    onDelete: () => void,
    onItemPress?: () => void,
    onStatusChange: (isActive: boolean) => void;
};


const DARK_COLOR = "#263238";
const DARK_COLOR1 = "#37474F";

export const Card = React.memo(({ status, title, createdAt, onDelete, onStatusChange, onItemPress }: Props) => {
    const createdDate = new Date(createdAt);

    const deleteHandler = useCallback(() => {
        Alert.alert(
            strings.deleteConfirmation,
            strings.deleteWarning,
            [
                { text: "Cancel", onPress: () => console.log("delete canceled") },
                { text: "OK", onPress: onDelete },
            ],
            { cancelable: false }
        );
    }, []);

    const swipeoutBtns: SwipeoutButtonProperties =
    {
        text: "delete",
        type: 'delete',
        onPress: deleteHandler
    };

    return (
        <Swipeout right={[swipeoutBtns]} style={[styles.Swiper]}>
            <View style={[styles.card, { backgroundColor: DARK_COLOR }]}>
                <View style={styles.checkboxContainer}>
                    <CheckBox
                        boxType="square"
                        value={status === FilterType.COMPLETED}
                        style={styles.checkbox}
                        onValueChange={onStatusChange}
                        onFillColor="#fff"
                    />
                </View>
                <TouchableOpacity
                    style={styles.touchableContainer}
                    onPress={onItemPress}
                >
                    <Text style={styles.create}>
                        {createdDate.getDate()}{" "}
                        {createdDate.toLocaleString("default", {
                            month: "short",
                        })}
                    </Text>
                    <Text numberOfLines={3} style={styles.note}>
                        {title || strings.dummyNote}
                    </Text>
                </TouchableOpacity>
            </View>
        </Swipeout>
    );
});

export default Card;

const styles = StyleSheet.create({
    Swiper: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        elevation: 10,
        shadowRadius: 5,
        shadowOpacity: 1.0,
        borderRadius: 5,
        backgroundColor: "orange",
        height: 75,
        width: WINDOW_WIDTH - 30,
        marginVertical: 5,
    },
    card: {
        height: "100%",
        width: "100%",
        flexDirection: "row",
    },
    create: {
        fontSize: 12,
        alignSelf: "flex-end",
        color: "#fff",
        right: 10,
        top: 6,
        fontWeight: "500"
    },
    note: {
        color: "#fff",
        fontSize: 15,
        paddingTop: 10,
        paddingHorizontal: 10,
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxContainer: {
        backgroundColor: DARK_COLOR1,
        justifyContent: "center",
        flex: 2,
    },
    touchableContainer: {
        flex: 8,
    },
});
