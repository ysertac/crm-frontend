import { Component } from '@angular/core';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-customer',
  standalone: true,
  templateUrl: './search-customer.component.html',
  styleUrl: './search-customer.component.scss',
  imports: [InputComponent, ButtonComponent,TableComponent,CommonModule, RouterModule],
})
export class SearchCustomerComponent {
  customerCount : number = 0;
  customers :any[] = [
    {
        "id": "987654321",
        "customerId": "1",
        "accountNumber": "ACC987654",
        "phoneNumber": "5551234567",
        "firstName": "John",
        "middleName": "abc",
        "role": "Customer",
        "lastName": "Doe",
        "orderName": "Product A"
    },
    {
        "id": "123456789",
        "customerId": "C987654321",
        "accountNumber": "ACC123456",
        "phoneNumber": "5559876543",
        "firstName": "Jane",
        "middleName": "",
        "role": "Customer",
        "lastName": "Smith",
        "orderName": "Product B"
    },
    {
        "id": "567890123",
        "customerId": "C543216789",
        "accountNumber": "ACC567890",
        "phoneNumber": "5556789012",
        "firstName": "Michael",
        "middleName": "",
        "role": "Customer",
        "lastName": "Johnson",
        "orderName": "Product C"
    },
    {
        "id": "234567890",
        "customerId": "C678901234",
        "accountNumber": "ACC234567",
        "phoneNumber": "5558901234",
        "firstName": "Emily",
        "middleName": "",
        "role": "Customer",
        "lastName": "Brown",
        "orderName": "Product D"
    },
    {
        "id": "890123456",
        "customerId": "C456789012",
        "accountNumber": "ACC890123",
        "phoneNumber": "5553456789",
        "firstName": "David",
        "middleName": "",
        "role": "Customer",
        "lastName": "Martinez",
        "orderName": "Product E"
    },
    {
        "id": "456789012",
        "customerId": "C234567890",
        "accountNumber": "ACC456789",
        "phoneNumber": "5552345678",
        "firstName": "Sarah",
        "middleName": "abc",
        "role": "Customer",
        "lastName": "Garcia",
        "orderName": "Product F"
    },
    {
        "id": "012345678",
        "customerId": "C012345678",
        "accountNumber": "ACC012345",
        "phoneNumber": "5550123456",
        "firstName": "Daniel",
        "middleName": "abc",
        "role": "Customer",
        "lastName": "Lopez",
        "orderName": "Product G"
    },
    {
        "id": "345678901",
        "customerId": "C789012345",
        "accountNumber": "ACC345678",
        "phoneNumber": "5554567890",
        "firstName": "Jessica",
        "middleName": "",
        "role": "Customer",
        "lastName": "Hernandez",
        "orderName": "Product H"
    },
    {
        "id": "678901234",
        "customerId": "C901234567",
        "accountNumber": "ACC678901",
        "phoneNumber": "5557890123",
        "firstName": "Christopher",
        "middleName": "",
        "role": "Customer",
        "lastName": "Perez",
        "orderName": "Product I"
    },
    {
        "id": "901234567",
        "customerId": "C345678901",
        "accountNumber": "ACC901234",
        "phoneNumber": "5559012345",
        "firstName": "Ashley",
        "middleName": "",
        "role": "Customer",
        "lastName": "Gonzalez",
        "orderName": "Product J"
    }
]
headers = ["Customer ID", "First Name","Middle Name","Last Name","Role","ID Number"];
}
