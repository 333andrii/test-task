import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { LeagueApiService } from '../../services/league-api.service';
import { ErrorHandlingService } from '../../services/error-handling.service';
import { provideStore } from '@ngxs/store';
import { LeaguesState } from '../../state/leagues/leagues.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    LeagueApiService,
    ErrorHandlingService,
    provideStore([LeaguesState]),
  ],
};
