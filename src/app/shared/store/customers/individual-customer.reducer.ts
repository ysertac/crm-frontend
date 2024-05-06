import { createReducer, on } from '@ngrx/store';
import { setIndividualCustomer } from './individual-customer.action';
import {
  initialIndividualCustomerState,
  IndividualCustomerState,
} from './individual-customer.state';

export const individualCustomerReducer = createReducer(
  initialIndividualCustomerState,
  on(setIndividualCustomer, (state, { individualCustomer }) => ({
    ...state,
    individualCustomer: {
      ...individualCustomer,
    },
  }))
);
