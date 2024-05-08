import { PostAddressRequest } from "../../../features/customer/models/address/post-address-request";


export interface CustomerAddressState {
  customerAddress: PostAddressRequest;
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    customerId : null,
    cityId: 0,
    neighbourhood: '',
    houseNumber: '',
    district: '',
    street: '',
    description: '',
  },
};
