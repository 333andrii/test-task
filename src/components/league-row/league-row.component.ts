import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Renderer2,
  signal,
} from '@angular/core';
import { ILeague } from '../../entities/league.entities';
import { LeagueBadgeComponent } from '../league-badge/league-badge.component';

@Component({
  selector: 'app-league-row',
  styleUrls: ['./league-row.component.scss'],
  templateUrl: './league-row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [LeagueBadgeComponent],
})
export class LeagueRowComponent {
  @Input() league: ILeague;
  showBadge = signal(false);

  constructor(private renderer: Renderer2) {}

  onShowBadge() {
    if (this.showBadge()) {
      return;
    }
    this.showBadge.set(true);

    setTimeout(() => {
      const unListen = this.renderer.listen('document', 'click', () => {
        this.showBadge.set(false);
        unListen();
      });
    });
  }
}
