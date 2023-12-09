import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css',
})
export class TeamsComponent implements OnInit {
  team: any = {};
  isCreated: boolean = false;

  ngOnInit(): void {
    if (localStorage.getItem('team')) {
      this.team = JSON.parse(localStorage.getItem('team')!);
      this.isCreated = true;
    } else {
      this.isCreated = false;
    }
  }
}
