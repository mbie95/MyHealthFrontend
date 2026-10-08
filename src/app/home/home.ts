import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Api } from '../service/api';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: Api,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.saveTokenIfExists();
  }

  saveTokenIfExists(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      const token = params['token'];
      const roles = params['roles'];

      if (token && roles) {
        this.apiService.saveAuthData(token, roles);
        window.history.replaceState({}, document.title, this.router.url.split('?')[0]);
        window.location.reload();
      }
    });
  }

}
