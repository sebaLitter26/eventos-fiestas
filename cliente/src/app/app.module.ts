import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing, appRoutingProviders } from './app.routing';

// general
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';

// user
import { UserEditComponent } from './components/user-edit.component';

// evento
import { EventoListComponent } from './components/evento-list.component';
import { EventoAddComponent } from './components/evento-add.component';
import { EventoEditComponent } from './components/evento-edit.component';
import { EventoDetailComponent } from './components/evento-detail.component';

//categoria
import { CategoriaAddComponent } from './components/categoria-add.component';
import { CategoriaEditComponent } from './components/categoria-edit.component';
import { CategoriaDetailComponent } from './components/categoria-detail.component';

// producto
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductoEditComponent } from './components/producto-edit.component';
import { PlayerComponent } from './components/player.component';

/* NUEVOS */

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { appReducers } from './store/app.reducer';
import { effectsArr } from './store/effects';

import { ApiService } from './services/api.service';
import { UserService } from './services/user.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserEditComponent,
    EventoListComponent,
    EventoAddComponent,
    EventoEditComponent,
    EventoDetailComponent,
    CategoriaAddComponent,
    CategoriaEditComponent,
    CategoriaDetailComponent,
    ProductoAddComponent,
    ProductoEditComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    /*
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(effectsArr),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    */

  ],
  providers: [appRoutingProviders, ApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
