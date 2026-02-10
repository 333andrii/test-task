import {
  ChangeDetectionStrategy,
  Component,
  effect,
  OnInit,
} from "@angular/core";
import { select, Store } from "@ngxs/store";
import { LeagueStateSelectors } from "../../state/leagues/lagues.state.selectors";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { debounceTime } from "rxjs";
import {
  RefreshLeagues,
  ResetSearchParams,
  UpdateSearchParams,
} from "../../state/leagues/leagues.state.actions";
import { LeaguesTableComponent } from "../leagues-table/leagues-table.component";
import { FormSportSelectComponent } from "../form-sport-select/form-sport-select.component";
import { FormInputTextComponent } from "../form-input-text/form-input-text.component";
import { LoaderComponent } from "../loader/loader.component";
import { toSignal } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    LeaguesTableComponent,
    FormSportSelectComponent,
    FormInputTextComponent,
    LoaderComponent,
  ],
})
export class AppComponent implements OnInit {
  leagues = select(LeagueStateSelectors.leagues);

  sports = select(LeagueStateSelectors.sports);
  isLoading = select(LeagueStateSelectors.isLoadingLeagues);

  searchForm = new FormGroup({
    leagueName: new FormControl<string | null>(null),
    sportType: new FormControl<string | null>(null),
  });

  private leagueNameSignal = toSignal(
    this.searchForm.controls.leagueName.valueChanges.pipe(debounceTime(500)),
    { initialValue: null },
  );
  private sportTypeSignal = toSignal(
    this.searchForm.controls.sportType.valueChanges,
    { initialValue: null },
  );

  constructor(private store: Store) {
    effect(() => {
      store.dispatch(
        new UpdateSearchParams({
          leagueName: this.leagueNameSignal(),
          sportType: this.sportTypeSignal(),
        }),
      );
    });

    effect(() => {
      this.isLoading() ? this.searchForm.disable() : this.searchForm.enable();
    });
  }

  ngOnInit() {
    this.store.dispatch(new RefreshLeagues());
  }

  resetFilters(): void {
    this.store.dispatch(new ResetSearchParams());
    this.searchForm.reset();
  }

  refreshData(): void {
    this.store.dispatch(new RefreshLeagues());
  }
}
