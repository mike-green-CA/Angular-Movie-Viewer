import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
const API_KEY  = '31fcd22dfe083024423d55d5895606d3'; // Use v3
const BASE_URL  = 'http://api.themoviedb.org/3/discover/movie?api_key='
                + API_KEY
 
                // You will need a function to change this URL to 
                // dynamically modify the start and end date range.
                + '&primary_release_date.gte=2019-01-01'
                + '&primary_release_date.lte=2019-02-25'
                
                // You will want to dynamically change the page number 
                // and genre number.
                + '&page=1&with_genres=16';
 
const GENRE_URL = 'https://api.themoviedb.org/3/genre/movie/list?api_key='
                + API_KEY
                + '&language=en-US';
   
@Component({
    styles: ['C:\Users\Owner\Downloads\COMP 2902\Projects\Michael-Green-A01045801-Assignment03-in-work\src/styles.css'],
    template: `
                <div class="wrapper">
                    <br/><br/>
                    
                    <div class="header">                       
                        <div>
                            <select name="genre-select" 
                            [(ngModel)]="_currentGenre" 
                            (change)=newGenreSelected()>
                                <option *ngFor="let genre of _genreArray; let i = index" [value]="genre.id">
                                    {{genre.name}}
                                </option>
                            </select>
                        </div>
                        
                        <h1>Movies</h1>

                        <div class="page-control">
                            <input type="button" name="backwardPage" value="<" (click)=goBackwardPage()>
                            Page: {{_currentPage}}/{{_maxPagesForGenre}}
                            <input type="button" name="forwardPage" value=">" (click)=goForwardPage()>
                        </div>                           
                    </div>
                                        
                    <div class="the-movies" id="the-movies">
                    <ul>
                        <li *ngFor="let movie of _movieArray">
                            <div class="movie-item">
                                <h1>{{movie.title}}</h1>
                                <child [imgPath]="movie.backdrop_path"></child>
                                <p class="movie-overview">{{movie.overview}}</p> 
                            </div>
                            
                        </li>
                    </ul>
                
                </div>` 
})
export class PageHome {
    parentFunctionReference:Function;
    imageFromChild: string;
    _currentGenre: number;
    _movieArray: Array<any>;
    _genreArray: Array<any>;
    _http:HttpClient;
    _currentURL:string;
    _currentPage: number;
    _maxPagesForGenre: number;
 
    // Since we are using a provider above we can receive 
    // an instance through an instructor.
    constructor(private http: HttpClient) {
        this._http = http;
        this._movieArray = [];
        this._genreArray = [];
        this._currentGenre = 16;
        this._currentURL = this.urlChanger();
        this._currentPage = 1;
        this._maxPagesForGenre = 0;
        this.imageFromChild = '';
        this.parentFunctionReference= this.callBackFunction.bind(this);
    }

    public callBackFunction(imagePath:string){
        this.imageFromChild = imagePath;
    }
 
    ngOnInit() {
        this.getMovies(this._currentURL);
        this.getGenres();
        
    }

    newGenreSelected(){
        this._currentPage = 1;
        this.urlChanger();
    }

    goForwardPage(){
        // Test to make sure we're not going beyond the max pages.
        if((this._currentPage + 1) <= this._maxPagesForGenre){
            this._currentPage += 1;
            this.urlChanger(); 
        }  
    }

    goBackwardPage(){
        if(this._currentPage > 1){
            this._currentPage -= 1;
            this.urlChanger();
        }
    }

    urlChanger(){

        let todayDate = new Date();
        let thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(todayDate.getDate() - 30);

        let newURL = 'http://api.themoviedb.org/3/discover/movie?api_key=' +
                    API_KEY + 
                    '&primary_release_date.gte=' + this.getFormattedDate(thirtyDaysAgo) + 
                    '&primary_release_date.lte=' + this.getFormattedDate(todayDate) +
                    '&page=' + this._currentPage + '&with_genres=' + this._currentGenre;

        this.getMovies(newURL);
        return newURL;
    }

 
    getFormattedDate(dt:Date) {
        //YYYY-MM-DD

        // KEEP IN MIND dt.getMonth() will return 0 for Janurary!
        // So we will do dt.getMonth() + 1 to treat it as thr 1st month!
        let formattedDate = '';
        let formattedMonth = '';
            if(dt.getMonth() + 1 < 10){
                console.log("MONTH = " + dt.getMonth());
                formattedMonth += '0';
            }
        let formattedDay = '';
            if(dt.getDate() < 10){
                formattedDay += '0';
            }
            
        formattedDate += dt.getFullYear() + "-";
        formattedDate += formattedMonth + (dt.getMonth() + 1).toString() + "-";
        formattedDate += formattedDay + dt.getDate().toString();
        
        //alert(formattedDate);
        return formattedDate;
    }
 
    getMovies(theURL:string) {
        this._http.get<any>(theURL)
 
          // Get data and wait for result.
          .subscribe(data => {
            this._maxPagesForGenre = data.total_pages; 
            this._movieArray = data.results;
            //alert(this._movieArray);    
            }, 
          error =>{
            // Let user know about the error.
            //alert(error);
            console.error(error)
          })
    }
 
    getGenres() {
        this._http.get<any>(GENRE_URL)
        // Get data and wait for result.
        .subscribe(data => {
            this._genreArray = data.genres;
            //alert(JSON.stringify(this._genreArray));
        }, 
 
        error =>{
          // Let user know about the error.
          //alert(error);
          console.error(error)
        })
    }
}