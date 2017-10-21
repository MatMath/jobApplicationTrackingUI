export class CompanySchema {
  _id: string;
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
  _id: string;
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
  _id: string;
  location: string;
  website: string;
  applicationType: string;
  title: string;
  recruiters: any; // TODO find why it is always undefined if I link them
  company: any; // TODO find why it is always undefined if I link them
  description: string;
  date: Date; // Converted number.
  application: boolean;
  answer_receive: boolean;
  meeting: any[]; // TODO find why it is always undefined if I link them
  notes: string;
  cover_letter: string;
};
