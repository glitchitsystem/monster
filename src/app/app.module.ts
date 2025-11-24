import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MonstersComponent } from './monster/monster.component';
import { MonsterListComponent } from './monster/monster-list/monster-list.component';
import { MonsterDetailComponent } from './monster/monster-detail/monster-detail.component';
import { MonsterItemComponent } from './monster/monster-list/monster-item/monster-item.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing.module';
import { MonsterStartComponent } from './monster/monster-start/monster-start.component';
import { MonsterEditComponent } from './monster/monster-edit/monster-edit.component';
import { MonsterService } from './monster/monster.service';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { PopUpComponent } from './pop-up/pop-up.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MonstersComponent,
    MonsterListComponent,
    MonsterDetailComponent,
    MonsterItemComponent,
    DropdownDirective,
    MonsterStartComponent,
    MonsterEditComponent,
    FooterComponent,
    LoginComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [MonsterService, AuthService, AuthGuard],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent]
})
export class AppModule { }
