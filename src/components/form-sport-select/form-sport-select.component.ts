import { Component, Input, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { ISport } from "../../entities/league.entities";
import { LeagueApiService } from "../../services/league-api.service";

@Component({
  selector: "form-sport-select",
  templateUrl: "./form-sport-select.component.html",
  imports: [ReactiveFormsModule],
})
export class FormSportSelectComponent implements OnInit {
  @Input() control: FormControl;

  sports: ISport[] = [];
  id = crypto.randomUUID();

  constructor(private leagueApiService: LeagueApiService) {}

  ngOnInit() {
    this.leagueApiService.getAllSports().subscribe((sports) => {
      this.sports = sports;
    });
  }
}
