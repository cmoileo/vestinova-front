<template>
  <div class="m-auto max-md:w-1/2 w-64 mt-52">
    <AutoForm
      class="flex flex-col gap-8"
      :form="form"
      :schema="schema"
      :field-config="{
        password: {
          inputProps: {
            type: 'password',
            placeholder: '••••••••'
          },
        }
      }"
      @submit="onSubmit"
    >
      <Button class="w-full" type="submit">Login</Button>
    </AutoForm>
  </div>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {AutoForm} from "@/components/ui/auto-form";
import {Button} from "@/components/ui/button";
import {cookieManager} from "@/service/cookie.service";
import apiService from "@/service/api.service";
import router from "@/router";

const schema = z.object({
  email: z.string({required_error: 'Email is required'}).email(),
  password: z.string({
    required_error: 'Password is required.',
    })
    .min(8, {
      message: 'Password must be at least 8 characters.',
    })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter.',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter.',
    })
    .regex(/[0-9]/, {
      message: 'Password must contain at least one number.',
    })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character.',
    }),
})
const form = useForm({
  validationSchema: toTypedSchema(schema),
})

async function onSubmit(values: Record<string, any>) {
  try {
    const loggedUser = await apiService.login(values)
    if (!loggedUser) {
      throw new Error('Invalid credentials')
    }
    cookieManager.setCookie(loggedUser.token, 'token')
    await router.push({name: 'home'})
  } catch (error) {
    throw new Error('Invalid credentials')
  }
}

</script>
