import { Layout, Menu} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { Routes, Route, Link } from "react-router-dom";
import CurrentTabs from './CurrentTabs';
import NewTab from './NewTab';
import CompletedTabs from './CompletedTabs';

const { Header, Content, Sider } = Layout;

function Dashboard({ setUser, user }) {
    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
          if (r.ok) {
            setUser(null);
          }
        })}
    return (
        <Layout className="box">
            <Header className="header" >
                <h1>Tab-Tab-Tab</h1>
            </Header>
            <Layout>
                <Sider width={250} id="sidebar">
                    <Menu
                    mode="inline"
                    >
                        <Menu.Item key={0} disabled icon={<SmileOutlined />}>Hello, {user.full_name}</Menu.Item>
                        <Menu.Item key={1}>
                            <Link to="/">
                                Current Tabs
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={2}>
                            <Link to="/new">
                                Start New Tab
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={3}>
                            <Link to="/archieves">
                                Completed Tabs
                            </Link>
                        </Menu.Item>
                        <Menu.Item key={4} onClick={handleLogoutClick}>Logout</Menu.Item>
                    </Menu>
                </Sider>
            <Layout>
                <Content id='content'>
                    <Routes>
                        <Route path="/" element={<CurrentTabs user={user} />}></Route>
                        <Route path="/new" element={<NewTab user={user} />}></Route>
                        <Route path="/archieves" element={<CompletedTabs />}></Route>
                    </Routes>
                </Content>
            </Layout>
            </Layout>
        </Layout>
    )
}

export default Dashboard