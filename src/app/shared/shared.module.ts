import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedComponent } from './shared.component';
import {HeaderComponent} from "./components/header/header.component";
import {YourProfileComponent} from "../core/components/your-profile/your-profile.component";
import {AlertComponent} from "./components/alert/alert.component";
import {ViewUsersComponent} from "../core/components/your-profile/view-users/view-users.component";
import {AdminPanelComponent} from "../core/components/admin-panel/admin-panel.component";
import {StudentPanelComponent} from "../core/components/student-panel/student-panel.component";
import {LoadingSpinnerComponent} from "./components/loading-spinner/loading-spinner.component";
import {ConfirmAlertComponent} from "./components/confirm-alert/confirm-alert.component";
import {SubmitHomeworkComponent} from "../core/components/student-panel/submit-homework/submit-homework.component";
import {SubmitHomeworkEditComponent} from "../core/components/student-panel/submit-homework/submit-homework-edit/submit-homework-edit.component";
import {TooltipDirective} from "./directives/tooltip.directive";
import {tooltipComponent} from "./components/tooltip/tooltip.component";
import {SideMenuComponent} from "./components/side-menu/side-menu.component";
import {LayoutLoggedComponentComponent} from "./layout-logged-component/layout-logged-component.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AddMarkComponent } from './components/add-mark/add-mark.component';
import {HttpClientModule} from "@angular/common/http";


const routes: Routes = [
  { path: '', component: SharedComponent }
];

@NgModule({
  declarations: [SharedComponent,
    HeaderComponent,
    YourProfileComponent,
    AlertComponent,
    ViewUsersComponent,
    AdminPanelComponent,
    StudentPanelComponent,
    LoadingSpinnerComponent,
    ConfirmAlertComponent,
    SubmitHomeworkComponent,
    SubmitHomeworkEditComponent,
    TooltipDirective,
    tooltipComponent,
    SideMenuComponent,
    LayoutLoggedComponentComponent,
    AddMarkComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),

  ],


  entryComponents: [
    tooltipComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    AddMarkComponent
  ]
})
export class SharedModule { }
