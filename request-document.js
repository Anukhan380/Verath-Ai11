const { getBody, supabaseWrite, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const { type, description, name, phone, email, price } = await getBody(req);
    const id = 'DOC' + Date.now();
    await supabaseWrite('POST', '/rest/v1/documents', { id, type, description, name, phone, email: email || '', price, status: 'pending' });
    res.json({ success: true, id, message: `WhatsApp: ${process.env.WHATSAPP || '3129299666'} | Ref: ${id}` });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
