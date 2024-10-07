
import { Spin } from "antd";
import styled from "styled-components";
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
export default function Loading() {
  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  )
}