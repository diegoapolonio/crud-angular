
import { Course } from './../model/course';
import { Injectable, Pipe } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {delay, first, tap} from 'rxjs/operators';
import { pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) { }

  list() {
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),
     delay(1000),
      tap(courses => console.log(courses))
    );
  }
loadById(id:String){
  return this.httpClient.get<Course>(`${this.API}/${id}`);
}

  save(record:Partial<Course>){
    if(record._id){
      return this.update(record);
    }
   return this.httpClient.post<Course>(this.API,record);
  }

  private create (record:Partial<Course>){
    return this.httpClient.post<Course>(this.API,record).pipe(first());
  }

  private update(record: Partial<Course>){
    return this.httpClient.put<Course>(`${this.API}/${record._id}`,record).pipe(first());
  }
revome(id:string){
    return this.httpClient.delete(`${this.API}/${id}`).pipe(first());
  }
}
