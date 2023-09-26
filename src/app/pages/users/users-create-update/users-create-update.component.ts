import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserModel } from '../model/user.model';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-users-create-update',
  templateUrl: './users-create-update.component.html',
  styleUrls: ['./users-create-update.component.scss']
})
export class UsersCreateUpdateComponent {
  userForm!: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: UserModel, private fb: FormBuilder) { }

  ngOnInit() {
    if (this.defaults) {

    } else {
      this.defaults = {} as UserModel;
    }

    this.userForm = this.fb.group({
      firstName: this.defaults.firstName || '',
      lastName: this.defaults.lastName || '',
      title: this.defaults.title || '',
      gender: this.defaults.gender || '',
      email: this.defaults.email || '',
      dateOfBirth: new Date (this.defaults.dateOfBirth) || '',
      registerDate: this.defaults.registerDate || '',
      phone: this.defaults.phone || '',
      picture: this.defaults.picture || '',
      location: this.defaults.location
    });

  }
  save() { }
}
