import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';
import { FileSharer } from '@capgo/capacitor-file-sharer';

// يحفظ الملفات مباشرة في مجلد Downloads العام ليظهر الملف في تطبيق «ملفاتي».
window.NativeFiles = {
  async saveFile(fileName, base64Data, mimeType) {
    return FileSharer.save({
      filename: fileName,
      contentType: mimeType || 'application/octet-stream',
      base64Data,
      android: {
        saveDirectory: 'downloads',
        relativePath: 'Download/Al-Rubaie Market'
      }
    });
  },
  // إبقاء المشاركة كخيار احتياطي للملفات عند الحاجة.
  async saveAndShare(fileName, base64Data, mimeType) {
    const saved = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Cache,
      recursive: true
    });
    return Share.share({
      title: fileName,
      text: 'ملف صادر من نظام جرد الربيعي ماركت',
      files: [saved.uri],
      dialogTitle: 'حفظ أو مشاركة الملف'
    });
  }
};
