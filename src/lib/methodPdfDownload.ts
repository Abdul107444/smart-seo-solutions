export const METHOD_PDF_URL = '/assets/aistudio/Fiverr_Gig_Rank_Method__1__6961771b.pdf';
export const METHOD_PDF_FILENAME = 'Fiverr_Gig_Rank_Method.pdf';

/**
 * Reliably downloads the official Fiverr Gig Rank Method PDF file
 * using a Blob object URL (with direct anchor fallback).
 */
export async function downloadOfficialMethodPdf(): Promise<boolean> {
  try {
    const response = await fetch(METHOD_PDF_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = METHOD_PDF_FILENAME;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 10000);

    return true;
  } catch (err) {
    console.warn('Blob PDF download fallback triggered:', err);
    try {
      const link = document.createElement('a');
      link.href = METHOD_PDF_URL;
      link.download = METHOD_PDF_FILENAME;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    } catch {
      return false;
    }
  }
}
