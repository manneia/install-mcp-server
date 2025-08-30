<script setup lang="ts">
import { ref, onMounted } from 'vue'
import JsonEditor from '../components/JsonEditor.vue'

// 插件数据模型
interface Plugin {
  name: string
  version: string
  description: string
  status: 'running' | 'stopped'
}

// 插件列表
const plugins = ref<Plugin[]>([])

// 控制模态框显示
const dialogVisible = ref(false)

// JSON Schema for plugin configuration
const pluginSchema = {
  type: 'object',
  title: 'Plugin Configuration',
  properties: {
    name: {
      type: 'string',
      description: '插件名称'
    },
    version: {
      type: 'string',
      description: '插件版本'
    },
    description: {
      type: 'string',
      description: '插件描述'
    },
    url: {
      type: 'string',
      description: 'Git仓库URL'
    }
  }
}

// 新插件配置
const newPluginConfig = ref({
  name: '',
  version: '',
  description: '',
  url: ''
})

// 获取插件列表
const fetchPlugins = async () => {
  try {
    // 这里应该调用后端API获取插件列表
    // 暂时使用模拟数据
    plugins.value = [
      {
        name: 'example-mcp',
        version: '1.0.0',
        description: 'An example MCP plugin.',
        status: 'running'
      }
    ]
  } catch (error) {
    console.error('Failed to fetch plugins:', error)
  }
}

// 安装新插件
const installPlugin = async () => {
  try {
    // 这里应该调用后端API安装插件
    console.log('Installing plugin:', newPluginConfig.value)
    // 重置表单并关闭模态框
    newPluginConfig.value = {
      name: '',
      version: '',
      description: '',
      url: ''
    }
    dialogVisible.value = false
    // 重新获取插件列表
    await fetchPlugins()
  } catch (error) {
    console.error('Failed to install plugin:', error)
  }
}

// 启动插件
const startPlugin = (name: string) => {
  console.log('Starting plugin:', name)
  // 这里应该调用后端API启动插件
}

// 停止插件
const stopPlugin = (name: string) => {
  console.log('Stopping plugin:', name)
  // 这里应该调用后端API停止插件
}

// 卸载插件
const uninstallPlugin = (name: string) => {
  console.log('Uninstalling plugin:', name)
  // 这里应该调用后端API卸载插件
}

// 组件挂载时获取插件列表
onMounted(() => {
  fetchPlugins()
})
</script>

<template>
  <div class="plugin-manager">
    <h1>MCP Server Plugin Manager</h1>
    <p>管理您的 MCP 插件</p>
    
    <!-- 插件列表 -->
    <el-table :data="plugins" style="width: 100%" border>
      <el-table-column prop="name" label="插件名称" width="180"></el-table-column>
      <el-table-column prop="version" label="版本" width="120"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'running' ? 'success' : 'danger'">
            {{ scope.row.status === 'running' ? '运行中' : '已停止' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button 
            size="small" 
            type="primary" 
            @click="startPlugin(scope.row.name)"
            :disabled="scope.row.status === 'running'"
          >
            启动
          </el-button>
          <el-button 
            size="small" 
            type="warning" 
            @click="stopPlugin(scope.row.name)"
            :disabled="scope.row.status === 'stopped'"
          >
            停止
          </el-button>
          <el-button 
            size="small" 
            type="danger" 
            @click="uninstallPlugin(scope.row.name)"
          >
            卸载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <!-- 安装新插件按钮 -->
    <div style="margin-top: 20px;">
      <el-button type="primary" @click="dialogVisible = true">安装新插件</el-button>
    </div>
    
    <!-- 安装插件对话框 -->
    <el-dialog v-model="dialogVisible" title="安装新插件" width="600px">
      <JsonEditor 
        v-model="newPluginConfig" 
        :schema="pluginSchema" 
        style="height: 400px;"
      />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="installPlugin">安装</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.plugin-manager {
  padding: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>