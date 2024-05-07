import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { IndividualCustomerState } from './individual-customer.state';

// IndividualCustomerState içindeki individualCustomer alanını seçmek için bir seçici tanımlayalım
const selectIndividualCustomerState =
  createFeatureSelector<IndividualCustomerState>('individualCustomer');

// Seçiciyi kullanarak individualCustomer alanını seçelim
export const selectIndividualCustomer = createSelector(
  selectIndividualCustomerState,
  (state: IndividualCustomerState) => state.individualCustomer
);
