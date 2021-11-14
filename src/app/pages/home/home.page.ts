import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { NotesService } from 'src/app/services/notes.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  notecrate: {
    title: '';
    description: '';
    id: number;
  };
  datanotes: any;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  constructor(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private Notes: NotesService,
    public alertController: AlertController,
    private router: Router,
    public toastController: ToastController,
    private location: Location
  ) {}

  ngOnInit() {
    this.getnotes();
  }

  getnotes = async () => {
    if (environment.cc=='') {
      this.router.navigate(['/login']);
    } else {
      await this.Notes.getnotes(environment.cc).subscribe(
        (res: any) => {
          this.datanotes = res;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  add = async () => {
    const alert = await this.alertController.create({
      cssClass: 'ion',
      header: 'Nueva Nota',
      inputs: [
        {
          name: 'title',
          type: 'text',
          placeholder: 'ingrese el titulo de la nota',
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'ingrese la descripción de la nota',
        },
      ],

      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'Crear',
          handler: async (alertadata) => {
            this.notecrate = alertadata;
            this.notecrate.id = Number(environment.cc);

            await this.Notes.createnote(this.notecrate).subscribe(
              async (res: any) => {
                const toast = await this.toastController.create({
                  color: 'dark',
                  duration: 2000,
                  message: res.message,
                });
                await toast.present();
                this.getnotes();
              },
              (err) => {
                console.log(err);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  };

  deletenote = async (id) => {
    const alert = await this.alertController.create({
      cssClass: 'ion',
      header: 'Eliminar Nota',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel');
          },
        },
        {
          text: 'Eliminar',
          handler: async () => {
            await this.Notes.deletenote(id).subscribe(
              async (res: any) => {
                const toast = await this.toastController.create({
                  color: 'dark',
                  duration: 2000,
                  message: res.mensaje,
                });
                await toast.present();
                this.getnotes();
              },
              (err) => {
                console.log(err);
              }
            );
          },
        },
      ],
    });

    await alert.present();
  };
}
