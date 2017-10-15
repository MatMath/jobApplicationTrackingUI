export class Hero {
  id: number;
  name: string;
}

export class CompanySchema {
  name: string;
  location: string;
  gps: {
    type: string;
    coordinates: [number, number]
  };
  contact: string
  link: string
};

export class RecruitersInfoSchema {
  cie: string;
  name: string;
};

export class MeetinXgInfoSchema {
  date: number;
  participants: [string];
  purpose: string;
  challenge: string
  notes: string
};

export class globalStructureSchema {
  location: string;
  website: string;
  applicationType: string;
  title: string;
  recruiters: any; // TODO find why it is always undefined if I link them
  company: any; // TODO find why it is always undefined if I link them
  description: string;
  date: number;
  application: boolean;
  answer_receive: boolean;
  meeting: any[]; // TODO find why it is always undefined if I link them
  notes: string;
  cover_letter: string;
};
