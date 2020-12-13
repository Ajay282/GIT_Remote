import { ActionTypes } from "src/store/actions/action-types";

export interface Customer {
    name: string;
    id: number;
}


export interface AddCustomer {
    type: ActionTypes.ADD_CUSTOMER;
    data: Customer;
}
export interface DeleteCustomer {
    type: ActionTypes.REMOVE_CUSTOMER;
    id: number;
}
export interface ResetCustomers {
    type: ActionTypes.RESET_CUSTOMERS;
}

export const addCustomer: (data: Customer) => AddCustomer = (data) => ({
    type: ActionTypes.ADD_CUSTOMER,
    data
});
export const deleteCustomer: (id: number) => DeleteCustomer = (id) => ({
    type: ActionTypes.REMOVE_CUSTOMER,
    id
});
export const resetCustomers: () => ResetCustomers = () => ({
    type: ActionTypes.RESET_CUSTOMERS,
});

export type CustomerActions = AddCustomer | DeleteCustomer | ResetCustomers;