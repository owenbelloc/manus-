module.exports = async (req, res) => {
    // 【关键修改】安全气囊：如果 req.body 是 undefined，就用空对象 {} 代替
    // 这样浏览器直接访问(GET)也不会报错了
    const body = req.body || {}; 

    // 1. 处理飞书握手验证 (POST请求)
    if (body.type === 'url_verification') {
        return res.status(200).json({ challenge: body.challenge });
    }

    // 2. 处理飞书消息 (POST请求)
    if (body.header && body.header.event_type === 'im.message.receive_v1') {
        console.log("收到消息:", body.event.message.content);
        return res.status(200).json({ msg: "received" });
    }

    // 3. 浏览器访问兜底 (GET请求)
    // 这样你在浏览器看到的就是 "server is running"，而不是 500 报错
    return res.status(200).json({ msg: "server is running", method: req.method });
};
