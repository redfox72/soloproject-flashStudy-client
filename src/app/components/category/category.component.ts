import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faSquare, faCheck } from '@fortawesome/free-solid-svg-icons';

// Services
import { QuizService } from '../../services/quiz.service';
import { CategoryService } from '../../services/category.service';
import { PlayerService } from '../../services/player.service';

// Model
import { Category } from '../../model/category';
import { Quiz } from '../../model/quiz';
import { Player } from '../../model/player';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  // Icons
  icons = [faSquare, faCheck];
  categories: Category[];
  quizzes: Quiz[];
  selectedCategory: Category;
  progress: number;
  player: Player;



  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private categoryService: CategoryService,
    private playerService: PlayerService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(routeParams => {
      this.getQuizzes(routeParams.id);
      this.getCategory(routeParams.id);
      this.getPlayer(this.authService.getUserID().value);
    });

  }

  // Get player
  getPlayer(id: string): void {
    this.playerService.getPlayer(id)
      .subscribe(player => {
        this.player = player;
        this.updateProgress();
      });
  }

  // Get quizzes
  getQuizzes(id: string): void {
    this.quizService.getQuizzesByCategory(id)
      .subscribe(quizzes => {
        this.quizzes = quizzes;
        this.updateProgress();
      });
  }

  // Get categories
  getCategory(id: string): void {
    this.categoryService.getCategory(id)
      .subscribe(cat => {
        this.selectedCategory = cat;
      });
  }


  // Calculate progress
  updateProgress(): void{
    if (this.quizzes) {
      this.progress = (this.quizzes.filter(q => this.player.completed.includes(q._id)).length / this.quizzes.length) * 100;
    }
  }
}
