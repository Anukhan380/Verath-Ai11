const { getBody, supabaseGet, supabaseWrite, groqRequest, checkAdmin, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  const { password, id } = await getBody(req);
  if (!checkAdmin(password)) { res.json({ error: 'Wrong password' }); return; }
  try {
    const docs = await supabaseGet(`/rest/v1/documents?id=eq.${encodeURIComponent(id)}&select=*`);
    if (!docs || docs.length === 0) { res.json({ error: 'Document not found' }); return; }
    const doc = docs[0];
    const sys = 'You are an expert Pakistani legal document drafter. Write professional, complete, legally sound documents ready for use in Pakistan. Use proper formal format. Write in the language specified by the client.';
    const prompt = `Draft a ${doc.type} for:\n\n${doc.description}\n\nClient: ${doc.name}\n\nMake it complete and professional.`;
    const text = await groqRequest(sys, [{ role: 'user', content: prompt }]);
    await supabaseWrite('PATCH', `/rest/v1/documents?id=eq.${encodeURIComponent(id)}`, {
      document: text, status: 'completed', completed_at: new Date().toISOString()
    });
    res.json({ success: true, document: text, id });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
