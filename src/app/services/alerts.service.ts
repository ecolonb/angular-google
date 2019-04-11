import { Injectable } from '@angular/core';

import { from } from 'rxjs';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  // swal: SweetAlert = swal;
  // swal: SweetAlert = swal;
  constructor() {}
  async errorAlert(mssg: string) {
    Swal.fire({
      title: '¡Algo salió mal!',
      text: mssg,
      type: 'error',
      confirmButtonText: 'Ok',
      animation: false
    });
  }
}
