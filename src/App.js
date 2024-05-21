import './App.css';
import MyComponent from './MyComponent';

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fxssyslwcbucsbshilrr.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const name = 'seryeong';
// const name = 3;

const App = () => {
  console.log(supabaseKey);
  return (
    <>
      <MyComponent name={name}>리액트</MyComponent>
    </>
  );

}

export default App;
