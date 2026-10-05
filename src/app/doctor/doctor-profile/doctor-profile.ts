import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Api } from '../../service/api';

@Component({
  selector: 'app-doctor-profile',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './doctor-profile.html',
  styleUrl: './doctor-profile.css',
})
export class DoctorProfile {

  userData: any | null = null;
  doctorData: any | null = null;

  error = '';
  uploading = false;
  uploadError = '';
  uploadSuccess = '';

  constructor(
    private apiService: Api,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchDoctorData();
  }

  fetchDoctorData(): void {
    this.error = "";

    this.apiService.getMyUserDetails().subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.userData = response.data
          this.fetchDoctorProfile();
        }
      },
      error: (error: any) => {
        this.error = 'Failed to load profile data';
        this.cdr.detectChanges();
      }
    });
  }

  fetchDoctorProfile(): void {
    this.apiService.getMyDoctorProfile().subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.doctorData = response.data;
        }
        this.cdr.detectChanges();
      },
      error: (error: any) => {
        this.cdr.detectChanges();
      }
    });
  }

  handleUpdateProfile(): void {
    this.router.navigate(['/doctor/update-profile']);
  }

  handleUpdatePassword(): void {
    this.router.navigate(['/update-password']);
  }

  handleProfilePictureChange(event: any): void {
    const file = event.target.files[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      this.uploadError = 'Please select a valid image file (JPEG, PNG, GIF)';
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.uploadError = 'File size must be less than 5MB';
      return;
    }

    this.uploading = true;
    this.uploadError = '';
    this.uploadSuccess = '';

    this.apiService.uploadProfilePicture(file).subscribe({
      next: (response: any) => {
        if (response.statusCode === 200) {
          this.uploadSuccess = 'Profile picture updated successfully!';
          this.fetchDoctorData();
          event.target.value = '';
          this.cdr.detectChanges();
        } else {
          this.uploadError = response.message || 'Failed to upload profile picture';
        }
        this.uploading = false;
      },
      error: (error: any) => {
        this.uploadError = error.error?.message || 'An error occurred while uploading the picture';
        this.uploading = false;
        this.cdr.detectChanges();
      }
    });
  }

  formatSpecialization(spec: string | undefined): string {
    if (!spec) return 'Not specified';
    return spec.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  }

  getProfilePictureUrl(): string | null {
    if (!this.userData?.profilePictureUrl) return null;
    return this.userData.profilePictureUrl;
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    const placeholder = event.target.nextElementSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  }

  get rolesDisplay(): string {
    if (!this.userData?.roles?.length) return 'Not provided';
    return this.userData.roles.map((role: any) => role.name).join(', ');
  }

}
