import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

   public movies: Movie[] = []
   public moviesSlideshow: Movie[] = []

   @HostListener('window: scroll', ['$event'] )
   onScroll(){

    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1600;
      const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
     

     if(posicion > max){
       if(this.PeliculasService.cargando){ return;}
         
       this.PeliculasService.getCartelera().subscribe(movies =>{
        this.movies.push(...movies)
       })
     } 

   }

  constructor(private PeliculasService: PeliculasService ) {  }

  ngOnInit(): void {

    this.PeliculasService.getCartelera()
    .subscribe(movies => {
      //console.log(resp.results);
      this.movies = movies;
      this.moviesSlideshow= movies;
      
    })

  }

  ngOnDestroy(){
    this.PeliculasService.resetCarteleraPage();
  }

}
