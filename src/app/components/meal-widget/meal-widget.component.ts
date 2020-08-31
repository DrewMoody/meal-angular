import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { MealItem } from '../../shared/meal-types';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
@Component({
  selector: 'mpa-meal-widget',
  templateUrl: './meal-widget.component.html',
  styleUrls: ['./meal-widget.component.scss'],
  host: {
    class: 'mpa-meal-widget no-select',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('chevronOpenClose', [
      state(
        'open',
        style({
          transform: 'rotate(90deg)',
        })
      ),
      state(
        'closed',
        style({
          transform: 'rotate(0deg)',
        })
      ),
      transition('open => closed', [animate('200ms')]),
      transition('closed => open', [animate('200ms')]),
    ]),
  ],
})
export class MealWidgetComponent implements OnInit {
  @Input() meal: MealItem;
  @Input() mealName: string;
  expanded: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onPanelOpen(): void {
    this.expanded = true;
  }

  onPanelClose(): void {
    this.expanded = false;
  }

  onAddClick(e: Event): void {
    e.stopPropagation();
  }

  onEditClick(e: Event): void {
    e.stopPropagation();
  }
}
