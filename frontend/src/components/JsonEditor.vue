<script setup lang="ts">
import { ref, watch } from 'vue'
import { JSONEditor } from '@json-editor/json-editor'

// 定义props
const props = defineProps<{
  modelValue: object
  schema: object
}>()

// 定义emits
const emit = defineEmits<{
  (e: 'update:modelValue', value: object): void
}>()

// 编辑器引用
const editorRef = ref<HTMLElement | null>(null)
let editor: any = null

// 初始化编辑器
const initEditor = () => {
  if (editorRef.value) {
    // 销毁现有编辑器
    if (editor) {
      editor.destroy()
    }
    
    // 创建新的编辑器实例
    editor = new JSONEditor(editorRef.value, {
      schema: props.schema,
      startval: props.modelValue,
      theme: 'bootstrap4',
      disable_collapse: true,
      disable_edit_json: true,
      disable_properties: true,
      no_additional_properties: true
    })
    
    // 监听变化
    editor.on('change', () => {
      const value = editor.getValue()
      emit('update:modelValue', value)
    })
  }
}

// 监听schema变化
watch(() => props.schema, () => {
  initEditor()
}, { deep: true })

// 监听modelValue变化
watch(() => props.modelValue, (newValue) => {
  if (editor) {
    editor.setValue(newValue)
  }
}, { deep: true })

// 组件挂载后初始化编辑器
onMounted(() => {
  initEditor()
})

// 组件卸载前销毁编辑器
onUnmounted(() => {
  if (editor) {
    editor.destroy()
  }
})
</script>

<template>
  <div ref="editorRef" class="json-editor"></div>
</template>

<style scoped>
.json-editor {
  min-height: 300px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 10px;
}
</style>