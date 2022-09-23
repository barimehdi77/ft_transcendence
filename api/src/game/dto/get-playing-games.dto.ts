import { UserProfile } from "src/auth/dto/User.dto";

export class GetPlayingGames {
  player_one: UserProfile;
  player_two: UserProfile;
}
