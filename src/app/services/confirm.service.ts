import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions, SweetAlertResult } from 'sweetalert2';


const SVG_CONFIRM = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>'
const SVG_CANCEL = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>'


@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  /**
   * Fonction qui retourne la pop-up Swal avec options, pop-up de confirmation simple
   * @param title titre de la popup à ajouter (translate)
   * @param html contenu de la popup à ajouter (translate)
   * @param showConfirmButton param optionnel pour cacher le bouton
   * @returns
   */
  showConfirm(title: string, html: string, showConfirmButton: boolean = true): Promise<SweetAlertResult> {
    const options: SweetAlertOptions = {
      title: title,
      html: html,
      showCancelButton: true,
      showConfirmButton: showConfirmButton,
      cancelButtonText: SVG_CANCEL + ' Annuler',
      confirmButtonText: SVG_CONFIRM + ' Confirmer',
      buttonsStyling: false,
      reverseButtons: true,
      focusCancel: true,
      heightAuto: false,
      customClass: {
        container: 'swal2-height-aut',
        confirmButton: 'btn btn-darkorange toast-confirm-button',
        cancelButton: 'btn btn-lightorange toast-close-button'
      }
    }
    return Swal.fire(options);
  }

  /**
   * Fonction qui retourne la pop-up Swal avec options, pop-up de confirmation avec checkbox
   * @param title titre de la popup à ajouter (translate)
   * @param html contenu de la popup à ajouter (translate)
   * @returns
   */
  showConfirmWithCheckbox(title: string, html: string): Promise<SweetAlertResult> {
    const options: SweetAlertOptions = {
      title: title,
      html: html,
      input: 'checkbox',
      inputPlaceholder: "Je comprends que cette opération est irréversible.",
      showCancelButton: true,
      cancelButtonText: SVG_CANCEL + " Annuler",
      confirmButtonText: SVG_CONFIRM + " Confirmer",
      buttonsStyling: false,
      reverseButtons: true,
      focusCancel: true,
      customClass: {
        input: 'form-check d-block',
        confirmButton: 'btn btn-darkorange toast-confirm-button',
        cancelButton: 'btn btn-lightorange toast-close-button'
      },
      willOpen: function () {
        Swal.getConfirmButton()!.disabled = true;
        Swal.getInput()!.addEventListener('change', function (event) {
          if ((event.target as any).checked === true) {
            Swal.getConfirmButton()!.disabled = false;
          } else {
            Swal.getConfirmButton()!.disabled = true;
          }
          event.stopImmediatePropagation();
        })
      }
    }
    return Swal.fire(options);
  }
}
