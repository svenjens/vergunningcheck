import styled from "styled-components";

export const HiddenDiv = styled.div`
  display: none;
  background: #eee;
  padding: 1em;

  @media print {
    display: none;
  }
`;

export const Title = styled.p`
  font-weight: bold;
  font-size: 1.2em;
`;
