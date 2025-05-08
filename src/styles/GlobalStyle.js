import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    --margin-default: ${({ theme }) => theme.margins.desktop};

    @media (max-width: 858px) {
      --margin-default: ${({ theme }) => theme.margins.tablet};
    }

    @media (max-width: 430px) {
      --margin-default: ${({ theme }) => theme.margins.mobile};
    }
  }
`;