import AdminLayout from '@/layouts/AuthLayout/AuthLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/darshboard')({
  component: AdminLayout,
})
