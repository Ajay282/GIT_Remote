import { connect } from 'react-redux';
import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { AppState } from 'src/store/reducer/root-reducer';
import { Dispatch } from 'redux';
import { resetUserDetails } from 'src/store/actions/actions-api';
import { Header } from 'src/ui/components/app-header';
import "intl";
import "intl/locale-data/jsonp/en";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Note, addNote, updateNote, deleteNote, resetNotes } from 'src/store/actions/notes/notes-actions';
import { NotesState } from 'src/store/reducer/notes/notes-reducer';
import { NotesList } from '../components/notes-list';
import { FilterList } from '../components/filter-list';
import { InputProvider } from '../components/input-provider';
import { strings } from 'src/strings';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { resetCustomers } from 'src/store/actions/customers/customer-actions';
const STATUS_BAR_HEIGHT = getStatusBarHeight();

interface StateProps {
    username: string,
    notes: NotesState;
}

interface DispatchProps {
    logout: () => void;
    addNewNote: (note: Note) => void;
    updateNote: (note: Note) => void;
    deleteNote: (id: number) => void;
}

export type NavigationProps = StackScreenProps<RootStackParamList>;


export enum FilterType {
    ALL,
    ACTIVE,
    COMPLETED,
}


type Props = StateProps & DispatchProps & NavigationProps;


const HomeComponent = (props: Props) => {

    const { notes, addNewNote, updateNote, deleteNote } = props;

    const [data, setdata] = useState<Note[]>([]);
    const [currentFilter, setCurrentFilter] = useState<FilterType>(FilterType.ALL);


    useEffect(() => {
        const filteredData = notes.filter((note) => currentFilter === FilterType.ALL || note.status === currentFilter);
        setdata(filteredData);
    }, [notes, currentFilter]);

    const addItem = (text: string, status: FilterType) => {
        const newNote = {
            createdAt: Date.now(),
            title: text,
            id: notes.length,
            status: status

        };
        addNewNote(newNote);
    };

    const changeFilter = (filter: FilterType) => () => {
        setCurrentFilter(filter);
    };

    const onDelete = useCallback((item: Note) => () => {
        deleteNote(item.id);
    }, []);

    const onStatusChange = useCallback((item: Note) => (isCompleted: boolean) => {
        updateNote({ ...item, status: isCompleted ? FilterType.COMPLETED : FilterType.ACTIVE });
    }, []);

    const navigateToLogin = () => {
        props.logout();
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return <ImageBackground source={require("src/assets/app_bg.png")} style={{width: "100%", height: "100%"}}>
    <View style={styles.scrollViewWrapper}>
        <Header primaryTitle={`Hi, ${props.username}.`}  buttonText = {"Logout"} onButtonPress = {navigateToLogin}/>
        <InputProvider onPress={addItem} multiline placeholder={strings.notesPlaceholder} />
        <FilterList currentFilter={currentFilter} setFilter={changeFilter} />
        <NotesList data={data} onDelete={onDelete} onStatusChange={onStatusChange} />
    </View>
    </ImageBackground> ;
};


const mapStateToProps = (state: AppState): StateProps => ({
    username: state.user.userName,
    notes: state.notes
});

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
    logout: () => {
        dispatch(resetUserDetails())
        dispatch(resetCustomers())
        dispatch(resetNotes())
    },
    addNewNote: (note) => dispatch(addNote(note)),
    updateNote: (note) => dispatch(updateNote(note)),
    deleteNote: (id) => dispatch(deleteNote(id)),
});

export const Home = connect(
    mapStateToProps,
    mapDispatch
)(HomeComponent);


const styles = StyleSheet.create({
    scrollViewWrapper: {
        paddingTop: STATUS_BAR_HEIGHT + 20,
        paddingHorizontal: 15,
        flex: 1
    }
});

