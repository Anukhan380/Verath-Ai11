const { supabaseGet, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const cat = req.query && req.query.cat;
    let path = '/rest/v1/lawyers?active=eq.true&select=name,city,phone,specialty,experience,plan';
    if (cat) path += `&specialty=cs.{${cat}}`;
    const lawyers = await supabaseGet(path);
    res.json(Array.isArray(lawyers) ? lawyers : []);
  } catch(e) { res.status(500).json({ error: e.message }); }
};
