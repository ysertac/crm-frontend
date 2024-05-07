import { createAction, props } from '@ngrx/store';
import { CreateAddressRequest } from '../../../features/customer/models/requests/create-address-request';

export const setCustomerAddress = createAction(
  '[Customer Address] set Customer Address',
  props<{ customerAddress: CreateAddressRequest }>()
);
