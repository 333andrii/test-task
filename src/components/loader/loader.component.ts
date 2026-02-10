import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { delay, of, Subject, switchMap, tap } from "rxjs";
import { AsyncPipe, NgIf } from "@angular/common";

@Component({
  selector: "loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"],
  imports: [NgIf, AsyncPipe],
})
export class LoaderComponent implements OnChanges {
  @Input() show = false;

  private showInternalSubject = new Subject();
  isShow$ = this.showInternalSubject.pipe(
    switchMap((val) => {
      return val ? of(true) : of(false).pipe(delay(500));
    }),
  );

  ngOnChanges(changes: SimpleChanges) {
    this.showInternalSubject.next(changes?.["show"].currentValue);
  }
}
