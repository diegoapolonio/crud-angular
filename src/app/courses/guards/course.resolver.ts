import { Lesson } from './../model/lesson';
import { Observable, of } from 'rxjs';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Injectable } from '@angular/core';
import { CoursesService } from '../services/courses.service';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course>{

  constructor(private service:CoursesService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Course | Observable<Course> | Promise<Course> {
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }
    return of({_id:'',nome:'',category:'',Lesson:[]});
  }


};
