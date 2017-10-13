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
