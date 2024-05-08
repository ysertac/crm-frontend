export interface PostAddressRequest {
  customerId:number | null
  city: string;
  neighbourhood: string;
  houseNumber: string;
  district: string;
  street: string;
  addressDesc: string;
}
