import { Course } from 'src/app/courses/model/course';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {

 @Input() courses:Course[] =[];
 @Output()add= new EventEmitter(false);
 @Output()edit= new EventEmitter(false);
 @Output()remove= new EventEmitter(false);
 readonly displayedColumns = ['nome','category','actions'];


  constructor(){}

  ngOnInit(): void {

  }
  onAdd(){
   this.add.emit(true);
  }
    onEdit(Course:Course){
      this.edit.emit(Course);
    }
    onDelete(course:Course){
       this.remove.emit(course);
    }
}
