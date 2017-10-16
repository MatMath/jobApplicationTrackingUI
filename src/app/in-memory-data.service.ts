export class InMemoryDataService {
  createDb() {

    const cie = [{
      name: 'Most Amazing Cie',
      location: 'Dublin',
      gps: {
        type: 'Point',
        coordinates: [0, 0],
      },
      contact: '',
      link: '',
    },
    {
      name: 'Second Most Amazing cie',
      location: 'Dublin South',
      gps: {
        type: 'Point',
        coordinates: [0, 0],
      },
      contact: '',
      link: '',
    }]

    const recruiterslist = [
      { cie: 'Recru 1', name: 'Name 1' },
      { cie: 'recru 2', name: 'Name 2' }
    ];

    const meetingInfo = {
      date: '',
      participants: [],
      purpose: '',
      challenge: '',
      notes: '',
    };

    const globalStructure = {
      location: '',
      website: '',
      applicationType: '',
      recruiters: {},
      company: {},
      title: '',
      description: '',
      date: '',
      application: false,
      answer_receive: false,
      meeting: [],
      notes: '',
      cover_letter: '',
    };

    const joblist = [
      {...globalStructure, location: 'Dublin', title: 'FullStack'},
      {...globalStructure, location: 'Dublin South', title: 'Front-end Dev'}
    ];

    return {
      cie,
      globalStructure,
      meetingInfo,
      recruiterslist,
      joblist,
    };
  }
}
