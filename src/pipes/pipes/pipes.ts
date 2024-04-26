import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the PipesPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'pipes',
})
export class PipesPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return value.toLowerCase();
  }
}

@Pipe({ name: 'safeStyle' })
export class SafeStylePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value) {
    return this.sanitizer.bypassSecurityTrustStyle(value);
  }
}

@Pipe({ name: 'bloodGroup' })
export class bloodGroupPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value) {
    let bg = '';
    switch(value.toString()){     
      case '1' : {
        bg = 'A+';
        break;
      }
      case '2' : {
        bg = 'A-';
        break;
      }
      case '3' : {
        bg = 'B+';
        break;
      }
      case '4' : {
        bg = 'B-';
        break;
      }
      case '5' : {
        bg = 'AB+';
        break;
      }
      case '6' : {
        bg = 'AB-';
        break;
      }
      case '7' : {
        bg = 'O+';
        break;
      }
      case '8' : {
        bg = 'O-';
        break;
      }
      case '9' : {
        bg = 'Unknown';
        break;
      }
      default : {
        bg = '';
        break;
      }
    }
    return bg;

  }
}

@Pipe({ name: 'swimmingFilter' })
export class swimmingAbilityPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(value) {
    let sa = '';
    switch(value.toString()){     
      case '1' : {
        sa = 'Cannot Swim';
        break;
      }
      case '2' : {
        sa = 'Weak Swimmer';
        break;
      }
      case '3' : {
        sa = 'Fair Swimmer';
        break;
      }
      case '4' : {
        sa = 'Competent Swimmer';
        break;
      }
      case '5' : {
        sa = 'Strong Swimmer';
        break;
      }      
      default : {
        sa = '';
        break;
      }
    }
    return sa;

  }
}
