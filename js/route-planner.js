// 路线规划API配置
const API_KEY = 'sk-ivrgvqelixmdlqqtrqgwwdpabqklugusuomewovuvjdwpayp';
const API_URL = 'https://cloud.siliconflow.cn/v1/chat/completions';

// 监听表单提交事件
document.getElementById('routePlannerForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // 获取用户输入
    const preference = document.getElementById('travelPreference').value;
    const duration = document.getElementById('duration').value;
    
    // 显示加载状态
    const resultDiv = document.getElementById('generatedRoute');
    resultDiv.innerHTML = '<p>正在生成个性化行程，请稍候...</p>';
    
    try {
        // 准备API请求数据
        const prompt = `作为一个旅游规划专家，请根据以下条件生成一个详细的旅游行程建议：\n- 旅行偏好：${preference}\n- 行程时长：${duration}\n请提供具体的时间安排、推荐景点、活动建议和注意事项。`;
        
        // 发送API请求
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
                messages: [
                    {role: 'user', content: prompt}
                ],
                temperature: 0.7,
                max_tokens: 1000
            })
        });
        
        const data = await response.json();
        
        // 处理API响应
        if (data.choices && data.choices[0]) {
            const generatedRoute = data.choices[0].message.content;
            // 将生成的行程格式化显示
            resultDiv.innerHTML = `
                <div class="generated-route-content">
                    <h4>为您定制的个性化行程</h4>
                    <div class="route-details">
                        ${generatedRoute.replace(/\n/g, '<br>')}
                    </div>
                </div>
            `;
        } else {
            throw new Error('未能生成有效的行程建议');
        }
    } catch (error) {
        console.error('生成行程时出错：', error);
        resultDiv.innerHTML = `<p class="error">抱歉，生成行程时遇到问题，请稍后重试。</p>`;
    }
}));