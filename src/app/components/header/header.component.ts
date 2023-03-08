import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  email;
  constructor(
    public authService: AuthService,
    public translate: TranslateService,
    private location: Location
  ) {
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.getUser();
  }
  changeLang(lang) {
    this.translate.use(lang);
  }
  getUser() {
    this.email = this.authService.getEmail();
    console.log(this.email);
  }
  goback() {
    this.location.back();
  }
}
