import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoadingWheelModule, MarkdownModule, PivotModule, SmeFormsModule } from '@msft-sme/angular';
import { UserProfileComponent } from './user-profile.component';

const UserProfileRoutes: Routes = [
    {path: '', component: UserProfileComponent}
];

@NgModule({
    declarations: [
        UserProfileComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MarkdownModule,
        PivotModule,
        LoadingWheelModule,
        SmeFormsModule,
        RouterModule.forChild(UserProfileRoutes)
    ],
    exports: [UserProfileComponent]
})
export class UserProfileModule { }
