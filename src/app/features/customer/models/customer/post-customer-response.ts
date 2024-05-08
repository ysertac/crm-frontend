export interface PostCustomerResponse {
  id: number;
  customerId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  motherName: string;
  fatherName: string;
  birthDate: Date | null;
  nationalityId: string;
}
