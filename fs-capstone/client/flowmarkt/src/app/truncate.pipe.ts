import { Pipe, PipeTransform } from '@angular/core';

import {isUndefined} from "util";

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength?: number, appendix?: string) : string {

    let limit = (isUndefined(maxLength)) ? 10 : maxLength;
    let trail =(isUndefined(appendix)) ? '...' : appendix;

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }

}
