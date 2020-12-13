import React from "react";
import { Note } from "src/store/actions/notes/notes-actions";
import Card from "./card";
import { View, Text, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";

type OnDelete = (item: Note) => () => void;

type OnStatusChange = (item: Note) => (isCompleted: boolean) => void;

interface Props {
    data: Note[],
    onDelete: OnDelete,
    onStatusChange: OnStatusChange,
}

export const NotesList = React.memo(({ data, onStatusChange, onDelete }: Props ) => {
    const RenderItem = ({ item }: { item: Note; }) => {
        const { title, status, createdAt } = item;
        return <Card title={title} status={status} createdAt={createdAt} onDelete={onDelete(item)} onStatusChange={onStatusChange(item)} />;
    };
    if (!data.length) {
        return <View style={styles. noContentContainer}>
            <Text style = {{color:"#FFF"}}> Nothing to show...</Text>
        </View>;
    }
    return <View style={styles.listViewContainer}>
        <FlatList
            data={data}
            renderItem={RenderItem}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => `${item.createdAt}${item.status}`}
        />
    </View>;
});

const styles = StyleSheet.create({
     noContentContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listViewContainer: {
        flex: 1,
    },
});