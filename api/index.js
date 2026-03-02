module.exports = async (req, res) => {
    const { type, challenge, event } = req.body; // 解构飞书的数据

    // 1. 处理飞书的首次握手验证 (保持你现有的逻辑)
    if (type === 'url_verification') {
        return res.status(200).json({ challenge: challenge });
    }

    // 2. 处理用户发来的消息 (新增逻辑)
    // 飞书的消息事件通常结构是 { header: {...}, event: { message: {...} } }
    // 你需要判断是否是 "im.message.receive_v1" (接收消息)
    if (req.body.header && req.body.header.event_type === 'im.message.receive_v1') {
        
        const messageContent = JSON.parse(event.message.content).text; // 获取用户发的内容
        const chatId = event.message.chat_id; // 获取对话ID，以便回复

        console.log("收到用户消息:", messageContent);

        // TODO: 这里调用 Manus 的 API
        // await callManusAPI(messageContent);
        
        // Vercel Serverless 有执行时间限制，建议先直接返回 200 给飞书，避免超时
        return res.status(200).json({ msg: "received" });
    }

    // 其他情况
    return res.status(200).json({ msg: "ok" });
};
