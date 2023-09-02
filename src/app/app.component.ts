import { CoursesComponent } from './courses/courses/courses.component';
import { Component } from '@angular/core';
import { Course } from './courses/model/course';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'crud-angular';
}
