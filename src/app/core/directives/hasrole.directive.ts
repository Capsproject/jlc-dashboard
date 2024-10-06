import { Directive, inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';

@Directive({
  selector: '[appHasrole]',
  standalone: true,
})
export class HasroleDirective {
  private readonly authService = inject(AuthService);
  private readonly viewContainer = inject(ViewContainerRef);
  private readonly templateRef!: TemplateRef<unknown>;
  @Input() set appHasRole(roles: string | string[] ) {
    // Check if user has role
    const role = this.authService.userRole();
    const hasRole = role ? roles.includes(role) : false;
    if (hasRole) {
      // Add element to DOM
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
