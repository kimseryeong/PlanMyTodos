import Header from './components/Header';
import Contents from './components/Contents';
import { RecoilRoot, RecoilEnv } from 'recoil';
import Layout from './components/Layout';


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const App = () => {

  return (
    <div className='App'>
      <RecoilRoot>
        <Layout />
      </RecoilRoot>
    </div>
  );

}

export default App;
