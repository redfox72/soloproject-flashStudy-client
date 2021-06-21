import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

// Services
import { QuestionService } from '../../services/question.service';
import { QuizService } from '../../services/quiz.service';
import { PlayerService } from '../../services/player.service';

// Model
import { Quiz } from '../../model/quiz';
import { Question } from '../../model/question';
import { Player } from '../../model/player';
import { AuthenticationService } from 'src/app/authentication.service';



@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  faArrowRight = faArrowRight;

  player: Player;
  options: any[];
  question: Question;
  questions: Question[];
  quiz: Quiz;
  points = 0;
  fails = 0;
  correctPosition = 0;
  answerPosition = 0;
  pause = false;
  success = true;
  progress = 0;



  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private quizService: QuizService,
    private playerService: PlayerService,
    private location: Location,
    private authService: AuthenticationService
    ) { }

  ngOnInit() {
    this.getPlayer(this.authService.getUserID().value);
    this.route.params.subscribe(routeParams => {
      this.getQuiz(routeParams.id);
    });
  }


  // Get player
  getPlayer(id: string): void {
    this.playerService.getPlayer(id)
      .subscribe(player => {
        this.player = player;
      });
  }

  // Update player score
  updateScore(): void {
    this.playerService.updatePlayer(this.player)
      .subscribe();
  }


  // get Questions
  getQuestions(questionIds: string[]): void {
    this.questionService.getQuestionsByQuiz(questionIds)
      .subscribe(questions => {
        this.questions = questions;
        questions.forEach(question => console.log(question));
        if (questions.length > 0) {
          this.question = this.questions.find(q => q.position === 1);
          this.setOptions();
        }
      });
  }

  // get Quiz
  getQuiz(id: string): void {
    this.quizService.getQuiz(id)
      .subscribe(quiz => {
        this.quiz = quiz;
        console.log('Quiz is ', this.quiz);
        console.log('Questions are ', quiz.questions);
        this.getQuestions(this.quiz.questions.map(question => question.toString()));
      });
  }




  // Quiz logic ----------------------------------------------------------------------

  updateProgress() {
    this.progress = this.question.position / this.questions.length * 100;
  }

  answer(index: number){
    if (!this.pause) {
      this.updateProgress();
      this.answerPosition = index;
      if (index !== this.correctPosition) {
        this.success = false;
      }
      this.pause = true;
    }
  }

  goNext() {
    if (this.question.position < this.questions.length && this.success) {
      this.question = this.questions.find(q => q.position === this.question.position + 1);
      this.setOptions();

      this.pause = false;
    } else {
      if (this.success) {
        if (!this.player.completed.includes(this.quiz._id)) {
          console.log('Updating score');
          this.player.completed.push(this.quiz._id);
          this.updateScore();
        }
        // Update quizz to completed
      }
      this.location.back();
    }
  }

  setOptions() {
    const array = [
      { id: 1, title: this.question.option1},
      { id: 2, title: this.question.option2},
      { id: 3, title: this.question.option3},
      { id: 4, title: this.question.option4} ];

    // Shuffle array
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    // Set correct answer position
    this.correctPosition = array.findIndex(x => x.id === 1);

    this.options = array;
  }
}
