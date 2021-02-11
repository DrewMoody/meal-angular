import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Optional,
  Inject,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MessageDialogData,
  MessageDialogResult,
} from 'src/app/shared/models/message-dialog';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageDialogComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<
      MessageDialogComponent,
      MessageDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
  ) {}

  ngOnInit(): void {}

  onButtonClick(action: string): void {
    this.dialogRef.close({ action });
  }
}
