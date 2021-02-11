import { MpaButton } from './button';

export interface MessageDialogData {
  title: string;
  message: string[];
  actions: MpaButton[];
}

export interface MessageDialogResult {
  action: string;
}
