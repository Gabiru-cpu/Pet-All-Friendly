import { Component } from '@angular/core';
import { GoogleMapComponent } from "../../components/google-map/google-map.component";

@Component({
  selector: 'app-pet-shops',
  standalone:true,
  imports: [GoogleMapComponent],
  templateUrl: './pet-shops.component.html',
  styleUrl: './pet-shops.component.scss'
})
export class PetShopsComponent {

}
