import { connect } from 'react-redux';
import { ImageBackground, StyleSheet, View } from 'react-native';
import React, {  } from 'react';
import { AppState } from 'src/store/reducer/root-reducer';
import { Dispatch } from 'redux';
import { APP_BACKGROUND } from 'src/constants';
import { Header } from 'src/ui/components/app-header';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { InputProvider } from '../components/input-provider';
import { strings } from 'src/strings';
import { CustomersState } from 'src/store/reducer/customers/customer-reducer';
import { FlatList } from 'react-native-gesture-handler';
import { addCustomer, Customer, resetCustomers } from 'src/store/actions/customers/customer-actions';
import { AppButton } from '../components/app-button';
import { resetUserDetails } from 'src/store/actions/actions-api';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from 'App';
import { resetNotes } from 'src/store/actions/notes/notes-actions';
const STATUS_BAR_HEIGHT = getStatusBarHeight();

interface StateProps {
    customers: CustomersState;
}

interface DispatchProps {
    logout: () => void;
    addnewCustomer: (note: Customer) => void;
    // deleteCustomer: (id: number) => void;
}
export type NavigationProps = StackScreenProps<RootStackParamList>;


type Props = StateProps & DispatchProps & NavigationProps;


const CustomersComponent = (props: Props) => {

    const { customers, addnewCustomer } = props;

    const addCustomer = (text: string) => {
        addnewCustomer({
            name: text,
            id: customers.length
        });
    };
    const navigateToLogin = () => {
        props.logout();
        props.navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return <ImageBackground source={require("src/assets/app_bg.png")} style={{width: "100%", height: "100%"}}>
    <View style={styles.scrollViewWrapper}>
        <Header primaryTitle={`Customers`} buttonText = {"Logout"} onButtonPress = {navigateToLogin}/>
        <InputProvider
         onPress={addCustomer} 
         multiline={false} 
         placeholder={strings.customerPlaceholer} 
         isCustomerList={true}
         buttonText="Add customer"
         buttonViewStyle={{ flex: 3 }}
         inputViewStyle={{height: 60, flex: 6 }}/>
        <FlatList
            data={customers}
            style={{ marginTop: 20 }}
            renderItem={({ item }) => {
                return <AppButton title={item.name || "Unknown customer"} viewStyle={styles.customerViewStyle} />;
            }}
        />
    </View>
    </ImageBackground>;
};


const mapStateToProps = (state: AppState): StateProps => ({
    customers: state.customers
});

const mapDispatch = (dispatch: Dispatch): DispatchProps => ({
    addnewCustomer: (customer) => dispatch(addCustomer(customer)),
    logout: () => {
        dispatch(resetUserDetails())
        dispatch(resetCustomers())
        dispatch(resetNotes())
    },
});

export const Customers = connect(
    mapStateToProps,
    mapDispatch
)(CustomersComponent);


const styles = StyleSheet.create({
    scrollViewWrapper: {
        paddingTop: STATUS_BAR_HEIGHT + 20,
        paddingHorizontal: 15,
        flex: 1
    },
    customerViewStyle: {
        marginVertical: 5,
        alignItems: "flex-start",
        alignSelf: "center",
        width: 200,
        backgroundColor: "#696969"
    }
});

