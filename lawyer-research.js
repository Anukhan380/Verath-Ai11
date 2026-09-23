const { getBody, supabaseGet, groqRequest, cors } = require('./_helpers');
module.exports = async (req, res) => {
  cors(res);
  if (req.method === 'OPTIONS') { res.status(204).end(); return; }
  try {
    const { code, caseDetails } = await getBody(req);
    const lawyers = await supabaseGet(`/rest/v1/lawyers?access_code=eq.${encodeURIComponent(code)}&active=eq.true&plan=eq.premium&select=id,name`);
    if (!lawyers || lawyers.length === 0) { res.json({ error: 'Premium access required. Contact WakeelAI to upgrade.' }); return; }
    const sys = 'You are an expert Pakistani legal research assistant helping a practicing advocate prepare for court.\nProvide: Case Analysis, Relevant Laws, Legal Arguments, Counter-Arguments, Practical Advice.\nBe precise. Note: Verify all citations independently before use in court.';
    const text = await groqRequest(sys, [{ role: 'user', content: caseDetails }]);
    res.json({ content: [{ type: 'text', text }] });
  } catch(e) { res.status(500).json({ error: e.message }); }
};
