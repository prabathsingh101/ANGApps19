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
    this.getAuthors();
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

  async onSubmit() {
    if (this.authorsForms.valid) {
      this.authors = {
        FirstName: this.authorsForms.value.firstname,
        LastName: this.authorsForms.value.lastname,
      };
      this.authorSubscription = await this.authorService
        .addAuthors(this.authors)
        .subscribe({
          next: (res: any) => {
            if (res.statusCode == 200) {
              this.toaster.success(res.message, res.messageType, {
                timeOut: 3000,
              });

              this.getAuthors();
            }
          },
          error: (err: any) => {
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

  async getAuthors() {
    await this.authorService.getAuthors().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.authors = res;
          console.log(this.authors);
        }
      },
      error: (err: any) => {
        this.toaster.error(err.message, err.messageType, {
          timeOut: 3000,
        });
      },
      complete: () => {
        console.log('Author addition completed.');
      },
    });
  }

  ngOnDestroy(): void {
    if (this.authorSubscription) {
      this.authorSubscription.unsubscribe();
    }
  }
}
