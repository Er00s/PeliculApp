import { Component, OnInit,HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from '../../services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public texto: string = "";
  public movies: Movie[] = []
  public moviesSlideshow: Movie[] = []

  @HostListener('window: scroll', ['$event'] )
  onScroll(){

    const posicion = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
     const max = (document.documentElement.scrollHeight || document.body.scrollHeight);
    

    if(posicion > max){
      if(this.PeliculasService.cargando){ return;}
        
      this.PeliculasService.getCartelera().subscribe(movies =>{
       this.movies.push(...movies)
      })
    }

  }



  constructor(private activatedRoute: ActivatedRoute,
    private PeliculasService: PeliculasService) { }

    

  ngOnInit(): void {
    
    

    this.activatedRoute.params.subscribe(params => {
      this.texto = params.texto;
      console.log(params.texto);
      this.PeliculasService.buscarPeliculas(params.texto).subscribe(movies => {
        this.movies = movies;
      })
    })


    

  }

}
