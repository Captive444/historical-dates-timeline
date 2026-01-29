import { gsap } from 'gsap';
import { TimePeriod } from './data';

export class CircleManager {
  private circleElement!: HTMLElement;
  private onPointClickCallback: ((index: number) => void) | null = null;
  private circleRadius: number = 265;
  private totalPoints: number = 0;
  private currentRotation: number = 0;

  constructor(
    private container: HTMLElement,
    private periods: TimePeriod[]
  ) {
    this.totalPoints = periods.length;
  }

  public setup(): void {
    this.circleElement = this.container.querySelector('.timeline-circle')!;
    this.circleRadius = this.circleElement.offsetWidth / 2;
    this.createCirclePoints();
  }

  public setOnPointClick(callback: (index: number) => void): void {
    this.onPointClickCallback = callback;
  }

  private createCirclePoints(): void {

    this.circleElement.innerHTML = '';
    
   
    const titlesContainer = document.createElement('div');
    titlesContainer.className = 'circle-titles-container';
    
    const angleStep = (2 * Math.PI) / this.totalPoints;
    
    this.periods.forEach((period, index) => {
   
      const angle = index * angleStep;
      const x = this.circleRadius + this.circleRadius * Math.cos(angle - Math.PI / 2);
      const y = this.circleRadius + this.circleRadius * Math.sin(angle - Math.PI / 2);
      
    
      const point = document.createElement('div');
      point.className = 'circle-point';
      point.dataset.index = index.toString();
      
    
      point.style.left = `${x}px`;
      point.style.top = `${y}px`;
      
    
      const innerCircle = document.createElement('div');
      innerCircle.className = 'circle-point__inner';
      

      const number = document.createElement('span');
      number.className = 'circle-point__number';
      number.textContent = (index + 1).toString();
      
      innerCircle.appendChild(number);
      point.appendChild(innerCircle);
      
  
      const title = document.createElement('div');
      title.className = 'circle-title';
      title.dataset.index = index.toString();
      title.textContent = period.title;
      
   
      this.positionTitle(title, angle);
      titlesContainer.appendChild(title);
      
     
      if (index === 0) {
        point.classList.add('active');
        title.classList.add('active');
      }
      

      point.addEventListener('click', () => {
   
        if (this.onPointClickCallback) {
          this.onPointClickCallback(index);
        }
      });
      
      this.circleElement.appendChild(point);
    });
    
   
    this.circleElement.appendChild(titlesContainer);
  }

  private positionTitle(title: HTMLElement, angle: number): void {

    const titleRadius = this.circleRadius + 80;
    
   
    const x = this.circleRadius + titleRadius * Math.cos(angle - Math.PI / 2);
    const y = this.circleRadius + titleRadius * Math.sin(angle - Math.PI / 2);
    
    title.style.left = `${x}px`;
    title.style.top = `${y}px`;
    
 
    title.style.transform = 'translate(-50%, -50%)';
    

    let normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    const degrees = (normalizedAngle * 180) / Math.PI;
    
    if (degrees >= 45 && degrees < 135) {
      // Правая сторона
      title.style.textAlign = 'left';
    } else if (degrees >= 135 && degrees < 225) {
      // Нижняя часть
      title.style.textAlign = 'center';
    } else if (degrees >= 225 && degrees < 315) {
      // Левая сторона
      title.style.textAlign = 'right';
    } else {
      // Верхняя часть
      title.style.textAlign = 'center';
    }
  }

  public rotateTo(index: number, angleStepDegrees: number): void {
    const targetAngle = -angleStepDegrees * index;
    
    
    this.currentRotation = targetAngle;
    
    // Вращаем только основной круг
    gsap.to(this.circleElement, {
      rotation: targetAngle,
      duration: 0.8,
      ease: "power2.out",
      onUpdate: () => {
        const rotation = gsap.getProperty(this.circleElement, "rotation") as number;
        this.circleElement.style.transform = `rotate(${rotation}deg)`;
        
        // КОМПЕНСАЦИЯ: вращаем внутренние элементы в обратную сторону!
        this.compensateRotation(rotation);
      },
      onComplete: () => {
        this.compensateRotation(targetAngle);
      }
    });
  }


  private compensateRotation(circleRotation: number): void {

    const points = this.circleElement.querySelectorAll('.circle-point__inner');
    points.forEach(point => {
      (point as HTMLElement).style.transform = `rotate(${-circleRotation}deg) scale(var(--point-scale))`;
    });
    
  
    const titles = this.circleElement.querySelectorAll('.circle-title');
    titles.forEach(title => {
      (title as HTMLElement).style.transform = `translate(-50%, -50%) rotate(${-circleRotation}deg)`;
    });
  }

  public updateActivePoint(index: number): void {
    const points = this.circleElement.querySelectorAll('.circle-point');
    const titles = this.circleElement.querySelectorAll('.circle-title');
    
    points.forEach((point, i) => {
      const isActive = i === index;
      point.classList.toggle('active', isActive);
      
     
      const innerCircle = point.querySelector('.circle-point__inner') as HTMLElement;
      if (innerCircle) {
        innerCircle.style.setProperty('--point-scale', isActive ? '1' : '0');
      }
    });
    
    titles.forEach((title, i) => {
      title.classList.toggle('active', i === index);
    });
    

    this.compensateRotation(this.currentRotation);
  }
}