import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database…');

  // Clean slate (safe for a local demo db).
  await prisma.caseFile.deleteMany();
  await prisma.client.deleteMany();
  await prisma.boardPost.deleteMany();
  await prisma.appointment.deleteMany();

  // --- Demo portal client -------------------------------------------------
  const password = await bcrypt.hash('password123', 10);
  const client = await prisma.client.create({
    data: {
      email: 'client@example.com',
      name: 'Jordan Avery',
      password,
    },
  });
  console.log(`   • Demo client: ${client.email} / password123`);

  // --- Case files ---------------------------------------------------------
  await prisma.caseFile.createMany({
    data: [
      {
        clientId: client.id,
        caseNumber: 'VF-2026-0481',
        title: 'Acme Holdings — financial misstatement review',
        status: 'IN_REVIEW',
        summary:
          'Forensic accounting analysis of restated quarterly filings. Tracing of intercompany transfers in progress; preliminary damages model under preparation.',
      },
      {
        clientId: client.id,
        caseNumber: 'VF-2026-0377',
        title: 'Northgate Partners — digital evidence recovery',
        status: 'DISCOVERY',
        summary:
          'Acquisition and analysis of laptop and email archives under ISO/IEC 27037. Recovered deleted correspondence pending privilege review with counsel.',
      },
      {
        clientId: client.id,
        caseNumber: 'VF-2025-1192',
        title: 'Delgado matter — expert testimony',
        status: 'AWAITING_COURT',
        summary:
          'Expert report served. Deposition completed. Awaiting trial date; rebuttal analysis prepared in response to opposing expert.',
      },
      {
        clientId: client.id,
        caseNumber: 'VF-2025-0844',
        title: 'Riverside Trust — asset tracing',
        status: 'CLOSED',
        summary:
          'Asset tracing engagement concluded. Final report delivered; recovered funds confirmed. File archived.',
      },
    ],
  });
  console.log('   • 4 case files created');

  // --- Legal Q&A board posts (newest will appear first) ------------------
  const now = Date.now();
  const day = 24 * 60 * 60 * 1000;
  const posts = [
    {
      name: 'Maria G.',
      question:
        'How long should a company retain financial records in case of a future audit or dispute?',
      answer:
        'Retention periods vary by jurisdiction and record type, but seven years is a common baseline for tax and financial records. For records tied to ongoing or anticipated litigation, a legal hold should suspend any destruction schedule.',
      daysAgo: 1,
    },
    {
      name: null,
      question:
        'Can deleted text messages be recovered and used as evidence in court?',
      answer:
        'Often yes. Deleted messages can frequently be recovered from device backups or carrier records, and may be admissible if properly preserved with a documented chain of custody. Acquisition should follow recognised forensic standards.',
      daysAgo: 2,
    },
    {
      name: 'David L.',
      question:
        'What is the difference between forensic accounting and a regular financial audit?',
      answer:
        'A standard audit tests whether financial statements are fairly presented. Forensic accounting investigates specific allegations — fraud, hidden assets, damages — and is designed to produce findings that hold up as evidence.',
      daysAgo: 4,
    },
    {
      name: 'Anonymous',
      question:
        'Do I need to preserve my emails before filing a lawsuit, even informally?',
      answer:
        'Yes. Once litigation is reasonably anticipated, you have a duty to preserve potentially relevant information. Failing to do so can lead to spoliation sanctions. Avoid deleting anything and consider a formal legal hold.',
      daysAgo: 6,
    },
    {
      name: 'Priya S.',
      question:
        'What makes an expert witness report admissible versus excluded?',
      answer:
        "Admissibility generally turns on the expert's qualifications, a reliable methodology, and relevance to the case (the Daubert factors in many U.S. courts). A clear, reproducible method documented in the report is essential.",
      daysAgo: 8,
    },
    {
      name: null,
      question:
        'Is metadata from a document considered evidence on its own?',
      answer:
        'Metadata — such as creation dates, authorship and edit history — can be highly probative and is regularly admitted. Its weight depends on how reliably it was preserved and whether it can be authenticated.',
      daysAgo: 11,
    },
    {
      name: 'Thomas R.',
      question:
        'How are economic damages typically calculated in a commercial dispute?',
      answer: null, // awaiting answer — demonstrates the "awaiting" state
      daysAgo: 12,
    },
    {
      name: 'Lucía M.',
      question:
        'Can a company investigate an employee’s work laptop without consent?',
      answer:
        'On company-owned devices, employers usually have broad rights to investigate, particularly where policies put employees on notice. Specifics depend on local law and any expectation of privacy, so it is worth confirming before acting.',
      daysAgo: 15,
    },
  ];

  for (const p of posts) {
    await prisma.boardPost.create({
      data: {
        name: p.name,
        question: p.question,
        answer: p.answer,
        createdAt: new Date(now - p.daysAgo * day),
      },
    });
  }
  console.log(`   • ${posts.length} board posts created`);

  // --- One example appointment (demonstrates double-booking prevention) --
  const future = new Date(now + 7 * day);
  const isoDate = future.toISOString().slice(0, 10);
  await prisma.appointment.create({
    data: {
      name: 'Sample Booking',
      email: 'sample@example.com',
      phone: '+1 (555) 010-0000',
      reason: 'Initial consultation regarding a contract dispute.',
      date: isoDate,
      time: '10:00',
    },
  });
  console.log(`   • 1 example appointment on ${isoDate} at 10:00`);

  console.log('✅ Seed complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
