import { PostAddressRequest } from "../../../features/customer/models/address/post-address-request";


export interface CustomerAddressState {
  customerAddress: PostAddressRequest;
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    customerId : null,
    city: '',
    neighbourhood: '',
    houseNumber: '',
    district: '',
    street: '',
    addressDesc: '',
  },
};
