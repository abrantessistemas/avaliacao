import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { UserModel } from './user.model';
import { DataContract } from 'src/app/common/data-contract.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'app-id': environment.appId,
      'Content-Type': 'application/json',
    }),
  };

  findAll(page: number, limit: number): Observable<DataContract> {
    return this.http.get<any>(`${environment.baseUrl}user?page=${page}&limit=${limit}`, this.httpOptions).pipe(
      map((response: DataContract) => {
        return response;
      })
    );
  }

  findById(id: string): Observable<UserModel> {
    return this.http
      .get<any>(`${environment.baseUrl}user/${id}`, this.httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  create(user: UserModel): Observable<UserModel> {
    return this.http
      .post<any>(`${environment.baseUrl}user/create`, user, this.httpOptions)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      );
  }

  update(id: string, user: UserModel): Observable<UserModel> {
    return this.http
      .put<any>(`${environment.baseUrl}user/${id}`, user, this.httpOptions)
      .pipe(
        map((response: any) => response.data)
      );
  }

  delete(id: string): Observable<any> {
    return this.http
      .delete<any>(`${environment.baseUrl}user/${id}`, this.httpOptions)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
