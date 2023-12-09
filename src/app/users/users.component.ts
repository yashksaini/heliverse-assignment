import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  allData: any[] = [];
  filteredData: any[] = [];
  //Paging
  currentPage = 1;
  cardsPerPage = 20;
  paginatedData: any[] = [];
  pages: number[] = [];
  //Filter
  nameSearch = '';
  selectedDomain = '';
  selectedGender = '';
  selectedAvailability = '';
  // Select Options Data
  genders: string[] = [];
  domains: string[] = [];
  // Team
  teamName: string = '';
  team: any[] = [];

  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.dataService.getData().subscribe((data) => {
      this.allData = data;
      this.filteredData = data;
      this.setPage(1);
      this.calculatePages();
      this.genders = this.extractUniqueGenders();
      this.domains = this.extractUniqueDomains();
    });
  }
  setPage(page: number) {
    const startIndex = (page - 1) * this.cardsPerPage;
    const endIndex = startIndex + this.cardsPerPage;
    this.paginatedData = this.filteredData.slice(startIndex, endIndex);
    this.currentPage = page;
  }
  calculatePages() {
    this.pages = [];
    for (
      let i = 1;
      i <= Math.ceil(this.filteredData.length / this.cardsPerPage);
      i++
    ) {
      this.pages.push(i);
    }
  }
  goToNext() {
    if (this.currentPage < this.pages.length) {
      this.setPage(this.currentPage + 1);
    }
  }

  goToPrevious() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }
  extractUniqueGenders(): string[] {
    return [...new Set(this.allData.map((item) => item.gender))];
  }
  extractUniqueDomains(): string[] {
    return [...new Set(this.allData.map((item) => item.domain))];
  }
  applyFilters() {
    this.filteredData = this.allData.filter(
      (item) =>
        (item.first_name
          .toLowerCase()
          .includes(this.nameSearch.toLowerCase()) ||
          item.last_name
            .toLowerCase()
            .includes(this.nameSearch.toLowerCase())) &&
        (this.selectedDomain ? item.domain === this.selectedDomain : true) &&
        (this.selectedGender ? item.gender === this.selectedGender : true) &&
        (this.selectedAvailability
          ? item.available.toString() === this.selectedAvailability
          : true)
    );
    this.calculatePages();
    this.setPage(1);
  }
  clearFilters() {
    this.nameSearch = '';
    this.selectedDomain = '';
    this.selectedGender = '';
    this.selectedAvailability = '';
    this.applyFilters();
  }
  addToTeam(id: number, domain: string, data: any) {
    if (this.isUserExists(id)) {
      this.removeFromTeam(id);
    } else {
      if (!this.isDomainExists(domain)) {
        // If this domain user is not in team
        this.team.push(data);
      } else {
        alert(` ${domain} domain user already in team`);
      }
    }
  }
  removeFromTeam(id: number) {
    this.team = this.team.filter((user) => user.id !== id);
  }
  isUserExists(id: number) {
    return this.team.some((user) => user.id === id);
  }
  isDomainExists(domain: string): boolean {
    return this.team.some((user) => user.domain === domain);
  }
  saveTeamToLocal() {
    if (this.teamName.length > 3 && this.team.length != 0) {
      localStorage.setItem(
        'team',
        JSON.stringify({ teamName: this.teamName, members: [...this.team] })
      );
      this.team = [];
      this.teamName = '';
      alert('Team Saved');
    } else {
      alert('Team name and at least one memeber required to create a team');
    }
  }
}
