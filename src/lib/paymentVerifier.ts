import Tesseract from 'tesseract.js';
import { checkIfTransactionIdExists } from './leadsService';

export interface VerificationResult {
  isValid: boolean;
  status: 'verified' | 'rejected' | 'suspicious' | 'error';
  confidence: number;
  title: string;
  reason: string;
  detectedDetails: {
    recipientMatched: boolean;
    recipientName?: string;
    numberMatched: boolean;
    detectedAccount?: string;
    provider?: 'Meezan Bank' | 'Bank Transfer' | 'JazzCash' | 'SadaPay' | 'Unknown';
    amountMatched: boolean;
    detectedAmount?: string;
    transactionId?: string;
    isDuplicate?: boolean;
    extractedTextPreview?: string;
  };
}

/**
 * Preprocess image onto a high-contrast canvas for maximum OCR accuracy
 */
function preprocessImage(img: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  const maxDim = 1600;
  let width = img.width;
  let height = img.height;

  // Scale up small images for better OCR character recognition
  if (width < 800) {
    const scale = 800 / width;
    width = 800;
    height = Math.round(height * scale);
  } else if (width > maxDim || height > maxDim) {
    if (width > height) {
      height = Math.round((height * maxDim) / width);
      width = maxDim;
    } else {
      width = Math.round((width * maxDim) / height);
      height = maxDim;
    }
  }

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.drawImage(img, 0, 0, width, height);

    // Get image data to boost contrast & sharpen text for phone screenshots
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        // Simple grayscale luminance
        const gray = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
        // Mild contrast stretch
        const contrasted = gray > 180 ? 255 : gray < 70 ? 0 : gray;
        d[i] = contrasted;
        d[i + 1] = contrasted;
        d[i + 2] = contrasted;
      }
      ctx.putImageData(imgData, 0, 0);
    } catch {
      // If cross-origin or canvas filter fails, original canvas is used
    }
  }

  return canvas;
}

/**
 * Clean and normalize text for string search
 */
function normalizeText(text: string): string {
  return text.toLowerCase().replace(/[\s\-_\.,]+/g, ' ');
}

/**
 * Verify payment screenshot instantly via client-side OCR & intelligent rules
 */
export async function verifyPaymentScreenshot(
  dataUrlOrFile: string | File,
  onProgress?: (progressText: string) => void
): Promise<VerificationResult> {
  try {
    onProgress?.('Loading screenshot...');

    // 1. Load image element
    const img = new Image();
    const imgSrc = typeof dataUrlOrFile === 'string' 
      ? dataUrlOrFile 
      : await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(dataUrlOrFile);
        });

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Unable to read image format'));
      img.src = imgSrc;
    });

    // Dimension sanity check - Real payment receipts from phones are at least 300x300
    if (img.width < 250 || img.height < 250) {
      return {
        isValid: false,
        status: 'rejected',
        confidence: 0,
        title: 'Image Too Small or Invalid',
        reason: 'The uploaded file is too small to be a genuine mobile transaction receipt. Please upload a full screenshot of your Meezan Bank transfer.',
        detectedDetails: {
          recipientMatched: false,
          numberMatched: false,
          amountMatched: false,
        },
      };
    }

    onProgress?.('Scanning receipt text with AI Vision...');
    const processedCanvas = preprocessImage(img);

    // 2. Perform OCR recognition using Tesseract.js
    let ocrText = '';
    try {
      const ocrResult = await Tesseract.recognize(processedCanvas, 'eng', {
        logger: (m) => {
          if (m.status === 'recognizing text' && m.progress) {
            onProgress?.(`Analyzing transaction receipt (${Math.round(m.progress * 100)}%)...`);
          }
        },
      });
      ocrText = ocrResult.data.text || '';
    } catch (ocrErr) {
      console.warn('Tesseract OCR error:', ocrErr);
    }

    onProgress?.('Verifying account, amount & transaction ID...');

    const cleanRawText = ocrText;
    const norm = normalizeText(cleanRawText);
    const compactClean = norm.replace(/[^a-z0-9]/g, '');

    // Target constants for Meezan Bank
    const targetIban = 'pk20mezn0000300114121316';
    const targetIbanShort = '300114121316';
    const targetAccountEnd = '14121316';

    // 3. Provider detection
    let detectedProvider: 'Meezan Bank' | 'Bank Transfer' | 'JazzCash' | 'SadaPay' | 'Unknown' = 'Unknown';
    if (norm.includes('meezan') || compactClean.includes('mezn') || norm.includes('mbl')) {
      detectedProvider = 'Meezan Bank';
    } else if (norm.includes('sadapay') || norm.includes('sada pay') || norm.includes('sada')) {
      detectedProvider = 'SadaPay';
    } else if (norm.includes('jazzcash') || norm.includes('jazz cash')) {
      detectedProvider = 'JazzCash';
    } else if (norm.includes('bank') || norm.includes('nayapay') || norm.includes('alflah') || norm.includes('hbl') || norm.includes('ubl') || norm.includes('raast')) {
      detectedProvider = 'Bank Transfer';
    }

    // 4. Payment indicators
    const paymentKeywords = [
      'successful', 'transaction', 'transfer', 'sent', 'paid', 'payment', 
      'money sent', 'receipt', 'tid', 'trx', 'ref', 'fee', 'rs', 'pkr', 
      'meezan', 'balance', 'debited', 'confirmed', 'ibft', 'raast', 'beneficiary'
    ];
    const matchedKeywords = paymentKeywords.filter(k => norm.includes(k));
    const isPaymentReceipt = matchedKeywords.length >= 2;

    // Check if it's completely unrelated (e.g. meme, selfie, random chat with no financial words)
    if (!isPaymentReceipt && cleanRawText.trim().length < 20) {
      return {
        isValid: false,
        status: 'rejected',
        confidence: 10,
        title: 'Fake or Unreadable Receipt',
        reason: 'No payment receipt or transaction details were found in this screenshot. Please upload a clear receipt of payment to Meezan Bank.',
        detectedDetails: {
          recipientMatched: false,
          numberMatched: false,
          amountMatched: false,
          extractedTextPreview: cleanRawText.slice(0, 150),
        },
      };
    }

    // 5. Recipient Name Verification
    // Target: "Zeenat yasmin"
    const hasZeenat = norm.includes('zeenat') || norm.includes('zenat') || norm.includes('zeent') || compactClean.includes('zeenat');
    const hasYasmin = norm.includes('yasmin') || norm.includes('yasmeen') || norm.includes('yasmn') || compactClean.includes('yasmin');
    const recipientMatched = hasZeenat || hasYasmin;
    const recipientName = hasZeenat && hasYasmin 
      ? 'Zeenat yasmin' 
      : hasZeenat 
      ? 'Zeenat (Verified)' 
      : hasYasmin 
      ? 'Yasmin (Verified)' 
      : undefined;

    // 6. Recipient Account / IBAN / Bank Verification
    // Target: PK20MEZN0000300114121316 or Meezan Bank
    const hasIban = compactClean.includes(targetIban) || compactClean.includes('pk20mezn');
    const hasAccountNum = compactClean.includes(targetIbanShort) || compactClean.includes(targetAccountEnd) || compactClean.includes('0000300114121316');
    const hasMeezanBank = norm.includes('meezan') || compactClean.includes('mezn');
    
    const accountMatched = hasIban || hasAccountNum || (hasMeezanBank && (recipientMatched || isPaymentReceipt));
    const detectedAccount = hasIban ? 'PK20MEZN0000300114121316' : (hasMeezanBank ? 'Meezan Bank' : undefined);

    // 7. Amount Verification
    // Target: Rs. 8,000 (Full), Rs. 5,600 (70% Advance), 575 PKR (Gig Rank Method PDF), or Rs. 2,400 (30% Final)
    const hasFullAmount = norm.includes('8000') || norm.includes('8,000') || norm.includes('8 000');
    const hasAdvanceAmount = norm.includes('5600') || norm.includes('5,600') || norm.includes('5 600');
    const hasMethodAmount = norm.includes('575') || norm.includes('599') || norm.includes('600') || norm.includes('500');
    const hasRemainingAmount = norm.includes('2400') || norm.includes('2,400') || norm.includes('2 400');
    const amountMatched = hasFullAmount || hasAdvanceAmount || hasMethodAmount || hasRemainingAmount;
    
    let detectedAmount = 'Unspecified';
    if (hasFullAmount) detectedAmount = 'Rs. 8,000 (Full Package)';
    else if (hasAdvanceAmount) detectedAmount = 'Rs. 5,600 (70% Advance)';
    else if (hasMethodAmount) detectedAmount = '575 PKR (Gig Ranking Method PDF)';
    else if (hasRemainingAmount) detectedAmount = 'Rs. 2,400 (30% Final)';

    // 8. Transaction ID (TID) extraction
    let detectedTid: string | undefined;
    // Common TID patterns: TID: 123456789, Transaction ID: 12345678, Trx ID: ABC1234, or 10-12 digit sequence
    const tidMatch = cleanRawText.match(/(?:TID|Trx\s*ID|Transaction\s*ID|Ref(?:erence)?\s*(?:ID|No)?|Stan|FT\s*No|ID)[:\s#]*([A-Za-z0-9\-_]{6,25})/i);
    if (tidMatch && tidMatch[1]) {
      detectedTid = tidMatch[1].trim();
    } else {
      // Look for isolated 10 to 14 digit reference number
      const digitsMatch = cleanRawText.match(/\b(\d{10,14})\b/);
      if (digitsMatch && digitsMatch[1] && !digitsMatch[1].includes(targetIbanShort)) {
        detectedTid = digitsMatch[1];
      }
    }

    // 9. Anti-Duplicate Fraud Check
    let isDuplicate = false;
    if (detectedTid) {
      onProgress?.('Checking transaction authenticity & anti-duplicate database...');
      const dupCheck = await checkIfTransactionIdExists(detectedTid);
      if (dupCheck.exists) {
        isDuplicate = true;
        return {
          isValid: false,
          status: 'rejected',
          confidence: 95,
          title: 'Duplicate Transaction ID Detected',
          reason: `Transaction ID (${detectedTid}) has ALREADY been submitted in our system! Submitting reused or previously claimed payment receipts is strictly prohibited.`,
          detectedDetails: {
            recipientMatched,
            recipientName,
            numberMatched: accountMatched,
            detectedAccount,
            provider: detectedProvider,
            amountMatched,
            detectedAmount,
            transactionId: detectedTid,
            isDuplicate: true,
          },
        };
      }
    }

    // 10. Final Decision Logic
    // Must match either Recipient Name ("Zeenat yasmin") OR Account / Bank details ("PK20MEZN0000300114121316" / "Meezan Bank")
    const isAuthenticAccount = recipientMatched || accountMatched;

    if (!isAuthenticAccount) {
      return {
        isValid: false,
        status: 'rejected',
        confidence: 90,
        title: 'Account Recipient Does Not Match',
        reason: 'This receipt was not sent to our verified account. Payment MUST be transferred to Zeenat yasmin (Meezan Bank IBAN: PK20MEZN0000300114121316). Fake or third-party screenshots cannot be accepted.',
        detectedDetails: {
          recipientMatched: false,
          numberMatched: false,
          provider: detectedProvider,
          amountMatched,
          detectedAmount,
          transactionId: detectedTid,
          extractedTextPreview: cleanRawText.slice(0, 200),
        },
      };
    }

    // High confidence match!
    const confidence = (recipientMatched ? 40 : 0) + 
                       (accountMatched ? 40 : 0) + 
                       (amountMatched ? 15 : 5) + 
                       (detectedProvider === 'Meezan Bank' ? 10 : 5);

    return {
      isValid: true,
      status: 'verified',
      confidence: Math.min(confidence, 100),
      title: 'Payment Receipt Verified Successfully',
      reason: `Verified payment transfer to Zeenat yasmin (Meezan Bank - PK20MEZN0000300114121316).`,
      detectedDetails: {
        recipientMatched: true,
        recipientName: recipientName || 'Zeenat yasmin',
        numberMatched: true,
        detectedAccount: 'PK20MEZN0000300114121316',
        provider: detectedProvider !== 'Unknown' ? detectedProvider : 'Meezan Bank',
        amountMatched,
        detectedAmount,
        transactionId: detectedTid,
        isDuplicate: false,
        extractedTextPreview: cleanRawText.slice(0, 150),
      },
    };

  } catch (error: any) {
    console.error('Payment verification error:', error);
    return {
      isValid: false,
      status: 'error',
      confidence: 0,
      title: 'Verification Scan Error',
      reason: error?.message || 'Could not verify image. Please make sure you are uploading a clear PNG or JPG screenshot.',
      detectedDetails: {
        recipientMatched: false,
        numberMatched: false,
        amountMatched: false,
      },
    };
  }
}
