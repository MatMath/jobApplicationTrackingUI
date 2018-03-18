import { Pipe, PipeTransform } from '@angular/core';

import { globalStructureSchema } from '../classDefinition';

@Pipe({ name: 'jobListPipe' })
export class JobListPipe implements PipeTransform {
  transform(jobList: globalStructureSchema[], filter: string) {
    const strTest = filter.toLowerCase();
    if(jobList && jobList.length > 0 && strTest) {
      const filteredValue = jobList.filter(job => {
        // TODO: Make it smarter (case insensitive, sparse search?) 
        if (job.company && job.company.indexOf(strTest) > -1) { return true; }
        if (job.recruiters && job.recruiters.indexOf(strTest) > -1) { return true;}
        if (job.title && job.title.indexOf(strTest) > -1) { return true;}
        return false;
      }
      );
      return filteredValue;
    }
    return jobList;
  }
}
