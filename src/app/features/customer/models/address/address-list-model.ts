export interface CityModel {
  id: number;
  name: string;
}

export interface AddressListModel {
  descripion: string;

  neighbourhood: string;

  houseNumber: string;

  district: string;

  street: string;

  city: CityModel;
}
