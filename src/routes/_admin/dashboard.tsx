import { createFileRoute } from '@tanstack/react-router'
import AdminLayout from '@/layouts/AuthLayout/AuthLayout'
import { AdminDashboard } from '@/features/admin-dashboard/AdminDashboard'

export const Route = createFileRoute('/_admin/dashboard')({
  component: DashboardPage,
})

function DashboardPage() {
  return (
    <AdminLayout>
      <AdminDashboard />
    </AdminLayout>
  )
}