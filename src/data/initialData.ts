import { Animal, DiagnosticTest, VetProfile } from '../types';

export const KACEY_PRODUCTS = [
  {
    id: 'veti-stx-9',
    name: 'Veti-Stx 9 Urinalysis',
    category: 'Urine',
    readTimeSec: 60,
    padsCount: 6,
    description: 'Comprehensive 9-parameter veterinary urinalysis strip with protein/creatinine ratio.',
    pads: ['Protein', 'Glucose', 'Ketones', 'pH', 'Blood', 'Specific Gravity']
  },
  {
    id: 'eg-3-antifreeze',
    name: 'EG-3 Ethylene Glycol STAT Test',
    category: 'Antifreeze',
    readTimeSec: 600,
    padsCount: 3,
    description: 'Rapid point-of-care canine/feline plasma test for all 3 phases of antifreeze ingestion.',
    pads: ['Phase 1 Ingestion', 'Phase 2', 'Critical']
  },
  {
    id: 'veti-screen-6',
    name: 'Veti-Screen 6 Drugs of Abuse',
    category: 'Drug',
    readTimeSec: 300,
    padsCount: 5,
    description: 'Rapid animal urine screening for THC, Opiates, Cocaine, Meth, Amphetamines.',
    pads: ['THC', 'Opiates', 'Cocaine', 'Amphetamines', 'Methamphetamine']
  }
];

export const INITIAL_VET_PROFILE: VetProfile = {
  name: 'Dr. Sarah Mitchell',
  role: 'Senior Veterinarian',
  email: 'dr.sarah@kaceydiagnostics.com',
  clinicName: 'Kacey Veterinary Care',
  clinicAddress: '1042 Animal Wellness Blvd',
  phone: '+1 (555) 349-8201',
  licenseNumber: 'VET-CA-98104',
  avatarUrl: '/assets/doctor_avatar.png',
  notificationsEnabled: true,
  language: 'English',
};

export const INITIAL_ANIMALS: Animal[] = [
  {
    id: 'anim-1',
    name: 'Buddy',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: '3 Years',
    gender: 'Male',
    weight: '32 kg',
    ownerName: 'Dr. John Smith',
    ownerPhone: '+1 (555) 234-8901',
    photoUrl: '/assets/buddy_avatar.png',
    notes: 'All values are within normal range.',
    allergies: 'None recorded',
    lastTestDate: 'Nov 16, 2026',
  },
  {
    id: 'anim-2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: '2 Years',
    gender: 'Female',
    weight: '4.2 kg',
    ownerName: 'Emily Watson',
    ownerPhone: '+1 (555) 876-1234',
    photoUrl: '/assets/luna_avatar.png',
    notes: 'Screening shows trace detection of NSAID toxicity markers.',
    allergies: 'None recorded',
    lastTestDate: 'Nov 14, 2026',
  },
  {
    id: 'anim-3',
    name: 'Max',
    species: 'Dog',
    breed: 'German Shepherd',
    age: '4 Years',
    gender: 'Male',
    weight: '38 kg',
    ownerName: 'Robert Vance',
    ownerPhone: '+1 (555) 432-9087',
    photoUrl: '/assets/buddy_avatar.png',
    notes: 'Routine health monitoring.',
    allergies: 'None',
    lastTestDate: 'Nov 10, 2026',
  }
];

export const INITIAL_TESTS: DiagnosticTest[] = [
  {
    id: 'test-1',
    animalId: 'anim-1',
    animalName: 'Buddy',
    animalBreed: 'Golden Retriever',
    animalPhoto: '/assets/buddy_avatar.png',
    testCategory: 'Urine',
    testName: 'Urine Test',
    timestamp: 'Nov 16, 2026 • 2:15 PM',
    displayTimeAgo: '2h ago',
    overallStatus: 'Normal',
    summaryNotes: 'All values are within normal range.',
    veterinarianName: 'Dr. Sarah Mitchell',
    clinicName: 'Kacey Veterinary Diagnostics',
    stripPads: ['#dcfce7', '#fef08a', '#bbf7d0', '#86efac', '#bbf7d0', '#bae6fd'],
    parameters: [
      { id: '1', name: 'Protein', value: 'Negative', status: 'Normal', padColorHex: '#dcfce7', referenceColors: [] },
      { id: '2', name: 'Glucose', value: 'Trace', status: 'Trace', padColorHex: '#fef08a', referenceColors: [] },
      { id: '3', name: 'Ketones', value: 'Negative', status: 'Normal', padColorHex: '#bbf7d0', referenceColors: [] },
      { id: '4', name: 'pH', value: '6.5', status: 'Normal', padColorHex: '#86efac', referenceColors: [] },
      { id: '5', name: 'Blood', value: 'Negative', status: 'Normal', padColorHex: '#bbf7d0', referenceColors: [] },
      { id: '6', name: 'Specific Gravity', value: '1.020', status: 'Normal', padColorHex: '#bae6fd', referenceColors: [] },
    ]
  },
  {
    id: 'test-2',
    animalId: 'anim-2',
    animalName: 'Luna',
    animalBreed: 'Domestic Shorthair',
    animalPhoto: '/assets/luna_avatar.png',
    testCategory: 'Drug',
    testName: 'Drug Test',
    timestamp: 'Nov 14, 2026 • 10:30 AM',
    displayTimeAgo: '1d ago',
    overallStatus: 'Positive',
    summaryNotes: 'Screening reveals elevated markers.',
    veterinarianName: 'Dr. Sarah Mitchell',
    clinicName: 'Kacey Veterinary Diagnostics',
    stripPads: ['#f87171', '#fecdd3', '#bae6fd', '#dcfce7'],
    parameters: [
      { id: 'd1', name: 'Toxic NSAID Markers', value: 'Positive', status: 'Positive', padColorHex: '#f87171', referenceColors: [] },
      { id: 'd2', name: 'Sedatives', value: 'Negative', status: 'Normal', padColorHex: '#dcfce7', referenceColors: [] },
      { id: 'd3', name: 'Antihistamines', value: 'Negative', status: 'Normal', padColorHex: '#bae6fd', referenceColors: [] }
    ]
  },
  {
    id: 'test-3',
    animalId: 'anim-1',
    animalName: 'Buddy',
    animalBreed: 'Golden Retriever',
    animalPhoto: '/assets/buddy_avatar.png',
    testCategory: 'Urine',
    testName: 'Urine Test',
    timestamp: 'Nov 10, 2026 • 1:20 PM',
    displayTimeAgo: '6d ago',
    overallStatus: 'Normal',
    summaryNotes: 'Clear urine profile.',
    veterinarianName: 'Dr. Sarah Mitchell',
    clinicName: 'Kacey Veterinary Diagnostics',
    stripPads: ['#dcfce7', '#bae6fd', '#dcfce7', '#86efac', '#bae6fd'],
    parameters: [
      { id: 'p1', name: 'Protein', value: 'Negative', status: 'Normal', padColorHex: '#dcfce7', referenceColors: [] },
      { id: 'p2', name: 'pH', value: '6.5', status: 'Normal', padColorHex: '#86efac', referenceColors: [] },
    ]
  },
  {
    id: 'test-4',
    animalId: 'anim-1',
    animalName: 'Buddy',
    animalBreed: 'Golden Retriever',
    animalPhoto: '/assets/buddy_avatar.png',
    testCategory: 'Urine',
    testName: 'Urine Test',
    timestamp: 'Nov 05, 2026 • 11:45 AM',
    displayTimeAgo: '11d ago',
    overallStatus: 'Trace',
    summaryNotes: 'Slight trace observed.',
    veterinarianName: 'Dr. Sarah Mitchell',
    clinicName: 'Kacey Veterinary Diagnostics',
    stripPads: ['#fef08a', '#dcfce7', '#fed7aa', '#86efac'],
    parameters: [
      { id: 'b1', name: 'Protein', value: 'Trace', status: 'Trace', padColorHex: '#fef08a', referenceColors: [] },
      { id: 'b2', name: 'pH', value: '6.8', status: 'Normal', padColorHex: '#86efac', referenceColors: [] },
    ]
  }
];
