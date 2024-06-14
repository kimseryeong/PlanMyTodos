import Layout from './components/layout/Layout';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();


RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const App = () => {

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
          
          <Layout/>
      </RecoilRoot>
    </QueryClientProvider>
    </>
  );

}

export default App;
