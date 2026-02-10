import { Selector } from '@ngxs/store';
import { ILeaguesState, LEAGUE_STATE } from './leagues.state.entities';
import { ILeague } from '../../entities/league.entities';

export class LeagueStateSelectors {
  @Selector([LEAGUE_STATE])
  static leagues(state: ILeaguesState): ILeague[] {
    return state.leagues;
  }


  @Selector([LEAGUE_STATE])
  static sports(state: ILeaguesState): string[] {
    return state.sports;
  }

  @Selector([LEAGUE_STATE])
  static isLoadingLeagues(state: ILeaguesState): boolean {
    return state.loading.leagues;
  }
}
