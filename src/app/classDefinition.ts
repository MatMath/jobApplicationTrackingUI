export class CompanySchema {
  _id: string;
  name: string;
  location: string;
  gps: gps;
  contact: string;
  link: string;
  show?: boolean; // only for the UI, not from the DB
};

export class gps {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    }
    properties: {
      name: string;
    }
}

export class RecruitersInfoSchema {
  _id: string;
  cie: string;
  name: string;
  notes: string;
  show?: boolean; // only for the UI, not from the DB
};

export class MeetingInfoSchema {
  date: number;
  participants: string[];
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
  meeting: MeetingInfoSchema[];
  notes: string;
  cover_letter: string;
  offer: string;
  acceptedOffer: boolean;
};

export class userParamStructure {
  website: string[];
  title: string[];
}

export class barCharData {
  name:string;
  value:number;
}

export class stackedBarCharData {
  name:string;
  value:number[]; // First being the biggest?
}

export class titleListForGraph {
  _id: string;
  count: number
}

export class websiteWeight {
  _id: string;
  total: number;
  success: number;
}
