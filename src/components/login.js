import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Row, Col, Spin, notification } from 'antd';
import {
  UserOutlined,
  LockOutlined,
  LoadingOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import './login.css';

const { Title, Text } = Typography;

const Login = ({ onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onFinish = async (values) => {
    setLoading(true);
    setError('');

    // Simulate API call with spinner
    setTimeout(() => {
      setLoading(false);

      // Simulate success
      notification.success({
        message: 'Login Successful!',
        description: 'Welcome to MedManage Dashboard',
        placement: 'topRight',
        duration: 2
      });

      // Store login
      localStorage.setItem('medmanage_token', 'demo-token');
      localStorage.setItem('medmanage_user', JSON.stringify({
        email: values.email,
        role: 'super_admin'
      }));

      // Redirect after delay
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);

    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Spin
        spinning={loading}
        tip="Authenticating..."
        indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        size="large"
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '400px',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(30, 64, 175, 0.2)',
            border: 'none'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div style={{
              fontSize: '48px',
              color: '#1E40AF',
              background: 'rgba(30, 64, 175, 0.1)',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              🏥
            </div>
            <Title level={3} style={{ margin: '0 0 10px', color: '#1E293B' }}>
              Welcome Back
            </Title>
            <Text type="secondary" style={{ display: 'block' }}>
              Sign in to your MedManage account
            </Text>
          </div>

          {error && (
            <Alert
              message="Login Error"
              description={error}
              type="error"
              showIcon
              closable
              style={{ marginBottom: '24px', borderRadius: '8px' }}
            />
          )}

          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            size="large"
            disabled={loading}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#94A3B8' }} />}
                placeholder="Email Address"
                autoComplete="email"
                style={{ borderRadius: '8px', height: '48px' }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
                { min: 6, message: 'Password must be at least 6 characters!' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined style={{ color: '#94A3B8' }} />}
                placeholder="Password"
                autoComplete="current-password"
                style={{ borderRadius: '8px', height: '48px' }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                style={{
                  background: 'linear-gradient(135deg, #1E40AF 0%, #1E3A8A 100%)',
                  border: 'none',
                  height: '50px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '10px'
                }}
              >
                {loading ? 'SIGNING IN...' : 'SIGN IN'}
              </Button>
            </Form.Item>
          </Form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              type="link"
              onClick={onClose}
              icon={<ArrowLeftOutlined />}
              style={{ color: '#64748B' }}
              disabled={loading}
            >
              Back to Homepage
            </Button>
          </div>

          <div style={{
            textAlign: 'center',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid #F1F5F9'
          }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              Demo Credentials: Use any email and password
            </Text>
            <div style={{ marginTop: '5px' }}>
              <Text type="secondary" style={{ fontSize: '12px' }}>
                Example: admin@medmanage.ng / password123
              </Text>
            </div>
          </div>
        </Card>
      </Spin>
    </div>
  );
};

export default Login;