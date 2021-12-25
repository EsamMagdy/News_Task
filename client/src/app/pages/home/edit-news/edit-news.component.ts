import { News } from './../news.model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-add-static-page',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.scss'],
})
export class EditNewsComponent implements OnInit {
  form!: FormGroup;
  newsData!: News;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private newsService: NewsService,
    private ar: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      nameAr: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      nameEn: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      isVisible: [false, Validators.required],
      detailsAr: [
        null,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(250),
        ],
      ],
      detailsEn: [
        null,
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(250),
        ],
      ],
      image: [null, [Validators.required]],
    });
  }

  ngOnInit() {
    this.ar.params.subscribe((url) => {
      this.newsService.getNewsById(url.id).subscribe((resData) => {
        this.newsData = resData.data;
        this.form.patchValue(this.newsData);
      });
    });
  }

  public get NameAr(): FormControl {
    return this.form.get('nameAr') as FormControl;
  }
  public get NameEn(): FormControl {
    return this.form.get('nameEn') as FormControl;
  }
  public get DetailsAr(): FormControl {
    return this.form.get('detailsAr') as FormControl;
  }
  public get DetailsEn(): FormControl {
    return this.form.get('detailsEn') as FormControl;
  }

  public get IsVisible(): FormControl {
    return this.form.get('isVisible') as FormControl;
  }

  public get Image(): FormControl {
    return this.form.get('image') as FormControl;
  }

  onAdd() {
    if (this.form.valid) {
      let model = this.form.value;
      debugger;
      this.newsService.getImageInBase64(model.image).then((data) => {
        model.image = data.split(',')[1];
        model.imageName = this.Image.value.name;
        this.newsService.addNews(model).subscribe((resData) => {
          this.router.navigate(['/news']);
        });
      });
    }
  }

  onUpload(event: any) {
    this.Image.setValue(event.files[0]);
  }

  onClear() {
    this.Image.reset();
  }
}
