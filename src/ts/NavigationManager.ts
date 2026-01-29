import { gsap } from 'gsap';

export class NavigationManager {
  private yearStartEl!: HTMLElement;
  private yearEndEl!: HTMLElement;
  private fractionEl!: HTMLElement;
  private mobileFractionEl!: HTMLElement;
  private mobileTitleEl!: HTMLElement;
  private mobileDotsContainer!: HTMLElement;
  
  private prevBtns: NodeListOf<HTMLButtonElement>;
  private nextBtns: NodeListOf<HTMLButtonElement>;
  
  private onDotClickCallback: ((index: number) => void) | null = null;

  constructor(private container: HTMLElement, private total: number) {
    this.prevBtns = this.container.querySelectorAll('.nav-button.prev');
    this.nextBtns = this.container.querySelectorAll('.nav-button.next');
  }

  public setup(): void {
    this.yearStartEl = this.container.querySelector('.year-start')!;
    this.yearEndEl = this.container.querySelector('.year-end')!;
    this.fractionEl = this.container.querySelector('.fraction')!;
    this.mobileFractionEl = this.container.querySelector('.mobile-fraction')!;
    this.mobileTitleEl = this.container.querySelector('.slider__mobile-title')!;
    this.mobileDotsContainer = this.container.querySelector('.mobile-dots')!;
    
    this.createMobileDots();
  }

  public setButtonHandlers(onPrev: () => void, onNext: () => void): void {
    this.prevBtns.forEach(btn => {
      btn.addEventListener('click', onPrev);
    });
    
    this.nextBtns.forEach(btn => {
      btn.addEventListener('click', onNext);
    });
  }

  public setOnDotClick(callback: (index: number) => void): void {
    this.onDotClickCallback = callback;
  }

  public updateYears(periodString: string): void {
    const [start, end] = periodString.split('-').map(year => year.trim());
    
    this.animateYear(this.yearStartEl, start);
    this.animateYear(this.yearEndEl, end);
  }

 private animateYear(element: HTMLElement, newValue: string): void {
  const currentText = element.textContent || '0';
  const currentValue = parseInt(currentText);
  const targetValue = parseInt(newValue);
  

  if (isNaN(currentValue) || isNaN(targetValue)) {
    element.textContent = newValue;
    return;
  }
  

  if (currentValue === targetValue) {
    element.textContent = newValue;
    return;
  }
  
  console.log(`Анимация года: ${currentValue} → ${targetValue}`);
  
 
  gsap.to(element, {
    textContent: targetValue,
    duration: 1.2,
    ease: "power2.out",
    snap: { textContent: 1 },
    onUpdate: function() {
    
      const currentNum = Math.round(parseFloat(element.textContent || '0'));
      element.textContent = currentNum.toString();
      
   
      element.classList.add('counting');
    },
    onComplete: function() {
 
      element.classList.remove('counting');
      element.textContent = targetValue.toString();
    }
  });
}

  public updateFraction(current: number): void {
    const formattedCurrent = (current + 1).toString().padStart(2, '0');
    const formattedTotal = this.total.toString().padStart(2, '0');
    const fraction = `${formattedCurrent}/${formattedTotal}`;
    
    this.fractionEl.textContent = fraction;
    this.mobileFractionEl.textContent = fraction;
  }

  public updateMobileTitle(title: string): void {
    this.mobileTitleEl.textContent = title;
  }

  private createMobileDots(): void {
    this.mobileDotsContainer.innerHTML = '';
    
    for (let i = 0; i < this.total; i++) {
      const dot = document.createElement('div');
      dot.className = 'mobile-dot';
      if (i === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => {
        if (this.onDotClickCallback) {
          this.onDotClickCallback(i);
        }
      });
      
      this.mobileDotsContainer.appendChild(dot);
    }
  }

  public updateMobileDots(activeIndex: number): void {
    const dots = this.mobileDotsContainer.querySelectorAll('.mobile-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  public updateButtonsState(currentIndex: number): void {
    const isPrevDisabled = currentIndex === 0;
    const isNextDisabled = currentIndex === this.total - 1;
    
    this.prevBtns.forEach(btn => {
      btn.disabled = isPrevDisabled;
      btn.style.opacity = isPrevDisabled ? '0.5' : '1';
      btn.style.cursor = isPrevDisabled ? 'not-allowed' : 'pointer';
    });
    
    this.nextBtns.forEach(btn => {
      btn.disabled = isNextDisabled;
      btn.style.opacity = isNextDisabled ? '0.5' : '1';
      btn.style.cursor = isNextDisabled ? 'not-allowed' : 'pointer';
    });
  }

  
}

