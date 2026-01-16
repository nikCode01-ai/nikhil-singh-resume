import PDFDocument from "pdfkit";
import { Document, Packer, Paragraph, TextRun } from "docx";

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

function ensureSpace(doc: any, neededHeight: number) {
  const bottomY = doc.page.height - doc.page.margins.bottom;
  if (doc.y + neededHeight > bottomY) {
    doc.addPage();
  }
}

function contentWidth(doc: any) {
  return doc.page.width - doc.page.margins.left - doc.page.margins.right;
}

function safeText(doc: any, text: string, options: Record<string, any> = {}) {
  const width = options.width ?? contentWidth(doc);
  const height = doc.heightOfString(text, { ...options, width });
  const paragraphGap = typeof options.paragraphGap === "number" ? options.paragraphGap : 0;

  ensureSpace(doc, height + paragraphGap + 4);
  doc.text(text, { ...options, width });
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
    const text = `- ${item}`;
    safeText(doc, text, {
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
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  safeText(doc, professionalSummary, { lineGap: 2 });

  sectionTitle(doc, "Core Competencies");
  bulletList(doc, coreCompetencies);

  sectionTitle(doc, "Technical Skills");
  for (const [category, skills] of Object.entries(technicalSkills)) {
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    safeText(doc, category);
    doc.font("Helvetica").fontSize(10).fillColor("#111111");
    safeText(doc, skills.join(", "), { lineGap: 2 });
    doc.moveDown(0.3);
  }

  sectionTitle(doc, "Experience");
  for (const exp of experience) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    safeText(doc, `${exp.title} — ${exp.company}`);
    doc.font("Helvetica").fontSize(10).fillColor("#374151");
    safeText(doc, `${exp.location} | ${exp.start} – ${exp.end}`);
    bulletList(doc, exp.highlights);
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Flagship Project");
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
  safeText(doc, flagshipProject.name);
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  safeText(doc, flagshipProject.description, { lineGap: 2 });
  doc.moveDown(0.3);
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  safeText(doc, `Architecture: ${flagshipProject.architecture}`, { lineGap: 2 });
  doc.moveDown(0.3);
  doc.font("Helvetica-Bold").fontSize(10).text("Supported Airlines");
  bulletList(doc, flagshipProject.supportedAirlines);
  doc.font("Helvetica-Bold").fontSize(10).text("Impact");
  bulletList(doc, flagshipProject.impact);

  sectionTitle(doc, "Featured Projects");
  for (const project of featuredProjects.slice(0, 2)) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    safeText(doc, project.name);
    if ("url" in project && project.url) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151");
      safeText(doc, project.url);
    }
    if ("date" in project && project.date) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151");
      safeText(doc, project.date);
    }
    doc.font("Helvetica").fontSize(10).fillColor("#111111");
    safeText(doc, project.description, { lineGap: 2 });
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
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    safeText(doc, edu.degree);
    doc.font("Helvetica").fontSize(10).fillColor("#374151");
    safeText(doc, edu.school);
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
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  safeText(doc, professionalSummary, { lineGap: 2 });

  sectionTitle(doc, "Experience");
  for (const exp of experience) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    safeText(doc, `${exp.company} — ${exp.title}`);
    doc.font("Helvetica").fontSize(10).fillColor("#374151");
    safeText(doc, `${exp.start} – ${exp.end}`);
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
  doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
  safeText(doc, flagshipProject.name);
  doc.font("Helvetica").fontSize(10).fillColor("#111111");
  safeText(doc, flagshipProject.description, { lineGap: 2 });
  doc.moveDown(0.2);
  bulletList(doc, flagshipProject.impact);

  for (const project of featuredProjects.slice(0, 2)) {
    doc.font("Helvetica-Bold").fontSize(11).fillColor("#111111");
    safeText(doc, project.name);
    doc.font("Helvetica").fontSize(10).fillColor("#111111");
    safeText(doc, project.description, { lineGap: 2 });
    if (project.tech?.length) {
      doc.font("Helvetica").fontSize(10).fillColor("#374151");
      safeText(doc, `Tech: ${project.tech.join(", ")}`);
    }
    doc.moveDown(0.2);
  }

  sectionTitle(doc, "Core Competencies");
  bulletList(doc, coreCompetencies);

  sectionTitle(doc, "Education");
  for (const edu of education) {
    doc.font("Helvetica-Bold").fontSize(10).fillColor("#111111");
    safeText(doc, edu.degree);
    doc.font("Helvetica").fontSize(10).fillColor("#374151");
    safeText(doc, edu.school);
  }
}

async function buildPdfBuffer(template: string) {
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

function heading(text: string) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true })],
    spacing: { before: 240, after: 120 },
  });
}

function normal(text: string) {
  return new Paragraph({
    children: [new TextRun({ text })],
    spacing: { after: 120 },
  });
}

function bullet(text: string) {
  return new Paragraph({
    children: [new TextRun({ text })],
    bullet: { level: 0 },
    spacing: { after: 60 },
  });
}

async function buildDocxBuffer(template: string) {
  const children: Paragraph[] = [];

  children.push(
    new Paragraph({
      children: [new TextRun({ text: person.name, bold: true })],
      spacing: { after: 120 },
    }),
  );

  children.push(normal(person.role));
  children.push(normal(`${person.location} | ${person.phone} | ${person.email}`));
  children.push(normal(person.linkedinUrl));

  if (template === "2") {
    children.push(heading("Summary"));
    children.push(normal(professionalSummary));

    children.push(heading("Experience"));
    for (const exp of experience) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${exp.company} — ${exp.title}`, bold: true })],
          spacing: { after: 60 },
        }),
      );
      children.push(normal(`${exp.start} – ${exp.end}`));
      for (const h of exp.highlights) children.push(bullet(h));
    }

    children.push(heading("Skills Snapshot"));
    for (const [category, skills] of Object.entries(technicalSkills)) {
      children.push(bullet(`${category}: ${skills.slice(0, 8).join(", ")}`));
    }

    children.push(heading("Projects"));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: flagshipProject.name, bold: true })],
        spacing: { after: 60 },
      }),
    );
    children.push(normal(flagshipProject.description));
    for (const i of flagshipProject.impact) children.push(bullet(i));

    for (const project of featuredProjects.slice(0, 2)) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: project.name, bold: true })],
          spacing: { before: 120, after: 60 },
        }),
      );
      if ("url" in project && project.url) children.push(normal(project.url));
      if ("date" in project && project.date) children.push(normal(project.date));
      children.push(normal(project.description));
      if (project.tech?.length) children.push(normal(`Tech: ${project.tech.join(", ")}`));
    }

    children.push(heading("Core Competencies"));
    for (const c of coreCompetencies) children.push(bullet(c));

    children.push(heading("Education"));
    for (const edu of education) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: edu.degree, bold: true })],
          spacing: { after: 60 },
        }),
      );
      children.push(normal(edu.school));
    }
  } else {
    children.push(heading("Professional Summary"));
    children.push(normal(professionalSummary));

    children.push(heading("Core Competencies"));
    for (const c of coreCompetencies) children.push(bullet(c));

    children.push(heading("Technical Skills"));
    for (const [category, skills] of Object.entries(technicalSkills)) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: category, bold: true })],
          spacing: { after: 60 },
        }),
      );
      children.push(normal(skills.join(", "))); 
    }

    children.push(heading("Experience"));
    for (const exp of experience) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: `${exp.title} — ${exp.company}`, bold: true })],
          spacing: { after: 60 },
        }),
      );
      children.push(normal(`${exp.location} | ${exp.start} – ${exp.end}`));
      for (const h of exp.highlights) children.push(bullet(h));
    }

    children.push(heading("Flagship Project"));
    children.push(
      new Paragraph({
        children: [new TextRun({ text: flagshipProject.name, bold: true })],
        spacing: { after: 60 },
      }),
    );
    children.push(normal(flagshipProject.description));
    children.push(normal(`Architecture: ${flagshipProject.architecture}`));
    children.push(heading("Supported Airlines"));
    for (const a of flagshipProject.supportedAirlines) children.push(bullet(a));
    children.push(heading("Impact"));
    for (const i of flagshipProject.impact) children.push(bullet(i));

    children.push(heading("Featured Projects"));
    for (const project of featuredProjects.slice(0, 2)) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: project.name, bold: true })],
          spacing: { before: 120, after: 60 },
        }),
      );
      if ("url" in project && project.url) children.push(normal(project.url));
      if ("date" in project && project.date) children.push(normal(project.date));
      children.push(normal(project.description));
      if (project.features?.length) {
        for (const f of project.features) children.push(bullet(f));
      }
    }

    children.push(heading("Additional Projects"));
    for (const p of additionalProjects.slice(0, 8)) children.push(bullet(`${p.name} — ${p.description}`));

    children.push(heading("Key Achievements"));
    for (const k of keyAchievements) children.push(bullet(k));

    children.push(heading("Education"));
    for (const edu of education) {
      children.push(
        new Paragraph({
          children: [new TextRun({ text: edu.degree, bold: true })],
          spacing: { after: 60 },
        }),
      );
      children.push(normal(edu.school));
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  return Packer.toBuffer(doc);
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const template = url.searchParams.get("template") || "1";
  const format = (url.searchParams.get("format") || "pdf").toLowerCase();
  const disposition = (url.searchParams.get("disposition") || "attachment").toLowerCase();

  const safeDisposition = disposition === "inline" ? "inline" : "attachment";

  if (format === "docx") {
    const docxBuffer = await buildDocxBuffer(template);
    const filename = `${person.name.replaceAll(" ", "-")}-Resume-Template-${template}.docx`;
    const body = new Uint8Array(docxBuffer);

    return new Response(body, {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `${safeDisposition}; filename=\"${filename}\"`,
        "Cache-Control": "no-store",
      },
    });
  }

  if (format !== "pdf") {
    return new Response("Invalid format", { status: 400 });
  }

  const pdfBuffer = await buildPdfBuffer(template);
  const filename = `${person.name.replaceAll(" ", "-")}-Resume-Template-${template}.pdf`;
  const body = new Uint8Array(pdfBuffer);

  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `${safeDisposition}; filename=\"${filename}\"`,
      "Cache-Control": "no-store",
    },
  });
}
