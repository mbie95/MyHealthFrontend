import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reg } from './reg/reg';
import { DoctorReg } from './doctor-reg/doctor-reg';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { UpdateProfile } from './update-profile/update-profile';
import { authGuard, doctorOnlyGuard, patientOnlyGuard } from './service/guard';

export const routes: Routes = [

    // AUTH ROUTES
    { path: 'home', component: Home },
    { path: '', component: Home },
    { path: 'register', component: Reg },
    { path: 'register-doctor', component: DoctorReg },
    { path: 'login', component: Login },

    /* Protected Routes */
    { path: 'profile', component: Profile, canActivate: [patientOnlyGuard] },
    { path: 'update-profile', component: UpdateProfile, canActivate: [patientOnlyGuard] },

    { path: '**', component: Home }
    
];
