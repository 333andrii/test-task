import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  OnInit,
  signal,
} from '@angular/core';
import { ILeague } from '../../entities/league.entities';
import { LeagueApiService } from '../../services/league-api.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-league-badge',
  templateUrl: './league-badge.component.html',
  styleUrls: ['./league-badge.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeagueBadgeComponent implements OnInit {
  @Input() badgeId: ILeague['idLeague'];

  badgeUrl = signal<string | null>(null);

  constructor(
    private leagueApiService: LeagueApiService,
    private destroyRef: DestroyRef
  ) {}

  ngOnInit() {
    if (!this.badgeId) {
      return;
    }
    this.leagueApiService
      .getLatestLeagueBadge(this.badgeId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (url) => {
          this.badgeUrl.set(url);
        },
      });
  }
}
