import { Component, Input } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "form-input-text",
  templateUrl: "./form-input-text.component.html",
  imports: [ReactiveFormsModule],
})
export class FormInputTextComponent {
  @Input() control: FormControl;

  id = crypto.randomUUID();
}
