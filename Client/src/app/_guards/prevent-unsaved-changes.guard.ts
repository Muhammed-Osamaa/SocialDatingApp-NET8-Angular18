import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component, currentRoute, currentState, nextState) => {
  if(component.child?.dirty){
    return confirm("you've unsaved changes, Do you want to leave?!")
  }
  return true;
};
