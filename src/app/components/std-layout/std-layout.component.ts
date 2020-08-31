import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
} from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { Breakpoints } from '../../shared/breakpoints';

@Component({
  selector: 'mpa-std-layout',
  templateUrl: './std-layout.component.html',
  styleUrls: ['./std-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'mpa-std-layout',
  },
})
export class StdLayoutComponent {
  @Input() horizontalNav$: Observable<boolean>;
  @HostBinding('class.mobile-layout') isMobileOrTablet: boolean;

  constructor() {
    const checkIsMobileOrTablet = () => window.innerWidth <= Breakpoints.Tablet;
    this.isMobileOrTablet = checkIsMobileOrTablet();
    this.horizontalNav$ = fromEvent(window, 'resize').pipe(
      startWith(''),
      map((_) => checkIsMobileOrTablet()),
      tap(
        (isMobileOrTablet: boolean) =>
          (this.isMobileOrTablet = isMobileOrTablet)
      )
    );
  }
}
