import { PostContactMediumRequest } from "../../../features/customer/models/contact-medium/post-contact-medium-request";


export interface ContactMediumState {
  contactMedium: PostContactMediumRequest;
}

export const initialContactMediumState: ContactMediumState = {
  contactMedium: {
    customerId : null,
    email: '',
    homePhone: '',
    mobilePhone: '',
    fax: '',
  },
};
