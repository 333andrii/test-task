//why better to use functions as a helopers but not Static methods of the class?
//because tree shaking could happen for not used functions while for the static methods is not
//and always all static methods will be imported in the bundle
import { ILeague } from '../../../entities/league.entities';
import { ILeagueSearchParamsValues } from '../leagues.state.entities';

export function applyFilterLeagues(
  leagues: ILeague[],
  params: ILeagueSearchParamsValues
): ILeague[] {
  return leagues.filter((league) => {
    if (params.leagueName && !league.strLeague?.toLowerCase().includes(params.leagueName.toLowerCase())) {
      return false;
    }

    if (params.sportType && league.strSport !== params.sportType) {
      return false;
    }

    return true;
  });
}
