import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  private fb = inject(FormBuilder);

  avatarSrc = signal('images/avatar-placeholder.svg');

  form = this.fb.group({
    email: [{ value: 'jubeo.hernandez@scoppe.fr', disabled: true }],
  });

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
