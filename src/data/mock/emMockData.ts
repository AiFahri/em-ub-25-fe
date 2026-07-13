/**
 * ============================================================================
 *  MOCK DATA — EM UB 2025
 * ----------------------------------------------------------------------------
 * ============================================================================
 */

export interface MockLink {
  id: string;
  title: string;
  url: string;
}

export interface MockNews {
  id: string;
  slug: string;
  title: string;
  content: string;
  status: string;
  ministryID: string;
  ministryName: string;
  categoryID: string;
  categoryName: string;
  imageUrls: string[];
  publishedAt: string;
  createdAt: string;
}

export interface MockFieldOption {
  id: string;
  label: string;
  order: number;
}

export interface MockField {
  id: string;
  label: string;
  type: 'TEXT' | 'DROPDOWN' | 'CHECKBOX' | 'UPLOAD';
  isRequired: boolean;
  order: number;
  fileCategories: string[];
  maxFile: number;
  maxFileSize: number;
  options: MockFieldOption[];
}

export interface MockForm {
  id: string;
  category: string;
  categoryName: string;
  description: string;
  ImageUrl: string;
  isPublished: boolean;
  groupLink: string;
  acceptedLink: string;
  fileLink: string;
  deadlineAt: string;
  extendedDeadlineAt: string | null;
  createdAt: string;
  myResponse: null;
  fields: MockField[];
}

export interface MockWorkProgram {
  id: string;
  slug: string;
  title: string;
  content: string;
  status: string;
  ministryID: string;
  ministryName: string;
  isMegaBesar: boolean;
  instagramUrl: string;
  imageUrls: string[];
  createdAt: string;
  hasForm: boolean;
  registerLink: string;
  isGeneral: boolean;
  form: MockForm | null;
}

/* ------------------------------------------------------------------ */
/*  TAUTAN PINTAS (listLinks)                                          */
/* ------------------------------------------------------------------ */

export const mockLinks: MockLink[] = [
  { id: 'lnk-1', title: 'JDIH EM UB', url: 'https://em.ub.ac.id' },
  { id: 'lnk-2', title: 'Advokesma (Line OA)', url: 'https://em.ub.ac.id' },
  { id: 'lnk-3', title: 'Buku Panduan Turun ke Jalan', url: 'https://em.ub.ac.id' },
  { id: 'lnk-4', title: 'Form Partnership', url: 'https://em.ub.ac.id' },
  { id: 'lnk-5', title: 'Buku Saku P3', url: 'https://em.ub.ac.id' },
  { id: 'lnk-6', title: 'Jurnal Divisi', url: 'https://em.ub.ac.id' },
  { id: 'lnk-7', title: 'Arsip Kajian Strategis', url: 'https://em.ub.ac.id' },
];

/* ------------------------------------------------------------------ */
/*  BERITA (listNews / getNewsBySlug / getNews)                       */
/* ------------------------------------------------------------------ */

export const mockNews: MockNews[] = [
  {
    id: '1',
    slug: 'pelantikan-kabinet-simpul-memori',
    title: 'Pelantikan Kabinet Simpul Memori Resmi Digelar',
    content:
      'Eksekutif Mahasiswa Universitas Brawijaya resmi melantik jajaran Kabinet Simpul Memori periode 2025 di Gedung Samantha Krida. Prosesi pelantikan dihadiri oleh perwakilan rektorat, para pimpinan ormawa, serta ratusan fungsionaris baru. Dalam sambutannya, Presiden EM UB menegaskan komitmen kabinet untuk menjadi simpul yang menyatukan memori kolektif mahasiswa Brawijaya melalui program-program yang membumi dan berdampak.',
    status: 'PUBLISHED',
    ministryID: 'min-01',
    ministryName: 'Kementerian Dalam Negeri',
    categoryID: 'cat-01',
    categoryName: 'Organisasi',
    imageUrls: [],
    publishedAt: '2025-03-12T09:00:00.000Z',
    createdAt: '2025-03-12T09:00:00.000Z',
  },
  {
    id: '2',
    slug: 'open-recruitment-fungsionaris-2025',
    title: 'Open Recruitment Fungsionaris EM UB 2025 Dibuka',
    content:
      'Pendaftaran fungsionaris Eksekutif Mahasiswa UB 2025 resmi dibuka untuk seluruh mahasiswa aktif Universitas Brawijaya. Terdapat 17 kementerian dan biro yang siap menampung minat serta bakat mahasiswa lintas fakultas. Proses seleksi meliputi pemberkasan, wawancara, dan forum group discussion untuk memastikan setiap calon fungsionaris menemukan tempat yang paling sesuai dengan kapasitasnya.',
    status: 'PUBLISHED',
    ministryID: 'min-02',
    ministryName: 'Kementerian PSDM',
    categoryID: 'cat-02',
    categoryName: 'Pengumuman',
    imageUrls: [],
    publishedAt: '2025-04-01T08:30:00.000Z',
    createdAt: '2025-04-01T08:30:00.000Z',
  },
  {
    id: '3',
    slug: 'kajian-strategis-ukt-mahasiswa',
    title: 'Kajian Strategis: Menyikapi Kebijakan UKT Mahasiswa Baru',
    content:
      'Kementerian Advokasi dan Kesejahteraan Mahasiswa merilis hasil kajian strategis terkait kebijakan Uang Kuliah Tunggal (UKT) bagi mahasiswa baru. Kajian ini menghimpun data dari berbagai fakultas dan menawarkan sejumlah rekomendasi kepada pihak universitas agar kebijakan yang diambil tetap berpihak pada aksesibilitas pendidikan bagi seluruh kalangan.',
    status: 'PUBLISHED',
    ministryID: 'min-03',
    ministryName: 'Kementerian Advokesma',
    categoryID: 'cat-03',
    categoryName: 'Kajian',
    imageUrls: [],
    publishedAt: '2025-04-18T10:15:00.000Z',
    createdAt: '2025-04-18T10:15:00.000Z',
  },
  {
    id: '4',
    slug: 'brawijaya-festival-2025',
    title: 'Brawijaya Festival 2025 Siap Menyapa Mahasiswa',
    content:
      'Rangkaian Brawijaya Festival 2025 akan segera hadir dengan tema kebudayaan Nusantara. Festival ini menjadi wadah kolaborasi seluruh ormawa untuk menampilkan karya seni, pameran, dan pertunjukan budaya. Kementerian Sosial dan Budaya mengajak seluruh mahasiswa untuk turut memeriahkan dan merawat warisan budaya bersama.',
    status: 'PUBLISHED',
    ministryID: 'min-04',
    ministryName: 'Kementerian Sosial Budaya',
    categoryID: 'cat-04',
    categoryName: 'Kegiatan',
    imageUrls: [],
    publishedAt: '2025-05-05T13:00:00.000Z',
    createdAt: '2025-05-05T13:00:00.000Z',
  },
  {
    id: '5',
    slug: 'eco-green-movement-ub',
    title: 'Eco Green Movement: Aksi Nyata untuk Kampus Hijau',
    content:
      'Gerakan Eco Green Movement kembali digelar sebagai bentuk kepedulian mahasiswa terhadap lingkungan kampus. Kegiatan meliputi penanaman pohon, edukasi pengelolaan sampah, serta kampanye pengurangan plastik sekali pakai. Ribuan mahasiswa antusias mengikuti rangkaian acara yang tersebar di berbagai titik area Universitas Brawijaya.',
    status: 'PUBLISHED',
    ministryID: 'min-05',
    ministryName: 'Kementerian Lingkungan Hidup',
    categoryID: 'cat-04',
    categoryName: 'Kegiatan',
    imageUrls: [],
    publishedAt: '2025-05-22T07:45:00.000Z',
    createdAt: '2025-05-22T07:45:00.000Z',
  },
  {
    id: '6',
    slug: 'seminar-kewirausahaan-mahasiswa',
    title: 'Seminar Kewirausahaan: Membangun Startup dari Bangku Kuliah',
    content:
      'Kementerian Kewirausahaan menyelenggarakan seminar nasional bertajuk membangun startup sejak masa perkuliahan. Menghadirkan pembicara dari kalangan founder muda dan inkubator bisnis, seminar ini membekali mahasiswa dengan pengetahuan praktis seputar validasi ide, penyusunan business model, hingga strategi pendanaan tahap awal.',
    status: 'PUBLISHED',
    ministryID: 'min-06',
    ministryName: 'Kementerian Kewirausahaan',
    categoryID: 'cat-05',
    categoryName: 'Seminar',
    imageUrls: [],
    publishedAt: '2025-06-10T09:30:00.000Z',
    createdAt: '2025-06-10T09:30:00.000Z',
  },
];

/* ------------------------------------------------------------------ */
/*  FORM PENDAFTARAN (dipakai proker Open Recruitment)                */
/* ------------------------------------------------------------------ */

function buildSampleForm(idSuffix: string): MockForm {
  return {
    id: `form-${idSuffix}`,
    category: 'GENERAL',
    categoryName: 'Umum',
    description:
      'Silakan lengkapi formulir pendaftaran berikut. Pastikan seluruh data yang diisi benar dan sesuai.',
    ImageUrl: '',
    isPublished: true,
    groupLink: 'https://em.ub.ac.id',
    acceptedLink: 'https://em.ub.ac.id',
    fileLink: '',
    deadlineAt: '2025-12-31T23:59:59.000Z',
    extendedDeadlineAt: null,
    createdAt: '2025-04-01T08:30:00.000Z',
    myResponse: null,
    fields: [
      {
        id: `fld-${idSuffix}-1`,
        label: 'Nama Lengkap',
        type: 'TEXT',
        isRequired: true,
        order: 1,
        fileCategories: [],
        maxFile: 0,
        maxFileSize: 0,
        options: [],
      },
      {
        id: `fld-${idSuffix}-2`,
        label: 'Nomor Induk Mahasiswa (NIM)',
        type: 'TEXT',
        isRequired: true,
        order: 2,
        fileCategories: [],
        maxFile: 0,
        maxFileSize: 0,
        options: [],
      },
      {
        id: `fld-${idSuffix}-3`,
        label: 'Fakultas',
        type: 'DROPDOWN',
        isRequired: true,
        order: 3,
        fileCategories: [],
        maxFile: 0,
        maxFileSize: 0,
        options: [
          { id: `opt-${idSuffix}-a`, label: 'Fakultas Ilmu Komputer', order: 1 },
          { id: `opt-${idSuffix}-b`, label: 'Fakultas Ekonomi dan Bisnis', order: 2 },
          { id: `opt-${idSuffix}-c`, label: 'Fakultas Teknik', order: 3 },
          { id: `opt-${idSuffix}-d`, label: 'Fakultas Hukum', order: 4 },
        ],
      },
      {
        id: `fld-${idSuffix}-4`,
        label: 'Bidang yang Diminati',
        type: 'CHECKBOX',
        isRequired: false,
        order: 4,
        fileCategories: [],
        maxFile: 0,
        maxFileSize: 0,
        options: [
          { id: `opt-${idSuffix}-e`, label: 'Media & Kreatif', order: 1 },
          { id: `opt-${idSuffix}-f`, label: 'Kajian & Advokasi', order: 2 },
          { id: `opt-${idSuffix}-g`, label: 'Acara & Kepanitiaan', order: 3 },
        ],
      },
      {
        id: `fld-${idSuffix}-5`,
        label: 'Unggah CV (PDF)',
        type: 'UPLOAD',
        isRequired: false,
        order: 5,
        fileCategories: ['pdf'],
        maxFile: 1,
        maxFileSize: 5,
        options: [],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  PROGRAM KERJA (listWorkPrograms / getWorkProgramBySlug)           */
/* ------------------------------------------------------------------ */

export const mockWorkPrograms: MockWorkProgram[] = [
  {
    id: '1',
    slug: 'pelatihan-softskill-mahasiswa',
    title: 'Pelatihan Softskill Mahasiswa',
    content:
      'Program pengembangan softskill terstruktur bagi mahasiswa Brawijaya, mencakup pelatihan kepemimpinan, komunikasi publik, dan manajemen organisasi. Diselenggarakan secara berkala sepanjang periode kepengurusan.',
    status: 'PUBLISHED',
    ministryID: 'PSDM',
    ministryName: 'Kementerian PSDM',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-03-20T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/pelatihan-softskill-mahasiswa',
    isGeneral: true,
    form: buildSampleForm('1'),
  },
  {
    id: '2',
    slug: 'kelas-desain-gratis',
    title: 'Kelas Desain Grafis Gratis',
    content:
      'Pelatihan desain grafis untuk pemula, mulai dari dasar tipografi hingga pembuatan konten media sosial. Terbuka untuk seluruh mahasiswa yang ingin mengasah kemampuan visual.',
    status: 'PUBLISHED',
    ministryID: 'KOMINFO',
    ministryName: 'Kementerian Kominfo',
    isMegaBesar: false,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-03-25T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/kelas-desain-gratis',
    isGeneral: true,
    form: buildSampleForm('2'),
  },
  {
    id: '3',
    slug: 'open-talk-mahasiswa',
    title: 'Open Talk Mahasiswa',
    content:
      'Forum aspirasi lintas jurusan yang mempertemukan mahasiswa dengan pengambil kebijakan kampus. Menjadi ruang dialog terbuka untuk menyuarakan gagasan dan keresahan.',
    status: 'PUBLISHED',
    ministryID: 'ADVOKESMA',
    ministryName: 'Kementerian Advokesma',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-04-02T09:00:00.000Z',
    hasForm: false,
    registerLink: '',
    isGeneral: false,
    form: null,
  },
  {
    id: '4',
    slug: 'beasiswa-riset-mahasiswa',
    title: 'Beasiswa Riset Mahasiswa',
    content:
      'Dukungan pendanaan dan pendampingan untuk riset mahasiswa UB di berbagai bidang keilmuan. Bertujuan menumbuhkan budaya riset yang berkelanjutan di lingkungan kampus.',
    status: 'PUBLISHED',
    ministryID: 'RISTEK',
    ministryName: 'Kementerian Ristek',
    isMegaBesar: false,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-04-08T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/beasiswa-riset-mahasiswa',
    isGeneral: true,
    form: buildSampleForm('4'),
  },
  {
    id: '5',
    slug: 'festival-budaya-nusantara',
    title: 'Festival Budaya Nusantara',
    content:
      'Ajang apresiasi budaya daerah oleh mahasiswa dari seluruh penjuru Nusantara. Menampilkan pertunjukan seni, kuliner khas, dan pameran budaya sebagai perekat kebersamaan.',
    status: 'PUBLISHED',
    ministryID: 'SOSBUD',
    ministryName: 'Kementerian Sosial Budaya',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-04-15T09:00:00.000Z',
    hasForm: false,
    registerLink: '',
    isGeneral: false,
    form: null,
  },
  {
    id: '6',
    slug: 'eco-green-ub',
    title: 'Eco Green UB',
    content:
      'Gerakan penghijauan dan edukasi lingkungan berkelanjutan di area kampus. Meliputi penanaman pohon, pengelolaan sampah, dan kampanye gaya hidup ramah lingkungan.',
    status: 'PUBLISHED',
    ministryID: 'LH',
    ministryName: 'Kementerian Lingkungan Hidup',
    isMegaBesar: false,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-04-22T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/eco-green-ub',
    isGeneral: true,
    form: buildSampleForm('6'),
  },
  {
    id: '7',
    slug: 'startup-bootcamp',
    title: 'Startup Bootcamp',
    content:
      'Inkubator ide bisnis dan mentoring startup bagi mahasiswa yang ingin merintis usaha. Peserta dibimbing dari tahap ide hingga penyusunan prototipe dan pitching.',
    status: 'PUBLISHED',
    ministryID: 'KWU',
    ministryName: 'Kementerian Kewirausahaan',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-05-01T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/startup-bootcamp',
    isGeneral: true,
    form: buildSampleForm('7'),
  },
  {
    id: '8',
    slug: 'health-awareness-week',
    title: 'Health Awareness Week',
    content:
      'Kampanye kesehatan mental dan fisik mahasiswa selama satu pekan penuh. Menghadirkan konsultasi psikologi, pemeriksaan kesehatan gratis, dan talkshow kesehatan.',
    status: 'PUBLISHED',
    ministryID: 'KESMA',
    ministryName: 'Kementerian Kesejahteraan Mahasiswa',
    isMegaBesar: false,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-05-09T09:00:00.000Z',
    hasForm: false,
    registerLink: '',
    isGeneral: false,
    form: null,
  },
  {
    id: '9',
    slug: 'brawijaya-mengajar',
    title: 'Brawijaya Mengajar',
    content:
      'Program pengabdian masyarakat berupa kegiatan mengajar di daerah sekitar kampus. Mahasiswa berperan sebagai relawan pendidik untuk anak-anak sekolah dasar.',
    status: 'PUBLISHED',
    ministryID: 'SOSMAS',
    ministryName: 'Kementerian Sosial Masyarakat',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-05-16T09:00:00.000Z',
    hasForm: true,
    registerLink: '/pendaftaran/brawijaya-mengajar',
    isGeneral: true,
    form: buildSampleForm('9'),
  },
  {
    id: '10',
    slug: 'leadership-summit-2025',
    title: 'Leadership Summit 2025',
    content:
      'Puncak pertemuan para pemimpin organisasi mahasiswa se-Universitas Brawijaya. Menjadi ruang konsolidasi gagasan dan kolaborasi lintas lembaga kemahasiswaan.',
    status: 'PUBLISHED',
    ministryID: 'DAGRI',
    ministryName: 'Kementerian Dalam Negeri',
    isMegaBesar: true,
    instagramUrl: 'https://instagram.com/em.ub',
    imageUrls: [],
    createdAt: '2025-05-24T09:00:00.000Z',
    hasForm: false,
    registerLink: '',
    isGeneral: false,
    form: null,
  },
];
