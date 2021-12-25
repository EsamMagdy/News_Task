import { Router } from '@angular/router';
import { News } from './news.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paging } from 'src/app/modules/shared/models/paging.model';
import { ResponseModel } from 'src/app/modules/shared/models/response-model';
import { User } from 'src/app/modules/shared/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private http: HttpClient, private router: Router) {}
  getNews(
    pageNumber: number,
    pageSize: number,
    order: number,
    sortBy: string,
    searchBy: string
  ) {
    return this.http.get<ResponseModel<Paging<News[]>>>(
      environment.apiUrl +
        `News/GetAllNews?PageNumber=${pageNumber}&PageSize=${pageSize}&Order=${order}&SortBy='${sortBy}'&SearchBy=${searchBy}`
    );
  }
  getNewsById(id: number) {
    return this.http.get<ResponseModel<News>>(
      environment.apiUrl + `News/GetNewById?id=${id}`
    );
  }

  updateUser(user: User) {
    return this.http.post(
      environment.apiUrl + `users/UpdateUser?id=${user.id}`,
      user
    );
  }

  createUser(user: User) {
    return this.http.post<User>(environment.apiUrl + `users/CreateUser`, user);
  }
  addNews(news: News) {
    return this.http.post<News>(environment.apiUrl + `news/AddNew`, news);
  }
  getImageInBase64(file: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
