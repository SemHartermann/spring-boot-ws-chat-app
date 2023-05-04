import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {Routes, RouterModule} from "@angular/router";
import { AdminComponent } from './admin/admin.component';

const appRoutes: Routes = [
  {path: 'chat', component: ChatComponent},
  {path: '', component: LoginFormComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginFormComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
