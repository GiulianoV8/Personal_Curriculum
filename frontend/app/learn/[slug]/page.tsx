import { LessonPageContent } from "@/components/LessonPageContent";
import { linearAlgebraLessons } from "@/lib/linearAlgebraLessons";

export function generateStaticParams() {
  return linearAlgebraLessons.map((lesson) => ({ slug: lesson.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  return <LessonPageContent slug={slug} />;
}
