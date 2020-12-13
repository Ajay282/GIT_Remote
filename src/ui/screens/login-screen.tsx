import { connect } from 'react-redux';
import { Text, StyleSheet, ImageBackground } from 'react-native';
import React from 'react';
import { AppState } from 'src/store/reducer/root-reducer';
import { Dispatch } from 'redux';
import { setUserName, setPassword } from 'src/store/actions/actions-api';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInputField } from 'src/ui/components/text-input-field';
import { Logo } from 'src/ui/components/logo';
import { AppButton } from 'src/ui/components/app-button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { strings } from 'src/strings';

export type NavigationProps = StackScreenProps<RootStackParamList>;

interface StateProps {
    username: string,
    password: string,
}

interface DispatchProps {
    setUserName: (name: string) => void;
    setPassword: (name: string) => void;
}


type Props = StateProps & DispatchProps & NavigationProps;

const LoginComponent = (props: Props) => {

    const goToHome = () => {
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
        });
    };

    return <ImageBackground source={require("src/assets/home_Bg.png")} style={{width: "100%", height: "100%"}}>
    <ScrollView style={styles.scrollViewWrapper}>
        <Logo />
        <Text style={styles.loginHeader}>Login</Text>
        <TextInputField label={strings.enterName} value={props.username} onChangeText={props.setUserName} />
        <TextInputField label={strings.enterPasswoed} value={props.password} onChangeText={props.setPassword} inputType="password" />
        <AppButton title="Login" viewStyle={{ marginVertical: 10 }} onPress={goToHome} />
    </ScrollView>
    </ImageBackground>;
};

const mapStateToProps = (state: AppState): StateProps => ({
    username: state.user.userName,
    password: state.user.password,
});

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
    setUserName: (username) => dispatch(setUserName(username)),
    setPassword: (pass) => dispatch(setPassword(pass))
});

export const Login = connect(
    mapStateToProps,
    mapDispatch
)(LoginComponent);


const styles = StyleSheet.create({
    scrollViewWrapper: {
        paddingTop: 80,
        paddingHorizontal: 15,
        flex: 1
    },
    loginHeader: {
        fontSize: 28,
        color: "#FFF",
        fontWeight: "300",
        marginTop: 70,
        marginBottom: 40
    },

});

