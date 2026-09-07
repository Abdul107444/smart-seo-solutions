import { jsPDF } from 'jspdf';

export function generateGigRankMethodPdf(): void {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  // -------------------------------------------------------------
  // PAGE 1
  // -------------------------------------------------------------
  
  // Outer decorative border
  doc.setDrawColor(220, 225, 235);
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

  // Top header banner
  doc.setFillColor(248, 249, 252);
  doc.rect(11, 11, pageWidth - 22, 22, 'F');
  
  doc.setTextColor(30, 27, 75); // Deep indigo
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Fiverr Gig Rank Method', pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('CONFIDENTIAL • 24-HOUR 1ST PAGE RANKING FORMULA • 100% WORKING', pageWidth / 2, 31, { align: 'center' });

  let y = 44;

  // Section Heading: Points:
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text('Points:', margin, y);
  y += 10;

  // POINT 1
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(217, 83, 30); // Vibrant orange
  doc.text('1.', margin, y);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(31, 41, 55);
  const point1Text = 'To rank your gig, extract an uncompetitive long-tail keyword in your niche (e.g. "Perfect squarespace expert"). Place this exact keyword into your Gig Title once.';
  const point1Lines = doc.splitTextToSize(point1Text, contentWidth - 8);
  doc.text(point1Lines, margin + 7, y);
  y += point1Lines.length * 5.2 + 3;

  doc.setFont('helvetica', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('(Apne sab sa pehla isa title ma use krna ha 1 bar is keyword ko)', margin + 7, y);
  y += 6;

  // Point 1 Example Box
  doc.setFillColor(243, 244, 246);
  doc.setDrawColor(209, 213, 219);
  doc.roundedRect(margin + 7, y, contentWidth - 7, 14, 2, 2, 'FD');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(75, 85, 99);
  doc.text('For Example:', margin + 11, y + 5);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(17, 24, 39);
  doc.text('I will be your perfect squarespace expert website developer', margin + 11, y + 10.5);
  y += 22;

  // POINT 2
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(217, 83, 30);
  doc.text('2.', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(31, 41, 55);
  const point2Text = 'After the title, add the exact long-tail keyword into your 5 backend search tags once.';
  const point2Lines = doc.splitTextToSize(point2Text, contentWidth - 8);
  doc.text(point2Lines, margin + 7, y);
  y += point2Lines.length * 5.2 + 4;

  // Point 2 Tags Display
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(107, 114, 128);
  doc.text('Related tags example:', margin + 7, y);
  y += 5;

  const tags = ['Squarespace website', 'Edit squarespace', 'Website redesign', 'Squarespace expert', 'Business website'];
  let tagX = margin + 7;
  tags.forEach((tag) => {
    const tagWidth = doc.getTextWidth(tag) + 6;
    if (tagX + tagWidth > pageWidth - margin) {
      tagX = margin + 7;
      y += 8;
    }
    doc.setFillColor(238, 242, 255);
    doc.setDrawColor(199, 210, 254);
    doc.roundedRect(tagX, y - 4, tagWidth, 6.5, 1.5, 1.5, 'FD');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(49, 46, 129);
    doc.text(tag, tagX + 3, y + 0.5);
    tagX += tagWidth + 3;
  });
  y += 15;

  // POINT 3
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(217, 83, 30);
  doc.text('3.', margin, y);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10.5);
  doc.setTextColor(31, 41, 55);
  doc.text('Next, place the exact same keyword in your Description exactly 3 times:', margin + 7, y);
  y += 6;

  // Sub-points for description
  const descSubPoints = [
    '1. In the opening introduction (Hook)',
    '2. In the middle section (Deliverables)',
    '3. In the closing call-to-action (End)',
  ];
  descSubPoints.forEach((sp) => {
    doc.setFillColor(254, 243, 199);
    doc.roundedRect(margin + 12, y - 3.5, 3, 3, 0.5, 0.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(55, 65, 81);
    doc.text(sp, margin + 18, y);
    y += 6;
  });
  y += 5;

  // POINT 4
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(217, 83, 30);
  doc.text('4.', margin, y);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(31, 41, 55);
  const point4Text = 'Use the exact same keyword phrase in your Gig Thumbnail as the main heading.';
  doc.text(point4Text, margin + 7, y);
  y += 6;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Fiverr OCR image bots scan thumbnail headings to verify relevance with search queries.', margin + 7, y);
  y += 12;

  // Bottom Notice
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y, contentWidth, 16, 2, 2, 'FD');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 101, 52);
  doc.text('PRO TIP FOR 24H INDEXING:', margin + 5, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(21, 128, 61);
  doc.text('Fiverr algorithm indexing bots scan these 4 specific spots to determine search intent and placement.', margin + 5, y + 11);

  // Footer Page 1
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text('Smart SEO Solutions • Page 1 of 2', pageWidth / 2, pageHeight - 14, { align: 'center' });

  // -------------------------------------------------------------
  // PAGE 2
  // -------------------------------------------------------------
  doc.addPage('a4', 'portrait');

  // Outer decorative border
  doc.setDrawColor(220, 225, 235);
  doc.setLineWidth(0.5);
  doc.roundedRect(10, 10, pageWidth - 20, pageHeight - 20, 3, 3);

  // Top header banner
  doc.setFillColor(248, 249, 252);
  doc.rect(11, 11, pageWidth - 22, 22, 'F');
  
  doc.setTextColor(30, 27, 75);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('Fiverr Gig Rank Method', pageWidth / 2, 25, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 116, 139);
  doc.text('SUMMARY & CRITICAL IMPLEMENTATION RULES', pageWidth / 2, 31, { align: 'center' });

  let y2 = 50;

  // SUMMARY SECTION
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(17, 24, 39);
  doc.text('Summary:', margin, y2);
  y2 += 10;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(31, 41, 55);
  const summaryText = 'Place your chosen keyword across all 4 key locations: Title, 5 Tags, Description (3 times), and Gig Image. This creates a 100% relevance score that forces Fiverr\'s indexing crawler to push your gig to page 1 within 24 hours.';
  const summaryLines = doc.splitTextToSize(summaryText, contentWidth);
  doc.text(summaryLines, margin, y2);
  y2 += summaryLines.length * 6 + 15;

  // CRITICAL NOTE SECTION
  doc.setFillColor(254, 242, 242); // Light red box
  doc.setDrawColor(252, 165, 165);
  doc.setLineWidth(0.8);
  doc.roundedRect(margin, y2, contentWidth, 34, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(185, 28, 28); // Deep red
  doc.text('Important Rule:', margin + 6, y2 + 10);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(185, 28, 28);
  const noteText = 'This method strictly applies to long-tail keywords (3 to 4 targeted words). Do not use on broad short-tail keywords where 200,000+ gigs compete.';
  const noteLines = doc.splitTextToSize(noteText, contentWidth - 12);
  doc.text(noteLines, margin + 6, y2 + 19);

  y2 += 50;

  // 4 Core Locations Table/Recap
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(17, 24, 39);
  doc.text('The 4 Core Placement Checks (Checklist):', margin, y2);
  y2 += 8;

  const checks = [
    { num: '01', title: 'Gig Title', rule: 'Place your exact long-tail keyword 1 time naturally' },
    { num: '02', title: 'Search Tags', rule: 'Include the primary long-tail keyword in the 5 tags' },
    { num: '03', title: 'Gig Description', rule: 'Add the keyword exactly 3 times: Start, Middle, and End' },
    { num: '04', title: 'Gig Thumbnail', rule: 'Write the exact keyword as the bold main heading on your image' },
  ];

  checks.forEach((item) => {
    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(229, 231, 235);
    doc.roundedRect(margin, y2, contentWidth, 14, 2, 2, 'FD');

    doc.setFillColor(234, 88, 12); // Orange pill
    doc.roundedRect(margin + 3, y2 + 3, 9, 8, 1.5, 1.5, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text(item.num, margin + 4.5, y2 + 8.5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text(item.title, margin + 16, y2 + 6.5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(107, 114, 128);
    doc.text(item.rule, margin + 16, y2 + 11);

    y2 += 17;
  });

  y2 += 12;

  // Closing Thanks
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(30, 27, 75);
  doc.text('Thanks!!', pageWidth / 2, y2, { align: 'center' });

  y2 += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Follow these points strictly to enjoy guaranteed 1st page ranking within 24 hours.', pageWidth / 2, y2, { align: 'center' });

  // Footer Page 2
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(156, 163, 175);
  doc.text('Smart SEO Solutions • Page 2 of 2 • WhatsApp Support: +92 306 0880466', pageWidth / 2, pageHeight - 14, { align: 'center' });

  // Trigger browser download
  doc.save('Fiverr_Gig_Rank_Method_Blueprint.pdf');
}
