import { Routes } from '@angular/router';
import { Home } from './home/home';

export const routes: Routes = [

    // AUTH ROUTES
    { path: 'home', component: Home },
    { path: '', component: Home },

    { path: '**', component: Home }
    
];
