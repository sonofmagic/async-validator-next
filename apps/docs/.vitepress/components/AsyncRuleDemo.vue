<script setup lang="ts">
import Schema from 'async-validator-next'
import { reactive, ref } from 'vue'

const form = reactive({
  username: 'alice',
  email: 'demo@example.com',
})

const status = ref<'idle' | 'pass' | 'fail'>('idle')
const messages = ref<string[]>([])
const validating = ref(false)

const validator = new Schema({
  username: {
    type: 'string',
    required: true,
    asyncValidator: (_, value) =>
      new Promise<void>((resolve, reject) => {
        // 模拟后端校验：已占用的用户名为 `taken`
        setTimeout(() => {
          if (value === 'taken') {
            reject(new Error('用户名已被占用'))
          } else {
            resolve()
          }
        }, 500)
      }),
  },
  email: { type: 'email', required: true },
})

const validate = async () => {
  validating.value = true
  messages.value = []
  status.value = 'idle'

  try {
    await validator.validate({ ...form }, { firstFields: true })
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
        用户名（asyncValidator）
        <input v-model="form.username" type="text" placeholder="alice" />
      </label>
      <label>
        邮箱
        <input v-model="form.email" type="email" placeholder="demo@example.com" />
      </label>
    </div>
    <button :disabled="validating" @click="validate">
      {{ validating ? '异步校验中...' : '运行校验' }}
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
