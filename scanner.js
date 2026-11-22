import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

window.scannerPurpose = 'add';

window.startScanner = async function (purpose = 'add') {
  window.scannerPurpose = purpose;

  try {
    const result = await BarcodeScanner.isGoogleBarcodeScannerModuleAvailable();

    if (!result.available) {
      await BarcodeScanner.installGoogleBarcodeScannerModule();
      alert('بدأ تنزيل قارئ الباركود. انتظر ثم أعد المسح.');
      return;
    }

    const scanResult = await BarcodeScanner.scan();

    if (scanResult.barcodes && scanResult.barcodes.length > 0) {
      const barcode = scanResult.barcodes[0].rawValue || '';
      window.handleScannedBarcode(barcode);
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
