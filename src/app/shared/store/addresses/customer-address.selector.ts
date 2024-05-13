import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { CustomerAddressState } from './customer-address.state';

// IndividualCustomerState içindeki individualCustomer alanını seçmek için bir seçici tanımlayalım
const selectCustomerAddressState =
  createFeatureSelector<CustomerAddressState>('customerAddress');

// Seçiciyi kullanarak individualCustomer alanını seçelim
export const selectCustomerAddress = createSelector(
  selectCustomerAddressState,
  (state: CustomerAddressState) => ({customerAddress: state.customerAddress, customerAddresses: state.customerAddresses})
);

