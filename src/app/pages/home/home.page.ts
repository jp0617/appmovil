import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  datanotes: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(private Notes: NotesService) {}

  ngOnInit() {
    this.getnotes();
  }

  getnotes = async () => {
    await this.Notes.getnotes().subscribe(
      (res: any) => {
        this.datanotes = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
