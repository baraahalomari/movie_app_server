import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieService } from './movie.service';

@UseGuards(JwtGuard)
@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getAllMovies(){
    return this.movieService.getAllMovies();
  }

  @Post()
  createMovie(@Body() createMovieDto: CreateMovieDto , @GetUser('id') id: number) {  
    return this.movieService.createMovie(createMovieDto ,id );
  }

  @Put(':id')
  updateMovie(@Body() updateMovieDto: CreateMovieDto, @GetUser('id') userId: number, @Param('id') id: number) {
    return this.movieService.updateMovie(id, updateMovieDto, userId);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number, @GetUser('id') userId: number) {
    return this.movieService.deleteMovie(id, userId);
    }

}
