import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Row,
  Col,
  Space,
  Switch,
  Checkbox,
} from "antd";



const MediaMemberForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [broadcastedBefore, setBroadcastedBefore] = useState(false); // State for conditional field


  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
<div></div>
  );
};

export default MediaMemberForm;
