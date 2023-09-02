import { CoursesService } from './../services/courses.service';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/courses/model/course';
import { Observable, catchError, merge, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfimationDialogComponent } from 'src/app/shared/components/confimation-dialog/confimation-dialog.component';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})

export class CoursesComponent implements OnInit{
  courses$: Observable<Course[]>| null = null;

 // CoursesService: CoursesService;

  constructor(
    private coursesService: CoursesService,
    public dialog: MatDialog,
    private router:Router,
    private route:ActivatedRoute,
    private snackBar:MatSnackBar

    ){
      this.refresh();

  }
   refresh(){
    this.courses$ = this.coursesService.list()
   .pipe(
    catchError(error =>{
      this.onError("Erro ao carregar cursos")
      return of([])
    })
   );

   }

    onError(errorMsg: String){
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
  }
  onAdd(){
   this.router.navigate(['new'],{relativeTo:this.route});
  }

  onEdit(Course:Course){
    this.router.navigate(['edit',Course._id],{relativeTo:this.route});
  }
  onRemove(course:Course){
    const dialogRef= this.dialog.open(ConfimationDialogComponent,{
      data: 'tem  certeza que deseja remover o curso?',
    });

  dialogRef.afterClosed().subscribe((result: Boolean)=>{
     if(result){
      this.coursesService.revome(course._id).subscribe(
        ()=>{
          this.refresh();
          this.snackBar.open('Curso removido com sucesso!','X',{
            duration:5000,
            verticalPosition:'top'
          });

        },
        error=> this.onError('Erro ao tentar remover curso.')
      );

     }

  });
  }

}
