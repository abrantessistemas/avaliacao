import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserModel } from '../model/user.model';
import { UserService } from './../model/user.service';
import { BadRequestContract } from 'src/app/common/bad-request-contract.model';
import { ConfirmationDialogComponent } from 'src/app/common/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users-create-update',
  templateUrl: './users-create-update.component.html',
  styleUrls: ['./users-create-update.component.scss']
})
export class UsersCreateUpdateComponent {
  userForm!: FormGroup;
  mode: 'delete' | 'create' | 'update' = 'create';
  listTitle = ['mr', 'ms', 'mrs', 'miss', 'dr'];
  listGender = ['male', 'female', 'other'];

  private subscription: Subscription = new Subscription();

  constructor(@Inject(MAT_DIALOG_DATA) public defaults: UserModel, private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsersCreateUpdateComponent>, private dialog: MatDialog,
    private snackbar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
    if (this.defaults) {
      this.mode = 'update';
    } else {
      this.defaults = {} as UserModel;
    }

    this.userForm = this.fb.group({
      id: this.defaults.id || '',
      firstName: this.defaults.firstName || '',
      lastName: this.defaults.lastName || '',
      title: this.defaults.title || '',
      gender: this.defaults.gender || '',
      email: [this.defaults.email, Validators.email] || '',
      dateOfBirth: this.defaults.dateOfBirth || '',
      registerDate: this.defaults.registerDate || '',
      phone: this.defaults.phone || '',
      picture: this.defaults.picture || '',
      location: this.fb.group({
        street: [this.defaults.location?.street || ''],
        city: [this.defaults.location?.city || ''],
        state: [this.defaults.location?.state || ''],
        country: [this.defaults.location?.country || ''],
        timezone: [this.defaults.location?.timezone || '']
      })
    });

  }
  save() {
    if (this.mode === 'create') {
      this.createUser();
    } else if (this.mode === 'update') {
      this.updateUser();
    }
  }

  isCreateMode() {
    return this.mode === 'create';
  }

  isUpdateMode() {
    return this.mode === 'update';
  }

  createUser() {
    const user = this.userForm.value;

    this.subscription.add(
      this.userService.create(user).subscribe(
        (result) => {
          this.snackbar.open(
            'User ' +
            result.firstName +
            ' successfully created.',
            'OK',
            {
              duration: 5000,
            }
          );

          this.dialogRef.close(user);
        },
        (exception: BadRequestContract) => {
          console.log(exception.data)
          this.snackbar.open(exception.message, 'ERROR', {
            duration: 5000,
          });
        }
      )
    );
  }

  updateUser() {
    const user: UserModel = this.userForm.value;

    this.subscription.add(
      this.userService.update(user.id, user).subscribe(
        (result) => {
          this.snackbar.open(
            'User ' +
            result.firstName +
            ' updated successfully.',
            'OK',
            {
              duration: 5000,
            }
          );

          this.dialogRef.close(user);
        },
        (exception: BadRequestContract) => {
          console.log(exception.data)
          this.snackbar.open(exception.message, 'ERROR', {
            duration: 5000,
          });
        }
      )
    );
  }

  deleteUser() {
    const user: UserModel = this.userForm.value;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure you want to delete user ' + user.firstName + '?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user.id).subscribe(() => {
          this.snackbar.open('Item deleted successfully.', 'Close', {
            duration: 5 * 1000,
          });
        });
      }
      this.dialogRef.close(user);
    });
  }

  pictureChange = false;

  updateImage() {
    this.pictureChange = !this.pictureChange;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
