
import { Lesson } from './../model/lesson';

import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder,FormGroup, NonNullableFormBuilder, UntypedFormArray, UntypedFormBuilder, Validators } from '@angular/forms';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit{
     form!:FormGroup;
 /*  form = this.FormBuilder.group({
    _id:[''],
    nome: ['',[Validators.required,
      Validators.minLength(5),
      Validators.maxLength(100)]],
    category:['',[Validators.required]]
   });*/

  constructor(private FormBuilder: NonNullableFormBuilder,
    private service:CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route:ActivatedRoute){

  }

  ngOnInit(): void {
    const course:Course =this.route.snapshot.data['course'];
    this.form = this.FormBuilder.group({
      _id:[course._id],
      nome: [course.nome,[Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)]],
      category:[course.category,[Validators.required]],
      lessons:this.FormBuilder.array(this.retrieveLessons(course))
    });
    console.log(this.form);
    console.log(this.form.value);
  }


   private retrieveLessons(course:Course){
    const lessons = [];
    if(course?.lessons){
      course.lessons.forEach(Lesson=>lessons.push(this.createLesson(Lesson)))
    }else{
       lessons.push(this.createLesson());
    }
    return lessons;
   }


    private createLesson(Lesson = {id:'',nome:'',youtubeUrl:''}){
      return this.FormBuilder.group({
        id:[Lesson.id],
        nome:[Lesson.nome],
        youtubeUrl:[Lesson.youtubeUrl]
      });

    }
getLessonsFormArray(){
 return(<UntypedFormArray>this.form.get('lessons')).controls;
}
addNewLesson(){
  const lessons = this.form.get('lessons') as UntypedFormArray;
  lessons.push(this.createLesson());
}
removeLesson(index:number){
  const lessons = this.form.get('lessons') as UntypedFormArray;
  lessons.removeAt(index);

}

  onSubmit(){

   this.service.save(this.form.value)
   .subscribe(result=> this.onSuccess(),error=> this.onError());

   }

  onCancel(){
    this.location.back();
  }


private onSuccess(){
  this.snackBar.open('Curso salvo com sucesso!','',{duration:500});
  this.onCancel();
}


private onError(){
  this.snackBar.open('erro ao salvar curso!','',{duration:500});
}

  getErrorMessage(fieldNome:string){
    const field = this.form.get(fieldNome);

    if(field ?.hasError('required')){
      return 'campo obrigatorio';
    }
    if(field ?.hasError('minlength')){
      const requiredLenght :number =  field.errors? field.errors['minlength']['requiredLength']:5;
      return`Tamanho minimo precisa ser de ${requiredLenght} caracteres.`;

    }
    if(field ?.hasError('maxlength')){
      const requiredLenght :number =  field.errors? field.errors['minlength']['requiredLength']:5;
      return`Tamanho maximo exendido de ${requiredLenght} caracteres.`;
    }
      return 'campo invalido';

  }

}
