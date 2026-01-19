import React, { useState } from 'react';
import { Button, Card, Row, Col, Typography, Divider, Tag, Space, Spin, notification } from 'antd';
import {
  RocketOutlined,
  PlayCircleOutlined,
  CheckCircleOutlined,
  ArrowRightOutlined,
  LoadingOutlined
} from '@ant-design/icons';
import Login from './components/login';
import './App.css';

const { Title, Paragraph, Text } = Typography;

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [loadingButtons, setLoadingButtons] = useState({
    getStarted: false,
    watchDemo: false,
    login: false
  });
  const [fullPageLoading, setFullPageLoading] = useState(false);

  const features = [
    { icon: '📱', title: 'OFFLINE FIRST', desc: 'Works without internet', color: '#1E40AF' },
    { icon: '💊', title: 'PHARMACY MGMT', desc: 'Manage drugs & track expiry', color: '#059669' },
    { icon: '📊', title: 'REAL-TIME ANALYTICS', desc: 'Live reports & hospital KPIs', color: '#7C3AED' },
    { icon: '🏥', title: 'PATIENT MANAGEMENT', desc: 'Complete EMR with history', color: '#2563EB' },
    { icon: '💳', title: 'NHIS INTEGRATED', desc: 'Process claims in minutes', color: '#F59E0B' },
    { icon: '🔒', title: 'SECURE & NDPR', desc: 'NDPR compliant protection', color: '#DC2626' }
  ];

  const stats = [
    { value: '500+', label: 'Hospitals', icon: '🏥' },
    { value: '50K+', label: 'Patients', icon: '👥' },
    { value: '10K+', label: 'Doctors', icon: '👨‍⚕️' },
    { value: '99%', label: 'Satisfaction', icon: '⭐' }
  ];

  const handleButtonClick = (buttonName) => {
    setFullPageLoading(true);

    setTimeout(() => {
      setFullPageLoading(false);

      if (buttonName === 'login' || buttonName === 'getStarted') {
        setShowLogin(true);
      } else if (buttonName === 'watchDemo') {
        notification.success({
          message: 'Demo Starting',
          description: 'Opening demo video...',
          placement: 'topRight'
        });
      }
    }, 1500);
  };

  if (showLogin) {
    return <Login onClose={() => setShowLogin(false)} />;
  }

  return (
    <Spin
      spinning={fullPageLoading}
      tip="Please wait..."
      indicator={<LoadingOutlined style={{ fontSize: 36, color: '#1E40AF' }} spin />}
      size="large"
      style={{ minHeight: '100vh' }}
    >
      <div className="app">
        <header className="header">
          <div className="logo">
            <div className="logo-icon">🏥</div>
            <span className="logo-text">MEDMANAGE NIGERIA</span>
          </div>
          <nav className="nav">
            <button className="nav-link">HOME</button>
            <button className="nav-link">FEATURES</button>
            <button className="nav-link">CONTACT</button>
            <Button
              type="primary"
              size="small"
              onClick={() => handleButtonClick('login')}
            >
              LOGIN
            </Button>
          </nav>
        </header>

        <section className="hero" id="home">
          <Title level={1} className="hero-title">
            Modern Healthcare Management<br />
            for <span className="hero-highlight">Nigerian Hospitals</span>
          </Title>
          <Paragraph className="hero-subtitle">
            Streamline your hospital operations with our all-in-one<br />
            management system designed specifically for Nigeria's healthcare needs
          </Paragraph>
          <Space size="large" className="hero-buttons">
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => handleButtonClick('getStarted')}
            >
              GET STARTED
            </Button>
            <Button
              size="large"
              icon={<PlayCircleOutlined />}
              onClick={() => handleButtonClick('watchDemo')}
            >
              WATCH DEMO
            </Button>
          </Space>
        </section>

        <section className="stats-section">
          <Row gutter={[32, 32]} justify="center">
            {stats.map((stat, index) => (
              <Col xs={12} sm={6} key={index}>
                <Card bordered={false} className="stat-card" hoverable>
                  <div className="stat-value">
                    <span className="stat-icon">{stat.icon}</span>
                    <Text strong style={{ fontSize: '42px', color: '#1E40AF' }}>{stat.value}</Text>
                  </div>
                  <Text style={{ color: '#4B5563', fontSize: '16px' }}>{stat.label}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="features" id="features">
          <Title level={2} className="section-title">Built for Nigerian Healthcare</Title>
          <Paragraph className="section-subtitle">
            Everything you need to manage your hospital efficiently
          </Paragraph>
          <Row gutter={[24, 24]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={12} md={8} key={index}>
                <Card className="feature-card" hoverable>
                  <div className="feature-icon" style={{ color: feature.color, fontSize: '48px' }}>{feature.icon}</div>
                  <Title level={4} style={{ margin: '20px 0 10px' }}>{feature.title}</Title>
                  <Paragraph type="secondary">{feature.desc}</Paragraph>
                  <Button type="link" icon={<ArrowRightOutlined />} style={{ padding: 0, marginTop: '10px' }}>
                    Learn more
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section className="benefits">
          <Title level={2} className="section-title">Why Choose MedManage?</Title>
          <div className="benefits-grid">
            {[
              'Reduce patient wait time by 40%',
              'Cut billing errors by 90%',
              'NHIS claims processed in minutes',
              'Works on any device',
              '24/7 Nigerian support',
              'NDPR compliant security'
            ].map((benefit, index) => (
              <div key={index} className="benefit-item">
                <CheckCircleOutlined style={{ color: '#059669', fontSize: '20px', marginRight: '12px' }} />
                <Text strong style={{ fontSize: '16px' }}>{benefit}</Text>
              </div>
            ))}
          </div>
        </section>

        <section className="cta">
          <div className="cta-content">
            <Title level={2} style={{ color: 'white' }}>Ready to Transform Your Hospital?</Title>
            <Paragraph style={{ color: 'rgba(255,255,255,0.9)', fontSize: '18px' }}>
              Start your 30-day free trial. No credit card required.
            </Paragraph>
            <Button
              type="primary"
              size="large"
              icon={<RocketOutlined />}
              onClick={() => handleButtonClick('getStarted')}
              style={{
                background: 'white',
                color: '#1E40AF',
                border: 'none',
                height: '55px',
                padding: '0 40px',
                fontSize: '16px',
                fontWeight: '600',
                marginTop: '20px'
              }}
            >
              START FREE TRIAL
            </Button>
            <Paragraph className="cta-subtext">Small Clinic? Large Hospital? We have plans for everyone.</Paragraph>
          </div>
        </section>

        <footer className="footer" id="contact">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <div className="logo-icon" style={{ background: 'white', color: '#1E40AF' }}>🏥</div>
                <Title level={4} style={{ color: 'white', marginTop: '10px' }}>MEDMANAGE NIGERIA</Title>
              </div>
              <Paragraph style={{ color: '#9CA3AF' }}>
                Modern healthcare management system for Nigerian hospitals.
              </Paragraph>
              <div style={{ marginTop: '20px' }}>
                <Tag color="blue" style={{ marginRight: '8px', marginBottom: '8px' }}>PostgreSQL</Tag>
                <Tag color="green" style={{ marginRight: '8px', marginBottom: '8px' }}>React.js</Tag>
                <Tag color="purple" style={{ marginRight: '8px', marginBottom: '8px' }}>Node.js</Tag>
              </div>
            </div>
          </div>
          <Divider style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
          <Paragraph className="copyright">© 2024 MedManage Nigeria. All rights reserved.</Paragraph>
        </footer>
      </div>
    </Spin>
  );
}

export default App;