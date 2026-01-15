import { createRequire } from "module";

import {
  additionalProjects,
  coreCompetencies,
  education,
  experience,
  featuredProjects,
  flagshipProject,
  keyAchievements,
  person,
  professionalSummary,
  technicalSkills,
} from "@/lib/resume-data";

export const runtime = "nodejs";

const require = createRequire(import.meta.url);

function ensureSpace(doc: any, neededHeight: number) {
  const bottomY = doc.page.height - doc.page.margins.bottom;
  if (doc.y + neededHeight > bottomY) {
    doc.addPage();
  }
}

function sectionTitle(doc: any, title: string) {
  ensureSpace(doc, 28);
  doc.moveDown(0.8);
  doc.fontSize(12).font("Helvetica-Bold").fillColor("#111111").text(title);
  doc
    .moveTo(doc.page.margins.left, doc.y + 4)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y + 4)
    .lineWidth(0.5)
    .strokeColor("#D1D5DB")
    .stroke();
  doc.moveDown(0.6);
}

function bulletList(doc: any, items: string[]) {
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  for (const item of items) {
    ensureSpace(doc, 16);
    doc.text(`- ${item}`, {
      indent: 12,
      paragraphGap: 2,
    });
  }
}

function renderTemplate1(doc: any) {
  doc.font("Helvetica-Bold").fontSize(18).fillColor("#111111").text(person.name, {
    align: "center",
  });
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#374151")
    .text(person.role, { align: "center" });

  doc
    .fontSize(9)
    .text(person.location, { align: "center" })
    .text(`${person.phone} | ${person.email}`, { align: "center" })
    .text(person.linkedinUrl, { align: "center" })
    .moveDown(0.5);

  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .lineWidth(1)
    .strokeColor("#111111")
    .stroke();

  sectionTitle(doc, "Professional Summary");
  doc.font("Helvetica").fontSize(10).fillColor("#111111").text(professionalSummary, {
    lineGap: 2,
  });

  sectionTitle(doc, "Core Competencies");
  bulletList(doc, coreCompetencies);

  sectionTitle(doc, "Technical Skills");
  for (const [category, skills] of Object.entries(technicalSkills)) {
    ensureSpace(doc, 22);
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111").text(category);
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#111111")
      .text(skills.join(", "), {
        lineGap: 2,
      });
    doc.moveDown(0.3);
  }

  sectionTitle(doc, "Experience");
  for (const exp of experience) {
    ensureSpace(doc, 60);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#111111")
      .text(`${exp.title} — ${exp.company}`);
    doc
      .font("Helvetica")
      .fontSize(10)
      .fillColor("#374151")
      .text(`${exp.location} | ${exp.start} – ${exp.end}`);
    bulletList(doc, exp.highlights);
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Flagship Project");
  ensureSpace(doc, 70);
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111").text(flagshipProject.name);
  doc.font("Helvetica").fontSize(10).fillColor("#111111").text(flagshipProject.description, {
    lineGap: 2,
  });
  doc.moveDown(0.3);
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#111111")
    .text(`Architecture: ${flagshipProject.architecture}`, { lineGap: 2 });
  doc.moveDown(0.3);
  doc.font("Helvetica-Bold").fontSize(10).text("Supported Airlines");
  bulletList(doc, flagshipProject.supportedAirlines);
  doc.font("Helvetica-Bold").fontSize(10).text("Impact");
  bulletList(doc, flagshipProject.impact);

  sectionTitle(doc, "Featured Projects");
  for (const project of featuredProjects.slice(0, 2)) {
    ensureSpace(doc, 70);
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111").text(project.name);
    if ("url" in project && project.url) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151").text(project.url);
    }
    if ("date" in project && project.date) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151").text(project.date);
    }
    doc.font("Helvetica").fontSize(10).fillColor("#111111").text(project.description, {
      lineGap: 2,
    });
    if (project.features?.length) {
      bulletList(doc, project.features);
    }
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Additional Projects");
  bulletList(
    doc,
    additionalProjects.slice(0, 8).map((p) => `${p.name} — ${p.description}`),
  );

  sectionTitle(doc, "Key Achievements");
  bulletList(doc, keyAchievements);

  sectionTitle(doc, "Education");
  for (const edu of education) {
    ensureSpace(doc, 30);
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111").text(edu.degree);
    doc.font("Helvetica").fontSize(10).fillColor("#374151").text(edu.school);
    doc.moveDown(0.2);
  }
}

function renderTemplate2(doc: any) {
  doc.font("Helvetica-Bold").fontSize(20).fillColor("#111111").text(person.name);
  doc.font("Helvetica").fontSize(10).fillColor("#374151").text(person.role);
  doc
    .moveDown(0.2)
    .fontSize(9)
    .text(`${person.phone} | ${person.email} | ${person.linkedinUrl}`, {
      lineGap: 2,
    })
    .text(person.location, { lineGap: 2 });

  doc.moveDown(0.3);
  doc
    .moveTo(doc.page.margins.left, doc.y)
    .lineTo(doc.page.width - doc.page.margins.right, doc.y)
    .lineWidth(0.75)
    .strokeColor("#111111")
    .stroke();

  sectionTitle(doc, "Summary");
  doc.font("Helvetica").fontSize(10).fillColor("#111111").text(professionalSummary, {
    lineGap: 2,
  });

  sectionTitle(doc, "Experience");
  for (const exp of experience) {
    ensureSpace(doc, 60);
    doc
      .font("Helvetica-Bold")
      .fontSize(11)
      .fillColor("#111111")
      .text(`${exp.company} — ${exp.title}`);
    doc.font("Helvetica").fontSize(10).fillColor("#374151").text(`${exp.start} – ${exp.end}`);
    bulletList(doc, exp.highlights);
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Skills Snapshot");
  const condensed: string[] = [];
  for (const [category, skills] of Object.entries(technicalSkills)) {
    condensed.push(`${category}: ${skills.slice(0, 8).join(", ")}`);
  }
  bulletList(doc, condensed);

  sectionTitle(doc, "Projects");
  ensureSpace(doc, 70);
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111").text(flagshipProject.name);
  doc.font("Helvetica").fontSize(10).fillColor("#111111").text(flagshipProject.description, {
    lineGap: 2,
  });
  doc.moveDown(0.2);
  bulletList(doc, flagshipProject.impact);

  for (const project of featuredProjects.slice(0, 2)) {
    ensureSpace(doc, 60);
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111").text(project.name);
    doc.font("Helvetica").fontSize(10).fillColor("#111111").text(project.description, {
      lineGap: 2,
    });
    if (project.tech?.length) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151").text(`Tech: ${project.tech.join(", ")}`);
    }
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Core Competencies");
  bulletList(doc, coreCompetencies);

  sectionTitle(doc, "Education");
  for (const edu of education) {
    ensureSpace(doc, 26);
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111").text(edu.degree);
    doc.font("Helvetica").fontSize(10).fillColor("#374151").text(edu.school);
  }
}

async function buildPdfBuffer(template: string) {
  const PDFDocument = require("pdfkit") as any;
  const doc = new PDFDocument({
    size: "A4",
    margin: 50,
    autoFirstPage: true,
  });

  const chunks: Buffer[] = [];

  return await new Promise<Buffer>((resolve, reject) => {
    doc.on("data", (chunk: Buffer) =>
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)),
    );
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", (err: unknown) => reject(err));

    if (template === "2") {
      renderTemplate2(doc);
    } else {
      renderTemplate1(doc);
    }

    doc.end();
  });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const template = url.searchParams.get("template") || "1";

  const pdfBuffer = await buildPdfBuffer(template);
  const filename = `${person.name.replaceAll(" ", "-")}-Resume-Template-${template}.pdf`;
  const body = new Uint8Array(pdfBuffer);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=\"${filename}\"`,
      "Cache-Control": "no-store",
    },
  });
}
