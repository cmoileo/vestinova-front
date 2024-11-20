<template>
  <div class="m-auto max-md:w-1/2 w-96 mt-52">
    <AutoForm
      class="flex flex-col gap-4"
      :form="form"
      :schema="schema"
      :field-config="{
        password: {
          inputProps: {
            type: 'password',
            placeholder: '••••••••'
          },
        },
        confirmPassword: {
          inputProps: {
            type: 'password',
            placeholder: '••••••••',
            required: true,
          },
        },
      }"
      @submit="onSubmit"
    >
      <Button class="w-full" type="submit">Register</Button>
    </AutoForm>
  </div>
</template>
<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import * as z from 'zod'
import {AutoForm} from "@/components/ui/auto-form";
import {Button} from "@/components/ui/button";
import apiService from "@/service/api.service";
import {cookieManager} from "@/service/cookie.service";
import router from "@/router";

const schema = z.object({
  firstName: z.string({required_error: 'First Name is required'}),
  lastName: z.string({required_error: 'Last Name is required'}),
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
    confirmPassword: z.string({
      required_error: 'Confirm Password is required.',
    }).refine(data => data.password === data.confirm, {
      message: 'Passwords must match.',
      path: ['confirm'],
    })
})
const form = useForm({
  validationSchema: toTypedSchema(schema),
})

async function onSubmit(values: Record<string, any>) {
  try {
    const data = {
      firstname: values.firstName,
      lastname: values.lastName,
      email: values.email,
      password: values.password,
    }
    const createdUser = await apiService.register(data)
    if (!createdUser.token) {
      throw new Error('User not created')
    }
    cookieManager.setCookie(createdUser.token, 'token')
    apiService.bearerToken = createdUser.token
    await router.push({name: 'home'})
  } catch (error) {
    console.error(error)
  }
}
</script>
