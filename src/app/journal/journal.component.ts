import { Component, OnInit } from '@angular/core';
import {SwiperOptions} from 'swiper';
import {JournalService} from '../controller/service/journal.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

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
  constructor(private journalService: JournalService) { }

  ngOnInit(): void {

  }

}
