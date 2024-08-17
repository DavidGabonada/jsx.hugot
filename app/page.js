"use client";
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { Card, FloatingLabel, Form, Container, Row, Col, Button } from 'react-bootstrap';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'sonner';
import styles from './AuthPage.module.css';

function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState(""); // Added state for verify password
  const [isSignIn, setIsSignIn] = useState(true);

  const router = useRouter();

  const handleAuth = async (e) => {
    e.preventDefault();

    if (!username || !password || (!isSignIn && !verifyPassword)) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!isSignIn && password !== verifyPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const url = isSignIn ? "http://localhost/noteapp/login.php" : "http://localhost/noteapp/signup.php";
      const jsonData = { username, password };
      
      const formData = new FormData();
      formData.append("json", JSON.stringify(jsonData));

      const res = await axios.post(url, formData);
      console.log(`${isSignIn ? "Login" : "Sign Up"} response:`, res.data);

      if (res.data.error) {
        toast.error(res.data.error);
      } else {
        toast.success(isSignIn ? "Login successful" : "Sign up successful");
        if (isSignIn) {
          localStorage.setItem("user", res.data.user_id);
          setTimeout(() => router.push("/dashboard"), 500);
        } else {
          setIsSignIn(true); // Switch to sign-in after successful sign-up
        }
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
    <Container fluid className={styles.container}>
      <Row className={`${styles.row} ${isSignIn ? styles.login : styles.signIn}`}>
        <Col md={5} className={`${styles.col} ${styles.formCol} ${isSignIn ? styles.showForm : styles.hideForm}`}>
          <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
              <h2 className={styles.title}>{isSignIn ? "Login" : "Sign Up"}</h2>
              <Form style={{ width: '100%' }} onSubmit={handleAuth}>
                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth(e)}
                    style={{ borderRadius: '5px' }}
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAuth(e)}
                    style={{ borderRadius: '5px' }}
                  />
                </FloatingLabel>

                {!isSignIn && (
                  <FloatingLabel label="Verify Password" className="mb-3">
                    <Form.Control
                      type="password"
                      placeholder="Verify Password"
                      value={verifyPassword}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAuth(e)}
                      style={{ borderRadius: '5px' }}
                    />
                  </FloatingLabel>
                )}

                <Button type="submit" className="w-100 mb-3">
                  {isSignIn ? "Login" : "Sign Up"}
                </Button>
              </Form>

              <Button
                variant="link"
                onClick={handleSwap}
                className="w-100 text-center mt-3"
              >
                {isSignIn ? "Sign Up" : "Login"}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={7} className={`${styles.col} ${styles.imageCol} ${isSignIn ? styles.showImage : styles.hideImage}`}>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/hugot_realizations.png"
              alt="Hugot Realizations"
              layout="fill"
              objectFit="cover"
              className={styles.image}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthPage;
