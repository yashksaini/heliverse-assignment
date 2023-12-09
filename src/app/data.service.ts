// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private dataUrl: string = 'assets/data.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<any>(this.dataUrl);
  }
}
