import BlogBanner from "../component/sections/blog/BlogBanner";
import BlogCta from "../component/sections/blog/BlogCta";
import GridBlog from "../component/sections/blog/GridBlog";

const Page = () => {
  return (
    <main className="flex-1">
      <BlogBanner />
      <GridBlog />
      <BlogCta />
    </main>
  );
};

export default Page;
