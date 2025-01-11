import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const Navbar = () => (
  <div className="bg-white shadow-md !font-bold p-4">
    <Menu
      mode="horizontal"
      defaultSelectedKeys={['1']}
      className="flex justify-center bg-white"
      style={{
        borderBottom: 'none', // Xóa viền mặc định của Menu
        fontSize: '28px',
        fontWeight: 'bold'
      }}
    >
      <Menu.Item
        key="1"
      >
        <Link to="/yearly">Theo năm</Link>
      </Menu.Item>
      <Menu.Item
        key="2"
      >
        <Link to="/monthly">Theo tháng</Link>
      </Menu.Item>
    </Menu>
  </div>
);

export default Navbar;
