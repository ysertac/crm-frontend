import { createFeatureSelector, createSelector, Store } from '@ngrx/store';
import { ContactMediumState } from './contact-medium.state';

const selectContactMediumState =
  createFeatureSelector<ContactMediumState>('contactMedium');

export const selectContactMedium = createSelector(
  selectContactMediumState,
  (state: ContactMediumState) => state.contactMedium
);
