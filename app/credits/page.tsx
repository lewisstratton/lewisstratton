import CreditsView from "@/components/CreditsView";
import { getProjects } from "@/lib/sanity/queries";

export default async function CreditsPage() {
  const projects = await getProjects();

  return <CreditsView projects={projects} />;
}
