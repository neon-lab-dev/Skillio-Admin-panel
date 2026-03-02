import { useParams } from "react-router-dom";
import { useGetAllPostByUserIdQuery } from "../../redux/Features/Post/postApi";
import { useState } from "react";

const UserPosts = () => {
    const { id } = useParams();

    const [mediaType, setMediaType] = useState<string>("post");

    const {data} = useGetAllPostByUserIdQuery({id, mediaType});
    console.log(data);
    return (
        <div>
            {id}
        </div>
    );
};

export default UserPosts;