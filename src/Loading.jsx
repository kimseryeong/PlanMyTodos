import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';

const LoadingStyle = styled.div`
    text-align: center;
`;

export default function Loading ({loading}) {
    return (
        <LoadingStyle>
            <ClipLoader color={"#ddd"} loading={loading} size={50} />
        </LoadingStyle>
    )
}