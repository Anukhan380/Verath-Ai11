const { getBody, supabaseGet, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const { code } = await getBody(req);
    const lawyers = await supabaseGet(`/rest/v1/lawyers?access_code=eq.${encodeURIComponent(code)}&active=eq.true&select=id,name,city,specialty,plan`);
    if (lawyers && lawyers.length > 0) res.json({ success: true, lawyer: lawyers[0] });
    else res.json({ success: false, error: 'Invalid or inactive access code. Contact WakeelAI support.' });
  } catch(e) { res.status(500).json({ success: false, error: e.message }); }
};
