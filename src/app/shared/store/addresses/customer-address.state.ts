import { PostAddressRequest } from '../../../features/customer/models/address/post-address-request';

export interface CustomerAddressState {
  customerAddress: PostAddressRequest;
  customerAddresses: PostAddressRequest[];
}

export const initialCustomerAddressState: CustomerAddressState = {
  customerAddress: {
    countryId: '',
    customerId: '',
    cityId: '',
    neighbourhood: '',
    houseNumber: '',
    districtId: '',
    street: '',
    description: '',
  },
  customerAddresses: [],
};
