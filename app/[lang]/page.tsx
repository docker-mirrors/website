import { queryDashboardImages } from '@/app/actions'
import { DataTable } from '@/components/DataTable'
import { columns } from '@/components/DataTable/columns'

export const runtime = 'edge';

export default async function Home() {
  const dashboardImages = await queryDashboardImages()

  return <DataTable data={dashboardImages ?? []} columns={columns} />
}
