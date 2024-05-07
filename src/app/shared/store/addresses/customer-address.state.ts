import { CreateAddressRequest } from '../../../features/customer/models/requests/create-address-request';

export interface CustomerAddressState {
  customerAddress: CreateAddressRequest;
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    city: '',
    neighbourhood: '',
    houseNumber: '',
    district: '',
    street: '',
    addressDesc: '',
  },
};
