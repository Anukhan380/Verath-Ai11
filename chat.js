const { getBody, groqRequest, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const { system, messages } = await getBody(req);
    const text = await groqRequest(system, messages);
    res.json({ content: [{ type: 'text', text }] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
