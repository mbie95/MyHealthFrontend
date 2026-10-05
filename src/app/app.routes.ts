import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Reg } from './reg/reg';
import { DoctorReg } from './doctor-reg/doctor-reg';
import { Login } from './login/login';
import { Profile } from './profile/profile';
import { UpdateProfile } from './update-profile/update-profile';
import { UpdatePassword } from './update-password/update-password';
import { BookConsultation } from './book-consultation/book-consultation';
import { MyAppointments } from './my-appointments/my-appointments';
import { ConsultationHistory } from './consultation-history/consultation-history';
import { ForgotPassword } from './forgot-password/forgot-password';
import { ResetPassword } from './reset-password/reset-password';
import { DoctorProfile } from './doctor/doctor-profile/doctor-profile';
import { UpdatedoctorProfile } from './doctor/updatedoctor-profile/updatedoctor-profile';
import { DoctorAppointments } from './doctor/doctor-appointments/doctor-appointments';
import { authGuard, doctorOnlyGuard, patientOnlyGuard } from './service/guard';

export const routes: Routes = [

    // AUTH ROUTES
    { path: 'home', component: Home },
    { path: '', component: Home },
    { path: 'register', component: Reg },
    { path: 'register-doctor', component: DoctorReg },
    { path: 'login', component: Login },
    { path: 'forgot-password', component: ForgotPassword },
    { path: 'reset-password', component: ResetPassword },

    /* Protected Routes */
    { path: 'profile', component: Profile, canActivate: [patientOnlyGuard] },
    { path: 'update-profile', component: UpdateProfile, canActivate: [patientOnlyGuard] },
    { path: 'update-password', component: UpdatePassword, canActivate: [authGuard] },
    { path: 'book-appointment', component: BookConsultation, canActivate: [patientOnlyGuard] },
    { path: 'my-appointments', component: MyAppointments, canActivate: [patientOnlyGuard] },
    { path: 'consultation-history', component: ConsultationHistory, canActivate: [patientOnlyGuard] },

    /* Doctors Routes */
    { path: 'doctor/profile', component: DoctorProfile, canActivate: [doctorOnlyGuard] },
    { path: 'doctor/update-profile', component: UpdatedoctorProfile, canActivate: [doctorOnlyGuard] },
    { path: 'doctor/appointments', component: DoctorAppointments, canActivate: [doctorOnlyGuard] },
    
    { path: '**', component: Home }
    
];
