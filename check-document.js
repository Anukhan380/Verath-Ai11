const { getBody, supabaseGet, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const { id, phone } = await getBody(req);
    const docs = await supabaseGet(`/rest/v1/documents?id=eq.${encodeURIComponent(id)}&phone=eq.${encodeURIComponent(phone)}&select=*`);
    if (!docs || docs.length === 0) { res.json({ error: 'Not found. Check your document ID and phone number.' }); return; }
    const doc = docs[0];
    if (doc.status === 'completed') res.json({ status: 'completed', document: doc.document, type: doc.type });
    else res.json({ status: doc.status, message: 'Your document is being prepared. You will be notified on WhatsApp.' });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
