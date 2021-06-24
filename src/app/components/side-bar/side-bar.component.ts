import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { faTree, faGlobeEurope, faTrash, faInfo} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/authentication.service';
import { Category } from '../../model/category';
import { Quiz } from '../../model/quiz';
import { UiServiceService } from '../../services/ui-service.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  @Input() categories: Category[];
  @Input() quizzes: Quiz[];

  selectedCategory: Category;
  icons = [faGlobeEurope, faTree];
  settingsIcon = [faTrash, faInfo];
  toggleInfo = false;

  constructor(
    private router: Router,
    private uiService: UiServiceService,
    private authService: AuthenticationService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.setNavBarContent();

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.setNavBarContent();
      }
    });
  }


  resetScore(): void {
    // Reset by refresh since not using real backend
    window.location.reload();
  }

  logout(): void {
    this.authService.attemptLogout();
  }

  showInfo() {
    this.toggleInfo = !this.toggleInfo;
  }

  closeSidebar() {
    this.uiService.hideMobile();
  }


  setNavBarContent() {
    const parsedUrl = this.router.parseUrl(this.router.url);
    let path: string;
    let id: string;
    if (parsedUrl.root.children.primary && parsedUrl.root.children.primary.segments[0].path !== 'login') {
      path = parsedUrl.root.children.primary.segments[0].path;
      id = parsedUrl.root.children.primary.segments[1].path;
      this.location.replaceState(`/${path}/${id}`);
    }
    else {
      if (this.categories) {
        this.router.navigate(['category', this.categories[0]._id]);
      } else {
        return;
      }
    }
    if (path === 'category') {
      this.setSelectedCategory(id);
    } else if (path === 'quiz') {
      if (this.quizzes) {
        const quiz = this.quizzes.find(q => q.categoryId === id);
        if (quiz) {
          this.setSelectedCategory(quiz.categoryId);
        }
      }
    }
  }


  setSelectedCategory(id: string) {
    if (this.categories) {
      this.selectedCategory = this.categories.find(i => i._id === id);
    }
  }

}
