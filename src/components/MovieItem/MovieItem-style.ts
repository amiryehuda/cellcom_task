import styled from "styled-components";

export const MovieItemContainer = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  margin: 0 10px 20px;
  max-width: 12vw;
  min-width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const MovieImage = styled.img`
  min-width: 100%;
`;

export const MovieTitle = styled.h3`
  margin-top: 10px;
`;
