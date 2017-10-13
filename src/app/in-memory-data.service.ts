export class InMemoryDataService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

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

    const recruitersList = [
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

    return {
      cie,
      heroes,
      globalStructure,
      meetingInfo,
    };
  }
}
