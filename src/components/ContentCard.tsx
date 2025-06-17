import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import { Eye, Heart, MessageSquare } from 'lucide-react'; // Example icons for stats

interface ContentCardProps {
  id: string | number;
  title: string;
  imageUrl?: string; // Optional image
  description?: string; // Short description or excerpt
  authorName?: string;
  authorAvatarUrl?: string;
  tags?: string[];
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  contentUrl: string; // URL to the detail page
}

const ContentCard: React.FC<ContentCardProps> = ({
  id,
  title,
  imageUrl,
  description,
  // authorName,
  // authorAvatarUrl,
  // tags,
  viewCount,
  likeCount,
  commentCount,
  contentUrl,
}) => {
  console.log("Rendering ContentCard:", title, id);

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-xl group">
      <Link to={contentUrl} className="block">
        {imageUrl && (
          <CardHeader className="p-0">
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img
                src={imageUrl}
                alt={title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')} // Fallback placeholder
              />
            </AspectRatio>
          </CardHeader>
        )}
        <CardContent className="p-4 space-y-2">
          <CardTitle className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
            {title}
          </CardTitle>
          {description && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center text-xs text-gray-500">
        <div className="flex space-x-3">
          {typeof viewCount === 'number' && (
            <span className="flex items-center"><Eye className="mr-1 h-3 w-3" /> {viewCount}</span>
          )}
          {typeof likeCount === 'number' && (
            <span className="flex items-center"><Heart className="mr-1 h-3 w-3" /> {likeCount}</span>
          )}
          {typeof commentCount === 'number' && (
            <span className="flex items-center"><MessageSquare className="mr-1 h-3 w-3" /> {commentCount}</span>
          )}
        </div>
        <Button variant="link" size="sm" asChild className="p-0 h-auto">
          <Link to={contentUrl}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;