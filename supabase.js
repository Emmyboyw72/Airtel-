// supabase.js

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// 🔑 Your Supabase credentials
const supabaseUrl = "https://jjbxaoorxwomaudjrfwt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYnhhb29yeHdvbWF1ZGpyZnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM3OTE4ODQsImV4cCI6MjA2OTM2Nzg4NH0.6Diveibs1EBi-cFy_8medi9E-70mrx0lbwrwno_3HTA";

// 🚀 Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

//
// ✅ SIGN UP FUNCTION
//
export async function signUp(email, password) {
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });
  return { user, error };
}

//
// ✅ LOGIN FUNCTION
//
export async function logIn(email, password) {
  const { user, session, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { user, session, error };
}

//
// ✅ UPLOAD IMAGE / VIDEO TO 'user_upload' BUCKET
//
export async function uploadMedia(file, fileName) {
  // Adjust fileName if you want user-specific folders
  const path = `${Date.now()}_${fileName}`;

  const { data, error } = await supabase.storage
    .from('user_upload') // Bucket name
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) return { error };

  // Get public URL
  const { data: urlData } = supabase
    .storage
    .from('user_upload')
    .getPublicUrl(path);

  return { url: urlData.publicUrl };
}
