import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.service';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  noteid: number;
  datanote: {
    strtitle: '';
    strdescription: '';
  };
  noteform: FormGroup;

  constructor(
    private actiedroute: ActivatedRoute,
    private notes: NotesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    public toastController: ToastController
  ) {
    this.noteform = this.formBuilder.group({
      id: 0,
      title: '',
      description: '',
    });
  }

  ngOnInit() {
    try {
      this.actiedroute.paramMap.subscribe((paramMap) => {
        this.noteid = Number(paramMap.get('id'));
        this.noteform.get('id').setValue(this.noteid);
        this.getnote(this.noteid);
      });
    } catch (error) {
      console.log(error);
    }
  }

  getnote = async (id) => {
    await this.notes.getonenote(id).subscribe(
      (res: any) => {
        this.datanote = res[0];
        this.noteform.get('title').setValue(this.datanote.strtitle);
        this.noteform.get('description').setValue(this.datanote.strdescription);
        console.log(this.datanote);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  update = async () => {
    await this.notes.updatenote(this.noteform.value).subscribe(
      async (res: any) => {
        const toast = await this.toastController.create({
          color: 'dark',
          duration: 2000,
          message: res.mensaje,
        });

        await toast.present();

        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => this.router.navigate(['/home']));
      },
      (err) => {
        console.log(err);
      }
    );
  };
}
