import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ProductSkeleton = () => (
  <div className="bg-[#1a0b10] rounded-[40px] p-4">
    <Skeleton height={300} baseColor="#2a1a20" highlightColor="#3a2a30" />
    <Skeleton count={2} className="mt-4" />
  </div>
);
export default ProductSkeleton;
