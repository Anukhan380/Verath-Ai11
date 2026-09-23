module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json({
    status: 'WakeelAI API is working!',
    groq_key_set: !!process.env.GROQ_API_KEY,
    supabase_url_set: !!process.env.SUPABASE_URL,
    supabase_key_set: !!process.env.SUPABASE_ANON_KEY,
    admin_password_set: !!process.env.ADMIN_PASSWORD
  });
};
