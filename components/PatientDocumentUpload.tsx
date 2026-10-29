import React, { useState } from 'react';
import { CheckCircle2, FileUp, Loader2 } from 'lucide-react';
import { uploadEnquiryDocument } from '../services/supabase.ts';

const PatientDocumentUpload: React.FC<{ leadId: string }> = ({ leadId }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!files.length) return setError('Select at least one document.');
    setUploading(true); setError('');
    for (const file of files) {
      const result = await uploadEnquiryDocument(leadId, file);
      if (result.error) { setError(`Could not upload ${file.name}. Please try again.`); setUploading(false); return; }
    }
    setUploading(false); setComplete(true);
  };

  return <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6"><section className="w-full max-w-xl bg-white rounded-[2rem] p-8 shadow-2xl"><div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center mb-5"><FileUp size={28} /></div><h1 className="text-2xl font-black text-slate-900">Upload medical documents</h1><p className="text-sm text-slate-500 mt-2">Upload reports, test results, X-rays, MRI/CT scans, prescriptions, or previous treatment records for your medical enquiry.</p>{complete ? <div className="mt-8 p-5 bg-emerald-50 text-emerald-700 rounded-2xl font-bold flex gap-3"><CheckCircle2 /> Documents received. Our clinical team will review them shortly.</div> : <><input className="mt-8 w-full border-2 border-dashed border-slate-200 rounded-2xl p-6 text-sm" type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.webp,.doc,.docx" onChange={(e) => setFiles(Array.from(e.target.files || []))} /><p className="text-xs text-slate-400 mt-2">{files.length ? `${files.length} file(s) selected` : 'You can select multiple files.'}</p>{error && <p className="text-sm text-rose-600 mt-4">{error}</p>}<button onClick={submit} disabled={uploading} className="mt-6 w-full py-4 rounded-2xl bg-teal-600 text-white font-black uppercase tracking-widest disabled:opacity-60">{uploading ? <><Loader2 className="inline mr-2 animate-spin" size={16} /> Uploading...</> : 'Submit documents'}</button></>}</section></main>;
};
export default PatientDocumentUpload;
