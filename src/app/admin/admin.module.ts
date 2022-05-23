import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddProductPageComponent } from "./add-product-page/add-product-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { EditProductPageComponent } from "./edit-product-page/edit-product-page.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { OrdersPageComponent } from "./orders-page/orders-page.component";
import { AdminLayoutComponent } from './shared/admin-layout/admin-layout.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthGuard } from "../shared/auth.guard";
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from '@angular/material/list';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterModule.forChild([
            {
                path: '', component: AdminLayoutComponent, children: [
                    { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
                    { path: 'login', component: LoginPageComponent },
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
                    { path: 'add', component: AddProductPageComponent, canActivate: [AuthGuard] },
                    { path: 'product/:id/edit', component: EditProductPageComponent, canActivate: [AuthGuard] },
                    { path: 'orders', component: OrdersPageComponent, canActivate: [AuthGuard] },
                ]
            }
        ])
    ],
    exports: [

    ],
    declarations: [
        AdminLayoutComponent,
        LoginPageComponent,
        DashboardComponent,
        AddProductPageComponent,
        EditProductPageComponent,
        OrdersPageComponent
    ]
})

export class AdminModule {

}