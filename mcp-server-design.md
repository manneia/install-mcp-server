# MCP Server 设计文档

## 简介

为了简化 Qwen Code 用户安装和管理 MCP 插件的过程，我们计划开发一个 MCP Server。它能够自动发现、安装、启动和卸载各种 MCP 插件，并通过图形界面为用户提供便捷的操作方式。

---

## 核心功能

### 1. 插件仓库管理
- 支持从远程 Git 仓库或本地目录加载 MCP 插件列表。
- 插件元数据以标准格式描述：
  ```json
  {
    "name": "example-mcp",
    "version": "1.0.0",
    "description": "An example MCP plugin.",
    "url": "https://github.com/example/example-mcp.git"
  }
  ```

### 2. 插件安装与卸载
- 自动克隆或下载插件代码；
- 执行插件初始化脚本；
- 修改 Qwen Code 的 `settings.json`，添加或移除插件配置。

### 3. 插件生命周期管理
- 启动 / 停止插件服务；
- 查看插件运行状态。

### 4. 用户交互接口 (Web UI)
- 展示当前已安装的 MCP 插件列表；
- 提供“安装新插件”按钮；
- 弹出 JSON 编辑器供用户输入插件配置；
- 支持插件的卸载操作。

---

## 技术选型

| 功能模块        | 技术栈建议                     |
|----------------|--------------------------------|
| 后端服务        | Python + FastAPI               |
| 插件通信协议    | JSON-RPC / HTTP REST API       |
| 插件存储        | Git + Local Cache              |
| 配置文件操作    | Python `json` 模块             |
| 前端界面        | Vue 3 + Element Plus + Axios   |

---

## 项目结构

```
mcp-server/
├── mcp_server/
│   ├── __init__.py
│   ├── plugin_manager.py      # 插件管理核心逻辑
│   ├── config_handler.py      # settings.json 操作逻辑
│   └── api.py                 # FastAPI 接口定义
├── plugins/
│   └── registry.json          # 插件注册表
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── views/
│       ├── App.vue
│       └── main.js
├── main.py                    # 启动入口
└── README.md
```

---

## Web UI 功能细节

#### 已安装插件展示页
- 使用 Element Plus 的表格组件展示插件列表；
- 每一行显示插件名称、版本、描述和状态（运行中 / 已停止）；
- 提供“启动”、“停止”、“卸载”按钮，使用 Element Plus 的按钮组件。

#### 安装新插件流程
1. 点击“安装新插件”按钮；
2. 弹出 Element Plus 的模态框（Dialog）；
3. 模态框内嵌入一个 JSON 编辑器（如 vue-json-editor）；
4. 用户填写插件配置后点击提交；
5. 前端通过 Axios 发送 POST 请求到后端 `/plugins/install` 接口；
6. 后端处理安装逻辑并更新 `settings.json`；
7. 前端接收响应后刷新插件列表。

---

## 关键实现点

### plugin_manager.py
```python
def list_installed_plugins():
    # 返回当前 settings.json 中列出的所有插件
    pass

def install_plugin_from_json(config_json):
    # 根据用户输入的 JSON 配置安装插件
    pass

def uninstall_plugin(plugin_name):
    # 移除插件配置并清理资源
    pass
```

### config_handler.py
```python
def load_settings():
    # 加载 settings.json
    pass

def update_settings(new_plugins):
    # 将新插件写入 settings.json
    pass
```

### API 接口 (FastAPI)
```python
@app.get("/plugins")
def get_plugins():
    # 获取已安装插件列表
    pass

@app.post("/plugins/install")
def install_plugin(config: dict):
    # 安装插件
    pass

@app.post("/plugins/uninstall/{name}")
def uninstall_plugin(name: str):
    # 卸载插件
    pass
```

---

## 示例调用流程

1. 用户打开 Web UI，查看已安装插件列表；
2. 点击“安装新插件”，弹出 JSON 编辑器；
3. 用户填写插件配置并提交；
4. 后端接收到请求后：
   - 使用 `plugin_manager.install_plugin_from_json` 安装插件；
   - 更新 `settings.json`；
5. 插件安装完成，前端刷新列表显示新插件。

---

## 后续计划

- 实现基础插件管理逻辑；
- 开发 Web UI 并集成 JSON 编辑器；
- 测试多个典型插件的安装与卸载流程；
- 发布初版 MCP Server 工具。

---
本文档由 Qwen Code 自动生成，适用于 MCP Server v0.1.0 版本。