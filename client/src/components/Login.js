import { Button, Modal, Form, Input } from 'antd';
import { useState } from 'react';

function Login({ onLogin }) {
    const [isLoginVisible, setLoginVisible] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState([]);
    function showLogin() {
        setLoginVisible(true)
    }
    function handleClose() {
        setLoginVisible(false)
    }
    function handleSubmit() {
        fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(loginInfo),
          }).then((r) => {
            setIsLoading(false);
            if (r.ok) {
              r.json().then((user) => onLogin(user));
            } else {
              r.json().then((err) => setErrors(err.errors));
            }
          });
    }
    function handleInputChange(e) {
        setLoginInfo({
            ...loginInfo, [e.target.name]:e.target.value
        })
        console.log(loginInfo)
    }
    return (
        <>
            <Button onClick={showLogin}>Sign In</Button>
            <Modal 
                title="User Login" 
                visible={isLoginVisible}
                onCancel={handleClose}
                onOk={handleClose}
                footer={null}
            >
                <Form
                    name="login"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    autoComplete="off"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Input name="username" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password name="password" onChange={handleInputChange} />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 10,
                        span: 16,
                        }}
                    >
                        <Button htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default Login