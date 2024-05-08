import { createAction, props } from '@ngrx/store';
import { PostCustomerRequest } from '../../../features/customer/models/customer/post-customer-request';

export const setIndividualCustomer = createAction(
  '[Individual Customer] set Individual Customer',
  props<{ individualCustomer: PostCustomerRequest }>()
);
