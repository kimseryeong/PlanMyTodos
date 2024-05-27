import Layout from './components/layout/Layout';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxssyslwcbucsbshilrr.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Main = () => {
  return (
    <>
      <Layout />
    </>
  );

}

export default Main;
