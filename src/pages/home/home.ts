import { Component } from '@angular/core';
import { ANIMALES } from '../../data/data.animales';
import { Animal } from '../../interfaces/animal.interface';
import { Refresher, reorderArray } from 'ionic-angular';
import { ReorderIndexes } from 'ionic-angular/components/item/item-reorder';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  animales: Animal[] = [];
  audio = new Audio();
  audioTiempo: any;
  reordenando = false;
  botonReordenar = 'Ordenar';

  constructor() {
    this.animales = ANIMALES.slice(0);
  }

  reproducir(animal: Animal) {

    if (this.reordenando) {
      return;
    }

    this.pausar_audio(animal);

    if (animal.reproduciendo) {
      animal.reproduciendo = false;
      return;
    }

    console.log(animal);
    this.audio.src = animal.audio;
    this.audio.load();
    this.audio.play();

    animal.reproduciendo = true;

    this.audioTiempo = setTimeout(() =>
      animal.reproduciendo = false, animal.duracion * 1000);
  }

  borrar_animal(index: number) {
    this.animales.splice(index, 1);
  }

  recargar_animales(refresher: Refresher) {

    console.log('Inicio del refresh');

    setTimeout(() => {
      console.log('Fin del refresh');
      this.animales = ANIMALES.slice(0);
      refresher.complete();
    }, 1500);

  }

  toggleEdit() {

    this.pausar_audio();

    this.reordenando = !this.reordenando;
    this.botonReordenar =
      this.botonReordenar === 'Ordenar' ? 'Listo' : 'Ordenar';

  }

  reordenar_animales(indexes: ReorderIndexes) {

    this.animales = reorderArray(this.animales, indexes);
  }

  private pausar_audio(animalSel?: Animal) {
    clearTimeout(this.audioTiempo);
    this.audio.pause();
    this.audio.currentTime = 0;

    if (animalSel) {
      this.animales
        .filter(animal => animal.nombre != animalSel.nombre)
        .map(animal => animal.reproduciendo = false);
    } else {
      this.animales
        .map(animal => animal.reproduciendo = false);
    }

  }
}
