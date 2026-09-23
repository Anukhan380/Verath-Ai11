const { getBody, supabaseWrite, checkAdmin, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  const { password, id, status } = await getBody(req);
  if (!checkAdmin(password)) { res.json({ error: 'Wrong password' }); return; }
  try {
    await supabaseWrite('PATCH', `/rest/v1/documents?id=eq.${encodeURIComponent(id)}`, { status });
    res.json({ success: true });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
