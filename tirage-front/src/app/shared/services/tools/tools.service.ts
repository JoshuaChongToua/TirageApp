import {Injectable} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor(private _snackBar: MatSnackBar) { }

     openSnackBar(context: 'success' | 'error' | 'info', message: string) {
        this._snackBar.open(message, 'fermer', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: context
        })
    }
}
