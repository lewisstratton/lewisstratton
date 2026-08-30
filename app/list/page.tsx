import ListView from "@/components/ListView";
import { getProjects } from "@/lib/sanity/queries";

export default async function ListPage() {
  const projects = await getProjects();

  return <ListView projects={projects} />;
}
