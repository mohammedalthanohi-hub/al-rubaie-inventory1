
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

window.startScanner = async function () {
  try {
    const result = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (!result.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      alert('بدأ تنزيل وحدة قارئ الباركود. انتظر اكتمال التنزيل ثم اضغط مسح الباركود مرة أخرى.');
      return;
    }

    const scanResult = await BarcodeScanner.scan();

    if (scanResult.barcodes && scanResult.barcodes.length > 0) {
      const barcode = scanResult.barcodes[0].rawValue;

      document.getElementById('barcode').value = barcode || '';

      alert('تمت قراءة الباركود: ' + barcode);
    }
  } catch (error) {
    alert('تعذر تشغيل قارئ الباركود: ' + (error.message || error));
  }
};

window.stopScanner = async function () {
  try {
    await BarcodeScanner.stopScan();
  } catch (error) {
    console.log(error);
  }
};
  
