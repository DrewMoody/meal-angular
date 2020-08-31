import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';

export enum NavOrientation {
  Horizontal,
  Vertical,
}

interface NavItem {
  text: string;
  icon: string | null;
  onClick: () => any;
}

@Component({
  selector: 'mpa-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mpa-navigator',
  },
})
export class NavigatorComponent {
  @HostBinding('class.vertical-nav') @Input() isVertical: boolean;
  navItems: NavItem[] = [
    {
      text: 'dash',
      icon: 'home',
      onClick: () => this.route('dash'),
    },
    {
      text: 'stats',
      icon: 'bar_chart',
      onClick: () => this.route('stats'),
    },
    {
      text: 'add',
      icon: 'add_circle',
      onClick: () => this.onAdd(),
    },
    {
      text: 'recipes',
      icon: 'restaurant_menu',
      onClick: () => this.route('recipes'),
    },
    {
      text: 'groceries',
      icon: 'shopping_cart',
      onClick: () => this.route('groceries'),
    },
  ];

  constructor() {}

  route(endpoint: string): void {}

  onAdd(): void {}
}
