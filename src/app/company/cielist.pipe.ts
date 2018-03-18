import { Pipe, PipeTransform } from '@angular/core';

import { CompanySchema, RecruitersInfoSchema } from '../classDefinition';

@Pipe({ name: 'cieListPipe' })
export class CieListPipe implements PipeTransform {
  transform(cieList: CompanySchema[], filter: string) {
    if(cieList && cieList.length > 0 && filter) {
      const strTest = new RegExp(filter.toLowerCase(), 'i');
      const filteredValue = cieList.filter(cie => {
        if (cie.name && cie.name.match(strTest) !== null) { return true; }
        if (cie.location && cie.location.match(strTest) !== null) { return true;}
        return false;
      });
      return filteredValue;
    }
    return cieList;
  }
}

@Pipe({ name: 'recruListPipe' })
export class RecrutersListPipe implements PipeTransform {
  transform(recruList: RecruitersInfoSchema[], filter: string) {
    if(recruList && recruList.length > 0 && filter) {
      const strTest = new RegExp(filter.toLowerCase(), 'i');
      const filteredValue = recruList.filter(recru => {
        if (recru.name && recru.name.match(strTest) !== null) { return true; }
        if (recru.cie && recru.cie.match(strTest) !== null) { return true;}
        return false;
      });
      return filteredValue;
    }
    return recruList;
  }
}
