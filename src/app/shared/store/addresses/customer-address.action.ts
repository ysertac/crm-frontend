import { createAction, props } from '@ngrx/store';
import { PostAddressRequest } from '../../../features/customer/models/address/post-address-request';

export const setCustomerAddress = createAction(
  '[Customer Address] set Customer Address',
  props<{ customerAddress: PostAddressRequest }>()
);

export const setCustomerAddresses = createAction(
  '[Customer Addresses] set Customer Addresses',
  props<{customerAddresses: PostAddressRequest[]}>()
);
