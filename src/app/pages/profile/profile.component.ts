import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserApiService } from './services/user-api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);
  private userApi = inject(UserApiService);

  avatarSrc = signal('images/avatar-placeholder.svg');

  form = this.fb.group({
    email: [{ value: this.getStoredEmail(), disabled: true }],
  });

  private getStoredEmail(): string {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw).email : '';
  }

  isEmailEditing = signal(false);

  onAvatarChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.avatarSrc.set(URL.createObjectURL(file));
    }
  }

  toggleEmailEditing() {
    const emailControl = this.form.get('email');
    if (emailControl) {
      if (this.isEmailEditing()) {
        const email = emailControl.value;
        if (email) {
          this.userApi.updateEmail(email).subscribe();
        }
        emailControl.disable();
        this.isEmailEditing.set(false);
      } else {
        emailControl.enable();
        this.isEmailEditing.set(true);
      }
    }
  }

  triggerFileInput(input: HTMLInputElement) {
    input.click();
  }
}
