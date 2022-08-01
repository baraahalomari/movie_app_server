import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movies } from './entity/auth.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movies])],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
