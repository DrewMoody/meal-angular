import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'mpa-progress-ring',
  templateUrl: './progress-ring.component.html',
  styleUrls: ['./progress-ring.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressRingComponent implements OnInit, OnChanges {
  @Input() stroke: number = 8;
  @Input() radius: number = 60;
  @Input() progress: number = 0;
  @Input() strokeColor: string = '#212121';
  @Input() label: string = '';
  normalizedRadius: number;
  circumference: number;
  _progress: number;

  constructor() {}

  ngOnInit(): void {
    this.setRadiusCircumference();
    this.setProgress();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('stroke') || changes.hasOwnProperty('radius')) {
      this.setRadiusCircumference();
    }
    if (changes.hasOwnProperty('progress')) {
      this.setProgress();
    }
  }

  setRadiusCircumference(): void {
    this.normalizedRadius = this.radius - this.stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  setProgress(): void {
    this._progress =
      Number((this.circumference - (this.progress / 100) * this.circumference).toFixed(1));
  }
}
