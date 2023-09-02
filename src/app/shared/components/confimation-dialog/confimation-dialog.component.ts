import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confimation-dialog',
  templateUrl: './confimation-dialog.component.html',
  styleUrls: ['./confimation-dialog.component.css']
})
export class ConfimationDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfimationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}


  ngOnInit(): void {

  }
  onConfirm(result:boolean):void{
    this.dialogRef.close(result);
  }

}
