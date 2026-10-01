import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reg } from './reg/reg';

export const routes: Routes = [

    // AUTH ROUTES
    { path: 'home', component: Home },
    { path: '', component: Home },
    { path: 'register', component: Reg },

    { path: '**', component: Home }
    
];
