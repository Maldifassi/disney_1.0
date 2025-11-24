import { TestBed } from '@angular/core/testing';      // Importa TestBed, utility per configurare il testing module
import { DisneyApiService } from './disney-api';      // Importa il servizio da testare

describe('DisneyApi', () => {                         // Descrive il gruppo di test per DisneyApiService
  let service: DisneyApiService;                      // Variabile che conterrà l'istanza del service nei test

  beforeEach(() => {                                  // Funzione eseguita prima di ogni test
    TestBed.configureTestingModule({});               // Configura un modulo di test vuoto (basta per iniettare il service)
    service = TestBed.inject(DisneyApiService);       // Recupera un'istanza del service dal TestBed
  });

  it('should be created', () => {                     // Singolo test che verifica se il service viene creato
    expect(service).toBeTruthy();                     // Controlla che service non sia null/undefined (cioè che esista)
  });
});