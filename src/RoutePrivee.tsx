import { Outlet, Navigate } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { Row } from "react-bootstrap";

export const RoutePrivee = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <Row className="d-flex justify-content-center align-items-center mt-5">
        <h3>Loading ...</h3>
      </Row>
    );
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
