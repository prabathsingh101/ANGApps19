import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Authors } from '../models/authors';

import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { AuthorsCrudService } from '../services/authors-crud.service';
import { AuthorsService } from '../services/authors.service';
@Component({
  selector: 'app-authors',
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss',
})
export class AuthorsComponent implements OnInit {
  private formBuilder = inject(FormBuilder);

  private authorService = inject(AuthorsCrudService);

  private toaster = inject(ToastrService);

  private route = inject(ActivatedRoute);

  authorSubscription!: Subscription;

  authorsForms: any = FormGroup;

  authors!: Authors;

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.authorsForms = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(10)]],

      lastname: ['', [Validators.required, Validators.maxLength(10)]],
    });
  }
  get getFirstname() {
    return this.authorsForms.controls['firstname'];
  }
  get getLastname() {
    return this.authorsForms.controls['lastname'];
  }
  // onSubmit() {
  //   if (this.authorsForms.valid) {
  //     this.authors = {
  //       FirstName: this.authorsForms.value.firstname,
  //       LastName: this.authorsForms.value.lastname,
  //     };
  //     //this.authorSubscription = this.authorService.addAuthors(this.authors);
  //     this.authorService.addAuthors(this.authors).subscribe((res: any) => {
  //       console.log(res);
  //       if (res.statusCode == 200) {
  //         this.toaster.success(res.message, res.messageType, { timeOut: 3000 });
  //       }
  //     });
  //   }
  // }
  onSubmit() {
    if (this.authorsForms.valid) {
      this.authors = {
        FirstName: this.authorsForms.value.firstname,
        LastName: this.authorsForms.value.lastname,
      };
      this.authorSubscription = this.authorService
        .addAuthors(this.authors)
        .subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.statusCode == 200) {
              this.toaster.success(res.message, res.messageType, {
                timeOut: 3000,
              });
            }
          },
          error: (err: any) => {
            console.error(err);
            this.toaster.error(err.message, err.messageType, {
              timeOut: 3000,
            });
          },
          complete: () => {
            console.log('Author addition completed.');
          },
        });
    }
  }
  ngOnDestroy(): void {
    if (this.authorSubscription) {
      this.authorSubscription.unsubscribe();
    }
  }
}
