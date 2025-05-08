import Header from './components/Header';
import Contents from './components/Contents';
import { RecoilRoot, RecoilEnv } from 'recoil';
import { SessionProvider } from './components/SessionProvider';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyle } from "./styles/GlobalStyle";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

const App = () => {

  return (
    <div className='App'>
      <RecoilRoot>
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Header/>
            <Contents/>
          </ThemeProvider>
        </SessionProvider>
      </RecoilRoot>
    </div>
  );

}

export default App;
