import { View, TouchableOpacity, Text } from "react-native";
import { FilterType } from "../screens/home-screen";
import React from "react";

interface Props {
    currentFilter: FilterType;
    setFilter: (filterItem: FilterType) => () => void;
}
const FilterTabItem = ({ text, active, onPress }: { text: string; active?: boolean; onPress: () => void; }) => {
    const activeStyle = { backgroundColor: "rgba(255,255,255, 0.9)" };
    return <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: active ? "#40E0D0" : "transparent", height: 5 }} />
        <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={[{ alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255, 0.5)" }, { paddingVertical: 10, paddingHorizontal: 10 }, active && activeStyle]}>
            <Text style={[{ fontWeight: "400", fontSize: 16 }, active && { fontWeight: "500" }]}>{text}</Text>
        </TouchableOpacity>
    </View>;
};

export const FilterList = ({ currentFilter, setFilter }: Props) => <View style={{ flexDirection: "row", width: "100%", justifyContent: "center", borderRadius: 5, marginBottom: 10 }}>
    <FilterTabItem text="All" active={currentFilter === FilterType.ALL} onPress={setFilter(FilterType.ALL)} />
    <FilterTabItem text="Active" active={currentFilter === FilterType.ACTIVE} onPress={setFilter(FilterType.ACTIVE)} />
    <FilterTabItem text="Completed" active={currentFilter === FilterType.COMPLETED} onPress={setFilter(FilterType.COMPLETED)} />
</View>;