import { Component, Input } from '@angular/core';
import { HeaderData } from 'src/app/models/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})


export class HeaderComponent {

  @Input() title!: string;
  @Input() cards!: HeaderData[];


}
