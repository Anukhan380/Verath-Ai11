const { getBody, supabaseGet, checkAdmin, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  const { password } = await getBody(req);
  if (!checkAdmin(password)) { res.json({ error: 'Wrong password' }); return; }
  try {
    const [lawyers, documents] = await Promise.all([
      supabaseGet('/rest/v1/lawyers?select=*&order=created_at.desc'),
      supabaseGet('/rest/v1/documents?select=*&order=created_at.desc')
    ]);
    res.json({
      lawyers: Array.isArray(lawyers) ? lawyers : [],
      documents: Array.isArray(documents) ? documents : [],
      admin: { whatsapp: process.env.WHATSAPP || '3129299666', jazzcash: process.env.JAZZCASH || '3129299666' }
    });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
