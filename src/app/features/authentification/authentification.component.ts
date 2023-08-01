import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

interface CarouselItemModel {
  title: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss'],
  providers: [
    NgbCarouselConfig
  ]
})
export class AuthentificationComponent {

	images = [1055, 194, 368].map((n) => `https://picsum.photos/id/${n}/900/500`);

  carouselItems: CarouselItemModel[] = [
    {
      title: "Bienvenue \nsur RICVA",
      description: "RICVA est une plateforme de suivi et de gestion du secteur agricole, de la production à la vente en passant par le financement",
      image: "assets/carousel-image.png"
    },
    {
      title: "Bienvenue \nsur RICVA",
      description: "RICVA est une plateforme de suivi et de gestion du secteur agricole, de la production à la vente en passant par le financement",
      image: "assets/carousel-image.png"
    },
    {
      title: "Bienvenue \nsur RICVA",
      description: "RICVA est une plateforme de suivi et de gestion du secteur agricole, de la production à la vente en passant par le financement",
      image: "assets/carousel-image.png"
    }
  ]

  constructor(config: NgbCarouselConfig){
    config.showNavigationArrows = true;
    config.showNavigationIndicators = true;
  }
}
