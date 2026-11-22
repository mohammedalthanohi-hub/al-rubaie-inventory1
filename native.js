import { Filesystem, Directory } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

// يحفظ الملف مؤقتاً في مساحة التطبيق ثم يفتح قائمة المشاركة الأصلية في أندرويد.
window.NativeFiles = {
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
