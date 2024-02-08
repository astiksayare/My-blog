
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";


const PostCard = ({$id, title, featuredImage}) => {

    return (
        <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
            {/* Post Card Image */}
            <img className="rounded-lg" src={appwriteService.getFilePreview(featuredImage)} alt={title} />
            </div>
            {/* Title of the Post Card */}
            <h2 className="text-xl font-bold">
            {title}
            </h2>
        </div>
        </Link>
    )
}

export default PostCard;