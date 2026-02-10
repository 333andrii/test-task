import { Action, State, StateContext } from "@ngxs/store";
import {
  ILeagueSearchParamsValues,
  ILeaguesState,
  initLeagueState,
  LEAGUE_STATE,
} from "./leagues.state.entities";
import {
  RefreshLeagues,
  ResetSearchParams,
  UpdateSearchParams,
} from "./leagues.state.actions";
import { LeagueApiService } from "../../services/league-api.service";
import { applyFilterLeagues } from "./helpers/leagues-filtering.helper";
import { Injectable } from "@angular/core";

@Injectable()
@State({
  name: LEAGUE_STATE,
  defaults: initLeagueState(),
})
export class LeaguesState {
  constructor(private leaguesApiService: LeagueApiService) {}

  @Action(RefreshLeagues)
  refreshLeagues(ctx: StateContext<ILeaguesState>): void {
    ctx.patchState({
      loading: {
        leagues: true,
      },
    });

    this.leaguesApiService.getLeagues().subscribe((res) => {
      ctx.patchState({
        loading: {
          leagues: false,
        },
        leagues: applyFilterLeagues(res, ctx.getState().searchParams),
        leaguesInternal: res,
        sports: res.reduce<string[]>((acc, league) => {
          if (!acc.includes(league.strSport)) {
            acc.push(league.strSport);
          }
          return acc;
        }, []),
      });
    });
  }

  @Action(UpdateSearchParams)
  updateFilterParams(
    ctx: StateContext<ILeaguesState>,
    action: UpdateSearchParams,
  ): void {
    const state = ctx.getState();

    const newLeaguesList = applyFilterLeagues(
      state.leaguesInternal,
      action.searchParams,
    );

    ctx.patchState({
      searchParams: action.searchParams!,
      leagues: newLeaguesList,
    });
  }

  @Action(ResetSearchParams)
  resetSearchParams(ctx: StateContext<ILeaguesState>): void {
    const state = ctx.getState();
    ctx.patchState({
      searchParams: {
        leagueName: null,
        sportType: null,
      },
      leagues: applyFilterLeagues(state.leaguesInternal, {
        leagueName: null,
        sportType: null,
      }),
    });
  }
}
