import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MessageService } from 'src/app/services/message.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  business_data = "business_data";
  businessData: any;
  date: any;
  name: any;
  number: any;
  organization_id: any;
  constructor(private apiService: ApiService, private fb: FormBuilder, private router: Router,
    private loader: LoaderService,
    private route: ActivatedRoute,
    private message: MessageService,
  ) {
    const storedData = this.apiService.getLocalStorageData(this.business_data);
    this.businessData = JSON.parse(storedData);
    this.organization_id = this.businessData.data.id;
  }
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.number = params['number'];
      console.log(this.number);
    });
  }
  onSubmit() {
    if (!this.name || !this.date) {
      this.message.presentToast('All fields are required', 'danger');
    } else {
      try {
        var dateObject = new Date(this.date);
        var day = dateObject.getDate();
        var month = dateObject.getMonth() + 1;
        var year = dateObject.getFullYear();
        const dob = `${day}/${month}/${year}`;
        const data = {
          username: this.name,
          dob: dob,
          contact_number: this.number,
          organization_id: this.organization_id.toString()
        };
          console.log('data=====>,', data);
          this.apiService.signup(data).subscribe(res => {
          console.log('ressssss=>', res);
          this.router.navigate(['/welcome-screen']);
          this.name = "";
          this.date = "";
        }, (error) => {
          console.error('Error during signup:', error);
          this.message.presentToast('Something went wrong', 'danger');
        });
      } catch (err) {
        console.error('An unexpected error occurred:', err);
        this.message.presentToast('Something went wrong', 'danger');
      }
    }
  }
}
