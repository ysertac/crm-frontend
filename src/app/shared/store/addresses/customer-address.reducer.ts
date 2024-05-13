import { createReducer, on } from '@ngrx/store';
import { initialCustomerAddressState } from './customer-address.state';
import { setCustomerAddress, setCustomerAddresses } from './customer-address.action';

export const customerAddressReducer = createReducer(
  initialCustomerAddressState,
  on(setCustomerAddress, (state, { customerAddress }) => ({
    ...state,
    customerAddress: {
      ...customerAddress,
    },
  })),
  on(setCustomerAddresses, (state, {customerAddresses}) => ({
    ...state,
    customerAddresses: [...customerAddresses],
  }))
);
