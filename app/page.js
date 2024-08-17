"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card, FloatingLabel, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(true);  // State to track whether it's login or sign in
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please enter username and password");
      return;
    }

    try {
      const url = "http://localhost/noteapp/login.php";
      const jsonData = { username, password };
      
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log("Login response:", res.data);

      if (res.data === 0) {
        toast.error("Invalid username or password");	
      } else {
        toast.success("Login successful");
        localStorage.setItem("user", res.data.user_id);

        // Redirect to the dashboard for all users
        setTimeout(() => router.push("/appnote"), 500);
      }
    } catch (error) {
      if (error.response) {
        console.log("Response error:", error.response.data);
        toast.error(`Error: ${error.response.data}`);
      } else if (error.request) {
        console.log("Request error:", error.request);
        toast.error("No response from server");
      } else {
        console.log("General error:", error.message);
        toast.error(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("url")) {
      localStorage.setItem("url", "http://localhost/noteapp/");
    }
  }, []);

  const handleSwap = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Container
      fluid
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Row className="w-100">
        {isSignIn ? (
          <Col
            md={5}
            className="d-flex align-items-center justify-content-end p-0"
          >
            <Card
              className="w-100"
              style={{
                maxWidth: '400px',
                height: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.5s ease',
              }}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center h-100">
                <h2 className="text-center mb-4" style={{ color: '#343a40' }}>
                  Login
                </h2>
                <Form style={{ width: '100%' }} onSubmit={handleLogin}>
                  <FloatingLabel label="Username" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                      style={{ borderRadius: '5px' }}
                    />
                  </FloatingLabel>

                  <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                      style={{ borderRadius: '5px' }}
                    />
                  </FloatingLabel>

                  <Button type="submit" className="w-100 mb-3">
                    Login
                  </Button>
                </Form>

                <Button
                  variant="link"
                  onClick={handleSwap}
                  className="w-100 text-center mt-3"
                >
                  Sign In
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ) : (
          <Col
            md={7}
            className="d-flex align-items-center justify-content-start p-0"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
            >
              <Image
                src="/images/hugot_realizations.png"
                alt="Hugot Realizations"
                layout="fill"
                objectFit="cover"
                style={{
                  filter: 'brightness(0.7) contrast(1.2)',
                  borderRadius: '10px',
                }}
              />
            </div>
          </Col>
        )}

        {isSignIn ? (
          <Col
            md={7}
            className="d-flex align-items-center justify-content-start p-0"
          >
            <div
              style={{
                position: 'relative',
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                borderRadius: '10px',
              }}
            >
              <Image
                src="/images/hugot_realizations.png"
                alt="Hugot Realizations"
                layout="fill"
                objectFit="cover"
                style={{
                  filter: 'brightness(0.7) contrast(1.2)',
                  borderRadius: '10px',
                }}
              />
            </div>
          </Col>
        ) : (
          <Col
            md={5}
            className="d-flex align-items-center justify-content-end p-0"
          >
            <Card
              className="w-100"
              style={{
                maxWidth: '400px',
                height: '400px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.5s ease',
              }}
            >
              <Card.Body className="d-flex flex-column align-items-center justify-content-center h-100">
                <h2 className="text-center mb-4" style={{ color: '#343a40' }}>
                  Sign In
                </h2>
                <Form style={{ width: '100%' }} onSubmit={handleLogin}>
                  <FloatingLabel label="Username" className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                      style={{ borderRadius: '5px' }}
                    />
                  </FloatingLabel>

                  <FloatingLabel label="Password" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleLogin(e)}
                      style={{ borderRadius: '5px' }}
                    />
                  </FloatingLabel>

                  <Button type="submit" className="w-100 mb-3">
                    Sign In
                  </Button>
                </Form>

                <Button
                  variant="link"
                  onClick={handleSwap}
                  className="w-100 text-center mt-3"
                >
                  Login
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default AuthPage;
