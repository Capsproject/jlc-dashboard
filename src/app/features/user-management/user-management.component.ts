import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { ColumnInterface } from '../../shared/components/table/models/data-table';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { dummyTechnician } from '../../../../dummy';
import { TableComponent } from '../../shared/components/table/table.component';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ApiResponse } from '../../shared/models/api-response';
import { Users } from './models/api-response';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { ButtonComponent } from '../../shared/components/buttons/button/button.component';
import { UtilitiesService } from '../../shared/utilities/utilities.service';
import { ActivatedRoute } from '@angular/router';
import { FormFieldComponent } from '../../shared/components/form-field/form-field.component';
import { RolesService } from '../../shared/services/roles.service';
import { Roles } from '../../shared/models/roles.model';
import { SelectFieldComponent } from '../../shared/components/form-field/select-field/select-field.component';
import { SelectField } from '../../shared/models/select-field.model';
import { AlertService } from '../../shared/services/alert.service';
import { SkillService } from './services/skill.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    TableComponent,
    CommonModule,
    LoadingComponent,
    ButtonComponent,
    FormFieldComponent,
    SelectFieldComponent,
  ],
  template: ` @if (loadingFetchApi()) {
    <div class="flex h-[90vh] justify-center items-center">
      <app-loading />
    </div>
    }@else {
    <dialog #userDialog class="rounded-lg w-3/12">
      <div class="flex flex-col h-auto p-4 rounded-lg">
        <div
          class="flex flex-row"
          [ngClass]="isViewUser ? 'justify-between' : 'justify-center'"
        >
          <div class="flex flex-row w-full">
            @if (isTechnicianList) {
            <h1 class="text-2xl">
              @if(isViewUser) {View} @else {Add} Technician
            </h1>
            }@else{
            <h1 class="text-2xl">@if(isViewUser) {View} @else {Add} User</h1>
            }
          </div>
          @if (isViewUser) {
          <app-button
            actionText="Delete"
            buttonStyle="danger"
            loadingText="Deleting..."
            (action)="deleteUser(+this.createUserForm.get('id')?.value)"
          />
          }
        </div>

        <app-form-field
          [label]="'Name'"
          controlName="name"
          [formGroup]="createUserForm"
        />
        <app-form-field
          [label]="'Email'"
          controlName="email"
          [formGroup]="createUserForm"
        />
        <app-form-field
          [label]="'Password'"
          controlName="password"
          [formGroup]="createUserForm"
          [type]="'password'"
        />
        @if (!isTechnicianList) {
        <jlc-select-field
          [formGroup]="createUserForm"
          controlName="user_role_id"
          placeholder="Select Role"
          [options]="rolesOption"
        />
        }
        <div class="button flex w-full justify-end gap-2">
          <app-button
            [actionText]="'Save'"
            [buttonStyle]="'primary'"
            loadingText="Saving..."
            (action)="createUser()"
            [loading]="loadingButton()"
            [disabled]="!createUserForm.valid || loadingButton()"
          />
          <app-button
            [actionText]="'Cancel'"
            [buttonStyle]="'danger'"
            (action)="userDialog.close()"
          />
        </div>
      </div>
    </dialog>

    <dialog #skillsDialog class="rounded-lg w-3/12">
      <div class="flex flex-col h-auto p-4 rounded-lg">
        <div
          class="flex flex-row"
          [ngClass]="isViewUser ? 'justify-between' : 'justify-center'"
        >
          <div class="flex flex-row w-full">
            <h1 class="text-2xl">Add Skill</h1>
          </div>
        </div>

        <app-form-field
          [label]="'Skill'"
          controlName="name"
          [formGroup]="createUserForm"
        />
        <div class="button flex w-full justify-end gap-2">
          <app-button
            [actionText]="'Save'"
            [buttonStyle]="'primary'"
            loadingText="Saving..."
            (action)="createUser()"
            [loading]="loadingButton()"
            [disabled]="!createUserForm.valid || loadingButton()"
          />
          <app-button
            [actionText]="'Cancel'"
            [buttonStyle]="'danger'"
            (action)="skillsDialog.close()"
          />
        </div>
      </div>
    </dialog>

    <div class="flex justify-start gap-1">
      <app-button
        [actionText]="isTechnicianList ? 'Add Technician' : 'Add User'"
        [buttonStyle]="'primary'"
        [icon]="utilityS.getIcon('plus')"
        (action)="userDialog.showModal()"
      />
      @if (isTechnicianList) {
      <app-button
        actionText="Add Skill"
        [buttonStyle]="'primary'"
        [icon]="utilityS.getIcon('plus')"
        (action)="skillsDialog.showModal()"
      />
      }
    </div>
    <app-table
      [data$]="data"
      [columns]="tableColumns"
      [searchKey$]="searchKey$"
      (data)="viewUser($event)"
    ></app-table>
    }`,
})
export class UserManagementComponent implements OnInit, OnDestroy {
  @ViewChild('userDialog') modal!: ElementRef;
  @ViewChild('skillsDialog') skillmodal!: ElementRef;
  public data!: Observable<Users[]>;
  public isTechnicianList = false;
  public searchKey = new FormControl();
  public searchKey$ = this.searchKey.valueChanges;
  public roles!: Roles[] | null;
  public isViewUser = false;
  public tableColumns: ColumnInterface<Users>[] = [
    {
      name: 'ID No.',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'id',
      class: 'w-1/3',
    },
    {
      name: 'Name',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'name',
      class: 'w-1/3',
    },
    {
      name: 'Email',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'email',
      class: 'w-1/3',
    },
    {
      name: 'Active',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'is_enabled',
      class: 'w-1/3',
    },
    {
      name: 'Created',
      tableBodyType: 'text',
      tableHeaderType: 'text',
      key: 'created_at',
      class: 'w-1/3',
    },
  ];
  public loadingFetchApi = signal(false);
  public loadingButton = signal(false);
  public loadingDeleteButton = signal(false);

  public createUserForm!: FormGroup;
  public skillsForm!: FormGroup;
  private userSubscription: Subscription = new Subscription();
  private readonly userServices = inject(UserService);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly userRoles = inject(RolesService);
  private readonly alert = inject(AlertService);
  private readonly skillService = inject(SkillService);

  public readonly utilityS = inject(UtilitiesService);
  public rolesOption: SelectField[] = [];

  ngOnInit(): void {
    this.fetchUsers();
    this.getRoles();
    this.initializeUserForm();
    this.initializeSkillsForm();
  }

  private initializeUserForm() {
    let userRole: string | undefined;
    if (this.isTechnicianList) {
      userRole = '4';
    } else {
      userRole = undefined;
    }
    this.createUserForm = this.fb.group({
      id: [null],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      user_role_id: [userRole as string, [Validators.required]],
    });
  }

  private initializeSkillsForm() {
    this.skillsForm = this.fb.group({
      skill: ['', [Validators.required]],
    });
  }

  private fetchUsers() {
    this.loadingFetchApi.set(true);
    this.userSubscription.add(
      this.userServices.getAllUsers().subscribe({
        next: (res: HttpResponse<ApiResponse>) => {
          this.data = of(
            res.body?.data
              .map(
                (user: {
                  created_at: string | number | Date;
                  is_enabled: number;
                }) => ({
                  ...user,
                  created_at: new Date(user.created_at).toDateString(),
                  is_enabled: user.is_enabled === 1 ? 'Active' : 'Inactive',
                })
              )
              .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
          );
          if (
            this.route.snapshot.routeConfig?.path ===
            'users?accountType=technician'
          ) {
            this.isTechnicianList = true;
            this.data = this.data.pipe(
              map((users: Users[]) =>
                users.filter(
                  (user: Users) => user.user_role.name === 'technician'
                )
              )
            );
          }
        },
        complete: () => {
          this.loadingFetchApi.set(false);
        },
      })
    );
  }

  private getRoles() {
    this.userRoles.getRoles().subscribe({
      next: (res: HttpResponse<Roles[]>) => {
        const response = res.body;
        this.roles = (response as unknown as ApiResponse)?.data;
        this.rolesOption = (this.roles ?? []).map((role) => {
          return {
            value: role.id,
            label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
          };
        });
      },
    });
  }

  public createUser() {
    if (this.isTechnicianList) {
      this.createUserForm.removeControl('id');
      this.createUserForm.get('user_role_id')?.setValue('4');
    }
    if (this.createUserForm.valid) {
      this.loadingButton.set(true);
      this.createUserForm.removeControl('id');
      this.userSubscription.add(
        this.userServices
          .createUser(this.createUserForm.value)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 500)
                this.alert.handleError('Something went wrong');
              if (err.status === 422) this.alert.handleError(err.error.message);
              return of(err);
            })
          )
          .subscribe({
            next: () => {
              this.fetchUsers();
              this.createUserForm.reset();
            },
            complete: () => {
              this.loadingButton.set(false);
              this.createUserForm.reset();
              this.fetchUsers();
              this.closeDialog();
            },
          })
      );
    }
  }

  public createSkill() {
      this.loadingButton.set(true);
      this.createUserForm.removeControl('id');
      this.userSubscription.add(
        this.skillService
          .createSkills(this.skillsForm.value)
          .pipe(
            catchError((err: HttpErrorResponse) => {
              if (err.status === 500)
                this.alert.handleError('Something went wrong');
              if (err.status === 422) this.alert.handleError(err.error.message);
              return of(err);
            })
          )
          .subscribe({
            next: () => {
              this.createUserForm.reset();
            },
            complete: () => {
              this.loadingButton.set(false);
              this.createUserForm.reset();
              this.fetchSkills();
              this.closeSkillDialog();
            },
          })
      );
  }

  private fetchSkills() {
    this.skillService.getSkills().subscribe({
      next: (res: HttpResponse<ApiResponse>) => {
        this.data = of(
          res.body?.data
            .sort((a: { id: number }, b: { id: number }) => a.id - b.id)
        );
      },
      complete: () => {
        this.loadingFetchApi.set(false);
      },
    })
  }

  public viewUser(user: Users) {
    this.isViewUser = true;
    this.createUserForm.patchValue(user);
    this.modal.nativeElement.showModal();
  }

  public deleteUser(id: number) {
    this.loadingDeleteButton.set(true);
    this.userSubscription.add(
      this.userServices.deleteUser(id).subscribe({
        next: () => {
          this.fetchUsers();
        },
        complete: () => {
          this.loadingDeleteButton.set(false);
          this.createUserForm.reset();
          this.fetchUsers();
          this.modal.nativeElement.close();
        },
      })
    );
  }

  public closeDialog() {
    this.modal.nativeElement.close();
    this.isViewUser = false;
  }

  public closeSkillDialog() {
    this.skillmodal.nativeElement.close();
    this.isViewUser = false;
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
