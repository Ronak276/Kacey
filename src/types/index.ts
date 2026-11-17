export interface Animal {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Horse' | 'Other';
  breed: string;
  age: string;
  gender: 'Male' | 'Female';
  weight: string;
  ownerName: string;
  ownerPhone: string;
  photoUrl: string;
  notes?: string;
  allergies?: string;
  lastTestDate?: string;
}

export type ResultStatus = 'Normal' | 'Trace' | 'Positive' | 'Abnormal';

export interface TestParameter {
  id: string;
  name: string;
  value: string;
  status: ResultStatus;
  normalRange?: string;
  padColorHex: string;
  referenceColors: {
    label: string;
    colorHex: string;
    status: ResultStatus;
  }[];
}

export interface DiagnosticTest {
  id: string;
  animalId: string;
  animalName: string;
  animalBreed: string;
  animalPhoto: string;
  testCategory: 'Urine' | 'Drug' | 'Antifreeze' | 'Blood Chemistry';
  testName: string;
  timestamp: string;
  displayTimeAgo?: string;
  overallStatus: ResultStatus;
  summaryNotes: string;
  veterinarianName: string;
  clinicName: string;
  parameters: TestParameter[];
  stripPads: string[]; // hex colors detected from top to bottom
  capturedImageUrl?: string;
}

export interface VetProfile {
  name: string;
  role: string;
  email: string;
  clinicName: string;
  clinicAddress: string;
  phone: string;
  licenseNumber: string;
  avatarUrl: string;
  notificationsEnabled: boolean;
  language: string;
}

export type AppTab = 'home' | 'animals' | 'scanner' | 'history' | 'profile' | 'results' | 'animal-detail' | 'report-detail' | 'notifications';

