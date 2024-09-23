import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
} from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `<ol class="breadcrumb">
    <li *ngFor="let breadcrumb of breadcrumbs">
      <span [routerLink]="breadcrumb.url" routerLinkActive="router-link-active">
        {{ breadcrumb.label }}
      </span>
    </li>
  </ol>`,
  styleUrl: './breadcrumbs.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];
  router = inject(Router);
  route = inject(ActivatedRoute);

  constructor() {
    // this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
  }
  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadcrumbs(this.route.root);
      });
  }

  private buildBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: Breadcrumb[] = []
  ): Breadcrumb[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url
        .map((segment) => segment.path)
        .join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const breadcrumb: Breadcrumb = {
        label: child.snapshot.data['breadcrumb'] || this.capitalize(routeURL),
        url,
      };

      breadcrumbs.push(breadcrumb);

      return this.buildBreadcrumbs(child, url, breadcrumbs);
    }

    return breadcrumbs;
  }

  private capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
