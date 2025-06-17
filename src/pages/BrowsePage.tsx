import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Sidebar from '@/components/layout/Sidebar';
import ContentCard from '@/components/ContentCard';
import Footer from '@/components/layout/Footer';
import InteractiveTag from '@/components/InteractiveTag';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from '@/components/ui/pagination';
import { Search, ListFilter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const allContentItems = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  title: `Content Item ${i + 1}: A Journey into Topic ${String.fromCharCode(65 + (i % 5))}`,
  imageUrl: `https://placehold.co/600x400/ متنوع/${i % 2 === 0 ? 'black' : 'white'}?text=Item+${i + 1}`,
  description: `This is a brief description for content item ${i + 1}. It explores various aspects of interesting subjects.`,
  contentUrl: `/content/${i + 1}`,
  viewCount: Math.floor(Math.random() * 2000),
  likeCount: Math.floor(Math.random() * 500),
  commentCount: Math.floor(Math.random() * 50),
  category: ['Tech', 'Art', 'Science', 'Lifestyle', 'Gaming'][i % 5],
  tags: [['innovation', 'future'], ['creative', 'design'], ['discovery', 'research'], ['wellbeing', 'tips'], ['esports', 'strategy']][i % 5],
  date: new Date(2023, 0, 1 + i).toISOString(),
}));

const ITEMS_PER_PAGE = 9;

const BrowsePage: React.FC = () => {
  console.log('BrowsePage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('date_desc');
  const [viewCountRange, setViewCountRange] = useState([0, 2000]);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categories = ['Tech', 'Art', 'Science', 'Lifestyle', 'Gaming'];
  const popularTags = ['innovation', 'creative', 'discovery', 'wellbeing', 'esports', 'tutorial', 'review'];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleTagToggle = (tag: string) => {
    setActiveTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };
  
  const filteredItems = allContentItems
    .filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter(item => selectedCategories.length === 0 || selectedCategories.includes(item.category))
    .filter(item => activeTags.length === 0 || activeTags.every(tag => item.tags.includes(tag)))
    .filter(item => item.viewCount >= viewCountRange[0] && item.viewCount <= viewCountRange[1])
    .sort((a, b) => {
      switch (sortBy) {
        case 'views_desc': return b.viewCount - a.viewCount;
        case 'likes_desc': return b.likeCount - a.likeCount;
        case 'date_asc': return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'date_desc':
        default:
          return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
    });

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = filteredItems.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0,0);
    }
  };

  const sidebarContent = (
    <>
      <div className="space-y-4">
        <Label htmlFor="search-browse">Search by Title</Label>
        <div className="relative">
            <Input
                id="search-browse"
                type="text"
                placeholder="Search content..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        {categories.map(category => (
          <div key={category} className="flex items-center space-x-2">
            <Checkbox
              id={`cat-${category}`}
              checked={selectedCategories.includes(category)}
              onCheckedChange={() => handleCategoryChange(category)}
            />
            <Label htmlFor={`cat-${category}`} className="font-normal">{category}</Label>
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Label>Sort By</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
                <SelectValue placeholder="Select sort option" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="date_desc">Newest First</SelectItem>
                <SelectItem value="date_asc">Oldest First</SelectItem>
                <SelectItem value="views_desc">Most Viewed</SelectItem>
                <SelectItem value="likes_desc">Most Liked</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="view-count-slider">View Count ({viewCountRange[0]} - {viewCountRange[1]})</Label>
        <Slider
          id="view-count-slider"
          min={0}
          max={2000}
          step={50}
          value={viewCountRange}
          onValueChange={(value) => setViewCountRange(value as [number, number])}
          className="my-4"
        />
      </div>

      <div className="space-y-2">
        <Label>Popular Tags</Label>
        <div className="flex flex-wrap gap-2">
          {popularTags.map(tag => (
            <InteractiveTag
              key={tag}
              text={tag}
              isActive={activeTags.includes(tag)}
              onClick={() => handleTagToggle(tag)}
            />
          ))}
        </div>
      </div>
    </>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button variant="outline" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="w-full">
              <ListFilter className="mr-2 h-4 w-4" />
              {isSidebarOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>
          
          {/* Sidebar */}
          <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'}`}>
            <Sidebar title="Filter & Sort Content" className="bg-white rounded-lg shadow">
              {sidebarContent}
            </Sidebar>
          </div>

          {/* Main Content Area */}
          <main className="flex-1">
            {paginatedItems.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedItems.map(item => (
                  <ContentCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No content found matching your criteria.</p>
                <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-12 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      // Basic pagination display logic (can be improved for many pages)
                      if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      } else if (page === currentPage - 2 || page === currentPage + 2) {
                        return <PaginationEllipsis key={page + "-ellipsis"} />;
                      }
                      return null;
                    })}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BrowsePage;