// Static demo content — replaces the database for a backend-free deploy.
// Lets the marketing layout be shown live with no DB / no env config.

export type DemoPost = {
  id: string;
  name: string | null;
  question: string;
  answer: string | null;
  daysAgo: number;
};

export const BOARD_POSTS: DemoPost[] = [
  {
    id: 'p1',
    name: 'Maria G.',
    question:
      'How long should a company retain financial records in case of a future audit or dispute?',
    answer:
      'Retention periods vary by jurisdiction and record type, but seven years is a common baseline for tax and financial records. For records tied to ongoing or anticipated litigation, a legal hold should suspend any destruction schedule.',
    daysAgo: 1,
  },
  {
    id: 'p2',
    name: null,
    question:
      'Can deleted text messages be recovered and used as evidence in court?',
    answer:
      'Often yes. Deleted messages can frequently be recovered from device backups or carrier records, and may be admissible if properly preserved with a documented chain of custody.',
    daysAgo: 2,
  },
  {
    id: 'p3',
    name: 'David L.',
    question:
      'What is the difference between forensic accounting and a regular financial audit?',
    answer:
      'A standard audit tests whether financial statements are fairly presented. Forensic accounting investigates specific allegations — fraud, hidden assets, damages — and is designed to produce findings that hold up as evidence.',
    daysAgo: 4,
  },
  {
    id: 'p4',
    name: 'Anonymous',
    question:
      'Do I need to preserve my emails before filing a lawsuit, even informally?',
    answer:
      'Yes. Once litigation is reasonably anticipated, you have a duty to preserve potentially relevant information. Failing to do so can lead to spoliation sanctions.',
    daysAgo: 6,
  },
  {
    id: 'p5',
    name: 'Priya S.',
    question:
      'What makes an expert witness report admissible versus excluded?',
    answer:
      "Admissibility generally turns on the expert's qualifications, a reliable methodology, and relevance to the case (the Daubert factors in many U.S. courts).",
    daysAgo: 8,
  },
  {
    id: 'p6',
    name: null,
    question: 'Is metadata from a document considered evidence on its own?',
    answer:
      'Metadata — such as creation dates, authorship and edit history — can be highly probative and is regularly admitted, depending on how reliably it was preserved.',
    daysAgo: 11,
  },
  {
    id: 'p7',
    name: 'Thomas R.',
    question:
      'How are economic damages typically calculated in a commercial dispute?',
    answer: null,
    daysAgo: 12,
  },
  {
    id: 'p8',
    name: 'Lucía M.',
    question:
      'Can a company investigate an employee’s work laptop without consent?',
    answer:
      'On company-owned devices, employers usually have broad rights to investigate, particularly where policies put employees on notice. Specifics depend on local law.',
    daysAgo: 15,
  },
];

export type DemoCase = {
  caseNumber: string;
  title: string;
  status: string; // matches portal.status.* keys
  summary: string;
  updatedDaysAgo: number;
};

export const DEMO_CLIENT_NAME = 'Jordan Avery';

export const CASE_FILES: DemoCase[] = [
  {
    caseNumber: 'VF-2026-0481',
    title: 'Acme Holdings — financial misstatement review',
    status: 'IN_REVIEW',
    summary:
      'Forensic accounting analysis of restated quarterly filings. Tracing of intercompany transfers in progress; preliminary damages model under preparation.',
    updatedDaysAgo: 2,
  },
  {
    caseNumber: 'VF-2026-0377',
    title: 'Northgate Partners — digital evidence recovery',
    status: 'DISCOVERY',
    summary:
      'Acquisition and analysis of laptop and email archives under ISO/IEC 27037. Recovered deleted correspondence pending privilege review with counsel.',
    updatedDaysAgo: 5,
  },
  {
    caseNumber: 'VF-2025-1192',
    title: 'Delgado matter — expert testimony',
    status: 'AWAITING_COURT',
    summary:
      'Expert report served. Deposition completed. Awaiting trial date; rebuttal analysis prepared in response to opposing expert.',
    updatedDaysAgo: 9,
  },
  {
    caseNumber: 'VF-2025-0844',
    title: 'Riverside Trust — asset tracing',
    status: 'CLOSED',
    summary:
      'Asset tracing engagement concluded. Final report delivered; recovered funds confirmed. File archived.',
    updatedDaysAgo: 21,
  },
];
