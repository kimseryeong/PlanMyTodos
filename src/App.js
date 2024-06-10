import Layout from './components/layout/Layout';
import { RecoilRoot, RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const Main = () => {

  

  return (
    <>
      <RecoilRoot>
          <Layout/>
      </RecoilRoot>
    </>
  );

}

export default Main;
