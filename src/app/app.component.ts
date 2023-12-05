import { Component, OnInit } from '@angular/core';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: any[] = [];
  loading: boolean = true;
  progressValue: number = 0;
 constructor(private contactService:ContactService){}

 ngOnInit() {
  this.loading = true;
  this.contactService.getContacts().subscribe(
    (data) => {
      this.contacts = data;
    },
    (error) => {
      console.error('Error fetching contacts:', error);
    },
    () => {
      // Hide the progress bar when the request is complete
      this.loading = false;
    }
  );
}
}
