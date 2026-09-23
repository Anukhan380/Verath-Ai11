=============================================
  WakeelAI - Vercel + Supabase Setup
=============================================

STEP 1 - Setup Supabase Tables
--------------------------------
1. Go to supabase.com > your project
2. Click "SQL Editor" on left sidebar
3. Click "New Query"
4. Open supabase_setup.sql from this folder
5. Copy all content and paste into SQL Editor
6. Click "Run"
7. Tables are created!

STEP 2 - Deploy to Vercel
---------------------------
1. Go to github.com - create new repo "wakeelai"
2. Upload ALL files from this folder to GitHub
3. Go to vercel.com - sign up with GitHub
4. Click "New Project" > Import your repo
5. Click "Deploy"

STEP 3 - Add Environment Variables in Vercel
----------------------------------------------
In Vercel > your project > Settings > Environment Variables
Add these:

GROQ_API_KEY         = your groq key (from console.groq.com)
SUPABASE_URL         = https://tdstloaupsiobniebpgp.supabase.co
SUPABASE_ANON_KEY    = your supabase anon key
ADMIN_PASSWORD       = wakeel2024admin
WHATSAPP             = 3129299666

STEP 4 - Redeploy
------------------
After adding env variables:
Vercel > Deployments > click "..." > Redeploy

YOUR PAGES:
  / = Main app
  /admin = Admin panel
  /lawyer-portal = Lawyer portal
  /documents = Document requests

WHY THIS IS BETTER THAN RAILWAY:
  - Never goes down
  - Data saved in Supabase forever
  - Free forever
  - Auto deploys from GitHub
=============================================
