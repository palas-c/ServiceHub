import ServiceCard from "./ServiceCard";

function CategoryList({ categories = [], onSelect }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6">Popular Categories</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <ServiceCard
            key={category.name}
            service={{
              name: category.name,
              image: category.image,
              description: category.description,
            }}
            onView={() => onSelect && onSelect(category)}
          />
        ))}
      </div>
    </section>
  );
}

export default CategoryList;
