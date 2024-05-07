import { createReducer, on } from '@ngrx/store';
import { initialContactMediumState } from './contact-medium.state';
import { setContactMedium } from './contact-medium.action';

export const contactMediumReducer = createReducer(
  initialContactMediumState,
  on(setContactMedium, (state, { contactMedium }) => ({
    ...state,
    contactMedium: {
      ...contactMedium,
    },
  }))
);
