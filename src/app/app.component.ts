import { Component, OnInit } from '@angular/core';

// Services
import { QuizService } from './services/quiz.service';
import { CategoryService } from './services/category.service';
import { UiServiceService } from './services/ui-service.service';

// Model
import { Category } from './model/category';
import { Quiz } from './model/quiz';
import { AuthenticationService } from './authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categories: Category[];
  quizzes: Quiz[];
  title = 'quiz-app';
  toggle = 'toggled';
  authenticated = false;
  useLogin = true;


  constructor(
    private quizService: QuizService,
    private categoryService: CategoryService,
    private uiService: UiServiceService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.listenForAuth();

    // Sidebar toggle
    this.uiService.sharedSidebar.subscribe(sidebar => {
      this.toggle = sidebar ? '' : 'toggled';
    });

    this.authService.isLoginPage().subscribe(val => this.useLogin = val);
  }


  // Get quizzes
  getQuizzes(): void {
    this.quizService.getQuizzes()
      .subscribe(quizzes => {
        this.quizzes = quizzes;
      });
  }

  // Get categories
  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  listenForAuth(): void {
    this.authService.isLoggedIn()
    .subscribe(loggedIn => {
      this.authenticated = loggedIn;
      if (loggedIn) {
        this.getQuizzes();
        this.getCategories();
      }
    });
  }
}
