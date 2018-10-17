import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import {RequestOptions, Request, Headers } from '@angular/http';
import { HttpHeaders, HttpClientModule } from '@angular/common/http';

import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  constructor(private httpClient:HttpClient) { }
  httpOptions = {
	  headers: new HttpHeaders({ 
		'Access-Control-Allow-Origin':'*'
	  })
	};

  title = 'app';
  emailid;
  showData = false;
  formdata;
  httpdata;
  ngOnInit() {
	this.formdata = new FormGroup({
	 emailid: new FormControl("", Validators.compose([
            Validators.required,
            Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")
         ])),
	 passwd: new FormControl("",this.passwordvalidation)
	});
  }
  passwordvalidation(formcontrol) {
      if (formcontrol.value.length < 5) {
         return {"passwd" : true};
      }
  }
   
   onClickSubmit(data) {
	   // form is submitted. Do something with data 
	   // email will be in data.emailid
	   // password will be in data.passwd
	   
	  this.httpClient.get("https://istheapplestoredown.com/api/v1/status/worldwide",this.httpOptions)
        .subscribe(
            data => {
                console.log("Post Request is successful", data);
				this.displaydata(data);
            },
            error => {
                console.log("Error from server", error);
            }
        );  
   }
   displaydata(data) {
	   console.log('displaydata is called');
	   this.httpdata = data; 
	   this.showData = true;
	} 
}
