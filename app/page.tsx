import HomeView from "@/components/HomeView";
import { getProjects } from "@/lib/sanity/queries";

export default async function Home() {
  const projects = await getProjects();

  return <HomeView projects={projects} />;
}
