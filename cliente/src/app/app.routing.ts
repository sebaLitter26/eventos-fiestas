import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';

// import evento
import { EventoListComponent } from './components/evento-list.component';
import { EventoAddComponent } from './components/evento-add.component';
import { EventoEditComponent } from './components/evento-edit.component';
import { EventoDetailComponent } from './components/evento-detail.component';

// import categoria
import { CategoriaAddComponent } from './components/categoria-add.component';
import { CategoriaEditComponent } from './components/categoria-edit.component';
import { CategoriaDetailComponent } from './components/categoria-detail.component';

// import producto
import { ProductoAddComponent } from './components/producto-add.component';
import { ProductoEditComponent } from './components/producto-edit.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'eventos/:page', component: EventoListComponent },
  { path: 'crear-evento', component: EventoAddComponent },
  { path: 'editar-evento/:id', component: EventoEditComponent },
  { path: 'evento/:id', component: EventoDetailComponent },
  { path: 'crear-categoria/:evento', component: CategoriaAddComponent },
  { path: 'editar-categoria/:id', component: CategoriaEditComponent },
  { path: 'categoria/:id', component: CategoriaDetailComponent },
  { path: 'crear-producto/:categoria', component: ProductoAddComponent },
  { path: 'editar-producto/:id', component: ProductoEditComponent },
  { path: 'mis-datos', component: UserEditComponent },
  { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
