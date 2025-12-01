import React from 'react';

const Category = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-accent  border-secondary-text pb-4">
        Category Management
      </h1>
      <p className="text-lg text-secondary-text">
        View and manage all categories within the system.
      </p>

      <div className="p-6 bg-[#181818] rounded-lg shadow-xl border border-[#333]">
        <h2 className="text-2xl font-semibold mb-4 text-text-light">
          Current Categories (15 total)
        </h2>
        <div className="h-64 border border-secondary-text border-dashed flex items-center justify-center">
          <p className="text-secondary-text">Category Table Placeholder</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
