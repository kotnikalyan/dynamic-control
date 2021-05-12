import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
const baseUrl = ` http://localhost:3000/posts`;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get<any>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }
}
