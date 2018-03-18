import { Pipe, PipeTransform } from '@angular/core';

import { globalStructureSchema } from '../classDefinition';

@Pipe({ name: 'jobListPipe' })
export class JobListPipe implements PipeTransform {
  transform(jobList: globalStructureSchema[], filter: string) {
    if(jobList && jobList.length > 0 && filter) {
      const strTest = new RegExp(filter.toLowerCase(), 'i');
      const filteredValue = jobList.filter(job => {
        if (job.company && job.company.match(strTest) !== null) { return true; }
        if (job.recruiters && job.recruiters.match(strTest) !== null) { return true;}
        if (job.title && job.title.match(strTest) !== null) { return true;}
        return false;
      }
      );
      return filteredValue;
    }
    return jobList;
  }
}
