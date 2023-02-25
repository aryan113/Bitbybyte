import { Image } from 'antd';
import placeholderImage from './../../assets/images/podcast-1-dummy.jpg';
import './brief-post.scss';

export const BriefPost = (props) => {
    const { post } = props;
    return(
        <>
            <a href={`/post/${post.id}`}>
                <div className='image-cont'>
                    {post?.fields?.image ?
                        <Image
                            preview={false}
                            src={post?.fields?.image} 
                            alt={post?.fields?.title}
                        /> : 
                        <Image
                            preview={false}
                            src={placeholderImage}
                            alt={post?.fields?.title}
                        />
                    }
                </div>
            </a>
        </>
    )
}