import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movies } from './entity/auth.entity';


@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movies)
    private moviesRepository: Repository<Movies>,
  ) { }

  // to get all movies
  getAllMovies(): Promise<Movies[]> {
    return this.moviesRepository.find();
  }

  // to create a new movie

  async createMovie(movie: CreateMovieDto, userId: number) {
    console.log(movie, userId);
    const isExist = await this.moviesRepository.findOne({ where: { title: movie.title } });
    if (isExist) return 'Movie already exists!';
    return await this.moviesRepository.save({ ...movie, userId });
  }

async  deleteMovie(movieId: number, userId: number) {
  return await this.moviesRepository.findOneBy({ id : movieId}).then(m => {
      if (m.userId === userId) {
        return this.moviesRepository.delete(movieId);
      } else {
        return ;
      }
    });
  }


 async updateMovie(id: number, movie: CreateMovieDto, userId: number) {

      return await this.moviesRepository.findOneBy({ id }).then(m => {
        if (m.userId !== userId) {
          return;
        }
        m.title = movie.title;
        m.description = movie.description;
        m.image = movie.image;
        m.date = movie.date;
        m.rating = movie.rating;
        return m;
      });
    }



}
