import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  ChangeDetectorRef,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

export enum NavOrientation {
  Horizontal,
  Vertical,
}

interface NavItem {
  text: string;
  icon: string | null;
  route?: string;
  active?: boolean;
  onClick: (route?: string) => any;
}

const createNavItem = (text: string, icon: string, route: string, onClick: (route?: string) => any) => ({ text, icon, route, onClick })

@Component({
  selector: 'mpa-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mpa-navigator',
  },
})
export class NavigatorComponent implements OnDestroy {
  @HostBinding('class.vertical-nav') @Input() isVertical: boolean;
  navItems$: Observable<NavItem[]>;
  routerSub: Subscription;

  constructor(private router: Router, private cdRef: ChangeDetectorRef) {
    const routeFn = (route: string) => this.route(route);
    this.navItems$ = this.router.events.pipe(
      startWith(),
      scan((acc, _) => {
        return acc.map(x => ({ ...x, active: this.isActive(x.route) }));
      }, [
        createNavItem('dash', 'home', 'dashboard', routeFn),
        createNavItem('stats', 'bar_chart', 'stats', routeFn),
        createNavItem('add', 'add_circle', 'add', () => this.onAdd()),
        createNavItem('recipes', 'restaurant_menu', 'recipes', routeFn),
        createNavItem('groceries', 'shopping_cart', 'groceries', routeFn),
      ])
    )
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  route(endpoint: string): void {
    this.router.navigateByUrl(endpoint);
    this.cdRef.markForCheck();
  }

  isActive(endpoint: string): boolean {
    return this.router.isActive(endpoint, true);
  }

  onAdd(): void {
    console.log('Add');
  }
}
