import {SwiperOptions} from "swiper";

export const swiperConfig:SwiperOptions = {
  direction: "vertical",
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  observer: true,
  observeSlideChildren: true
}
