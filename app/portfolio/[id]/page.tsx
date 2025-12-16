import ProjectDetail from '@/components/pages/Portfolio/ProjectDetail'

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetail projectId={params.id} />
}



