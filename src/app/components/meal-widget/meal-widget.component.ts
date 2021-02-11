import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { FoodItem, MealEntry, MealItem } from '../../shared/models/meal';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddFoodComponent } from '../add-food/add-food.component';
import {
  AddFoodData,
  AddFoodResult,
} from 'src/app/shared/models/add-food-dialog';
import { MealsService } from 'src/app/shared/meals/meals.service';
import { TimeService } from 'src/app/shared/time/time.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import {
  MessageDialogData,
  MessageDialogResult,
} from 'src/app/shared/models/message-dialog';
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
  @Input() mealName: MealEntry;
  expanded: boolean = false;

  constructor(
    private dialogService: MatDialog,
    private mealService: MealsService,
    private timeService: TimeService
  ) {}

  ngOnInit(): void {}

  onPanelOpen(): void {
    this.expanded = true;
  }

  onPanelClose(): void {
    this.expanded = false;
  }

  openAddDialog(
    food?: FoodItem
  ): MatDialogRef<AddFoodComponent, AddFoodResult> {
    const date = this.timeService.getCurrentDay();

    return this.dialogService.open<
      AddFoodComponent,
      AddFoodData,
      AddFoodResult
    >(AddFoodComponent, {
      data: {
        date,
        meal: this.mealName,
        food,
      },
    });
  }

  async onAddClick(e: Event): Promise<void> {
    e.stopPropagation();
    const addDialog = this.openAddDialog();

    addDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.mealService.setFoodItem(
          this.timeService.formatMomentUTC(result.date),
          result.meal,
          result.food
        );
      }
    });
  }

  onEditClick(item: FoodItem): void {
    const addDialog = this.openAddDialog(item);

    addDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.mealService.updateFoodItem(
          this.timeService.formatMomentUTC(result.date),
          result.meal,
          result.food
        );
      }
    });
  }

  onDeleteClick(item: FoodItem): void {
    const CONTINUE = 'Continue';

    const deleteDialog: MatDialogRef<
      MessageDialogComponent,
      MessageDialogResult
    > = this.dialogService.open<
      MessageDialogComponent,
      MessageDialogData,
      MessageDialogResult
    >(MessageDialogComponent, {
      data: {
        title: `Delete ${item.name}`,
        message: [
          `Are you sure you would like to delete ${item.name}? This action is irreversible.`,
        ],
        actions: [{ text: 'Cancel' }, { text: CONTINUE }],
      },
    });

    deleteDialog.afterClosed().subscribe((result) => {
      if (result?.action === CONTINUE) {
        return this.mealService.removeFoodItem(
          this.timeService.formatMomentUTC(this.timeService.getCurrentDay()),
          this.mealName,
          item
        );
      }
    });
  }
}
