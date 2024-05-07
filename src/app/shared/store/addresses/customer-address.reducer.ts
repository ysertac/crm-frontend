import { createReducer, on } from '@ngrx/store';
import { initialCustomerAddressState } from './customer-address.state';
import { setCustomerAddress } from './customer-address.action';

export const customerAddressReducer = createReducer(
  initialCustomerAddressState,
  on(setCustomerAddress, (state, { customerAddress }) => ({
    ...state,
    customerAddress: {
      ...customerAddress,
    },
  }))
);
