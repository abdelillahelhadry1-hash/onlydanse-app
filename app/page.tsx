import HorizontalScroller from "./components/HorizontalScroller";
import FeaturedEventCard from "./components/FeaturedEventCard";
import FeaturedInstructorCard from "./components/FeaturedInstructorCard";
import FeaturedStudioCard from "./components/FeaturedStudioCard";
import FeaturedProductCard from "./components/FeaturedProductCard";
import FeaturedBlogCard from "./components/FeaturedBlogCard";

async function getEvents(city: string) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/events?city=${city}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function HomePage() {
  // For now, hardcode; later: use IP-based city
  const city = "Toronto";
  const events = await getEvents(city);

  // Temporary mock data for other rails
  const instructors = [
    { id: "i1", name: "Test Instructor" },
    { id: "i2", name: "Another Instructor" },
  ];

  const studios = [
    { id: "s1", name: "Downtown Dance Studio" },
    { id: "s2", name: "Urban Moves Studio" },
  ];

  const products = [
    { id: "p1", name: "Latin Dance Shoes" },
    { id: "p2", name: "Practice Wear Set" },
  ];

  const posts = [
    { slug: "how-to-choose-your-dance-style", title: "How to Choose Your Dance Style", excerpt: "A quick guide to finding your groove." },
    { slug: "5-festivals-you-cant-miss", title: "5 Festivals You Can’t Miss", excerpt: "From Europe to Latin America, here’s where to go." },
  ];

  return (
    <div className="pb-10">
      <HorizontalScroller
        title={`Trending events near you`}
        seeAllHref="/events"
      >
        {events.map((event: any) => (
          <FeaturedEventCard key={event.id} event={event} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title={`Popular dance styles in your city`}
        seeAllHref="/classes"
      >
        <div className="min-w-[200px] bg-white rounded-xl shadow p-4">Salsa</div>
        <div className="min-w-[200px] bg-white rounded-xl shadow p-4">Bachata</div>
        <div className="min-w-[200px] bg-white rounded-xl shadow p-4">Kizomba</div>
      </HorizontalScroller>

      <HorizontalScroller
        title={`Upcoming festivals this month`}
        seeAllHref="/festivals"
      >
        {events.slice(0, 5).map((event: any) => (
          <FeaturedEventCard key={event.id} event={event} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Top instructors in your region"
        seeAllHref="/instructors"
      >
        {instructors.map((instructor) => (
          <FeaturedInstructorCard
            key={instructor.id}
            instructor={instructor}
          />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Studios you might like"
        seeAllHref="/studios"
      >
        {studios.map((studio) => (
          <FeaturedStudioCard key={studio.id} studio={studio} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Events similar to your search history"
        seeAllHref="/events"
      >
        {events.slice(0, 5).map((event: any) => (
          <FeaturedEventCard key={event.id} event={event} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Trending dancing gear"
        seeAllHref="/shop"
      >
        {products.map((product) => (
          <FeaturedProductCard key={product.id} product={product} />
        ))}
      </HorizontalScroller>

      <HorizontalScroller
        title="Handpicked blog posts"
        seeAllHref="/blog"
      >
        {posts.map((post) => (
          <FeaturedBlogCard key={post.slug} post={post} />
        ))}
      </HorizontalScroller>
    </div>
  );
}
