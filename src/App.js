import Header from './components/Header';
import Contents from './components/Contents';
import { RecoilRoot, RecoilEnv } from 'recoil';


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const App = () => {

  return (
    <div className='App'>
      <RecoilRoot>
          <Header/>
          <Contents/>
      </RecoilRoot>
    </div>
  );

}

export default App;
