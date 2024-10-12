import { Injectable } from '@angular/core';
import { icons } from '../../core/constants/icons';
import { LabelValuePair } from '../models/label-value-pair';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {
  public icons: LabelValuePair[] = icons;

  getIcon(iconName: string): string {
    console.log(iconName);
    const iconSource = this.icons.find(icon => icon.label === iconName)?.value || 'wala';
    console.log(iconSource);
    return iconSource
  }

}
