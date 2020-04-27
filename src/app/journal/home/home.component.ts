import { Component, OnInit } from '@angular/core';
import {SwiperOptions} from 'swiper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 30,
    loop: true ,
    centeredSlides: true,
    /* autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      }, */
  };

  constructor() { }

  ngOnInit(): void {
  }

}