           module.exports = async (req, res) => {
             // 飞书握手验证逻辑
              if (req.body && req.body.type === 'url_verification') {
                return res.status(200).json({ challenge: req.body.challenge });
              }
              console.log("收到数据:", req.body);
              return res.status(200).json({ msg: "ok" });
            };
