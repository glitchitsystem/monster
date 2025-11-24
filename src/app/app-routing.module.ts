import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { MonstersComponent } from './monster/monster.component';
import { MonsterStartComponent } from './monster/monster-start/monster-start.component';
import { MonsterDetailComponent } from './monster/monster-detail/monster-detail.component';
import { MonsterEditComponent } from './monster/monster-edit/monster-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';

const appRoutes: Routes = [
    // { path: '', redirectTo: '/mine', pathMatch: 'full' },
    { path: '', component: LoginComponent},
    { path: 'mine', component: MonstersComponent, children: [
        {path: '', component: MonsterStartComponent},
        {path: 'new', component: MonsterEditComponent},
        {path: ':id', component: MonsterDetailComponent},
        {path: ':id/edit', component: MonsterEditComponent}
    ], canActivate: [AuthGuard]  }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}