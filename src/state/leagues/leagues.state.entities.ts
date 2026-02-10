import { StateToken } from '@ngxs/store';
import { ILeague } from '../../entities/league.entities';

export class ILeagueSearchParamsValues {
  leagueName: string | null;
  sportType: string | null;
}

export interface ILeaguesState {
  loading: {
    leagues: boolean;
  };
  leaguesInternal: ILeague[];
  leagues: ILeague[];
  sports: string[];
  searchParams: ILeagueSearchParamsValues;
}

export function initLeagueState(): ILeaguesState {
  return {
    loading: {
      leagues: false,
    },
    leaguesInternal: [],
    leagues: [],
    sports: [],
    searchParams: {
      leagueName: null,
      sportType: null,
    },
  };
}
export const LEAGUE_STATE = new StateToken<ILeaguesState>('leagues');
