import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  console.log("Fetching from Supabase...");
  const { data, error } = await supabase.from('facts').select('*');

  if (error) {
    console.error("Supabase error:", error.message);
    return res.status(500).json({ error: error.message });
  }

  console.log("Supabase returned data:", data);
  res.status(200).json(data);
}
