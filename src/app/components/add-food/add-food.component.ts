import { KeyValue } from '@angular/common';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Inject,
  ChangeDetectorRef,
  Optional,
} from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import {
  AddFoodData,
  AddFoodResult,
} from 'src/app/shared/models/add-food-dialog';
import { FoodItem, MealEntry, MealItem } from 'src/app/shared/models/meal';
import { TimeService } from 'src/app/shared/time/time.service';
import { v4 } from 'uuid';

/**
 * TODO: Add ingredients, recipes, the whole nine
 * For now, let's stick to name and manually inputting cals just to get the ball rolling
 */
@Component({
  selector: 'mpa-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddFoodComponent implements OnInit {
  foodForm: FormGroup;
  meals: { value: MealEntry; viewValue: string }[] = [
    { value: MealEntry.Breakfast, viewValue: 'Breakfast' },
    { value: MealEntry.Lunch, viewValue: 'Lunch' },
    { value: MealEntry.Dinner, viewValue: 'Dinner' },
    { value: MealEntry.Snacks, viewValue: 'Snacks' },
  ];

  constructor(
    private dialogRef: MatDialogRef<AddFoodComponent, AddFoodResult>,
    @Optional() @Inject(MAT_DIALOG_DATA) private data: AddFoodData,
    private timeService: TimeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.initForm();
  }

  async initForm() {
    this.foodForm = await this.createFoodItem();
    this.cdRef.markForCheck();
  }

  createCalorieInformation() {
    return new FormGroup({
      servingSize: new FormControl(''),
      calories: new FormControl(0),
      fat: new FormControl(0),
      carbs: new FormControl(0),
      netCarbs: new FormControl(0),
      protein: new FormControl(0),
    });
  }

  createIngredient() {
    return new FormGroup({
      id: new FormControl(v4()),
      name: new FormControl(),
      calorieInformation: this.createCalorieInformation(),
    });
  }

  async createFoodItem() {
    const date =
      this.data?.date ||
      (await this.timeService.getCurrentDay$().pipe(first()).toPromise());

    return new FormGroup({
      date: new FormControl(date),
      meal: new FormControl(this.data?.meal || MealEntry.Breakfast),
      id: new FormControl(v4()),
      name: new FormControl(''),
      ingredients: new FormArray([]),
      recipe: new FormArray([]),
      calorieInformation: this.createCalorieInformation(),
    });
  }

  getIngredients(form: FormGroup) {
    return form.get('ingredients') as FormArray;
  }

  getCalorieInformation(form: FormGroup) {
    return form.get('calorieInformation') as FormGroup;
  }

  addIngredient(form: FormGroup) {
    const ingredients = this.getIngredients(form);
    ingredients.insert(ingredients.length, this.createIngredient());
  }

  onAdd() {
    this.dialogRef.close(this.convertFormToResponse());
  }

  convertFormToResponse(): AddFoodResult {
    const { date, meal, ...rest } = this.foodForm.value;

    return {
      date,
      meal,
      food: rest as FoodItem,
    };
  }

  /**
   * Used to prevent Angular from sorting
   */
  keepKeyValueOriginalOrder = (
    a: KeyValue<number, string>,
    b: KeyValue<number, string>
  ): number => {
    return 0;
  };
}
