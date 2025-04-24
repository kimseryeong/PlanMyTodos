import Header from './components/Header';
import Contents from './components/Contents';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { SessionProvider } from './components/SessionProvider';


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const App = () => {

  return (
    <div className='App'>
      <RecoilRoot>
        <SessionProvider>
          <Header/>
          <Contents/>
        </SessionProvider>
      </RecoilRoot>
    </div>
  );

}

export default App;
