const { getBody, supabaseWrite, checkAdmin, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  const { password, lawyer } = await getBody(req);
  if (!checkAdmin(password)) { res.json({ error: 'Wrong password' }); return; }
  try {
    // Use upsert - insert or update if id exists
    const result = await supabaseWrite('POST', '/rest/v1/lawyers?on_conflict=id', lawyer);
    res.json({ success: true, result });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
