import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import Input from "@components/common/Form/Input";
import useLogin from "@hooks/useLogin";
import { Navigate } from "react-router-dom";

const Login = () => {
  const {
    error,
    loading,
    accessToken,
    formErrors,
    register,
    handleSubmit,
    submitForm,
  } = useLogin();

  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(submitForm)}>
            <Input
              name="email"
              label="Email Address"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              register={register}
              error={formErrors.password?.message}
            />
            <Button variant="info" type="submit" style={{ color: "white" }}>
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner> Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>

            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
