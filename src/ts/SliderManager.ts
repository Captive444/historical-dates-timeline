import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { HistoricalEvent } from './data';

export class SliderManager {
  private swiperWrapper!: HTMLElement;
  private sliderPrevBtn!: HTMLButtonElement;
  private sliderNextBtn!: HTMLButtonElement;
  private swiper: Swiper | null = null;

  constructor(private container: HTMLElement) {}

  public setup(): void {
    this.swiperWrapper = this.container.querySelector('.swiper-wrapper')!;
    this.sliderPrevBtn = this.container.querySelector('.slider__btn_prev')! as HTMLButtonElement;
    this.sliderNextBtn = this.container.querySelector('.slider__btn_next')! as HTMLButtonElement;
    
    this.initSwiper();
  }

  private initSwiper(): void {
    console.log('Инициализация Swiper...');
    
    this.swiper = new Swiper('.swiper', {
      modules: [Navigation],
      slidesPerView: 'auto',
      spaceBetween: 80,
      navigation: {
        nextEl: this.sliderNextBtn,
        prevEl: this.sliderPrevBtn,
        disabledClass: 'swiper-button-disabled'
      },
      breakpoints: {
        320: { slidesPerView: 1.2, spaceBetween: 25 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1024: { slidesPerView: 3, spaceBetween: 80 }
      }
    });
  }

  public updateSlides(events: HistoricalEvent[]): void {
   
    this.swiperWrapper.innerHTML = '';
    
    events.forEach(event => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      
      const year = document.createElement('p');
      year.className = 'slider__year';
      year.textContent = event.year.toString();
      
      const description = document.createElement('p');
      description.className = 'slider__description';
      description.textContent = event.description;
      
      slide.appendChild(year);
      slide.appendChild(description);
      this.swiperWrapper.appendChild(slide);
    });
    
    if (this.swiper) {
      this.swiper.update();
      this.swiper.slideTo(0, 0);
    }
  }

  public destroy(): void {
    if (this.swiper) {
      this.swiper.destroy();
    }
  }
}