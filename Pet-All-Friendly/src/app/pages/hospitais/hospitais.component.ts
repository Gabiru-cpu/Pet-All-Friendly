import { Component } from '@angular/core';
import { GoogleMapComponent } from "../../components/google-map/google-map.component";

@Component({
  selector: 'app-hospitais',
  standalone:true,
  imports: [GoogleMapComponent],
  templateUrl: './hospitais.component.html',
  styleUrl: './hospitais.component.scss'
})
export class HospitaisComponent {

}
