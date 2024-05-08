import { PostCustomerRequest } from "../../../features/customer/models/customer/post-customer-request";


export interface IndividualCustomerState {
  individualCustomer: PostCustomerRequest;
}

export const initialIndividualCustomerState: IndividualCustomerState = {
  individualCustomer: {
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    motherName: '',
    fatherName: '',
    birthDate: null,
    nationalityId: '',
  },
};
