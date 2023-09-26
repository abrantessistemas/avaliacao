import { SelectionModel } from '@angular/cdk/collections';
import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from './model/user.model';
import { UserService } from './model/user.service';
import { UsersCreateUpdateComponent } from './users-create-update/users-create-update.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/common/dialog/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  limit!: number;
  totalItems!: number;
  pageSizeOptions: number[] = [5, 10, 20];

  displayedColumns: string[] = ['picture', 'firstName', 'lastName', 'title', 'actions'];
  dataSource!: any | null;
  clickedRows = new Set<UserModel>();

  private subscription: Subscription = new Subscription();
  users!: UserModel[];
  selection = new SelectionModel<UserModel>(true, []);
  pageIndex!: number;
  route: ActivatedRoute | null | undefined;

  constructor(private router: Router, private userService: UserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  findAllUsers(page: number, limit: number) {
    this.subscription.add(this.userService.findAll(page, limit).subscribe(result => {
      this.totalItems = result.total;
      this.dataSource = result.data;
    }));
  }

  ngOnInit() {
    const paginaAtual = localStorage.getItem('paginaAtual');
    const tamanhoPagina = localStorage.getItem('tamanhoPagina');

    if (paginaAtual && tamanhoPagina) {
      this.limit = +tamanhoPagina;
      this.pageIndex = +paginaAtual;

      this.onSearch(this.pageIndex, this.limit);
    } else {
      this.onSearch(1, this.limit);
    }
  }

  onSearch(page: number, limit: number) {
    localStorage.setItem('paginaAtual', page.toString());
    localStorage.setItem('tamanhoPagina', limit.toString());

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: page, page_size: limit },
      queryParamsHandling: 'merge'
    });

    this.findAllUsers(page, limit);
  }


  onPage(pageEvent: PageEvent) {
    const paginaAtual = pageEvent.pageIndex + 1;
    const tamanhoPagina = pageEvent.pageSize;

    this.onSearch(paginaAtual, tamanhoPagina);
  }

  createUser() {
    this.dialog
      .open(UsersCreateUpdateComponent)
      .afterClosed()
      .subscribe((user: UserModel) => {
        if (user) this.findAllUsers(this.pageIndex, this.limit);
      });
  }

  updateUser(user: UserModel) {
    this.userService.findById(user.id).subscribe(userById => {
      this.dialog
        .open(UsersCreateUpdateComponent, {
          data: userById,
        })
        .afterClosed()
        .subscribe((user) => {
          if (user) this.findAllUsers(this.pageIndex, this.limit);
        });

    });
  }

  deleteUser(user: UserModel) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Tem certeza de que deseja excluir este item?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(user.id).subscribe(() => {
          this.snackBar.open('Item excluído com sucesso!', 'Fechar', {
            duration: 5 * 1000,
          });
        });
      }
      this.findAllUsers(this.pageIndex, this.limit);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
