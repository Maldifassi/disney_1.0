import { Component } from '@angular/core';               // Importa il decoratore Component dalla libreria principale di Angular
import { RouterOutlet } from '@angular/router';          // Importa RouterOutlet, che serve per mostrare i componenti in base alla route
import { CommonModule } from '@angular/common';          // Importa CommonModule (ngIf, ngFor, ecc.) per poterli usare nel template

@Component({                                             // Decoratore che definisce le meta-informazioni del componente
  selector: 'app-root',                                 // Nome del tag HTML che rappresenta questo componente (<app-root>)
  standalone: true,                                     // Indica che è un componente standalone (senza NgModule)
  imports: [RouterOutlet, CommonModule],                // Moduli e componenti che questo componente può usare nel template
  templateUrl: './app.html',                            // File HTML collegato a questo componente
  styleUrls: ['./app.css']                              // File CSS collegato a questo componente
})
export class AppComponent {                             // Dichiarazione della classe del componente root
  isDarkTheme = false;                                  // Variabile booleana che indica se il tema scuro è attivo o no

  toggleTheme(): void {                                 // Metodo chiamato quando clicco il pulsante per cambiare tema
    this.isDarkTheme = !this.isDarkTheme;               // Inverte il valore di isDarkTheme (da true a false o viceversa)

    if (this.isDarkTheme) {                             // Se il tema scuro è attivo...
      document.body.classList.add('dark-theme');        // ...aggiunge la classe 'dark-theme' al tag <body> (attiva il CSS scuro)
    } else {                                            // Altrimenti (tema chiaro)
      document.body.classList.remove('dark-theme');     // ...rimuove la classe 'dark-theme' dal body (torna al CSS chiaro)
    }
  }
}