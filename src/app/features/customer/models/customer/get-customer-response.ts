export interface GetCustomerResponse {
  id: string;
  customerId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  motherName: string;
  fatherName: string;
  birthDate: Date | null;
  nationalityId: string;
}
