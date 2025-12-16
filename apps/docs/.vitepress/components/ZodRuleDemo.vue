<script setup lang="ts">
import Schema, { zodRule } from 'async-validator-next'
import { reactive, ref } from 'vue'
import { z } from 'zod'

const form = reactive({
  profile: {
    email: 'demo@example.com',
    age: 17,
  },
})

const messages = ref<string[]>([])
const status = ref<'idle' | 'pass' | 'fail'>('idle')
const validating = ref(false)

const userSchema = z.object({
  profile: z.object({
    email: z.string().email(),
    age: z.number().min(18),
  }),
})

const validator = new Schema({
  user: zodRule(userSchema, (issue, path) => `${path.join('.')}: ${issue.message}`),
})

const validate = async () => {
  validating.value = true
  messages.value = []
  status.value = 'idle'

  try {
    await validator.validate({ user: form })
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
        邮箱
        <input v-model="form.profile.email" type="email" />
      </label>
      <label>
        年龄（≥18）
        <input v-model.number="form.profile.age" type="number" min="0" />
      </label>
    </div>
    <button :disabled="validating" @click="validate">
      {{ validating ? '校验中...' : '用 Zod 校验' }}
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
