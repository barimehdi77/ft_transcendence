import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { GetPlayingGames } from './dto/get-playing-games.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Get('playing')
  async getAllPlayingGames(@Req() req: Request, @Res() res: Response) {
    try {
      const Games = await this.gameService.getPlayingGames();
      if (Games) {
        return res.status(200).json({
          status: 'success',
          message: 'All Playing Games Retrieved Successfully',
          data: Games,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        status: 'error',
        message: 'Error Retrieving Playing Games',
        error: error.message ? error.message : error,
      });
    }
  }
}
