import React, { useEffect, useState } from "react";
import Breadcrumbs from "../components/common/Breadcrumbs";
import LeftBorderWithTitle from "../components/LeftBorderWithTitle";
import GalleryCard from "../components/common/News&Events/GalleryCard";
import apiClient from "../auth/ApiClient";

function NewsAndEvents() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch gallery items from API
  const fetchGalleryItems = async () => {
    try {
      const response = await apiClient.get("/gallery/forView");
      setGalleryItems(response.data);
    } catch (error) {
      console.error("Error fetching gallery items:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  // Loading state
  if (loading) {
    return <div className="text-center py-10">Loading gallery...</div>;
  }

  // Render gallery items
  return (
    <div className="space-y-10 pb-20">
      <Breadcrumbs title="News & Events" />
      <div className="w-full flex flex-col space-y-6 px-custom">
        <LeftBorderWithTitle
          textSize="text-base"
          title="Glimpse of PCDA(O)"
          className="text-mainprimarycolor"
        />
        <h4 className="text-3xl text-mainprimarycolor font-bold">Gallery</h4>

        {/* Grid of gallery cards */}
        <div className="grid grid-cols-4 gap-6 relative">
          {galleryItems.map((item) => (
            <GalleryCard
              key={item.id}
              imgs={item.firstImage} // Pass first image URL
              year={item.year}
              title={item.eventName}
              link={`/news-and-events/${item.id}`} // Dynamic link
              imagePaths={item.imagePaths} // Pass all image paths for detailed use
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewsAndEvents;
