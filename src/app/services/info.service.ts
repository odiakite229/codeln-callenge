import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

const SVG_BELL = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="20" height="20" class="mr-2"><!-- Font Awesome Pro 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path fill="white" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"/></svg>';
const SVG_CHECK = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20" height="20" class="mr-2"><!-- Font Awesome Pro 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path fill="white" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>';

const TOAST = Swal.mixin({
  toast: true,
  position: 'bottom',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: 2000
});

const UNLIMITED_TOAST = Swal.mixin({
  toast: false,
  backdrop: false,
  position: 'bottom',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast',
  },
  showConfirmButton: false,
  timer: undefined
});

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor() { }

  /**
   * Display Toastr success with given message
   * @param message given message
   */
  public success(message: string): void {
    TOAST.fire({
      icon: 'success',
      title: '<span class="text-white">' + message + '</span>'
    });
  }

  /**
   * Display Toastr warning with given message
   * @param message given message
   */
  public warning(message: string, timeout: boolean = true): void {
    if (timeout) {
      TOAST.fire({
        icon: 'warning',
        title: '<span class="text-white">' + message + '</span>'
      });
    } else {
      UNLIMITED_TOAST.fire({
        icon: 'warning',
        html: '<span class="text-white">' + message + '</span>'
      });
    }
  }

  /**
   * Display Toastr error with given message
   * @param message given message
   */
  public error(message: string): void {
    TOAST.fire({
      icon: 'error',
      title: '<span class="text-white">' + message + '</span>'
    });
  }

  /**
   * Close any swal pop up opened
   */
  public close(): void {
    Swal.close();
  }
}
