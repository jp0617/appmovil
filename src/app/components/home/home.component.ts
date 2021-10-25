import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  DataNotes: any;
  constructor(private Notes: NotesService) {}

  ngOnInit() {
    this.getnotes();
  }

  getnotes = async () => {
    await this.Notes.getnotes().subscribe(
      (res: any) => {
        this.DataNotes = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
