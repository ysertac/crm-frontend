import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-sales-layout',
  standalone: true,
  imports: [RouterLink,RouterOutlet,ButtonComponent,InputComponent,TableComponent],
  templateUrl: './sales-layout.component.html',
  styleUrl: './sales-layout.component.scss'
})
export class SalesLayoutComponent {

}
