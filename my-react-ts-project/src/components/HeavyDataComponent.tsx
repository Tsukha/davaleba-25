import React, {
  useState,
  useDeferredValue,
  useTransition,
  useMemo,
} from "react";

interface DataItem {
  id: number;
  name: string;
  category: string;
  description: string;
  value: number;
}

// Simulate heavy data generation
const generateHeavyData = (): DataItem[] => {
  const categories = [
    "Technology",
    "Science",
    "Business",
    "Health",
    "Education",
  ];
  const data: DataItem[] = [];

  for (let i = 1; i <= 5000; i++) {
    data.push({
      id: i,
      name: `Item ${i}`,
      category: categories[Math.floor(Math.random() * categories.length)],
      description: `This is a detailed description for item ${i} with lots of content to simulate heavy rendering.`,
      value: Math.floor(Math.random() * 1000),
    });
  }

  return data;
};

const HeavyDataComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isPending, startTransition] = useTransition();

  // Use deferred value for search term to avoid blocking UI
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const deferredCategory = useDeferredValue(selectedCategory);

  // Generate heavy data (simulating expensive operation)
  const heavyData = useMemo(() => generateHeavyData(), []);

  // Filter data based on deferred values
  const filteredData = useMemo(() => {
    return heavyData.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(deferredSearchTerm.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(deferredSearchTerm.toLowerCase());
      const matchesCategory =
        !deferredCategory || item.category === deferredCategory;
      return matchesSearch && matchesCategory;
    });
  }, [heavyData, deferredSearchTerm, deferredCategory]);

  const categories = [
    "",
    "Technology",
    "Science",
    "Business",
    "Health",
    "Education",
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    startTransition(() => {
      setSearchTerm(e.target.value);
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    startTransition(() => {
      setSelectedCategory(e.target.value);
    });
  };

  return (
    <div className="heavy-component">
      <div className="heavy-component-header">
        <h3>Heavy Data Component ({heavyData.length} items)</h3>
        <p>Using Transitions and Deferred Values for smooth filtering</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          <label htmlFor="search">Search:</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search items..."
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category || "All Categories"}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isPending && <div className="pending-indicator">Filtering...</div>}

      <div className="data-grid">
        <div className="results-count">
          Showing {filteredData.length} of {heavyData.length} items
        </div>

        <div className="data-items">
          {filteredData.slice(0, 100).map((item) => (
            <div key={item.id} className="data-item">
              <div className="item-header">
                <span className="item-name">{item.name}</span>
                <span className="item-category">{item.category}</span>
              </div>
              <div className="item-description">{item.description}</div>
              <div className="item-value">Value: {item.value}</div>
            </div>
          ))}
          {filteredData.length > 100 && (
            <div className="load-more">
              ... and {filteredData.length - 100} more items
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeavyDataComponent;
