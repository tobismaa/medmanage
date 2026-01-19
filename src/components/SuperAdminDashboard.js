import React, { useState, useEffect } from 'react';
import {
  Layout, Menu, Card, Row, Col, Statistic, Table, Tag,
  Typography, Space, Button, Modal, Avatar, Timeline, Progress
} from 'antd';
import {
  DashboardOutlined,
  HospitalOutlined,
  UserOutlined,
  LineChartOutlined,
  AuditOutlined,
  TeamOutlined,
  DollarOutlined,
  CalendarOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import {
  getSystemOverview,
  getHospitals,
  getUsers,
  getActivities
} from '../services/api';
import './SuperAdminDashboard.css';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;
const { Column } = Table;

const SuperAdminDashboard = ({ onLogout }) => {
  const [overview, setOverview] = useState({});
  const [hospitals, setHospitals] = useState([]);
  const [users, setUsers] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [overviewData, hospitalsData, usersData, activitiesData] = await Promise.all([
        getSystemOverview(),
        getHospitals(),
        getUsers(),
        getActivities()
      ]);

      setOverview(overviewData);
      setHospitals(hospitalsData);
      setUsers(usersData);
      setActivities(activitiesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const hospitalColumns = [
    {
      title: 'Hospital Name',
      dataIndex: 'hospital_name',
      key: 'name',
    },
    {
      title: 'Code',
      dataIndex: 'hospital_code',
      key: 'code',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'status',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Staff',
      dataIndex: 'staff_count',
      key: 'staff',
    },
    {
      title: 'Patients',
      dataIndex: 'patient_count',
      key: 'patients',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: () => (
        <Space>
          <Button size="small">Edit</Button>
          <Button size="small" type="link">View</Button>
        </Space>
      ),
    },
  ];

  const userColumns = [
    {
      title: 'User',
      key: 'user',
      render: (_, record) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <div>
            <Text strong>{record.first_name} {record.last_name}</Text>
            <br />
            <Text type="secondary">{record.username}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={
          role === 'super_admin' ? 'purple' :
          role === 'hospital_admin' ? 'blue' :
          role === 'doctor' ? 'green' : 'orange'
        }>
          {role.replace('_', ' ').toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Hospital',
      dataIndex: 'hospital_name',
      key: 'hospital',
    },
    {
      title: 'Department',
      dataIndex: 'dept_name',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'is_active',
      key: 'status',
      render: (active) => (
        <Tag color={active ? 'green' : 'red'}>
          {active ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} className="admin-sidebar">
        <div className="sidebar-logo">
          <HospitalOutlined style={{ fontSize: '24px', color: '#1E40AF', marginRight: '10px' }} />
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>Super Admin</span>
        </div>

        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="hospitals" icon={<HospitalOutlined />}>
            Hospitals
          </Menu.Item>
          <Menu.Item key="users" icon={<TeamOutlined />}>
            Users
          </Menu.Item>
          <Menu.Item key="analytics" icon={<LineChartOutlined />}>
            Analytics
          </Menu.Item>
          <Menu.Item key="activities" icon={<AuditOutlined />}>
            Activities
          </Menu.Item>
          <Menu.Item key="billing" icon={<DollarOutlined />}>
            Billing
          </Menu.Item>
          <Menu.Item key="settings" icon={<CalendarOutlined />}>
            Settings
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header className="admin-header">
          <div style={{ flex: 1 }}>
            <Title level={4} style={{ color: '#fff', margin: 0 }}>
              Super Admin Dashboard
            </Title>
          </div>

          <Space>
            <Button icon={<LogoutOutlined />} onClick={onLogout}>
              Logout
            </Button>
          </Space>
        </Header>

        <Content style={{ margin: '20px' }}>
          {/* Overview Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
            <Col span={6}>
              <Card loading={loading}>
                <Statistic
                  title="Total Hospitals"
                  value={overview.totalHospitals || 0}
                  prefix={<HospitalOutlined />}
                  valueStyle={{ color: '#1E40AF' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading}>
                <Statistic
                  title="Active Users"
                  value={overview.totalUsers || 0}
                  prefix={<TeamOutlined />}
                  valueStyle={{ color: '#059669' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading}>
                <Statistic
                  title="Total Patients"
                  value={overview.totalPatients || 0}
                  prefix={<UserOutlined />}
                  valueStyle={{ color: '#7C3AED' }}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card loading={loading}>
                <Statistic
                  title="Pending Appointments"
                  value={overview.pendingAppointments || 0}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: '#F59E0B' }}
                />
              </Card>
            </Col>
          </Row>

          {/* Hospitals Table */}
          <Card
            title="Hospital Management"
            style={{ marginBottom: '20px' }}
            extra={<Button type="primary">Add Hospital</Button>}
          >
            <Table
              columns={hospitalColumns}
              dataSource={hospitals}
              rowKey="hospital_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>

          {/* Users Table */}
          <Card
            title="User Management"
            style={{ marginBottom: '20px' }}
            extra={<Button type="primary">Add User</Button>}
          >
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="user_id"
              loading={loading}
              pagination={{ pageSize: 5 }}
            />
          </Card>

          {/* Recent Activities */}
          <Card title="Recent Activities">
            <Timeline>
              {activities.slice(0, 5).map((activity, index) => (
                <Timeline.Item key={index} color={index === 0 ? 'green' : 'blue'}>
                  <Space direction="vertical" size={0}>
                    <Text strong>{activity.action}</Text>
                    <Text type="secondary">
                      {activity.username} • {new Date(activity.created_at).toLocaleString()}
                    </Text>
                  </Space>
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SuperAdminDashboard;