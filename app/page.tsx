import { Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ProductCard } from './ProductCard';
import { ProductSkeleton } from '@/components/product-skeleton';
import { BannerSkeleton } from '@/components/banner-skeleton';
import { databases, DATABASE_ID, PRODUCTS_COLLECTION_ID, BANNERS_COLLECTION_ID, getFilePreview } from '@/lib/appwrite';

interface Banner {
  $id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  image: string;
}

interface Product {
  $id: string;
  name: string;
  description: string;
  actualPrice: number;
  offerPrice: number;
  category: string;
  stock: number;
  image: string;
}

async function getBanners() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      BANNERS_COLLECTION_ID
    );
    return response.documents.map((banner: any) => ({
      ...banner,
      image: banner.image ? getFilePreview(banner.image) : 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=60'
    }));
  } catch (error) {
    console.error('Error fetching banners:', error);
    return [{
      $id: '1',
      title: 'Handcrafted Excellence',
      subtitle: 'Discover our collection of unique artisan crafts',
      buttonText: 'Shop Now',
      buttonLink: '/products',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=60'
    }];
  }
}

async function getProducts() {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      PRODUCTS_COLLECTION_ID
    );
    return response.documents.map((product: any) => ({
      ...product,
      image: product.image ? getFilePreview(product.image) : 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=60'
    }));
  } catch (error) {
    console.error('Error fetching products:', error);
    return [{
      $id: '1',
      name: 'Custom Wooden Sign',
      description: 'Beautiful laser-engraved wooden sign',
      actualPrice: 2999,
      offerPrice: 2499,
      category: 'Laser Wood Art',
      stock: 10,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=60'
    }];
  }
}

function BannerSection({ banners }: { banners: Banner[] }) {
  if (!banners.length) return null;

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.$id}>
            <div className="relative h-[50vh] md:h-[70vh] rounded-lg md:rounded-3xl overflow-hidden">
              <img
                src={banner.image}
                alt={banner.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-green-900/90 to-emerald-900/90" />
              <div className="absolute inset-0 backdrop-blur-sm" />
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-6xl font-bold gradient-text">
                    {banner.title}
                  </h1>
                  <p className="text-base md:text-xl text-gray-300">
                    {banner.subtitle}
                  </p>
                  <Button
                    size="lg"
                    className="bg-green-600 hover:bg-green-700"
                    asChild
                  >
                    <Link href={banner.buttonLink}>{banner.buttonText}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:flex" />
      <CarouselNext className="hidden md:flex" />
    </Carousel>
  );
}

function CategorySection() {
  const categories = [
    {
      title: 'Laser Wood Art',
      description: 'Personalized wooden masterpieces crafted with precision',
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=800&auto=format&fit=crop&q=60',
      href: '/category/laser-wood',
    },
    {
      title: 'Neon Lights',
      description: 'Illuminate your space with custom neon designs',
      image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=800&auto=format&fit=crop&q=60',
      href: '/category/neon-lights',
    },
    {
      title: '3D Prints',
      description: 'Coming Soon - Custom 3D printing services',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&auto=format&fit=crop&q=60',
      href: '/category/3d-prints',
      comingSoon: true,
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {categories.map((category) => (
        <Link key={category.title} href={category.href}>
          <Card className="relative h-[200px] md:h-[300px] overflow-hidden group">
            <div className="absolute inset-0">
              <img
                src={category.image}
                alt={category.title}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            <div className="absolute bottom-0 p-4 md:p-6">
              <h3 className="text-xl md:text-2xl font-bold">{category.title}</h3>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                {category.description}
              </p>
              {category.comingSoon && (
                <span className="inline-block mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded-full">
                  Coming Soon
                </span>
              )}
            </div>
          </Card>
        </Link>
      ))}
    </section>
  );
}

function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <Link
          href="/products"
          className="text-green-400 hover:text-green-300 flex items-center gap-2"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.$id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default async function HomePage() {
  const [banners, products] = await Promise.all([
    getBanners(),
    getProducts(),
  ]);

  return (
    <div className="space-y-8 md:space-y-12">
      <Suspense fallback={<BannerSkeleton />}>
        <BannerSection banners={banners} />
      </Suspense>

      <Suspense fallback={<ProductSkeleton />}>
        <ProductsSection products={products.slice(0, 8)} />
      </Suspense>

      <CategorySection />

      <Suspense fallback={<ProductSkeleton />}>
        <ProductsSection products={products.slice(8, 20)} />
      </Suspense>
    </div>
  );
}