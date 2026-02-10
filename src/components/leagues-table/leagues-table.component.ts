import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LeagueRowComponent } from '../league-row/league-row.component';
import { ILeague } from '../../entities/league.entities';

@Component({
  selector: 'app-leagues-table',
  templateUrl: './leagues-table.component.html',
  styleUrls: ['./leagues-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeagueRowComponent],
})
export class LeaguesTableComponent {
  @Input() leagues: ILeague[] = [];
}
