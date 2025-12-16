<script setup lang="ts">
import Schema from 'async-validator-next'
import { reactive, ref } from 'vue'

const form = reactive({
  name: '小明',
  age: 16,
})

const messages = ref<string[]>([])
const status = ref<'idle' | 'pass' | 'fail'>('idle')
const validator = new Schema({
  name: { type: 'string', required: true, min: 2 },
  age: { type: 'number', required: true, min: 18 },
})

const validating = ref(false)

const validate = async () => {
  validating.value = true
  messages.value = []
  status.value = 'idle'

  try {
    await validator.validate({ ...form })
    status.value = 'pass'
  } catch (error) {
    const list = (error as any)?.errors ?? []
    messages.value = list.map((item: any) => item?.message).filter(Boolean)
    status.value = 'fail'
  } finally {
    validating.value = false
  }
}
</script>

<template>
  <div class="demo-card">
    <div class="demo-row">
      <label>
        姓名（≥2 字）
        <input v-model="form.name" type="text" placeholder="请输入姓名" />
      </label>
      <label>
        年龄（≥18）
        <input v-model.number="form.age" type="number" min="0" />
      </label>
    </div>
    <button :disabled="validating" @click="validate">
      {{ validating ? '校验中...' : '运行校验' }}
    </button>
    <p v-if="status === 'pass'" class="demo-pass">校验通过 ✅</p>
    <p v-else-if="status === 'fail'" class="demo-fail">校验未通过</p>
    <ul v-if="messages.length">
      <li v-for="msg in messages" :key="msg">{{ msg }}</li>
    </ul>
  </div>
</template>

<style scoped>
.demo-card {
  display: grid;
  gap: 12px;
  padding: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
}

.demo-row {
  display: grid;
  gap: 12px;
}

label {
  display: grid;
  gap: 6px;
  font-weight: 500;
}

input {
  padding: 8px;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

button {
  width: fit-content;
  padding: 8px 12px;
  color: var(--vp-c-brand);
  cursor: pointer;
  background: transparent;
  border: 1px solid var(--vp-c-brand);
  border-radius: 8px;
}

.demo-pass {
  color: var(--vp-c-green-3);
}

.demo-fail {
  color: var(--vp-c-red-3);
}
</style>
