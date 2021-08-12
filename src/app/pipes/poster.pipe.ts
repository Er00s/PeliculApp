import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterPipe implements PipeTransform {

  //<img src="https://image.tmdb.org/t/p/original{{movie.poster_path}} " alt="" class="img-fluid poster">


  transform(poster: string, ): string {

    if (poster) {
      return `https://image.tmdb.org/t/p/original${poster}`;
    }else {
      return './assets/no-image.jpg';
    }
  }

}
