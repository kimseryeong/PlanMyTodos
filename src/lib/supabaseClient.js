import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxssyslwcbucsbshilrr.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const client = createClient(supabaseUrl, supabaseKey);

export { client as supabase };