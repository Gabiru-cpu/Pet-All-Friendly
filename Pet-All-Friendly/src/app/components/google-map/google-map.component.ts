/// <reference types="google.maps" />

import { Component, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [],
  templateUrl: './google-map.component.html',
  styleUrl: './google-map.component.scss'
})
export class GoogleMapComponent implements AfterViewInit {
  @Input() apiKey: string = ''; // Chave da API do Google Maps
  @Input() placesType: string = 'veterinary_care'; // Tipo de lugar (hospitais ou pet shops)

  map!: google.maps.Map;
  userMarker!: google.maps.Marker; // Novo marcador para o usuário

  ngAfterViewInit(): void {
    if (!this.apiKey) {
      console.error('Google Maps API Key não definida!');
      return;
    }
    this.loadMap();
  }

  loadMap() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const userLocation = new google.maps.LatLng(latitude, longitude);

        const mapOptions = {
          center: userLocation,
          zoom: 15,
        };

        this.map = new google.maps.Map(document.getElementById('map') as HTMLElement, mapOptions);

        // 🔴 Adicionando o marcador do usuário
        this.userMarker = new google.maps.Marker({
          position: userLocation,
          map: this.map,
          title: "Você está aqui!",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Ícone azul para diferenciar
          }
        });

        this.searchPlaces(latitude, longitude);
      },
      () => alert('Não foi possível obter sua localização')
    );
  }

  searchPlaces(lat: number, lng: number) {
    const service = new google.maps.places.PlacesService(this.map);
    const request = {
      location: new google.maps.LatLng(lat, lng),
      radius: 5000, // Raio de busca (5km)
      type: this.placesType, // Tipo de local (hospitais ou pet shops)
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        results?.forEach((place) => {
          const marker = new google.maps.Marker({
            position: place.geometry?.location!,
            map: this.map,
            title: place.name,
          });

          // 📌 Evento de clique para abrir no Google Maps
          marker.addListener("click", () => {
            const lat = place.geometry?.location?.lat();
            const lng = place.geometry?.location?.lng();
            if (lat !== undefined && lng !== undefined) {
              const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
              window.open(url, "_blank");
            }
          });
        });
      }
    });
  }

}
