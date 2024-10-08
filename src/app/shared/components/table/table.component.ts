import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
  tap,
} from 'rxjs';
import { ColumnInterface } from './models/data-table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  template: `
    @if((pageData$ | async); as pageData){
    <div>
      <table class="table table-fixed text-gray-700 drop-shadow-lg">
        <thead>
          <tr>
            @for(column of columns; track $index){
            <th [class]="column.class ? [column.class, 'text-gray-800'] : ''">
              @if(column.tableHeaderType === 'checkbox'){
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
              }@else if (column.tableHeaderType === 'text') {
              {{ column.name }}
              }
            </th>
            }
          </tr>
        </thead>
        <tbody>
          @for(instance of pageData; track instance.id; let i = $index){
          <tr>
            @for(column of columns; track $index){
            <td>
              @switch(column.tableBodyType){ @case ("text") {
              {{ instance[column.key] }}
              } @case("menu") {
              <div class="dropdown dropdown-left 2xl:dropdown-right">
                <div tabindex="0" role="button" class="btn m-1 btn-sm">
                  Action
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-24"
                >
                  @for(menu of column.item; track $index){
                  <li (click)="menu.method(instance)">
                    <a>{{
                      menu.name !== '$active'
                        ? menu.name
                        : instance.active
                        ? 'Deactivate'
                        : 'Activate'
                    }}</a>
                  </li>
                  }
                </ul>
              </div>
              } @case ("checkbox") {
              <label>
                <input type="checkbox" class="checkbox" />
              </label>
              } }
            </td>
            }
          </tr>
          }
        </tbody>
      </table>
    </div>
    <div class="flex justify-end join">
      <button
        class="join-item btn btn-sm"
        (click)="prevPage()"
        [disabled]="this.isFirstPage$ | async"
      >
        «
      </button>
      <button class="join-item btn btn-sm">
        Page {{ currentPage$ | async }}
      </button>
      <button
        class="join-item btn btn-sm"
        (click)="nextPage()"
        [disabled]="this.isLastPage$ | async"
      >
        »
      </button>
    </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
  //** Input Decorators */
  @Input() searchKey$!: Observable<string>;
  @Input() columns: ColumnInterface<any>[] = [];
  @Input() data$!: Observable<any[]>;

  //** Properties */
  pageData$!: Observable<any[]>;
  currentPage$: BehaviorSubject<number> = new BehaviorSubject(1);
  isLastPage$: Observable<boolean> = new BehaviorSubject(false);
  isFirstPage$: Observable<boolean> = new BehaviorSubject(true);
  totalPage: number = 0;
  itemsPerPage: number = 17;
  totalItems: number = 0;

  ngOnInit(): void {

    console.log(this.data$);
    if (this.data$ !== null) {
      this.data$ = this.data$.pipe(
        tap((data) => {
          this.totalItems = data.length;
          this.currentPage$.next(1);
        })
      );
    } else {
      return;
    }

    this.searchKey$ = this.searchKey$.pipe(
      tap(() => {
        this.currentPage$.next(1);
      })
    );
    this.pageData$ = combineLatest([
      this.currentPage$,
      this.data$,
      this.searchKey$.pipe(startWith('')),
    ]).pipe(
      map(([currentPage, items, searchKey]) =>
        items
          .filter(
            (item) =>
              item.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
              item.description
                ?.toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              String(item.active)
                .toLowerCase()
                .includes(searchKey.toLowerCase())
          )
          .slice(
            this.itemsPerPage * (currentPage - 1),
            this.itemsPerPage * currentPage
          )
      )
    );

    this.isFirstPage$ = this.currentPage$.pipe(
      map((currentPage) => (currentPage === 1 ? true : false))
    );

    this.isLastPage$ = combineLatest([
      this.currentPage$,
      this.data$,
      this.searchKey$.pipe(startWith('')),
    ]).pipe(
      map(([currentPage, items, searchKey]) => {
        const filteredItems = items.filter(
          (item) =>
            item.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchKey.toLowerCase()) ||
            String(item.active).toLowerCase().includes(searchKey.toLowerCase())
        );
        const totalItems = Math.max(filteredItems.length, 1); // Ensure at least 1 page for empty data
        return currentPage === Math.ceil(totalItems / this.itemsPerPage);
      })
    );
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.value + 1);
  }

  prevPage() {
    this.currentPage$.next(this.currentPage$.value - 1);
  }
}
