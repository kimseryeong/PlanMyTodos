import Layout from './components/layout/Layout';
import { supabase } from './lib/supabaseClient';


const Main = () => {
  console.log(supabase);
  return (
    <>
      <Layout />
    </>
  );

}

export default Main;
