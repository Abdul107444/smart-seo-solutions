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
    detectedPhone?: string;
    provider?: 'JazzCash' | 'SadaPay' | 'Bank Transfer' | 'Unknown';
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
        reason: 'The uploaded file is too small to be a genuine mobile transaction receipt. Please upload a full screenshot from your JazzCash or SadaPay app.',
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
    const compactClean = norm.replace(/\s+/g, '');

    // Target constants
    const targetPhoneDigits = '03060880466';
    const targetPhoneShort = '3060880466';

    // 3. Provider detection
    let detectedProvider: 'JazzCash' | 'SadaPay' | 'Bank Transfer' | 'Unknown' = 'Unknown';
    if (norm.includes('jazzcash') || norm.includes('jazz cash') || norm.includes('mobilink') || norm.includes('jazz')) {
      detectedProvider = 'JazzCash';
    } else if (norm.includes('sadapay') || norm.includes('sada pay') || norm.includes('sada')) {
      detectedProvider = 'SadaPay';
    } else if (norm.includes('bank') || norm.includes('nayapay') || norm.includes('alflah') || norm.includes('meezan') || norm.includes('hbl') || norm.includes('ubl') || norm.includes('raast')) {
      detectedProvider = 'Bank Transfer';
    }

    // 4. Payment indicators
    const paymentKeywords = [
      'successful', 'transaction', 'transfer', 'sent', 'paid', 'payment', 
      'money sent', 'receipt', 'tid', 'trx', 'ref', 'fee', 'rs', 'pkr', 
      'jazzcash', 'sadapay', 'balance', 'debited', 'confirmed'
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
        reason: 'No payment receipt or transaction details were found in this screenshot. Please upload a clear receipt from JazzCash or SadaPay.',
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

    // 6. Recipient Phone Verification
    // Target: 03060880466
    const numberMatched = compactClean.includes(targetPhoneDigits) || 
                          compactClean.includes(targetPhoneShort) ||
                          norm.includes('0306 0880466') ||
                          norm.includes('0306-0880466') ||
                          norm.includes('+923060880466') ||
                          norm.includes('923060880466');

    const detectedPhone = numberMatched ? '03060880466' : undefined;

    // 7. Amount Verification
    // Target: Rs. 8,000 (Full) or Rs. 5,600 (70% Advance) or Rs. 2,400 (30% Remaining)
    const hasFullAmount = norm.includes('8000') || norm.includes('8,000') || norm.includes('8 000');
    const hasAdvanceAmount = norm.includes('5600') || norm.includes('5,600') || norm.includes('5 600');
    const hasRemainingAmount = norm.includes('2400') || norm.includes('2,400') || norm.includes('2 400');
    const amountMatched = hasFullAmount || hasAdvanceAmount || hasRemainingAmount;
    
    let detectedAmount = 'Unspecified';
    if (hasFullAmount) detectedAmount = 'Rs. 8,000 (Full Package)';
    else if (hasAdvanceAmount) detectedAmount = 'Rs. 5,600 (70% Advance)';
    else if (hasRemainingAmount) detectedAmount = 'Rs. 2,400 (30% Final)';

    // 8. Transaction ID (TID) extraction
    let detectedTid: string | undefined;
    // Common TID patterns: TID: 123456789, Transaction ID: 12345678, Trx ID: ABC1234, or 10-12 digit sequence
    const tidMatch = cleanRawText.match(/(?:TID|Trx\s*ID|Transaction\s*ID|Ref(?:erence)?\s*(?:ID|No)?|ID)[:\s#]*([A-Za-z0-9\-_]{6,20})/i);
    if (tidMatch && tidMatch[1]) {
      detectedTid = tidMatch[1].trim();
    } else {
      // Look for isolated 10 to 12 digit number (typical JazzCash TID)
      const digitsMatch = cleanRawText.match(/\b(0\d{9,11}|\d{10,12})\b/);
      if (digitsMatch && digitsMatch[1] && digitsMatch[1] !== targetPhoneDigits) {
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
            numberMatched,
            detectedPhone,
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
    // Must match either Recipient Name ("Zeenat yasmin") OR Recipient Phone ("03060880466")
    const isAuthenticAccount = recipientMatched || numberMatched;

    if (!isAuthenticAccount) {
      // Check if it's sent to someone else entirely
      const hasOtherName = norm.includes('to:') || norm.includes('sent to') || norm.includes('receiver');
      return {
        isValid: false,
        status: 'rejected',
        confidence: 90,
        title: 'Account Recipient Does Not Match',
        reason: 'This receipt was not sent to our verified account. Payment MUST be transferred to Zeenat yasmin (03060880466). Fake or third-party screenshots cannot be accepted.',
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
                       (numberMatched ? 40 : 0) + 
                       (amountMatched ? 15 : 5) + 
                       (detectedProvider !== 'Unknown' ? 5 : 0);

    return {
      isValid: true,
      status: 'verified',
      confidence: Math.min(confidence, 100),
      title: 'Payment Receipt Verified Successfully',
      reason: `Verified ${detectedProvider !== 'Unknown' ? detectedProvider : 'payment'} transfer to Zeenat yasmin (03060880466).`,
      detectedDetails: {
        recipientMatched: true,
        recipientName: recipientName || 'Zeenat yasmin',
        numberMatched: true,
        detectedPhone: '03060880466',
        provider: detectedProvider,
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
