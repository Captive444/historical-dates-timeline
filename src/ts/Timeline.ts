// import { gsap } from 'gsap';
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
import { TimePeriod, timePeriods } from './data';


import { CircleManager } from './CircleManager';
import { SliderManager } from './SliderManager';
import { NavigationManager } from './NavigationManager';

Swiper.use([Navigation]);

export class Timeline {
  private container!: HTMLElement;
  private currentIndex = 0;
  private total = 0;
  private angleStep = 0;
  
  
  private circleManager!: CircleManager;
  private sliderManager!: SliderManager;
  private navigationManager!: NavigationManager;

  constructor(private periods: TimePeriod[] = timePeriods) {
    this.total = periods.length;
    this.angleStep = 360 / this.total;
  }

  public initialize(containerId: string): void {

    
    const container = document.getElementById(containerId);
    if (!container) {
      return;
    }
    
    this.container = container;
    

    this.navigationManager = new NavigationManager(this.container, this.total);
    this.circleManager = new CircleManager(this.container, this.periods);
    this.sliderManager = new SliderManager(this.container);
    
    this.setupDOM();
    this.setupEvents();
    this.render();
    
  
  }

  private setupDOM(): void {

    

    this.circleManager.setup();
    this.sliderManager.setup();
    this.navigationManager.setup();
  }

  private setupEvents(): void {

    this.navigationManager.setButtonHandlers(
      () => this.prev(),
      () => this.next()
    );
    

    this.circleManager.setOnPointClick((index: number) => {
      this.goToPeriod(index);
    });
    

    this.navigationManager.setOnDotClick((index: number) => {
      this.goToPeriod(index);
    });
  }

  private render(): void {
    const period = this.periods[this.currentIndex];
    
  
    this.navigationManager.updateYears(period.period);
    this.navigationManager.updateFraction(this.currentIndex);
    this.navigationManager.updateMobileTitle(period.title);
    this.navigationManager.updateMobileDots(this.currentIndex);
    this.navigationManager.updateButtonsState(this.currentIndex);
    
   
    this.circleManager.rotateTo(this.currentIndex, this.angleStep);
    this.circleManager.updateActivePoint(this.currentIndex);
    
   
    this.sliderManager.updateSlides(period.events);
    
  }

  private goToPeriod(index: number): void {
   
    
    if (index < 0 || index >= this.total || index === this.currentIndex) return;
    
   
    this.currentIndex = index;
    this.render();
  }

  private prev(): void {

    if (this.currentIndex > 0) {
      this.goToPeriod(this.currentIndex - 1);
    } 
    // else {
    //   console.log('Уже на первом');
    // }
  }

  private next(): void {
   
    if (this.currentIndex < this.total - 1) {
      this.goToPeriod(this.currentIndex + 1);
    } 
    // else {
    //   console.log('Уже на последнем');
    // }
  }
}


