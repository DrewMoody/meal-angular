import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  HostBinding,
} from '@angular/core';

/**
 * TODO: When progress < 0 (when consumed more calories than alotted for day) colors are inverted
 * from 100-199%, 300-399%, etc. Need different approach
 * For now, just turn whole ring lightly red
 */
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
  readonly backgroundFill: string = '#4a4a4a33';
  readonly overFill: string = '#bb7576';

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
    this._progress = Number(
      (this.circumference - (this.progress / 100) * this.circumference).toFixed(
        1
      )
    );
  }
}
